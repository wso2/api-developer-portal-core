/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Organization Content
 *
 * Note: spec defines getOrgLayoutContent + getOrgLayoutContentByFileType as
 * two separate operations, but the legacy service `devportalService.getOrgContent`
 * branches on `req.params.fileType` / `req.query.fileType` itself, so both
 * operationIds map to the same shim.
 */

const adminService = require('../../services/adminService');
const devportalService = require('../../services/devportalService');

module.exports = {
    createOrgContent: adminService.createOrgContent,
    updateOrgContent: adminService.updateOrgContent,
    getOrgLayoutContent: devportalService.getOrgContent,
    getOrgLayoutContentByFileType: devportalService.getOrgContent,
    deleteOrgContent: adminService.deleteOrgContent,
};
