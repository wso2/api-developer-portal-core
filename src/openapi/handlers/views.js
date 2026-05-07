/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Views
 */

const apiMetadataService = require('../../services/apiMetadataService');

module.exports = {
    addView: apiMetadataService.addView,
    getView: apiMetadataService.getView,
    getAllViews: apiMetadataService.getAllViews,
    updateView: apiMetadataService.updateView,
    deleteView: apiMetadataService.deleteView,
};
