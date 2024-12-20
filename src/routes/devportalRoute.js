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
const { ensureAuthenticated, validateToken } = require('../middlewares/ensureAuthenticated');


router.post('/organizations', validateToken("admin"), adminService.createOrganization);
router.get('/organizations', validateToken("admin"), adminService.getOrganizations);
router.put('/organizations/:orgId', validateToken("admin"), adminService.updateOrganization);
router.get('/organizations/:orgId', validateToken("admin"), devportalService.getOrganization);
router.delete('/organizations/:orgId', validateToken("admin"), adminService.deleteOrganization);

router.post('/organizations/:orgId/identityProvider', validateToken("admin"), adminService.createIdentityProvider);
router.put('/organizations/:orgId/identityProvider', validateToken("admin"), adminService.updateIdentityProvider);
router.get('/organizations/:orgId/identityProvider', validateToken("admin"), adminService.getIdentityProvider);
router.delete('/organizations/:orgId/identityProvider', validateToken("admin"), adminService.deleteIdentityProvider);

const upload = multer({ dest: '../.tmp/' });
router.post('/organizations/:orgId/layout', validateToken("admin"), upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', validateToken("admin"), upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/layout', validateToken("admin"), adminService.deleteOrgContent);

router.post('/organizations/:orgId/provider', validateToken("admin"), adminService.createProvider);
router.put('/organizations/:orgId/provider', validateToken("admin"), adminService.updateProvider);
router.get('/organizations/:orgId/provider', validateToken("admin"), adminService.getProviders);
router.delete('/organizations/:orgId/provider', validateToken("admin"), adminService.deleteProvider);

router.post('/organizations/:orgId/apis', validateToken("dev"), apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', validateToken("dev"), apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', validateToken("dev"), apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', validateToken("dev"), apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata);

const apiZip = multer({ dest: '/tmp' });
router.delete('/organizations/:orgId/apis/:apiId', validateToken("dev"), apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', validateToken("dev"), apiZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', validateToken("dev"), apiZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', validateToken("dev"), apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', validateToken("dev"), apiMetadataService.deleteAPIFile);


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

module.exports = router;
