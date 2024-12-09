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
const adminDao = require('../dao/admin');

const ensurePermission = (currentPage, role, subscriberRole, adminRole, superAdminRole) => {

    console.log('EnsurePermission');
    console.log('Current Page: ' + currentPage);
    console.log('Roles:', role)
    console.log(subscriberRole)
    console.log(adminRole)
    console.log(superAdminRole)

    if (constants.ROUTE.DEVPORTAL_TECHNICAL_PAGES.some(pattern => minimatch.minimatch(currentPage, pattern))) {
        return role.includes(subscriberRole) || role.includes(adminRole) || role.includes(superAdminRole);
    }
    if (minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_CONFIGURE)) {
        return role.includes(superAdminRole) || role.includes(adminRole);
    }
    if (minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_ROOT)) {
        return role.includes(superAdminRole);
    }
    return false;
}

const ensureAuthenticated = async (req, res, next) => {

    console.log('EnsureAuthenticated');
    console.log('Original URL: ' + req.originalUrl);
    let adminRole = config.adminRole;
    let superAdminRole = config.superAdminRole;
    let subscriberRole = config.subscriberRole;
    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') &&
        config.authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
        //fetch role details from DB
        const orgName = req.params.orgName;
        let orgDetails;
        if (orgName !== undefined) {
            orgDetails = await adminDao.getOrganization(orgName);
            adminRole = orgDetails.ADMIN_ROLE;
            superAdminRole = orgDetails.SUPER_ADMIN_ROLE;
            subscriberRole = orgDetails.SUBSCRIBER_ROLE;
        }
        let role;
        console.log('Logged in Role is: ' + role);
        if (req.isAuthenticated()) {
            if (config.authorizedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
                role = req.user[config.roleClaim];
                //verify organization ID
                if (!minimatch.minimatch(req.originalUrl, constants.ROUTE.DEVPORTAL_ROOT)) {
                    if(req.user[config.orgIDClaim] !== orgDetails.ORGANIZATION_IDENTIFIER) {
                        console.log('User is not authorized to access organization');
                        res.redirect(`/${req.params.orgName}`);
                    }
                }
                if (ensurePermission(req.originalUrl, role, subscriberRole, adminRole, superAdminRole)) {
                    console.log('User is authenticated');
                    //add organization ID to request
                    req.user[constants.ORG_ID] = orgDetails.ORG_ID;
                    return next();
                } else {
                    console.log('User is not authorized');
                    if(req.params.orgName === undefined) {
                        res.redirect(`/login`);
                    } else {
                        res.redirect(`/${req.params.orgName}/login`);
                    }
                }

            }
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
