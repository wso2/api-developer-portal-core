/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Subscriptions
 *
 * `unsubscribeAPI` is the DELETE /organizations/{orgId}/subscriptions
 * (no path subscriptionId — bulk/unscoped delete). The single-id DELETE
 * is `deleteSubscription`.
 */

const adminService = require('../../services/adminService');

module.exports = {
    createSubscription: adminService.createSubscription,
    updateSubscription: adminService.updateSubscription,
    getSubscription: adminService.getSubscription,
    getAllSubscriptions: adminService.getAllSubscriptions,
    deleteSubscription: adminService.deleteSubscription,
    unsubscribeAPI: adminService.unsubscribeAPI,
};
