/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Platform API Keys
 *
 * Mutating ops are CSRF-protected (matches legacy devportalRoute.js).
 */

const platformApiKeyService = require('../../services/platformApiKeyService');
const { requireCsrfForMutatingApi } = require('../../middlewares/csrfProtection');
const { compose } = require('./_compose');

module.exports = {
    generatePlatformApiKey: compose(requireCsrfForMutatingApi, platformApiKeyService.generatePlatformApiKey),
    listPlatformApiKeys: platformApiKeyService.listPlatformApiKeys,
    regeneratePlatformApiKey: compose(requireCsrfForMutatingApi, platformApiKeyService.regeneratePlatformApiKey),
    revokePlatformApiKey: compose(requireCsrfForMutatingApi, platformApiKeyService.revokePlatformApiKey),
};
