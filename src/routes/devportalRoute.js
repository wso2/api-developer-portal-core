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
const { ensureAuthenticated, validateAuthentication, enforceSecuirty } = require('../middlewares/ensureAuthenticated');
const constants = require('../utils/constants');

router.post('/organizations', validateAuthentication(constants.SCOPES.ADMIN), adminService.createOrganization);
router.get('/organizations', validateAuthentication(constants.SCOPES.ADMIN), adminService.getOrganizations);
router.put('/organizations/:orgId', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateOrganization);
router.get('/organizations/:orgId', enforceSecuirty(constants.SCOPES.ADMIN), devportalService.getOrganization); // S2S Applied 
router.delete('/organizations/:orgId', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteOrganization);

router.post('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.createIdentityProvider);
router.put('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateIdentityProvider);
router.get('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.getIdentityProvider);
router.delete('/organizations/:orgId/identityProvider', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteIdentityProvider);

const upload = multer({ dest: '../.tmp/' });
router.post('/organizations/:orgId/views/:name/layout', validateAuthentication(constants.SCOPES.ADMIN), upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/views/:name/layout', validateAuthentication(constants.SCOPES.ADMIN), upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/views/:name/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/views/:name/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/views/:name/layout', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteOrgContent);

router.post('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.createProvider);
router.put('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.updateProvider);
router.get('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.getProviders);
router.delete('/organizations/:orgId/provider', validateAuthentication(constants.SCOPES.ADMIN), adminService.deleteProvider);

router.post('/organizations/:orgId/apis', validateAuthentication(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata);
router.delete('/organizations/:orgId/apis/:apiId', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.deleteAPIMetadata);

router.post('/organizations/:orgId/subscriptionPolicy', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.createSubscriptionPolicy);
router.get('/organizations/:orgId/subscriptionPolicy/:policyID', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.getSubscriptionPolicy);
router.put('/organizations/:orgId/subscriptionPolicy/:policyID', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.updateSubscriptionPolicy);
router.delete('/organizations/:orgId/subscriptionPolicy/:policyID', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.deleteSubscriptionPolicy);

const apiZip = multer({ dest: '/tmp' });
router.post('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', validateAuthentication(constants.SCOPES.DEVELOPER), apiMetadataService.deleteAPIFile);

// S2S Applied APIS
router.post('/apis', enforceSecuirty(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata); // s2s applied
router.get('/apis', enforceSecuirty(constants.SCOPES.DEVELOPER), apiMetadataService.getAllAPIMetadata); // s2s applied
router.put('/apis/:apiId', enforceSecuirty(constants.SCOPES.DEVELOPER), apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata); // s2s applied
router.delete('/apis/:apiId', enforceSecuirty(constants.SCOPES.DEVELOPER), apiMetadataService.deleteAPIMetadata); // s2s applied

router.post('/organizations/:orgId/labels', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.createLabels);
router.put('/organizations/:orgId/labels', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.updateLabel);
router.get('/organizations/:orgId/labels', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.retrieveLabels);
router.delete('/organizations/:orgId/labels', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.deleteLabels);

router.post('/organizations/:orgId/applications', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.createDevPortalApplication);
router.put('/organizations/:orgId/applications/:appId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.updateDevPortalApplication);
router.get('/organizations/:orgId/applications/:appId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.getDevPortalApplicationDetails);
router.get('/organizations/:orgId/applications', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.getDevPortalApplications);
router.delete('/organizations/:orgId/applications/:appId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.deleteDevPortalApplication);

//store API subscription
router.post('/organizations/:orgId/subscriptions', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.createSubscription);
router.get('/organizations/:orgId/subscriptions/:subscriptionId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.getSubscription);
router.get('/organizations/:orgId/subscriptions', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.getAllSubscriptions);
router.delete('/organizations/:orgId/subscriptions/:subscriptionId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.deleteSubscription);

//store key mapping for devportal app and Control plane apps
// router.post('/organizations/:orgId/app-key-mapping', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.createDevPortalApplication);
// router.get('/organizations/:orgId/app-key-mapping/:appId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.updateDevPortalApplication);
// router.delete('/organizations/:orgId/app-key-mapping/:appId', enforceSecuirty(constants.SCOPES.DEVELOPER), adminService.updateDevPortalApplication);

router.post('/organizations/:orgId/views', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.addView);
router.put('/organizations/:orgId/views/:name', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.updateView);
router.get('/organizations/:orgId/views/:name', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.getView);
router.get('/organizations/:orgId/views', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.getAllViews);
router.delete('/organizations/:orgId/views/:name', validateAuthentication(constants.SCOPES.ADMIN), apiMetadataService.deleteView);

router.post('/subscriptions', ensureAuthenticated, devportalController.subscribeAPI);
router.delete('/subscriptions', ensureAuthenticated, devportalController.unsubscribeAPI);

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
