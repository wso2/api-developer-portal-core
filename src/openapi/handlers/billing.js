/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Billing
 *
 * Mirrors the legacy devportalRoute.js middleware composition:
 *   - read-only billing endpoints           : ensureBillingAuth
 *   - mutating billing endpoints            : verifyRequestOrigin + ensureBillingAuth
 *   - billing-engine-keys (admin config)    : verifyRequestOrigin (write) + (no ensureBillingAuth — uses OAuth scope only)
 *
 * The OAuth scope check itself runs in the OpenAPI validator's security
 * pipeline; we only add the application-layer middleware here.
 */

const billingController = require('../../controllers/billingController');
const { ensureBillingAuth, verifyRequestOrigin } = require('../../middlewares/billingAuth');
const { compose } = require('./_compose');

module.exports = {
    // Read-only
    getUsageData: compose(ensureBillingAuth, billingController.getUsageData),
    getPaymentMethods: compose(ensureBillingAuth, billingController.getPaymentMethods),
    getBillingInfo: compose(ensureBillingAuth, billingController.getBillingInfo),
    getActiveSubscriptions: compose(ensureBillingAuth, billingController.getActiveSubscriptions),
    getSubscriptionBillingStatus: compose(ensureBillingAuth, billingController.getSubscriptionBillingStatus),

    // Billing engine keys (admin config; OAuth scope handles auth, origin verification on writes)
    addBillingEngineKeys: compose(verifyRequestOrigin, billingController.addBillingEngineKeys),
    updateBillingEngineKeys: compose(verifyRequestOrigin, billingController.updateBillingEngineKeys),
    deleteBillingEngineKeys: compose(verifyRequestOrigin, billingController.deleteBillingEngineKeys),
    getBillingEngineKeys: billingController.getBillingEngineKeys,

    // Mutating Stripe / billing portal flows
    createCheckoutSessionForSubscription: compose(verifyRequestOrigin, ensureBillingAuth, billingController.createCheckoutSessionForSubscription),
    registerStripeCheckoutSession: compose(verifyRequestOrigin, ensureBillingAuth, billingController.registerStripeCheckoutSession),
    cancelSubscription: compose(verifyRequestOrigin, ensureBillingAuth, billingController.cancelSubscription),
    createBillingPortalByOrg: compose(verifyRequestOrigin, ensureBillingAuth, billingController.createBillingPortalByOrg),
    createBillingPortal: compose(verifyRequestOrigin, ensureBillingAuth, billingController.createBillingPortal),
};
