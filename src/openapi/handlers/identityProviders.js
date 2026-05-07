/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 */

/*
 * OpenAPI operation handlers for the Identity Providers tag.
 */

const adminService = require('../../services/adminService');

module.exports = {
    createIdentityProvider: adminService.createIdentityProvider,
    updateIdentityProvider: adminService.updateIdentityProvider,
    getIdentityProvider: adminService.getIdentityProvider,
    deleteIdentityProvider: adminService.deleteIdentityProvider,
};
