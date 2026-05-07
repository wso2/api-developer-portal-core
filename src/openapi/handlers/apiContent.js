/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: API Content
 *
 * Drift fix-up:
 *   spec  getAPIContentFile     →  service  getAPIFile
 *   spec  deleteAPIContentFile  →  service  deleteAPIFile
 */

const apiMetadataService = require('../../services/apiMetadataService');

module.exports = {
    createAPIContent: apiMetadataService.createAPIContent,
    updateAPIContent: apiMetadataService.updateAPIContent,
    getAPIContentFile: apiMetadataService.getAPIFile,
    deleteAPIContentFile: apiMetadataService.deleteAPIFile,
};
