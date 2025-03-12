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
const apiController = require('../controllers/apiContentController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');


router.get('/((?!favicon.ico)):orgName/views/:viewName/apis', registerPartials, ensureAuthenticated, apiController.loadAPIs);

router.get('/((?!favicon.ico)):orgName/views/:viewName/api/:apiHandle', registerPartials, ensureAuthenticated, apiController.loadAPIContent);

router.get('/((?!favicon.ico)):orgName/views/:viewName/api/:apiHandle/docs/specification', registerPartials, ensureAuthenticated, apiController.loadDocument);

// router.get('/((?!favicon.ico)):orgName/views/:viewName/api/:apiHandle/docs', ensureAuthenticated, registerPartials, apiController.loadDocsPage);

router.get('/((?!favicon.ico)):orgName/views/:viewName/api/:apiHandle/docs/:docType/:docName', registerPartials, ensureAuthenticated, apiController.loadDocument);

module.exports = router;