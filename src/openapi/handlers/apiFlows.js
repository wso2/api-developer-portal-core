/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: API Flows
 *
 * Mutating ops are CSRF-protected (matches legacy devportalRoute.js).
 */

const apiFlowService = require('../../services/apiFlowService');
const { requireCsrfForMutatingApi } = require('../../middlewares/csrfProtection');
const { compose } = require('./_compose');

module.exports = {
    createAPIFlow: compose(requireCsrfForMutatingApi, apiFlowService.createAPIFlow),
    getAllAPIFlows: apiFlowService.getAllAPIFlows,
    getAPIFlow: apiFlowService.getAPIFlow,
    updateAPIFlow: compose(requireCsrfForMutatingApi, apiFlowService.updateAPIFlow),
    deleteAPIFlow: compose(requireCsrfForMutatingApi, apiFlowService.deleteAPIFlow),
    generatePrompt: compose(requireCsrfForMutatingApi, apiFlowService.generatePrompt),
};
