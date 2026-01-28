/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

const fetch = require("node-fetch");
const { CustomError } = require("../utils/errors/customErrors");
const logger = require("../config/logger");

class BadRequestError extends CustomError {
  constructor(message, details) {
    super(400, "BadRequest", message, details);
  }
}

/**
 * You have two important tokens/keys:
 * - MOESIF_APPLICATION_ID (for event ingestion API)
 * - MOESIF_MANAGEMENT_TOKEN (Bearer token for management/search/billing)
 */
function getMgmtToken() {
  const t = process.env.MOESIF_MANAGEMENT_TOKEN;
  if (!t) throw new BadRequestError("MOESIF_MANAGEMENT_TOKEN is not configured");
  return t;
}

function getAppId() {
  const id = process.env.MOESIF_APPLICATION_ID;
  if (!id) throw new BadRequestError("MOESIF_APPLICATION_ID is not configured");
  return id;
}

async function getPlansFromMoesif({ provider } = {}) {
  const token = getMgmtToken();
  const prov = provider || process.env.APP_PAYMENT_PROVIDER || "stripe";

  const res = await fetch(
    `https://api.moesif.com/v1/~/billing/catalog/plans?includes=prices&provider=${encodeURIComponent(prov)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new BadRequestError("Failed to fetch plans from Moesif", { status: res.status });
  }
  return res.json();
}

async function getCompany(companyId) {
  const token = getMgmtToken();
  const res = await fetch(
    `https://api.moesif.com/v1/search/~/companies/${encodeURIComponent(companyId)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new BadRequestError("Failed to fetch company from Moesif", { status: res.status });
  return res.json();
}

function extractSubscriptionsFromCompanyObject(companyObject) {
  if (companyObject?.subscriptions) return companyObject.subscriptions;
  if (companyObject?.metadata?.stripe?.subscription) return [companyObject.metadata.stripe.subscription];
  return [];
}

function getPeriodRange(period = "current") {
  const to = new Date();
  let from;

  if (period === "last30") from = new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);
  else if (period === "last90") from = new Date(to.getTime() - 90 * 24 * 60 * 60 * 1000);
  else from = new Date(to.getFullYear(), to.getMonth(), 1); // current month

  return { from: from.toISOString(), to: to.toISOString() };
}

/**
 * Moesif Billing Reports -> aggregate to UI shape
 * Expects:
 * - billing_meter_id (meterId)
 * - company_id (Stripe customer id)
 * - subscription_id (Stripe subscription id)
 */
async function getUsageStats({ meterId, companyId, subscriptionId, period = "current" }) {
  // TODO: MONETIZATION - GENERATE ID TOKEN at HERE
  const MGMT_KEY = (process.env.MOESIF_MANAGEMENT_TOKEN || "").trim();
  if (!MGMT_KEY) throw new Error("MOESIF_MANAGEMENT_TOKEN is not set");

  const { from, to } = getPeriodRange(period);

  const url = new URL("https://api.moesif.com/v1/~/billing/reports");
  url.searchParams.set("billing_meter_id", meterId);
  url.searchParams.set("company_id", companyId);
  url.searchParams.set("subscription_id", subscriptionId);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  logger.error(`[AUDIT] Moesif usage params: meterId=${meterId}, companyId=${companyId}, subscriptionId=${subscriptionId}`);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${MGMT_KEY}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    logger.error(`[AUDIT] Moesif usage stats error: status=${res.status}, url=${url.toString()}, body=${body}`);
    throw new Error(`Moesif billing reports failed (${res.status}): ${body}`);
  }

  const rows = await res.json();
  logger.info(`[AUDIT] Moesif usage stats response: meterId=${meterId}, companyId=${companyId}, subscriptionId=${subscriptionId}, count=${Array.isArray(rows) ? rows.length : 0}`);
  const list = Array.isArray(rows) ? rows : [];

  // ✅ aggregate (your data shows meter_usage + amount)
  const totalUsage = list.reduce(
    (sum, r) => sum + Number(r?.meter_usage ?? r?.report_total_usage ?? 0),
    0
  );

  const totalAmount = list.reduce((sum, r) => sum + Number(r?.amount ?? 0), 0);

  const currency = list.find(r => r?.currency)?.currency || "USD";

  logger.info(`[AUDIT] Moesif usage aggregate: totalUsage=${totalUsage}, totalAmount=${totalAmount}, currency=${currency}`);

  return {
    // UI expects these keys
    total_requests: totalUsage,
    usage: totalUsage, // keep as fallback (your UI does total_requests || usage)
    estimated_cost: totalAmount,
    currency,
    billing_type: "METERED",

    // Not available from billing reports (unless you query events/analytics separately)
    avg_response_time: 0,
  };
}


/**
 * Syncs customer/company mapping to Moesif.
 * This creates or updates a company in Moesif and optionally links a user to that company.
 * Used after successful payment to establish company tracking for billing/usage.
 */
async function syncCustomerMapping({ companyId, userId, email, metadata = {} }) {
  const token = getMgmtToken();

  // Update or create company in Moesif
  const companyPayload = {
    company_id: companyId,
    company_domain: email?.split("@")[1] || undefined,
    metadata: {
      stripe_customer_id: companyId,
      email,
      ...metadata,
    },
  };

  const companyRes = await fetch(`https://api.moesif.com/v1/companies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Moesif-Application-Id": getAppId(),
    },
    body: JSON.stringify(companyPayload),
  });

  if (!companyRes.ok) {
    const text = await companyRes.text();
    throw new BadRequestError("Failed to sync company to Moesif", { status: companyRes.status });
  }

  // Optionally update user and link to company
  if (userId && email) {
    const userPayload = {
      user_id: userId,
      company_id: companyId,
      metadata: {
        email,
        stripe_customer_id: companyId,
      },
    };

    const userRes = await fetch(`https://api.moesif.com/v1/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Moesif-Application-Id": getAppId(),
      },
      body: JSON.stringify(userPayload),
    });

    if (!userRes.ok) {
      const text = await userRes.text();
      // Don't throw - user sync is optional
    }
  }

  return { companyId, userId };
}

/**
 * Create or update user in Moesif (idempotent)
 * Used for usage-based subscriptions to track user activity
 */
async function createOrUpdateUser({ userId, companyId, email, metadata }) {
  const token = getMgmtToken();
  
  const userPayload = {
    user_id: userId,
    company_id: companyId,
    metadata: {
      email: email,
      ...metadata,
    },
    modified_time: new Date().toISOString(),
  };
  
  try {
    const res = await fetch(`https://api.moesif.com/v1/search/~/users/${encodeURIComponent(userId)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new BadRequestError("Failed to create/update user in Moesif", { status: res.status });
    }
    
    return res.json();
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getPlansFromMoesif,
  getCompany,
  extractSubscriptionsFromCompanyObject,
  syncCustomerMapping,
  createOrUpdateUser,
  getUsageStats,
  getAppId,
};
