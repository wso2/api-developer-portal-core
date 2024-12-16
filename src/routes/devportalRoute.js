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
const { validateToken } = require('../middlewares/ensureAuthenticated');


router.post('/organizations', validateToken, adminService.createOrganization);
router.get('/organizations', adminService.getOrganizations);
router.put('/organizations/:orgId', adminService.updateOrganization);
router.get('/organizations/:orgId', devportalService.getOrganization);
router.delete('/organizations/:orgId', adminService.deleteOrganization);

router.post('/organizations/:orgId/identityProvider', adminService.createIdentityProvider);
router.put('/organizations/:orgId/identityProvider', adminService.updateIdentityProvider);
router.get('/organizations/:orgId/identityProvider', adminService.getIdentityProvider);
router.delete('/organizations/:orgId/identityProvider', adminService.deleteIdentityProvider);

const upload = multer({ dest: '../.tmp/' }); 
router.post('/organizations/:orgId/layout', upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/layout', adminService.deleteOrgContent);

router.post('/organizations/:orgId/apis', apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata);

const apiZip = multer({ dest: '/tmp' });
router.delete('/organizations/:orgId/apis/:apiId', apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', apiZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', apiZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', apiMetadataService.deleteAPIFile);


router.post('/subscriptions' , devportalController.subscribeAPI);
router.delete('/subscriptions/:subscriptionId', devportalController.unsubscribeAPI);

router.post('/applications', devportalController.saveApplication);
router.put('/applications/:applicationid', devportalController.updateApplication);
router.delete('/applications/:applicationid', devportalController.deleteApplication);
router.post('/applications/:applicationid/reset-throttle-policy', devportalController.resetThrottlingPolicy);
router.post('/applications/:applicationid/api-keys/:env/generate', devportalController.generateAPIKeys);
router.post('/applications/:applicationid/generate-keys', devportalController.generateApplicationKeys);
router.post('/applications/:applicationid/oauth-keys/:keyMappingId/generate-token', devportalController.generateOAuthKeys);

module.exports = router;
