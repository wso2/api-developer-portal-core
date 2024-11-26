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
const minimatch = require('minimatch');
const constants = require('../utils/constants');

const authenticatedPages = [
   constants.ROUTE.DEVPORTAL_CONFIGURE,
]

const ensureAuthenticated = async (req, res, next) => {

    console.log(req.originalUrl);
    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') && 
        authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
            
        if (req.isAuthenticated()) {
            console.log('User is authenticated');
            return next();
        } else {
            console.log('User is not authenticated');
            req.session.returnTo = req.originalUrl || `/${req.params.orgName}`;
            console.log("Return TO")
            console.log(req.session.returnTo);
            res.redirect(`/${req.params.orgName}/login`);
        }
    } else {
        return next();
    };
};

module.exports = ensureAuthenticated;
