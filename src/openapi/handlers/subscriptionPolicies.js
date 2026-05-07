/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Subscription Policies
 */

const apiMetadataService = require('../../services/apiMetadataService');

module.exports = {
    addSubscriptionPolicies: apiMetadataService.addSubscriptionPolicies,
    putSubscriptionPolicies: apiMetadataService.putSubscriptionPolicies,
    getSubscriptionPolicy: apiMetadataService.getSubscriptionPolicy,
    deleteSubscriptionPolicy: apiMetadataService.deleteSubscriptionPolicy,
};
