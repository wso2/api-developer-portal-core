/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const express = require('express');
const router = express.Router();
const devportalService = require('../services/devportalService');
const apiMetadataService = require('../services/apiMetadataService');
const adminService = require('../services/adminService');
const devportalController = require('../controllers/devportalController');
const multer = require('multer');
const storage = multer.memoryStorage()
const apiDefinition = multer({ storage: storage })
const { ensureAuthenticated, validateAuthentication } = require('../middlewares/ensureAuthenticated');
const constants = require('../utils/constants');

router.post('/organizations', validateAuthentication(constants.SCOPES.ADMIN), adminService.createOrganization);
router.get('/organizations', validateAuthentication(constants.SCOPES.ADMIN), adminService.getOrganizations);
router.put('/organizations/:orgId', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateOrganization);
router.get('/organizations/:orgId', validateAuthentication(constants.SCOPES.ADMIN), devportalService.getOrganization);
router.delete('/organizations/:orgId', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteOrganization);

router.post('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.createIdentityProvider);
router.put('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateIdentityProvider);
router.get('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.getIdentityProvider);
router.delete('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteIdentityProvider);

const upload = multer({ dest: '../.tmp/' });
router.post('/organizations/:orgId/layout', validateAuthentication(constants.SCOPES.ADMIN), upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', validateAuthentication(constants.SCOPES.ADMIN), upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/layout', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteOrgContent);

router.post('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.createProvider);
router.put('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateProvider);
router.get('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.getProviders);
router.delete('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteProvider);

router.post('/organizations/:orgId/apis', validateAuthentication(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata);

const apiZip = multer({ dest: '/tmp' });
router.delete('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.deleteAPIFile);


router.post('/subscriptions', ensureAuthenticated, devportalController.subscribeAPI);
router.delete('/subscriptions/:subscriptionId', ensureAuthenticated, devportalController.unsubscribeAPI);

router.post('/applications', ensureAuthenticated, devportalController.saveApplication);
router.put('/applications/:applicationId', ensureAuthenticated, devportalController.updateApplication);
router.delete('/applications/:applicationId', ensureAuthenticated, devportalController.deleteApplication);
router.post('/applications/:applicationId/reset-throttle-policy', ensureAuthenticated, devportalController.resetThrottlingPolicy);
router.post('/applications/:applicationId/api-keys/:env/generate', ensureAuthenticated, devportalController.generateAPIKeys);
router.post('/applications/:applicationId/generate-keys', ensureAuthenticated, devportalController.generateApplicationKeys);
router.post('/applications/:applicationId/oauth-keys/:keyMappingId/generate-token', ensureAuthenticated, devportalController.generateOAuthKeys);
router.delete('/applications/:applicationId/oauth-keys/:keyMappingId', ensureAuthenticated, devportalController.revokeOAuthKeys);
router.put('/applications/:applicationId/oauth-keys/:keyMappingId', ensureAuthenticated, devportalController.updateOAuthKeys);
router.post('/applications/:applicationId/oauth-keys/:keyMappingId/clean-up', ensureAuthenticated, devportalController.cleanUp);

router.post('/login', devportalController.login);
module.exports = router;
