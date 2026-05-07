/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Labels
 */

const apiMetadataService = require('../../services/apiMetadataService');

module.exports = {
    createLabels: apiMetadataService.createLabels,
    updateLabel: apiMetadataService.updateLabel,
    retrieveLabels: apiMetadataService.retrieveLabels,
    deleteLabels: apiMetadataService.deleteLabels,
};
