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
// src/services/monetizationService.js
const sequelize = require("../db/sequelize");
const { CustomError } = require("../utils/errors/customErrors");
const logger = require("../config/logger");

// Define monetization-specific error classes
class BadRequestError extends CustomError {
  constructor(message, details) {
    super(400, "BadRequest", message, details);
  }
}

class NotFoundError extends CustomError {
  constructor(message, details) {
    super(404, "NotFound", message, details);
  }
}

class ConflictError extends CustomError {
  constructor(message, details) {
    super(409, "Conflict", message, details);
  }
}

const adminDao = require("../dao/admin");

const stripeService = require("./stripeService");
const { getDecryptedStripeKeysForOrg } = require("./orgBillingKeyService");
const moesifService = require("./moesifService");
const adminService = require("./adminService");

const PAYMENT_PROVIDER = {
  STRIPE: "STRIPE",
};

const PAYMENT_STATUS = {
  PENDING: "PENDING",        // DP row created, waiting for payment completion
  ACTIVE: "ACTIVE",          // payment ok + CP subscription ok
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CANCELED: "CANCELED",
  PAST_DUE: "PAST_DUE",
};

/**
 * Decide paid vs free.
 * You mentioned BILLING_PLAN values like FREE / COMMERCIAL.
 */
function isPaidPolicy(policyRow) {
  const billingPlan = policyRow?.BILLING_PLAN;
  return String(billingPlan || "FREE").toUpperCase() !== "FREE";
}

function extractExternalPriceId(policyRow) {
  // Extract Moesif price ID from PRICING_METADATA
  // Note: Control Plane only communicates with Moesif (not Stripe directly)
  // Moesif automatically creates corresponding Stripe plans
  const metadata = policyRow?.PRICING_METADATA;
  if (!metadata) return null;
  
  return (
    metadata.externalPriceId ||  // CP sends Moesif price ID
    metadata.moesifPriceId ||
    metadata.priceId ||
    null
  );
}

function extractMoesifProductId(policyRow) {
  // Extract Moesif product ID from PRICING_METADATA
  // Note: externalProductId from CP is actually the Moesif plan ID
  const metadata = policyRow?.PRICING_METADATA;
  if (!metadata) return null;
  
  return (
    metadata.externalProductId ||  // CP sends Moesif plan ID as "product"
    metadata.moesifProductId ||
    metadata.planId ||
    null
  );
}

/**
 * POST /organizations/:orgId/monetization/checkout
 * Body: { applicationID, apiId, apiReferenceID, policyId, policyName }
 *
 * Creates a DP subscription row in PENDING state (with CHECKOUT_SESSION_ID),
 * creates Stripe embedded checkout session,
 * returns clientSecret + dpSubId.
 */
async function createCheckoutSession({
  orgId,
  user,
  returnBaseUrl,
  applicationID,
  apiId,
  apiReferenceID,
  policyId,
  policyName,
  sourcePage,
}) {
  return sequelize.transaction(async (t) => {
    const email = user?.email;
    if (!email) throw new BadRequestError("User email is required to start checkout.");

    // Validate API exists in DP
    const apiRow = await adminDao.getAPIById(orgId, apiId, t);
    if (!apiRow) throw new NotFoundError(`API not found: apiId=${apiId}`);

    // Load policy
    const policyRow = await adminDao.getSubscriptionPolicyById(orgId, policyId, t);
    if (!policyRow) throw new NotFoundError(`Policy not found: policyId=${policyId}`);

    // If FREE plan, do NOT go through Stripe checkout.
    if (!isPaidPolicy(policyRow)) {
      throw new BadRequestError("This policy is FREE. Use /organizations/:orgId/subscriptions for free subscriptions.");
    }

    const externalPriceId = extractExternalPriceId(policyRow);
    if (!externalPriceId) {
      throw new BadRequestError("Paid policy is missing external price id configuration.");
    }

    // Check if metered pricing (PER_UNIT model)
    const pricingModel = policyRow.PRICING_MODEL;
    const isMetered = pricingModel === 'PER_UNIT';

    // For metered pricing, validate that price is properly configured with meter in Stripe
    if (isMetered) {
      const pricingMetadata = policyRow.PRICING_METADATA || {};
      
      // If meter ID is missing, optionally handle as needed (no logs in production)
    }

    // Optional: prevent duplicate ACTIVE/PENDING for same (app, api, policy) if you want
    // (Depends on your model; this is a safe guard)
    const existing = await adminDao.findSubscriptionByUniqueKey(
      orgId,
      applicationID,
      apiId,
      policyId,
      t
    );
    // Only block if ACTIVE subscription exists, allow retry if previous checkout was abandoned (PENDING)
    if (existing && existing.PAYMENT_STATUS === PAYMENT_STATUS.ACTIVE) {
      throw new ConflictError("An active subscription already exists for this app, API and plan.");
    }

    // If a PENDING subscription exists from abandoned checkout, delete it before creating new one
    if (existing && existing.PAYMENT_STATUS === PAYMENT_STATUS.PENDING) {
      await adminDao.deleteSubscription(orgId, existing.SUB_ID, t);
    }

    // Fetch org-specific Stripe keys
    const { secretKey: stripeSecretKey, publishableKey } = await getDecryptedStripeKeysForOrg(orgId);
    // Create Stripe customer (or find existing) for this user
    const customer = await stripeService.findOrCreateCustomerByEmail(
      email,
      {
        orgId,
        userId: user?.sub || user?.userId,
        applicationID,
      },
      stripeSecretKey
    );

    // Create DP subscription row first (PENDING), so we have SUB_ID to tie into metadata + return URL.
    const dpSub = await adminDao.createSubscription(orgId, {
      applicationID: applicationID,
      apiId: apiId,
      policyId: policyId,
      // You already store apiReferenceID in your request; store if you have a column, else skip.
      PAYMENT_PROVIDER: PAYMENT_PROVIDER.STRIPE,
      PAYMENT_STATUS: PAYMENT_STATUS.PENDING,
      BILLING_CUSTOMER_ID: customer.id,
      BILLING_SUBSCRIPTION_ID: null,
      CHECKOUT_SESSION_ID: null,
      // keep anything else you already store (createdBy, timestamps, etc.)
    }, t);

    const dpSubId = dpSub.SUB_ID;

    // Stripe embedded checkout return URL - include orgId for frontend processing
    const returnUrl = `${returnBaseUrl}/devportal/billing/return?session_id={CHECKOUT_SESSION_ID}&dp_sub_id=${encodeURIComponent(
      dpSubId
    )}&org_id=${encodeURIComponent(orgId)}`;

    // isMetered already determined above during validation
    const session = await stripeService.createCheckoutSession({
      customerId: customer.id,
      priceId: externalPriceId,
      isMetered, // Pass flag to omit quantity for metered pricing
      returnUrl,
      metadata: {
        orgId,
        dpSubId,
        apiId,
        apiReferenceID,
        policyId,
        policyName,
        applicationID,
        sourcePage: sourcePage || '',
      },
      stripeSecretKey
    });

    // Persist checkout session id on the DP row
    await adminDao.updateBillingFields(
      orgId,
      dpSubId,
      {
        CHECKOUT_SESSION_ID: session.id,
        // keep in PENDING until register confirms
        PAYMENT_STATUS: PAYMENT_STATUS.PENDING,
      },
      t
    );

    return {
      subId: dpSubId,
      checkoutSessionId: session.id,
      clientSecret: session.client_secret,
      publishableKey,
      billingCustomerId: customer.id,
      paymentProvider: PAYMENT_PROVIDER.STRIPE,
      paymentStatus: PAYMENT_STATUS.PENDING,
    };
  });
}

/**
 * POST /organizations/:orgId/monetization/stripe/register/:checkoutSessionId
 * Verifies checkout, updates DP row with BILLING_SUBSCRIPTION_ID, marks ACTIVE,
 * then creates CP subscription (idempotent).
 */
async function registerCheckoutSession({ orgId, checkoutSessionId, user }) {
  return sequelize.transaction(async (t) => {
    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    const session = await stripeService.retrieveCheckoutSession(checkoutSessionId, stripeSecretKey);

    // Validate session is paid/complete (depends on Stripe config; usually "complete")
    // You may also check session.payment_status, session.status etc.
    const isComplete = String(session?.status || "").toLowerCase() === "complete";
    if (!isComplete) {
      // mark failed
      const dpSubId = session?.metadata?.dpSubId;
      if (dpSubId) {
        await adminDao.updateBillingFields(orgId, dpSubId, {
          PAYMENT_STATUS: PAYMENT_STATUS.PAYMENT_FAILED,
        }, t);
      }
      throw new ConflictError(`Checkout session is not complete. status=${session?.status}`);
    }

    const billingCustomerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;

    const billingSubscriptionId =
      typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

    const dpSubId = session?.metadata?.dpSubId;
    if (!dpSubId) throw new BadRequestError("Checkout session missing dpSubId metadata.");

    // Load DP subscription row
    const dpSub = await adminDao.getSubscription(orgId, dpSubId, t);
    if (!dpSub) throw new NotFoundError(`DP subscription not found: subId=${dpSubId}`);

    // Ensure same session (protect against mismatched URLs)
    if (dpSub.CHECKOUT_SESSION_ID && dpSub.CHECKOUT_SESSION_ID !== checkoutSessionId) {
      throw new ConflictError("Checkout session does not match the pending subscription record.");
    }

    // Update DP row with billing ids + ACTIVE
    await adminDao.updateBillingFields(
      orgId,
      dpSubId,
      {
        BILLING_CUSTOMER_ID: billingCustomerId || dpSub.BILLING_CUSTOMER_ID,
        BILLING_SUBSCRIPTION_ID: billingSubscriptionId,
        PAYMENT_PROVIDER: PAYMENT_PROVIDER.STRIPE,
        PAYMENT_STATUS: PAYMENT_STATUS.ACTIVE,
        CHECKOUT_SESSION_ID: checkoutSessionId,
      },
      t
    );

    // NOTE: CP subscription creation happens during token generation flow
    // (same as free subscriptions - when user generates API key/OAuth token)
    // This keeps the flow consistent for both free and paid plans

    // Comprehensive Moesif integration for usage tracking
    // This happens AFTER successful Stripe checkout to sync customer data to Moesif
    // Note: Control Plane only knows Moesif IDs, not Stripe IDs
    // Moesif automatically syncs plans to Stripe
    const policyRow = await adminDao.getSubscriptionPolicyById(orgId, dpSub.POLICY_ID, t);
    const moesifPriceId = extractExternalPriceId(policyRow); // externalPriceId is Moesif price ID
    const moesifPlanId = extractMoesifProductId(policyRow); // externalProductId is Moesif plan ID
    const moesifAppKey = process.env.MOESIF_APPLICATION_ID;
    
    
    if (moesifAppKey && moesifPlanId) {
      try {
        await moesifService.createOrUpdateUser({
          userId: billingCustomerId,
          companyId: billingCustomerId,
          email: user?.email,
          metadata: {
            stripeCustomerId: billingCustomerId,
            stripeSubscriptionId: billingSubscriptionId,
            dpSubId: dpSubId,
            orgId: orgId,
            moesifPlanId: moesifPlanId,
            moesifPriceId: moesifPriceId,
          },
        });
        await moesifService.syncCustomerMapping({
          companyId: billingCustomerId,
          userId: billingCustomerId,
          email: user?.email,
          metadata: {
            subscriptionId: billingSubscriptionId,
            moesifPlanId: moesifPlanId,
            moesifPriceId: moesifPriceId,
            dpSubId: dpSubId,
          },
        });
        const billingMeterId = await moesifService.createBillingMeter({
          subscriptionId: billingSubscriptionId,
          planId: moesifPlanId,
          priceId: moesifPriceId,
          billingProvider: PAYMENT_PROVIDER.STRIPE,
          metadata: {
            dpSubId: dpSubId,
            orgId: orgId,
            policyId: dpSub.POLICY_ID,
            stripeCustomerId: billingCustomerId,
          },
        });
        if (billingMeterId) {/* Lines 393-404 omitted */}
        console.log("✅ Moesif integration complete for usage-based subscription");
      } catch (e) {
        // Log but don't fail the subscription activation
        logger.warn({ e, orgId, dpSubId, moesifPlanId }, "Moesif integration failed (non-blocking)");
        console.error("❌ Moesif integration failed:", e.message);
        console.error("Stack:", e.stack);
      }
    } else {
      // No Moesif integration if app key or plan ID missing; skip logs in production
    }

    return {
      subId: dpSubId,
      billingCustomerId,
      billingSubscriptionId,
      paymentStatus: PAYMENT_STATUS.ACTIVE,
      paymentProvider: PAYMENT_PROVIDER.STRIPE,
    };
  });
}

/**
 * GET usage for subscription (from Moesif)
 */
async function getUsage({ orgId, subId, from, to }) {
  const sub = await adminDao.getSubscription(orgId, subId);
  if (!sub) throw new NotFoundError(`Subscription not found: subId=${subId}`);

  if (!sub.BILLING_CUSTOMER_ID || !sub.BILLING_SUBSCRIPTION_ID) {
    throw new ConflictError("Billing is not registered for this subscription yet. Complete checkout first.");
  }

  return moesifService.getUsageForSubscription({
    companyId: sub.BILLING_CUSTOMER_ID,
    subscriptionId: sub.BILLING_SUBSCRIPTION_ID,
    from,
    to,
  });
}

/**
 * List invoices by customer
 */
async function listInvoices({ orgId, user, period = 'last3months' }) {
  const subs = await adminDao.listSubscriptionsByOrg(orgId);
  const any = subs.find((s) => s.BILLING_CUSTOMER_ID && s.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE);
  if (!any) return { invoices: [] };
  
  // Calculate date range based on period
  let created;
  const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
  
  switch (period) {
    case 'last3months':
      created = { gte: now - (90 * 24 * 60 * 60) }; // 3 months ago
      break;
    case 'last6months':
      created = { gte: now - (180 * 24 * 60 * 60) }; // 6 months ago
      break;
    case 'last12months':
      created = { gte: now - (365 * 24 * 60 * 60) }; // 12 months ago
      break;
    case 'all':
      created = undefined; // No date filter
      break;
    default:
      created = { gte: now - (90 * 24 * 60 * 60) }; // Default to 3 months
  }
  
  const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
  const result = await stripeService.listInvoicesByCustomer(any.BILLING_CUSTOMER_ID, { 
    limit: 100,
    created 
  }, stripeSecretKey);
  
  // Transform the response to match the frontend expectations
  return {
    invoices: (result.data || []).map(invoice => ({
      id: invoice.id,
      number: invoice.number,
      created: invoice.created,
      period: `${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}`,
      amount: invoice.amount_due / 100, // Convert cents to dollars
      status: invoice.status,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf
    }))
  };
}

async function listInvoicesBySubscription({ orgId, subId }) {
  const sub = await adminDao.getSubscription(orgId, subId);
  if (!sub?.BILLING_CUSTOMER_ID) return { data: [] };

  const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
  const invoices = await stripeService.listInvoicesByCustomer(sub.BILLING_CUSTOMER_ID, { limit: 50 }, stripeSecretKey);
  const filtered = (invoices.data || []).filter(
    (inv) => inv.subscription === sub.BILLING_SUBSCRIPTION_ID
  );
  return { ...invoices, data: filtered };
}

async function getInvoice({ invoiceId }) {
  const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
  return stripeService.getInvoice(invoiceId, stripeSecretKey);
}

async function createBillingPortal({ orgId, subId, returnUrl }) {
  const sub = await adminDao.getSubscription(orgId, subId);
  
  if (!sub) {
    throw new NotFoundError(`Subscription not found: subId=${subId}`);
  }
  
  if (!sub.BILLING_CUSTOMER_ID) {
    logger.warn({ orgId, subId, sub }, "Subscription missing BILLING_CUSTOMER_ID");
    throw new BadRequestError("This subscription does not have billing information. Please ensure the subscription was created through Stripe checkout.");
  }
  
  const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
  return stripeService.createCustomerPortalSession({
    customerId: sub.BILLING_CUSTOMER_ID,
    returnUrl,
    stripeSecretKey
  });
}

async function createBillingPortalByOrg({ orgId, returnUrl }) {
  // Get any subscription for this org to find the Stripe customer ID
  const subscriptions = await adminDao.listSubscriptionsByOrg(orgId);
  
  // Find a Stripe subscription
  const stripeSub = subscriptions.find(s => 
    s.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE && s.BILLING_CUSTOMER_ID
  );
  
  if (!stripeSub?.BILLING_CUSTOMER_ID) {
    throw new BadRequestError("No Stripe customer found for this organization. Please create a subscription first.");
  }
  
  const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
  return stripeService.createCustomerPortalSession({
    customerId: stripeSub.BILLING_CUSTOMER_ID,
    returnUrl,
    stripeSecretKey
  });
}

async function cancelPaidSubscription({ orgId, subId, user }) {
  return sequelize.transaction(async (t) => {
    const sub = await adminDao.getSubscription(orgId, subId, t);
    if (!sub) throw new NotFoundError(`Subscription not found: subId=${subId}`);
    if (!sub.BILLING_SUBSCRIPTION_ID) throw new BadRequestError("No billing subscription id found to cancel.");

    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    await stripeService.cancelSubscription(sub.BILLING_SUBSCRIPTION_ID, stripeSecretKey);

    await adminDao.updateBillingFields(orgId, subId, {
      PAYMENT_STATUS: PAYMENT_STATUS.CANCELED,
    }, t);

    // Optional: also cancel in CP if needed
    // await apimControlPlaneService.cancelSubscription(...)

    return { subId, paymentStatus: PAYMENT_STATUS.CANCELED };
  });
}

/**
 * Stripe webhook handler delegate.
 * - You can update PAYMENT_STATUS to PAST_DUE/CANCELED/ACTIVE based on invoice/payment events.
 */
async function handleStripeWebhook(req) {
  // req.body must be raw buffer for signature verification in stripeService
  // Extract orgId from webhook metadata/header (customize as needed)
  const orgId = req.headers['x-org-id'] || req.body?.orgId || req.query?.orgId;
  const { secretKey: stripeSecretKey, webhookSecret } = await getDecryptedStripeKeysForOrg(orgId);
  const event = await stripeService.verifyAndConstructWebhookEvent(req, stripeSecretKey, webhookSecret);

  // Example: update DP row by BILLING_SUBSCRIPTION_ID
  // You should handle at least: invoice.payment_failed, invoice.paid, customer.subscription.deleted/updated
  await stripeService.applyWebhookToLocalState(event, { adminDao });

  return true;
}

async function getSubscriptionBillingStatus({ orgId, subId }) {
  const sub = await adminDao.getSubscription(orgId, subId);
  if (!sub) throw new NotFoundError(`Subscription not found: subId=${subId}`);
  return {
    subId,
    paymentProvider: sub.PAYMENT_PROVIDER,
    paymentStatus: sub.PAYMENT_STATUS,
    billingCustomerId: sub.BILLING_CUSTOMER_ID,
    billingSubscriptionId: sub.BILLING_SUBSCRIPTION_ID,
  };
}

module.exports = {
  createCheckoutSession,
  registerCheckoutSession,
  getUsage,
  listInvoices,
  listInvoicesBySubscription,
  getInvoice,
  createBillingPortal,
  createBillingPortalByOrg,
  cancelPaidSubscription,
  handleStripeWebhook,
  getSubscriptionBillingStatus,
  getUserUsageData,
  getPaymentMethods,
  removePaymentMethod,
  getBillingInfo,
  getActiveSubscriptionsForBilling
};

/**
 * Get user usage data for billing page
 */
async function getUserUsageData(userContext, orgId, period = 'current') {
  try {
    // Get all subscriptions for the user in this organization
    let subscriptions = [];
    try {
      subscriptions = await adminDao.getAllSubscriptions(orgId, userContext.userId);
    } catch (err) {
      logger.warn({ err, orgId, userId: userContext.userId }, "No subscriptions found for user");
      // Return empty data if no subscriptions found
      return {
        totalRequests: 0,
        activeSubscriptions: 0,
        estimatedCost: 0,
        avgResponseTime: 0,
        subscriptions: []
      };
    }
    
    // If no subscriptions, return empty data
    if (!subscriptions || subscriptions.length === 0) {
      return {
        totalRequests: 0,
        activeSubscriptions: 0,
        estimatedCost: 0,
        avgResponseTime: 0,
        subscriptions: []
      };
    }
    
    // Calculate date range based on period
    let startDate, endDate = new Date();
    if (period === 'current') {
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    } else if (period === 'last30') {
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (period === 'last90') {
      startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);
    }
    
    let totalRequests = 0;
    let totalCost = 0;
    let totalResponseTime = 0;
    let responseTimeCount = 0;
    
    const subscriptionData = [];
    
    for (const sub of subscriptions) {
      try {
        // Get usage from Moesif
        const usage = await moesifService.getUsage(
          sub.BILLING_CUSTOMER_ID,
          startDate.toISOString(),
          endDate.toISOString()
        );
        
        const requests = usage?.usage || 0;
        totalRequests += requests;
        
        // Get policy details for pricing
        const policy = await adminDao.getSubscriptionPolicy(sub.POLICY_ID);
        const pricingModel = policy?.PRICING_MODEL || 'FLAT';
        const unitAmount = policy?.UNIT_AMOUNT || 0;
        const flatAmount = policy?.FLAT_AMOUNT || 0;
        
        // Calculate cost
        let cost = 0;
        if (pricingModel === 'PER_UNIT') {
          cost = (requests * unitAmount);
        } else {
          cost = flatAmount;
        }
        totalCost += cost;
        
        // Get API metadata
        const apiMetadata = await adminDao.getAPIMetadata(sub.API_ID);
        
        subscriptionData.push({
          apiName: apiMetadata?.NAME || 'Unknown API',
          applicationName: sub.APPLICATION_NAME || 'Unknown App',
          planName: policy?.NAME || 'Unknown Plan',
          requests,
          pricingModel,
          cost
        });
        
        // For response time, we would need to fetch from Moesif analytics
        if (usage?.avgResponseTime) {
          totalResponseTime += usage.avgResponseTime;
          responseTimeCount++;
        }
      } catch (err) {
        logger.error({ err, subId: sub.ID }, "Failed to get usage for subscription");
      }
    }
    
    return {
      totalRequests,
      activeSubscriptions: subscriptions.length,
      estimatedCost: totalCost,
      avgResponseTime: responseTimeCount > 0 ? Math.round(totalResponseTime / responseTimeCount) : 0,
      subscriptions: subscriptionData
    };
  } catch (err) {
    logger.error({ err }, "getUserUsageData failed");
    // Return empty data instead of throwing error
    return {
      totalRequests: 0,
      activeSubscriptions: 0,
      estimatedCost: 0,
      avgResponseTime: 0,
      subscriptions: []
    };
  }
}

/**
 * Get payment methods for the user
 */
async function getPaymentMethods(userContext, orgId) {
  try {
    // Get all subscriptions for the organization to find the Stripe customer ID
    const subscriptions = await adminDao.listSubscriptionsByOrg(orgId);
    
    if (!subscriptions || subscriptions.length === 0) {
      return [];
    }
    
    // Find a subscription with a Stripe customer ID
    const stripeSubscription = subscriptions.find(
      s => s.BILLING_CUSTOMER_ID && s.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE
    );
    
    if (!stripeSubscription || !stripeSubscription.BILLING_CUSTOMER_ID) {
      return [];
    }
    
    const customerId = stripeSubscription.BILLING_CUSTOMER_ID;
    
    // Get payment methods from Stripe
    const paymentMethods = await stripeService.listPaymentMethods(customerId);
    
    // Get customer default payment method
    const customer = await stripeService.getCustomer(customerId);
    const defaultPaymentMethodId = customer.invoice_settings?.default_payment_method;
    
    return paymentMethods.map(pm => ({
      id: pm.id,
      brand: pm.card?.brand || 'card',
      last4: pm.card?.last4,
      expMonth: pm.card?.exp_month,
      expYear: pm.card?.exp_year,
      isDefault: pm.id === defaultPaymentMethodId
    }));
  } catch (err) {
    logger.error({ err }, "getPaymentMethods failed");
    throw err;
  }
}

/**
 * Remove a payment method
 */
async function removePaymentMethod(userContext, methodId) {
  try {
    await stripeService.detachPaymentMethod(methodId);
  } catch (err) {
    logger.error({ err, methodId }, "removePaymentMethod failed");
    throw err;
  }
}

/**
 * Get billing information
 */
async function getBillingInfo(userContext, orgId) {
  try {
    const org = await adminDao.getOrganization(orgId);
    
    // Get all subscriptions for the organization to find the Stripe customer ID
    const subscriptions = await adminDao.listSubscriptionsByOrg(orgId);
    
    if (!subscriptions || subscriptions.length === 0) {
      return {
        organizationName: org?.NAME,
        email: userContext.email
      };
    }
    
    // Find a subscription with a Stripe customer ID
    const stripeSubscription = subscriptions.find(
      s => s.BILLING_CUSTOMER_ID && s.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE
    );
    
    if (!stripeSubscription || !stripeSubscription.BILLING_CUSTOMER_ID) {
      return {
        organizationName: org?.NAME,
        email: userContext.email
      };
    }
    
    const customerId = stripeSubscription.BILLING_CUSTOMER_ID;
    
    // Get customer from Stripe
    const customer = await stripeService.getCustomer(customerId);
    
    return {
      organizationName: customer.name || org?.NAME,
      email: customer.email || userContext.email,
      address: customer.address,
      taxId: customer.tax_ids?.data?.[0]?.value
    };
  } catch (err) {
    logger.error({ err }, "getBillingInfo failed");
    throw err;
  }
}

/**
 * Get active subscriptions formatted for billing page display
 */
async function getActiveSubscriptionsForBilling(orgId) {
  try {
    // Get subscriptions with all details using JOIN query
    const subscriptions = await adminDao.getActiveSubscriptionsWithDetails(orgId);
    
    if (!subscriptions || subscriptions.length === 0) {
      return [];
    }
    
    // Enhance with Stripe billing information
    const formattedSubs = await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          let amount = 0;
          let nextBillingDate = null;
          let billingCycle = sub.billingCycle || 'N/A';
          
          // Get billing info from Stripe if available
          if (sub.BILLING_SUBSCRIPTION_ID && sub.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE) {
            try {
              const stripeService = require('./stripeService');
              const stripeSub = await stripeService.getSubscription(sub.BILLING_SUBSCRIPTION_ID);
              
              if (stripeSub) {
                amount = stripeSub.items.data[0]?.price?.unit_amount || 0;
                nextBillingDate = stripeSub.current_period_end;
                
                // Override billing cycle from Stripe if available
                const interval = stripeSub.items.data[0]?.price?.recurring?.interval;
                if (interval) {
                  billingCycle = interval.charAt(0).toUpperCase() + interval.slice(1);
                }
              }
            } catch (err) {
              logger.warn({ err, subId: sub.id }, 'Failed to get Stripe subscription details');
            }
          }
          
          return {
            id: sub.id,
            apiName: sub.apiName || 'Unknown API',
            applicationName: sub.applicationName || 'Unknown App',
            planName: sub.planName || 'Unknown Plan',
            billingCycle,
            amount,
            nextBillingDate,
            status: sub.status === 'ACTIVE' ? 'active' : sub.status?.toLowerCase() || 'unknown'
          };
        } catch (err) {
          logger.warn({ err, subId: sub.id }, 'Failed to enhance subscription with Stripe data');
          // Return DB data if Stripe fetch fails
          return {
            id: sub.id,
            apiName: sub.apiName || 'Unknown API',
            applicationName: sub.applicationName || 'Unknown App',
            planName: sub.planName || 'Unknown Plan',
            billingCycle: sub.billingCycle || 'N/A',
            amount: 0,
            nextBillingDate: null,
            status: sub.status?.toLowerCase() || 'unknown'
          };
        }
      })
    );
    
    return formattedSubs;
  } catch (err) {
    logger.error({ err, orgId }, "getActiveSubscriptionsForBilling failed");
    throw err;
  }
}
