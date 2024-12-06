/* eslint-disable no-undef */
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
const config = require(process.cwd() + '/config.json');

const authenticatedPages = [
    constants.ROUTE.DEVPORTAL_CONFIGURE,
    constants.ROUTE.DEVPORTAL_ROOT,
    constants.ROUTE.DEVPORTAL_API_LISTING
]

const ensurePermission = (currentPage, role) => {

    console.log('EnsurePermission');
    console.log('Current Page: ' + currentPage);
    if (constants.ROUTE.DEVPORTAL_TECHNICAL_PAGES.some(pattern => minimatch.minimatch(currentPage, pattern))) {
        return constants.ROLES.SUBSCRIBER_ROLE === role 
        || constants.ROLES.ADMIN_ROLE === role;
    }
    if (minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_CONFIGURE) ||
        minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_ROOT)) {
        console.log('Admin role');
        console.log('Role is: ' + role);
        // const regex = /^Internal\/everyone.*/;
        // if (regex.test(role)) {
        //     console.log('Role is everyone');
        //     return role.split(',').includes(constants.ROLES.ADMIN_ROLE);
        // }
        return role.includes(constants.ROLES.ADMIN_ROLE);
    }
    return false;
}

const ensureAuthenticated = async (req, res, next) => {

    console.log('EnsureAuthenticated');
    console.log('Original URL: ' + req.originalUrl);
    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') &&
        authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
        let role;
        if (req.isAuthenticated()) {
            if (req.user[config.role_claim_name]) {
                role = req.user[config.role_claim_name];
            } else {
                role = 'subscriber';
            }
        }
        console.log('Logged in Role is: ' + role);
        if (req.isAuthenticated()) {
            if (ensurePermission(req.originalUrl, role)) {
                console.log('User is authenticated');
                return next();
            } else {
                console.log('User is not authorized');
                res.redirect(`/${req.params.orgName}`);
            }
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
