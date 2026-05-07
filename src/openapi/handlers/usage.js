/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Usage
 */

const usageController = require('../../controllers/usageController');
const { ensureBillingAuth } = require('../../middlewares/billingAuth');
const { compose } = require('./_compose');

module.exports = {
    getSubscriptionUsage: compose(ensureBillingAuth, usageController.getSubscriptionUsage),
};
