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
  const metadata = policyRow?.PRICING_METADATA;
  if (!metadata) return null;

  return (
    (metadata.external && metadata.external.priceId) ||
    null
  );
}

function extractMoesifProductId(policyRow) {
  const metadata = policyRow?.PRICING_METADATA;
  if (!metadata) return null;
  
  return (
    (metadata.external && metadata.external.productId) ||
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

    // Stripe embedded checkout return URL - always go to /billing/return, but include sourcePage for redirect after activation
    // This ensures backend activation, then user is redirected to the original UI page
    const landingPage = sourcePage || '/devportal/apis';
    const returnUrl = `${returnBaseUrl}/billing/return?session_id={CHECKOUT_SESSION_ID}&dp_sub_id=${dpSubId}&org_id=${orgId}&sourcePage=${encodeURIComponent(landingPage)}`;

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
        sourcePage: landingPage,
      },
      stripeSecretKey
    });

    // Patch the returnUrl to include the actual Stripe session id
    // Stripe requires the success_url to be set before session creation, so we must update it after
    // If your stripeService.createCheckoutSession supports passing {CHECKOUT_SESSION_ID} as a placeholder, it will be replaced automatically
    // Otherwise, you may need to update the session after creation (Stripe API supports this)

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
    logger.info({ orgId, checkoutSessionId, user }, '[registerCheckoutSession] Stripe session registration started');
    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    const session = await stripeService.retrieveCheckoutSession(checkoutSessionId, stripeSecretKey);

    // Validate session is paid/complete (depends on Stripe config; usually "complete")
    // Accept either status === 'complete' or payment_status === 'paid'
    const status = String(session?.status || "").toLowerCase();
    const paymentStatus = String(session?.payment_status || "").toLowerCase();
    const isPaid = status === "complete" || paymentStatus === "paid";
    if (!isPaid) {
      // mark failed
      const dpSubId = session?.metadata?.dpSubId;
      if (dpSubId) {
        await adminDao.updateBillingFields(orgId, dpSubId, {
          PAYMENT_STATUS: PAYMENT_STATUS.PAYMENT_FAILED,
        }, t);
      }
      throw new ConflictError(`Checkout session is not complete or paid. status=${session?.status}, payment_status=${session?.payment_status}`);
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
    const updatedCount = await adminDao.updateBillingFields(
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
    if (updatedCount !== 1) {
      console.error('[registerCheckoutSession] updateBillingFields did not update exactly one row!', { orgId, dpSubId, updatedCount });
    }
    // NOTE: CP subscription creation happens during token generation flow
    // (same as free subscriptions - when user generates API key/OAuth token)
    // This keeps the flow consistent for both free and paid plans

    // Sync customer data to Moesif for usage tracking
    // Note: Billing meters are created when Moesif price/plan is created, not here
    const policyRow = await adminDao.getSubscriptionPolicyById(orgId, dpSub.POLICY_ID, t);
    const moesifPriceId = extractExternalPriceId(policyRow);
    const moesifPlanId = extractMoesifProductId(policyRow);
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
        logger.info({ orgId, dpSubId }, '[registerCheckoutSession] Moesif customer sync complete');
      } catch (e) {
        logger.warn({ e, orgId, dpSubId, moesifPlanId }, "Moesif integration failed (non-blocking)");
        logger.error({ message: e.message, stack: e.stack }, '[registerCheckoutSession] Moesif integration error');
      }
    } else {
      logger.info({ orgId, dpSubId }, '[registerCheckoutSession] Moesif integration skipped (missing app key or plan ID)');
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
async function listInvoices({ orgId, userId, period = 'last3months' }) {
  const subs = await adminDao.listSubscriptionsByUser(orgId, userId);
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
          amount: invoice.amount_due, // Use raw amount (no conversion)
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

async function getInvoice({ orgId, invoiceId }) {
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

    return { subId, paymentStatus: PAYMENT_STATUS.CANCELED };
  });
}

/**
 * Stripe webhook handler delegate.
 * - Update PAYMENT_STATUS to PAST_DUE/CANCELED/ACTIVE based on invoice/payment events.
 */
async function handleStripeWebhook(req) {
  // req.body must be raw buffer for signature verification in stripeService
  // Multi-tenant: Try all webhook secrets until one matches
  let event = null;
  let orgId = null;
  let matchedKeys = null;
  try {
    // Fetch all org billing keys (including webhook secrets and Stripe secret keys)
    const allOrgKeys = await adminDao.getAllOrgBillingKeys(); // Should return [{ orgId, webhookSecret, secretKey }, ...]
    for (const { orgId: candidateOrgId, webhookSecret, secretKey } of allOrgKeys) {
      try {
        event = await stripeService.verifyAndConstructWebhookEvent(req, secretKey, webhookSecret);
        orgId = candidateOrgId;
        matchedKeys = { secretKey, webhookSecret };
        break; 
      } catch (err) {
        // Try next secret
      }
    }
    if (!event || !orgId) {
      throw new Error('Stripe webhook signature verification failed for all orgs');
    }
    await stripeService.applyWebhookToLocalState(event, { adminDao });
    return true;
  } catch (err) {
    throw err;
  }
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

/**
 * Get user usage data for billing page
 */
async function getUserUsageData(userContext, orgId, period = 'current', t) {
  const empty = { totalRequests: 0, activeSubscriptions: 0, estimatedCost: 0, avgResponseTime: 0, subscriptions: [] };

  try {
    logger.info('[getUserUsageData] called', { orgId, period, userContext });
    const userId = userContext?.userId || userContext?.sub;
    if (!userId) {
      logger.warn('[getUserUsageData] No userId found in userContext', { userContext });
      return empty;
    }

    const subscriptions = await adminDao.getUserSubscriptionsWithDetails(orgId, userId);

    // Be tolerant to different enum spellings
    const ACTIVE_STATUSES = new Set([
      'ACTIVE',
      'CANCEL_SCHEDULED'
    ]);

    const activeSubs = (subscriptions || []).filter(sub => {
      const paymentStatus = sub.PAYMENT_STATUS;
      return (
        ACTIVE_STATUSES.has(paymentStatus) ||
        paymentStatus === null ||
        paymentStatus === undefined ||
        paymentStatus === ''
      );
    });

    if (activeSubs.length === 0) return empty;

     logger.info(`[AUDIT] active subscriptions rows: ${activeSubs.length}` , {});

    const rows = await Promise.all(activeSubs.map(async (sub) => {
      const subId = sub?.ID || sub?.SUB_ID || sub?.id;

      try {
        const pricingModel = sub?.pricingModel || 'FLAT';
        const unitAmount = Number(sub?.unitAmount || 0);
        const flatAmount = Number(sub?.flatAmount || 0);
        const companyId = sub.BILLING_CUSTOMER_ID || '';
        const subscriptionId = sub.BILLING_SUBSCRIPTION_ID || '';
        const pricingMetadata = sub?.pricingMetadata || {};
        const meterId = sub?.meterId || '';

        let requests = 0;
        let avgRt = 0;
        let cost = 0;

        if (pricingModel === 'FLAT') {
          // Flat plan: no Moesif usage needed
          cost = flatAmount;
        } else { 
          if (!companyId || !subscriptionId) {
            logger.warn(`[AUDIT] Metered subscription missing companyId or subscriptionId: companyId=${companyId}, subscriptionId=${subscriptionId}, subId=${subId}`);
            return null;
          }

          if (!meterId) {
            logger.warn(
              { orgId, userId, subId, policyId: sub.POLICY_ID, pricingMetadata: pricingMetadata },
              '[AUDIT] Metered subscription missing billing meter id'
            );
            return null;
          }
          const usage = await moesifService.getUsageStats({
            meterId,
            subscriptionId,
            companyId,
            period
          });
          requests = Number(usage?.total_requests ?? usage?.usage ?? 0) || 0;
          avgRt = Number(usage?.avg_response_time ?? 0) || 0;

          const estimatedNum = Number(usage?.estimated_cost);
          if (!Number.isNaN(estimatedNum)) {
            cost = estimatedNum;
          } else if (pricingModel === 'PER_UNIT') {
            cost = requests * unitAmount;
          } else {
            cost = 0;
          }
        }

        const usageRow = {
          apiName: sub.apiName || 'Unknown API',
          applicationName: sub.applicationName || 'Unknown App',
          planName: sub.planName || 'Unknown Plan',
          requests,
          pricingModel,
          cost,
          avgResponseTime: avgRt
        };
        return usageRow;
      } catch (err) {
        logger.error('[AUDIT] Failed to build usage row', {
          subId: sub?.ID,
          policyId: sub?.POLICY_ID,
          apiId: sub?.API_ID,
          errMessage: err?.message,
          errStack: err?.stack
        });
        return null;
      }
    }));

    const subscriptionData = rows.filter(Boolean);
    const totalRequests = subscriptionData.reduce((sum, r) => sum + (r.requests || 0), 0);
    const estimatedCost = subscriptionData.reduce((sum, r) => sum + (r.cost || 0), 0);

    const rtRows = subscriptionData.filter(r => r.avgResponseTime && r.avgResponseTime > 0);
    const avgResponseTime = rtRows.length > 0
      ? Math.round(rtRows.reduce((sum, r) => sum + r.avgResponseTime, 0) / rtRows.length)
      : 0;

    return {
      totalRequests,
      activeSubscriptions: subscriptionData.length,
      estimatedCost,
      avgResponseTime,
      subscriptions: subscriptionData
    };
  } catch (err) {
    logger.error('[getUserUsageData] Error occurred', { err, orgId, userContext });
    return empty;
  }
}

/**
 * Get payment methods for the user
 */
async function getPaymentMethods(userContext, orgId) {
  try {
    logger.info({ orgId, userContext }, '[getPaymentMethods] Start');
    // Get all subscriptions for the organization to find the Stripe customer ID
    const subscriptions = await adminDao.listSubscriptionsByOrg(orgId);
    logger.info({ orgId, subscriptionsCount: subscriptions?.length }, '[getPaymentMethods] Subscriptions fetched');
    if (!subscriptions || subscriptions.length === 0) {
      logger.warn({ orgId }, '[getPaymentMethods] No subscriptions found for org');
      return [];
    }
    // Find a subscription with a Stripe customer ID
    const stripeSubscription = subscriptions.find(
      s => s.BILLING_CUSTOMER_ID && s.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE
    );
    logger.info({ orgId, stripeSubscription }, '[getPaymentMethods] Stripe subscription found');
    if (!stripeSubscription || !stripeSubscription.BILLING_CUSTOMER_ID) {
      logger.warn({ orgId }, '[getPaymentMethods] No Stripe customer ID found for org');
      return [];
    }
    const customerId = stripeSubscription.BILLING_CUSTOMER_ID;
    logger.info({ orgId, customerId }, '[getPaymentMethods] Using Stripe customer ID');
    // Get Stripe secret key for the org
    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    // Get payment methods from Stripe
    const paymentMethods = await stripeService.listPaymentMethods(customerId, stripeSecretKey);
    logger.info({ orgId, customerId, paymentMethodsCount: paymentMethods?.length }, '[getPaymentMethods] Payment methods fetched');
    // Get customer default payment method
    const customer = await stripeService.getCustomer(customerId, stripeSecretKey);
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
    logger.error({ err, orgId, userContext }, "getPaymentMethods failed");
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

    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    // Get customer from Stripe
     const customer = await stripeService.getCustomer(customerId, stripeSecretKey);
    
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
async function getSubscriptionsForBilling(orgId, userId) {
  try {
    // Get subscriptions with all details using JOIN query
    const subscriptions = await adminDao.getUserSubscriptionsWithDetails(orgId, userId);
    
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
          let status = sub.PAYMENT_STATUS || '';
          
          // Get billing info from Stripe if available
          if (sub.BILLING_SUBSCRIPTION_ID && sub.PAYMENT_PROVIDER === PAYMENT_PROVIDER.STRIPE) {
            try {
              const stripeService = require('./stripeService');
              const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
              const stripeSub = await stripeService.getSubscription(sub.BILLING_SUBSCRIPTION_ID, stripeSecretKey);
              if (stripeSub) {
                amount = stripeSub.items.data[0]?.price?.unit_amount || 0;
                nextBillingDate = stripeSub.current_period_end ? stripeSub.current_period_end * 1000 : null;
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
            status: status === 'ACTIVE' ? 'active' : status?.toLowerCase() || 'unknown'
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
    logger.error({ err, orgId }, "getSubscriptionsForBilling failed");
    throw err;
  }
}

  /**
   * Handles Stripe return and ensures paid subscription is activated.
   * Call this from your controller when handling Stripe return URL.
   */
  async function handleStripeReturnAndActivate({ orgId, sessionId, user }) {
    // Retrieve Stripe session
    const { secretKey: stripeSecretKey } = await getDecryptedStripeKeysForOrg(orgId);
    const session = await stripeService.retrieveCheckoutSession(sessionId, stripeSecretKey);
    const dpSubId = session?.metadata?.dpSubId;
    if (!dpSubId) {
      throw new BadRequestError("Stripe session missing dpSubId metadata.");
    }
    // Load DP subscription row
    const dpSub = await adminDao.getSubscription(orgId, dpSubId);
    if (!dpSub) {
      throw new NotFoundError(`DP subscription not found: subId=${dpSubId}`);
    }
    // Fetch the policy row for billing plan check
    const policyRow = await adminDao.getSubscriptionPolicyById(orgId, dpSub.POLICY_ID);
    // If paid and still PENDING, activate
    if (isPaidPolicy(policyRow) && dpSub.PAYMENT_STATUS === PAYMENT_STATUS.PENDING) {
      return await module.exports.registerCheckoutSession({ orgId, checkoutSessionId: sessionId, user });
    }
    return {
      subId: dpSubId,
      paymentStatus: dpSub.PAYMENT_STATUS,
      paymentProvider: dpSub.PAYMENT_PROVIDER,
      billingCustomerId: dpSub.BILLING_CUSTOMER_ID,
      billingSubscriptionId: dpSub.BILLING_SUBSCRIPTION_ID
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
  getBillingInfo,
  getSubscriptionsForBilling,
  handleStripeReturnAndActivate
};
