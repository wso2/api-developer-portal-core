/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Application Keys
 *
 * Drift fix-up:
 *   spec  cleanUpOAuthKeys           →  service  cleanUp
 *   spec  generateApplicationAPIKeys →  service  generateAPIKeys
 *     (the application-scoped variant; the unscoped /api-keys/generate is
 *      the same service function under the spec's `generateAPIKeys` opId)
 */

const devportalController = require('../../controllers/devportalController');

module.exports = {
    generateApplicationAPIKeys: devportalController.generateAPIKeys,
    generateApplicationKeys: devportalController.generateApplicationKeys,
    generateOAuthKeys: devportalController.generateOAuthKeys,
    revokeOAuthKeys: devportalController.revokeOAuthKeys,
    updateOAuthKeys: devportalController.updateOAuthKeys,
    cleanUpOAuthKeys: devportalController.cleanUp,
    generateAPIKeys: devportalController.generateAPIKeys,
    revokeAPIKeys: devportalController.revokeAPIKeys,
    regenerateAPIKeys: devportalController.regenerateAPIKeys,
};
