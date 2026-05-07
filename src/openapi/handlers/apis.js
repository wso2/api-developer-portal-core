/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: APIs
 *
 * Drift fix-up:
 *   spec  getAllAPIMetadataForOrganization  →  service  getAllAPIMetadata
 *
 * The legacy s2s `/apis` (no orgId) routes are NOT part of this spec; clients
 * that depend on them must use the legacy router (advanced.useOpenApiValidator=false).
 *
 * Spec also no longer exposes the legacy `/template` API content routes —
 * only `/content`. /template clients must use the legacy path.
 */

const apiMetadataService = require('../../services/apiMetadataService');

module.exports = {
    createAPIMetadata: apiMetadataService.createAPIMetadata,
    getAPIMetadata: apiMetadataService.getAPIMetadata,
    getAllAPIMetadataForOrganization: apiMetadataService.getAllAPIMetadata,
    updateAPIMetadata: apiMetadataService.updateAPIMetadata,
    deleteAPIMetadata: apiMetadataService.deleteAPIMetadata,
};
