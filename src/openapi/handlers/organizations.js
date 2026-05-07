/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 */

/*
 * OpenAPI operation handlers for the Organizations tag.
 * Each export is named after the spec `operationId`; the validator's
 * resolver dispatches by that name. Implementations delegate to the
 * existing services so business logic is not duplicated.
 */

const adminService = require('../../services/adminService');
const devportalService = require('../../services/devportalService');

module.exports = {
    createOrganization: adminService.createOrganization,
    getOrganizations: adminService.getOrganizations,
    updateOrganization: adminService.updateOrganization,
    getOrganization: devportalService.getOrganization,
    deleteOrganization: adminService.deleteOrganization,
};
