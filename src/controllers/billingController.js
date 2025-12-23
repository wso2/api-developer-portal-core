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
// src/controllers/billingController.js

const monetizationService = require("../services/monetizationService");
const { CustomError } = require("../utils/errors/customErrors");
const logger = require("../config/logger");
const constants = require("../utils/constants");
const util = require("../utils/util");

class BadRequestError extends CustomError {
  constructor(message) {
    super(400, "BadRequest", message);
  }
}

// Utility to extract user context from request
function getUserContext(req) {
  return {
    email: req.user?.email || req[constants.USER_ID],
    sub: req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID],
    userId: req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID],
  };
}

// Utility to convert errors to response format
function errorToResponse(err) {
  if (err instanceof CustomError) {
    return {
      status: err.code,
      body: { error: err.type, message: err.message, details: err.details },
    };
  }
  return {
    status: 500,
    body: { error: "InternalServerError", message: err.message || "An unexpected error occurred" },
  };
}

/**
 * POST /organizations/:orgId/monetization/checkout
 * Body: { applicationID, apiId, apiReferenceID, policyId, policyName }
 * Creates a PENDING DP_API_SUBSCRIPTION row + creates Stripe embedded checkout session.
 */
async function createCheckoutSessionForSubscription(req, res) {
  const orgId = req.params.orgId;

  try {
    const user = getUserContext(req);
    
    logger.info({ orgId, body: req.body, user }, "💰 createCheckoutSession called");

    const returnBaseUrl = process.env.FRONTEND_BASE_URL;
    if (!returnBaseUrl) throw new BadRequestError("FRONTEND_BASE_URL is not configured");

    const { applicationID, apiId, apiReferenceID, policyId, policyName, sourcePage } = req.body || {};
    
    logger.info({ applicationID, apiId, apiReferenceID, policyId, policyName, sourcePage }, "💰 Extracted fields");
    
    if (!applicationID || !apiId || !apiReferenceID || !policyId || !policyName) {
      logger.error({ applicationID, apiId, apiReferenceID, policyId, policyName }, "❌ Missing required fields");
      throw new BadRequestError("Missing required fields: applicationID, apiId, apiReferenceID, policyId, policyName");
    }

    console.log("💰 All fields validated, calling monetizationService.createCheckoutSession with:", {
      orgId,
      user,
      returnBaseUrl,
      applicationID,
      apiId,
      apiReferenceID,
      policyId,
      policyName,
      sourcePage,
    });

    const result = await monetizationService.createCheckoutSession({
      orgId,
      user,
      returnBaseUrl,
      applicationID,
      apiId,
      apiReferenceID,
      policyId,
      policyName,
      sourcePage,
    });

    return res.status(200).json(result);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    console.error("💰❌ Checkout error - Full error object:", {
      name: err.name,
      message: err.message,
      code: err.code,
      type: err.type,
      stack: err.stack,
      responseStatus: status,
      responseBody: body
    });
    logger.error({ err, orgId, body: req.body }, "createCheckoutSession failed");
    return res.status(status).json(body);
  }
}

/**
 * POST /organizations/:orgId/monetization/stripe/register/:checkoutSessionId
 * Confirms the Stripe checkout session and activates DP subscription (and CP subscription if needed).
 */
async function registerStripeCheckoutSession(req, res) {
  const orgId = req.params.orgId;
  const checkoutSessionId = req.params.checkoutSessionId;

  try {
    const user = getUserContext(req); // optional but good for audit

    const result = await monetizationService.registerCheckoutSession({
      orgId,
      checkoutSessionId,
      user,
    });

    return res.status(201).json(result);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, checkoutSessionId }, "registerStripeCheckoutSession failed");
    return res.status(status).json(body);
  }
}

/**
 * POST /organizations/:orgId/subscriptions/:subId/cancel
 */
async function cancelSubscription(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;

  try {
    const user = getUserContext(req);
    const result = await monetizationService.cancelPaidSubscription({ orgId, subId, user });
    return res.status(200).json(result);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, subId }, "cancelSubscription failed");
    return res.status(status).json(body);
  }
}

/**
 * GET /organizations/:orgId/subscriptions/:subId/billing-status
 */
async function getSubscriptionBillingStatus(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;

  try {
    const result = await monetizationService.getSubscriptionBillingStatus({ orgId, subId });
    return res.status(200).json(result);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, subId }, "getSubscriptionBillingStatus failed");
    return res.status(status).json(body);
  }
}

/**
 * POST /organizations/:orgId/subscriptions/:subId/billing-portal
 * NOTE: Stripe portal generally cannot be embedded in an iframe.
 */
async function createBillingPortal(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;

  try {
    const returnUrl = process.env.FRONTEND_BILLING_RETURN_URL || process.env.FRONTEND_BASE_URL;
    if (!returnUrl) throw new BadRequestError("FRONTEND_BILLING_RETURN_URL or FRONTEND_BASE_URL is not configured");

    const portal = await monetizationService.createBillingPortal({ orgId, subId, returnUrl });
    return res.status(200).json({ url: portal.url });
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, subId }, "createBillingPortal failed");
    return res.status(status).json(body);
  }
}

/**
 * POST /organizations/:orgId/billing-portal
 * Create billing portal without requiring subscription ID
 */
async function createBillingPortalByOrg(req, res) {
  const orgId = req.params.orgId;

  try {
    const returnUrl = process.env.FRONTEND_BILLING_RETURN_URL || process.env.FRONTEND_BASE_URL;
    if (!returnUrl) throw new BadRequestError("FRONTEND_BILLING_RETURN_URL or FRONTEND_BASE_URL is not configured");

    const portal = await monetizationService.createBillingPortalByOrg({ orgId, returnUrl });
    return res.status(200).json({ url: portal.url });
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId }, "createBillingPortalByOrg failed");
    return res.status(status).json(body);
  }
}

/**
 * POST /webhooks/stripe
 * Mounted with express.raw({ type: 'application/json' }) in app.js
 */
async function handleStripeWebhook(req, res) {
  try {
    await monetizationService.handleStripeWebhook(req);
    return res.status(200).send("ok");
  } catch (err) {
    logger.error({ err }, "handleStripeWebhook failed");
    return res.status(400).send("webhook error");
  }
}

/**
 * GET /billing/return?session_id=xxx&dp_sub_id=xxx
 * Stripe redirects here after embedded checkout completion
 */
async function handleBillingReturn(req, res) {
  const { session_id, dp_sub_id, org_id } = req.query;
  
  console.log("💳 Billing return called with:", { session_id, dp_sub_id, org_id });
  logger.info({ session_id, dp_sub_id, org_id }, "💳 handleBillingReturn started");

  try {
    if (!session_id) {
      console.error("❌ Missing session_id");
      return res.status(400).send("Missing session_id");
    }

    // Retrieve the checkout session to get metadata
    console.log("💳 Retrieving Stripe session...");
    const stripeService = require("../services/stripeService");
    const session = await stripeService.retrieveCheckoutSession(session_id);
    
    const { apiReferenceID, orgId, sourcePage } = session.metadata || {};
    
    console.log("💳 Session metadata:", session.metadata);
    console.log("💳 Extracted values:", { apiReferenceID, orgId, sourcePage });
    
    // Priority 1: If sourcePage is provided, redirect there (could be listing page or any page)
    if (sourcePage) {
      const redirectUrl = `${sourcePage}?session_id=${session_id}&dp_sub_id=${dp_sub_id || ''}&org_id=${encodeURIComponent(orgId || org_id)}`;
      console.log("💳 Redirecting to sourcePage:", redirectUrl);
      logger.info({ redirectUrl }, "💳 Redirecting to sourcePage");
      return res.redirect(redirectUrl);
    }
    
    // Priority 2: If we have the API reference ID, redirect to the API page
    if (apiReferenceID && (orgId || org_id)) {
      console.log("💳 Getting org from database for orgId:", orgId || org_id);
      // Get org name from database to construct proper URL
      const adminDao = require("../dao/admin");
      const org = await adminDao.getOrganization(orgId || org_id);
      
      if (!org) {
        console.error("❌ Organization not found for orgId:", orgId || org_id);
        throw new Error(`Organization not found: ${orgId || org_id}`);
      }
      
      const orgName = org.IDENTIFIER || 'default';
      console.log("💳 Found org name:", orgName);
      
      // Redirect to API detail page with session_id, dp_sub_id, and org_id so frontend can finalize subscription
      const redirectUrl = `/${orgName}/apis/${apiReferenceID}?session_id=${session_id}&dp_sub_id=${dp_sub_id || ''}&org_id=${encodeURIComponent(orgId || org_id)}`;
      console.log("💳 Redirecting to API page:", redirectUrl);
      logger.info({ redirectUrl }, "💳 Redirecting to API page");
      return res.redirect(redirectUrl);
    }
    
    // Fallback: redirect to applications page
    const redirectUrl = `/applications?session_id=${session_id}&dp_sub_id=${dp_sub_id || ''}&org_id=${encodeURIComponent(org_id || '')}`;
    console.log("💳 Fallback redirect to applications:", redirectUrl);
    logger.info({ redirectUrl }, "💳 Fallback redirect to applications");
    return res.redirect(redirectUrl);
    
  } catch (err) {
    console.error("❌ handleBillingReturn error:", err);
    logger.error({ err, session_id, dp_sub_id, org_id }, "handleBillingReturn failed");
    // Always redirect somewhere even on error
    return res.redirect(`/applications?payment_error=true&session_id=${session_id || ''}`);
  }
}

module.exports = {
  createCheckoutSessionForSubscription,
  registerStripeCheckoutSession,
  cancelSubscription,
  getSubscriptionBillingStatus,
  createBillingPortal,
  createBillingPortalByOrg,
  handleStripeWebhook,
  handleBillingReturn,
  getUsageData,
  getPaymentMethods,
  removePaymentMethod,
  getBillingInfo,
  getActiveSubscriptions
    , addBillingEngineKeys
    , updateBillingEngineKeys
    , deleteBillingEngineKeys
    , getBillingEngineKeys
};
/**
 * POST /organizations/:orgId/billing-engine-keys
 */
async function addBillingEngineKeys(req, res) {
  try {
    const orgId = req.params.orgId;
    const { billingEngine, secretKey, publishableKey, webhookSecret } = req.body;
    if (!orgId || !billingEngine || !secretKey || !publishableKey || !webhookSecret) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const { encrypt } = require("../utils/cryptoUtil");
    const BillingEngineKey = require("../models/billingEngineKey");
    await BillingEngineKey.upsert({
      ORG_ID: orgId,
      BILLING_ENGINE: billingEngine,
      SECRET_KEY_ENC: encrypt(secretKey),
      PUBLISHABLE_KEY_ENC: encrypt(publishableKey),
      WEBHOOK_SECRET_ENC: encrypt(webhookSecret)
    });
    return res.status(201).json({ message: "Billing engine keys saved" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * PUT /organizations/:orgId/billing-engine-keys
 */
async function updateBillingEngineKeys(req, res) {
  try {
    const orgId = req.params.orgId;
    const { billingEngine, secretKey, publishableKey, webhookSecret } = req.body;
    if (!orgId || !billingEngine || !secretKey || !publishableKey || !webhookSecret) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const { encrypt } = require("../utils/cryptoUtil");
    const BillingEngineKey = require("../models/billingEngineKey");
    const record = await BillingEngineKey.findOne({ where: { ORG_ID: orgId, BILLING_ENGINE: billingEngine } });
    if (!record) {
      return res.status(404).json({ message: "Billing engine keys not found" });
    }
    record.SECRET_KEY_ENC = encrypt(secretKey);
    record.PUBLISHABLE_KEY_ENC = encrypt(publishableKey);
    record.WEBHOOK_SECRET_ENC = encrypt(webhookSecret);
    await record.save();
    return res.status(200).json({ message: "Billing engine keys updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * DELETE /organizations/:orgId/billing-engine-keys
 */
async function deleteBillingEngineKeys(req, res) {
  try {
    const orgId = req.params.orgId;
    const billingEngine = req.body.billingEngine || req.query.billingEngine;
    if (!orgId || !billingEngine) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const BillingEngineKey = require("../models/billingEngineKey");
    const deleted = await BillingEngineKey.destroy({ where: { ORG_ID: orgId, BILLING_ENGINE: billingEngine } });
    if (deleted === 0) {
      return res.status(404).json({ message: "Billing engine keys not found" });
    }
    return res.status(200).json({ message: "Billing engine keys deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * GET /organizations/:orgId/billing-engine-keys
 */
async function getBillingEngineKeys(req, res) {
  try {
    const orgId = req.params.orgId;
    const billingEngine = req.query.billingEngine || 'stripe';
    if (!orgId || !billingEngine) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const BillingEngineKey = require("../models/billingEngineKey");
    const { decrypt } = require("../utils/cryptoUtil");
    const record = await BillingEngineKey.findOne({ where: { ORG_ID: orgId, BILLING_ENGINE: billingEngine } });
    if (!record) {
      return res.status(404).json({ message: "Billing engine keys not found" });
    }
    return res.status(200).json({
      orgId: record.ORG_ID,
      billingEngine: record.BILLING_ENGINE,
      secretKey: decrypt(record.SECRET_KEY_ENC),
      publishableKey: decrypt(record.PUBLISHABLE_KEY_ENC),
      webhookSecret: decrypt(record.WEBHOOK_SECRET_ENC)
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * GET /organizations/:orgId/billing/usage-data?period=current|last30|last90
 * Get usage statistics for the current user
 */
async function getUsageData(req, res) {
  try {
    const { orgId } = req.params;
    const userContext = getUserContext(req);
    const period = req.query.period || 'current';
    
    // Get usage data from monetization service
    const usageData = await monetizationService.getUserUsageData(userContext, orgId, period);
    
    return res.json(usageData);
  } catch (err) {
    logger.error({ err, userId: getUserContext(req).userId }, "getUsageData failed");
    const resp = errorToResponse(err);
    return res.status(resp.status).json(resp.body);
  }
}

/**
 * GET /organizations/:orgId/billing/payment-methods
 * Get all payment methods for the current user
 */
async function getPaymentMethods(req, res) {
  try {
    const { orgId } = req.params;
    const userContext = getUserContext(req);
    
    // Get payment methods from Stripe
    const paymentMethods = await monetizationService.getPaymentMethods(userContext, orgId);
    
    return res.json({ paymentMethods });
  } catch (err) {
    logger.error({ err, userId: getUserContext(req).userId }, "getPaymentMethods failed");
    const resp = errorToResponse(err);
    return res.status(resp.status).json(resp.body);
  }
}

/**
 * DELETE /organizations/:orgId/billing/payment-methods/:methodId
 * Remove a payment method
 */
async function removePaymentMethod(req, res) {
  try {
    const { methodId } = req.params;
    const userContext = getUserContext(req);
    
    // Remove payment method from Stripe
    await monetizationService.removePaymentMethod(userContext, methodId);
    
    return res.json({ success: true });
  } catch (err) {
    logger.error({ err, methodId: req.params.methodId }, "removePaymentMethod failed");
    const resp = errorToResponse(err);
    return res.status(resp.status).json(resp.body);
  }
}

/**
 * GET /organizations/:orgId/billing/info
 * Get billing information for the current user
 */
async function getBillingInfo(req, res) {
  try {
    const { orgId } = req.params;
    const userContext = getUserContext(req);
    
    // Get billing info from Stripe customer
    const billingInfo = await monetizationService.getBillingInfo(userContext, orgId);
    
    return res.json(billingInfo);
  } catch (err) {
    logger.error({ err, userId: getUserContext(req).userId }, "getBillingInfo failed");
    const resp = errorToResponse(err);
    return res.status(resp.status).json(resp.body);
  }
}

/**
 * GET /organizations/:orgId/billing/subscriptions
 * Get active subscriptions for billing page display
 */
async function getActiveSubscriptions(req, res) {
  const { orgId } = req.params;
  try {
    // Get subscriptions from monetization service
    const subscriptions = await monetizationService.getActiveSubscriptionsForBilling(orgId);
    
    return res.json({ subscriptions });
  } catch (err) {
    logger.error({ err, orgId }, "getActiveSubscriptions failed");
    const resp = errorToResponse(err);
    return res.status(resp.status).json(resp.body);
  }
}
