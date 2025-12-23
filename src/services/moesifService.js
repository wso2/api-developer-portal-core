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

/**
 * Usage: simplest approach for you:
 * - Use the billing meter/report endpoint you already generate in Java,
 *   OR query Moesif event/metrics via /v1/search with an ES-like query.
 *
 * Here is a practical API: "usage by subscription" via Moesif search events + agg.
 * This is an example - adapt fields you use: subscription_id.raw, company_id.raw, weight
 */
async function getUsageForSubscription({
  companyId,
  subscriptionId,
  from,
  to,
}) {
  const token = getMgmtToken();

  // Example: query events with subscription/company + time range and sum weight (missing=1)
  // NOTE: Moesif search endpoints and schemas may differ based on your data model.
  const query = {
    query: {
      bool: {
        must: [
          { term: { "company_id.raw": companyId } },
          { term: { "subscription_id.raw": subscriptionId } },
          // time range
          { range: { "timestamp": { gte: from, lte: to } } },
        ],
      },
    },
    size: 0,
    aggs: {
      usage_value: {
        sum: { field: "weight", missing: 1 },
      },
    },
  };

  const res = await fetch(`https://api.moesif.com/v1/search/~/search/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new BadRequestError("Failed to fetch usage from Moesif", { status: res.status });
  }

  const data = await res.json();
  const usage = data?.aggregations?.usage_value?.value ?? 0;

  return {
    companyId,
    subscriptionId,
    from,
    to,
    usage,
    raw: data,
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

/**
 * Create Moesif subscription to link company with plan
 * This reflects the Stripe subscription in Moesif for tracking and billing
 * 
 * @param {string} subscriptionId - Stripe subscription ID
 * @param {string} companyId - Moesif company ID (usually Stripe customer ID)
 * @param {string} planId - Moesif plan ID
 * @param {string} priceId - Moesif price ID
 * @param {object} metadata - Additional metadata
 * @returns {object} Created subscription
 */
async function createMoesifSubscription({ subscriptionId, companyId, planId, priceId, metadata }) {
  const token = getMgmtToken();
  
  const subscriptionPayload = {
    subscription_id: subscriptionId,
    company_id: companyId,
    subscription_plan_id: planId,
    status: "active",
    metadata: metadata || {},
    created_time: new Date().toISOString(),
  };
  
  try {
    const res = await fetch(`https://api.moesif.com/v1/~/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionPayload),
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new BadRequestError("Failed to create subscription in Moesif", { status: res.status });
    }
    
    const result = await res.json();
    logger.info({ subscriptionId, companyId, planId }, "Moesif subscription created successfully");
    return result;
  } catch (e) {
    logger.error({ e, subscriptionId, companyId, planId }, "Error creating Moesif subscription");
    throw e;
  }
}

/**
 * Create billing meter in Moesif for usage-based tracking
 * This links a Stripe subscription to Moesif for automatic usage reporting
 * 
 * @param {string} subscriptionId - Stripe subscription ID
 * @param {string} planId - Moesif plan ID  
 * @param {string} billingProvider - 'STRIPE' or other provider
 * @param {object} metadata - Additional metadata to store
 * @returns {string} Billing meter ID
 */
async function createBillingMeter({ subscriptionId, planId, billingProvider, metadata }) {
  const token = getMgmtToken();
  
  const meterPayload = {
    subscription_id: subscriptionId,
    plan_id: planId,
    status: "active",
    billing_provider: (billingProvider || "STRIPE").toLowerCase(),
    metadata: metadata || {},
    created_time: new Date().toISOString(),
  };
  
  try {
    const res = await fetch(`https://api.moesif.com/v1/~/billing/meters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meterPayload),
    });
    
    if (!res.ok) {
      const text = await res.text();
      logger.error({ status: res.status, text, subscriptionId, planId }, "createBillingMeter failed");
      throw new BadRequestError("Failed to create billing meter in Moesif", { status: res.status });
    }
    
    const result = await res.json();
    return result.id || result._id; // Return the meter ID
  } catch (e) {
    logger.error({ e, subscriptionId, planId }, "Error creating Moesif billing meter");
    throw e;
  }
}

module.exports = {
  getPlansFromMoesif,
  getCompany,
  extractSubscriptionsFromCompanyObject,
  getUsageForSubscription,
  syncCustomerMapping,
  createOrUpdateUser,
  createBillingMeter,
  // (optional) expose app id if needed for ingestion
  getAppId,
};
