/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Applications
 *
 * `importApplications` is feature-gated in the legacy router
 * (config.features.importApplication.enabled). The new router exposes the
 * route unconditionally; the controller itself can fail-fast if the feature
 * is disabled. Flag for follow-up if you want to preserve the gate.
 */

const adminService = require('../../services/adminService');
const devportalController = require('../../controllers/devportalController');

module.exports = {
    createDevPortalApplication: adminService.createDevPortalApplication,
    updateDevPortalApplication: adminService.updateDevPortalApplication,
    getDevPortalApplicationDetails: adminService.getDevPortalApplicationDetails,
    getDevPortalApplications: adminService.getDevPortalApplications,
    deleteDevPortalApplication: adminService.deleteDevPortalApplication,
    importApplications: devportalController.importApplications,
};
