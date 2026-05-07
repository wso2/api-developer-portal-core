/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Providers
 */

const adminService = require('../../services/adminService');

module.exports = {
    createProvider: adminService.createProvider,
    updateProvider: adminService.updateProvider,
    getProviders: adminService.getProviders,
    deleteProvider: adminService.deleteProvider,
};
