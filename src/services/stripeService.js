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

const StripeSDK = require("stripe");
const { CustomError } = require("../utils/errors/customErrors");

class BadRequestError extends CustomError {
  constructor(message) {
    super(400, "BadRequest", message);
  }
}

// Returns a new Stripe instance for the given secret key
function getStripeInstance(stripeSecretKey) {
  if (!stripeSecretKey) {
    throw new BadRequestError("Stripe secret key is not configured for this org");
  }
  return StripeSDK(stripeSecretKey, {
    apiVersion: '2024-11-20.acacia',
  });
}

// Remove assertStripeConfigured, all checks are now per-org
async function findOrCreateCustomerByEmail(email, metadata = {}, stripeSecretKey) {
  if (!email) throw new BadRequestError("email is required to create Stripe customer");
  const stripe = getStripeInstance(stripeSecretKey);
  // Search customer by email (Stripe search)
  const result = await stripe.customers.search({
    query: `email:"${email.replace(/"/g, '\\"')}"`,
    limit: 1,
  });
  if (result?.data?.[0]) return result.data[0];
  return stripe.customers.create({
    email,
    metadata,
  });
}

/**
 * Creates embedded Checkout session for subscription.
 * For metered usage, typically you don't pass quantity.
 */
async function createCheckoutSession({ customerId, priceId, quantity, returnUrl, metadata, isMetered = false, stripeSecretKey }) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!customerId) throw new BadRequestError("customerId is required");
  if (!priceId) throw new BadRequestError("priceId is required");
  if (!returnUrl) throw new BadRequestError("returnUrl is required");
  // For metered/usage-based pricing (PER_UNIT), quantity must not be specified
  const lineItem = { price: priceId };
  if (!isMetered) {
    lineItem.quantity = quantity ? parseInt(quantity, 10) : 1;
  }
  return stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer: customerId,
    mode: "subscription",
    line_items: [lineItem],
    return_url: returnUrl,
    metadata: metadata || {},
    payment_method_collection: 'if_required',
    payment_method_options: {
      card: {
        setup_future_usage: 'off_session',
      },
    },
  });
}

async function retrieveCheckoutSession(checkoutSessionId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!checkoutSessionId) throw new BadRequestError("checkoutSessionId is required");
  return stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["subscription", "customer"],
  });
}

async function cancelSubscription(stripeSubscriptionId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!stripeSubscriptionId) throw new BadRequestError("stripeSubscriptionId is required");
  return stripe.subscriptions.cancel(stripeSubscriptionId);
}

async function listInvoicesByCustomer(stripeCustomerId, { limit = 20 } = {}, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!stripeCustomerId) throw new BadRequestError("stripeCustomerId is required");
  return stripe.invoices.list({ customer: stripeCustomerId, limit });
}

async function getInvoice(invoiceId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!invoiceId) throw new BadRequestError("invoiceId is required");
  return stripe.invoices.retrieve(invoiceId);
}

async function createCustomerPortalSession({ customerId, returnUrl, stripeSecretKey }) {
  const stripe = getStripeInstance(stripeSecretKey);
  if (!customerId) throw new BadRequestError("customerId is required");
  if (!returnUrl) throw new BadRequestError("returnUrl is required");
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

/**
 * Verifies Stripe webhook signature and constructs the event.
 * req.body must be the raw buffer (use express.raw middleware).
 */
async function verifyAndConstructWebhookEvent(req, stripeSecretKey, webhookSecret) {
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    throw new BadRequestError("Missing stripe-signature header");
  }
  try {
    const stripe = getStripeInstance(stripeSecretKey);
    return stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    throw new BadRequestError(`Webhook signature verification failed: ${err.message}`);
  }
}

/**
 * Applies webhook event to local state (updates DP subscription rows).
 * Handles key events like invoice.paid, invoice.payment_failed, customer.subscription.deleted, etc.
 */
async function applyWebhookToLocalState(event, { adminDao }) {
  const eventType = event.type;
  const logger = require("../config/logger");


  // Extract subscription ID from the event object
  let stripeSubscriptionId = null;

  if (event.data?.object?.subscription) {
    // For invoice events
    stripeSubscriptionId =
      typeof event.data.object.subscription === "string"
        ? event.data.object.subscription
        : event.data.object.subscription?.id;
  } else if (event.data?.object?.id && eventType.startsWith("customer.subscription.")) {
    // For subscription events
    stripeSubscriptionId = event.data.object.id;
  }

    return;
  }

  // Map event types to payment status updates
  const PAYMENT_STATUS = {
    ACTIVE: "ACTIVE",
    PAST_DUE: "PAST_DUE",
    CANCELED: "CANCELED",
    PAYMENT_FAILED: "PAYMENT_FAILED",
  };

  let newStatus = null;

  switch (eventType) {
    case "invoice.paid":
    case "invoice.payment_succeeded":
      newStatus = PAYMENT_STATUS.ACTIVE;
      break;

    case "invoice.payment_failed":
      newStatus = PAYMENT_STATUS.PAYMENT_FAILED;
      break;

    case "customer.subscription.deleted":
      newStatus = PAYMENT_STATUS.CANCELED;
      break;

    case "customer.subscription.updated":
      // Check if subscription is past_due or unpaid
      const subStatus = event.data?.object?.status;
      if (subStatus === "past_due" || subStatus === "unpaid") {
        newStatus = PAYMENT_STATUS.PAST_DUE;
      } else if (subStatus === "active") {
        newStatus = PAYMENT_STATUS.ACTIVE;
      } else if (subStatus === "canceled") {
        newStatus = PAYMENT_STATUS.CANCELED;
      }
      break;

    default:
      return;
  }

  if (!newStatus) {
    return;
  }

  // Update all DP subscriptions matching this Stripe subscription ID
  try {
    await adminDao.updateSubscriptionByBillingId(stripeSubscriptionId, {
      PAYMENT_STATUS: newStatus,
    });
  } catch (err) {
    throw err;
  }


module.exports = {
  findOrCreateCustomerByEmail,
  createCheckoutSession,
  retrieveCheckoutSession,
  cancelSubscription,
  listInvoicesByCustomer,
  listInvoices,
  getInvoice,
  createCustomerPortalSession,
  createPortalSession,
  verifyAndConstructWebhookEvent,
  applyWebhookToLocalState,
  listPaymentMethods,
  getCustomer,
  detachPaymentMethod,
  getSubscription
};

/**
 * List invoices for a customer
 */
async function listInvoices(customerId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit: 100
  });
  return invoices.data;
}

/**
 * List payment methods for a customer
 */
async function listPaymentMethods(customerId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card'
  });
  return paymentMethods.data;
}

/**
 * Get customer details
 */
async function getCustomer(customerId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  return stripe.customers.retrieve(customerId);
}

/**
 * Detach a payment method
 */
async function detachPaymentMethod(paymentMethodId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  return stripe.paymentMethods.detach(paymentMethodId);
}

/**
 * Get subscription details
 */
async function getSubscription(subscriptionId, stripeSecretKey) {
  const stripe = getStripeInstance(stripeSecretKey);
  return stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Create portal session (alias for createCustomerPortalSession)
 */
async function createPortalSession(customerId, returnUrl, stripeSecretKey) {
  return createCustomerPortalSession({ customerId, returnUrl, stripeSecretKey });
}
