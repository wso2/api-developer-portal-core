/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: App Key Mapping
 *
 * Drift fix-up:
 *   spec  retrieveAppKeyMappings  →  service  retriveAppKeyMappings  (typo in service)
 */

const adminService = require('../../services/adminService');

module.exports = {
    createAppKeyMapping: adminService.createAppKeyMapping,
    retrieveAppKeyMappings: adminService.retriveAppKeyMappings,
};
