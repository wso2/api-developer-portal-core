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
const orgController = require('../controllers/orgContentController');
const apiController = require('../controllers/apiContentController');
const contentController = require('../controllers/customContentController');
const applicationController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');
const authController = require('../controllers/authController');
const myAPIsController = require('../controllers/myAPIsController');
const settingsController = require('../controllers//settingsController');


router.get('/', registerPartials, orgController.loadOrganizationContent);

router.get('/apis', registerPartials, apiController.loadAPIs);

router.get('/api/:apiName', registerPartials, apiController.loadAPIContent);

router.get('/api/:apiName/tryout', registerPartials, apiController.loadTryOutPage);

router.get('/applications', registerPartials, applicationController.loadApplications);
router.get('/applications/create', registerPartials, applicationController.loadThrottlingPolicies);
router.get('/applications/:applicationid', registerPartials, applicationController.loadApplication);
router.get('/applications/:applicationid/edit', registerPartials, applicationController.loadApplicationForEdit);
router.get('/myAPIs', registerPartials, myAPIsController.loadDefaultContent);

router.get('/configure', registerPartials, settingsController.loadSettingPage);
router.get('/portal', registerPartials, settingsController.loadCreateOrganizationPage);

router.get('/login', registerPartials, authController.login);
router.get('/callback', registerPartials, authController.handleCallback);
router.get('/logout', registerPartials, authController.handleLogOut);
router.get('/signup', registerPartials, authController.handleSignUp);

// eslint-disable-next-line no-useless-escape
router.get('(^(?!\/(favicon\.ico|images\/|styles\/|*login*|devportal\/)))/*', registerPartials,  contentController.loadCustomContent);

module.exports = router;
