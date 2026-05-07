/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Platform Subscriptions
 */

const platformSubscriptionService = require('../../services/platformSubscriptionService');

module.exports = {
    createPlatformGatewaySubscription: platformSubscriptionService.createPlatformGatewaySubscription,
    listPlatformGatewaySubscriptions: platformSubscriptionService.listPlatformGatewaySubscriptions,
    getPlatformGatewaySubscription: platformSubscriptionService.getPlatformGatewaySubscription,
    updatePlatformGatewaySubscription: platformSubscriptionService.updatePlatformGatewaySubscription,
    deletePlatformGatewaySubscription: platformSubscriptionService.deletePlatformGatewaySubscription,
};
