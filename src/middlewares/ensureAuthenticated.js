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
const { jwtVerify, createRemoteJWKSet, importX509 } = require('jose');
const util = require('../utils/util');
const { CustomError } = require('../utils/errors/customErrors');
const IdentityProviderDTO = require("../dto/identityProvider");

const ensurePermission = (currentPage, role, req) => {

    let adminRole, superAdminRole, subscriberRole;
    if (req.user) {
        adminRole = req.user[constants.ROLES.ADMIN];
        superAdminRole = req.user[constants.ROLES.SUPER_ADMIN];
        subscriberRole = req.user[constants.ROLES.SUBSCRIBER];
        if (minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_CONFIGURE)) {
            return role.includes(superAdminRole) || role.includes(adminRole);
        } else if (minimatch.minimatch(currentPage, constants.ROUTE.DEVPORTAL_ROOT)) {
            return role.includes(superAdminRole);
        } else if (config.authorizedPages.some(pattern => minimatch.minimatch(currentPage, pattern))) {
            return role.includes(subscriberRole) || role.includes(adminRole) || role.includes(superAdminRole);
        }
    }
    return false;
}

const ensureAuthenticated = async (req, res, next) => {

    let adminRole = config.adminRole;
    let superAdminRole = config.superAdminRole;
    let subscriberRole = config.subscriberRole;
    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') &&
        config.authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
        //fetch role details from DB
        const orgName = req.params.orgName;
        let orgDetails;
        if (!(orgName === undefined)) {
            orgDetails = await adminDao.getOrganization(orgName);
            adminRole = orgDetails.ADMIN_ROLE;
            superAdminRole = orgDetails.SUPER_ADMIN_ROLE;
            subscriberRole = orgDetails.SUBSCRIBER_ROLE;
        }
        let role;
        if (req.isAuthenticated()) {
            if (config.authorizedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
                role = req.user[constants.ROLES.ROLE_CLAIM];
                console.log('Logged in Role is: ' + role);
                //add organization ID to request
                if (req.user) {
                    //add details to session
                    req.user[constants.ROLES.ADMIN] = adminRole;
                    req.user[constants.ROLES.SUPER_ADMIN] = superAdminRole;
                    req.user[constants.ROLES.SUBSCRIBER] = subscriberRole;
                    if (orgDetails) {
                        req.user[constants.ORG_ID] = orgDetails.ORG_ID;
                        req.user[constants.ORG_IDENTIFIER] = orgDetails.ORGANIZATION_IDENTIFIER
                    }
                }
                //verify user belongs to organization
                if (!minimatch.minimatch(req.originalUrl, constants.ROUTE.DEVPORTAL_ROOT)) {
                    if (req.user && req.user[constants.ROLES.ORGANIZATION_CLAIM] !== req.user[constants.ORG_IDENTIFIER]) {
                        console.log('User is not authorized to access organization');
                        return res.send("User not authorized to access organization");
                    }
                }
                if (ensurePermission(req.originalUrl, role, req)) {
                    console.log('User is authorized');
                    return next();
                } else {
                    console.log('User is not authorized');
                    if (req.params.orgName === undefined) {
                        return res.send("User unauthorized");
                    } else {
                        console.log('Redirecting')
                        return res.send("User unauthorized");
                    }
                }
            }
            return next();
        } else {
            console.log('User is not authenticated');
            req.session.returnTo = req.originalUrl || `/${req.params.orgName}`;
            console.log("Return To: ", req.session.returnTo)
            if (req.params.orgName) {
                res.redirect(`/${req.params.orgName}/login`);
            } else {
                res.redirect(`/portal/login`);

            }
        }
    } else {
        return next();
    };
};

function validateAuthentication(scope) {
    return async function (req, res, next) {

        let IDP, valid, scopes, orgId, response;
        if (req.params.orgName) {
            orgId = await adminDao.getOrgId(orgName);
        } else {
            orgId = req.params.orgId;
        }
        if (orgId) {
            response = await adminDao.getIdentityProvider(orgId);
            if (response.length !== 0) {
                //login from super IDP
                IDP = new IdentityProviderDTO(response[0].dataValues);
            } else {
                IDP = config.identityProvider;
            }
        } else {
            IDP = config.identityProvider;
        }

        let accessToken, basicHeader;
        //if IDP present, fetch bearer token else use basic header
        if (IDP.clientId !== "") {
            if (req.isAuthenticated() && req.user) {
                accessToken = req.user[constants.ACCESS_TOKEN];
            } else {
                accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
            }
            //fetch certificate or JWKS URL
            if (IDP.certificate) {
                const pemKey = IDP.certificate;
                const publicKey = await importX509(pemKey, 'RS256');
                [valid, scopes] = await validateWithCert(accessToken, publicKey);
            } else {
                if (IDP.jwksURL) {
                    [valid, scopes] = await validateWithJWKS(accessToken, IDP.jwksURL);
                } else {
                    valid = false;
                }
            }
            if (valid) {
                if (scopes.split(" ").includes(scope)) {
                    return next();
                } else {
                    if (req.user) {
                        return res.redirect('login');
                    } else {
                        return util.handleError(res, new CustomError(403, constants.ERROR_CODE[403], constants.ERROR_MESSAGE.FORBIDDEN));
                    }
                }
            } else {
                if (req.user) {
                    return res.redirect('login');
                } else {
                    return util.handleError(res, new CustomError(401, constants.ERROR_CODE[401], constants.ERROR_MESSAGE.UNAUTHENTICATED));
                }
            }
        } else {
            if (req.isAuthenticated() && req.user) {
                basicHeader = req.user[constants.BASIC_HEADER];
            } else {
                basicHeader = req.headers.authorization && req.headers.authorization.split(' ')[1];
            }
            valid = await validateBasicAuth(basicHeader);
            if (valid) {
                return next();
            } else {
                if (req.user) {
                    return res.redirect('login');
                } else {
                    return util.handleError(res, new CustomError(401, constants.ERROR_CODE[401], constants.ERROR_MESSAGE.UNAUTHENTICATED));
                }
            }
        }
    }
}

const validateWithCert = async (token, publicKey) => {

    try {
        const { payload } = await jwtVerify(token, publicKey);
        return [true, payload.scope];
    } catch (err) {
        console.log(err);
        console.error("Invalid token:", err.message);
        return [false, ""];
    }
}

const validateWithJWKS = async (token, jwksURL) => {

    try {
        const jwks = await createRemoteJWKSet(new URL(jwksURL));
        const { payload } = await jwtVerify(token, jwks);
        return [true, payload.scope];
    } catch (err) {
        console.error("Invalid token:", err.message);
        return [false, ""];
    }
}

const validateBasicAuth = async (basicHeader) => {

    let valid = false;
    const base64Decoded = Buffer.from(basicHeader, 'base64').toString('utf-8');
    const [username, password] = base64Decoded.split(':');
    const users = config.defaultAuth.users;
    for (let user of users) {
        if (username === user.username && password === user.password) {
            valid = true;
            break;
        }
    }
    return valid;
}

module.exports = ensureAuthenticated;

module.exports = {
    ensureAuthenticated,
    validateAuthentication

}