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
/* eslint-disable no-undef */
const configurePassport = require('../middlewares/passport');
const passport = require('passport');
const config = require(process.cwd() + '/config.json');
const fs = require('fs');
const path = require('path');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const IdentityProviderDTO = require("../dto/identityProvider");
const minimatch = require('minimatch');
const { renderGivenTemplate } = require('../utils/util');
const { profile } = require('console');

const filePrefix = config.pathToContent;

const fetchAuthJsonContent = async (req, orgName) => {

    //use super admin for org creation page login
    if (req.session.returnTo) {
        if (constants.ROUTE.DEVPORTAL_ROOT.some(pattern => minimatch.minimatch(req.session.returnTo, pattern))) {
            return config.identityProvider;
        }
    }
    if (config.mode === constants.DEV_MODE) {
        const authJsonPath = path.join(process.cwd(), filePrefix + '../mock', 'auth.json');
        return JSON.parse(fs.readFileSync(authJsonPath, constants.CHARSET_UTF8));
    }
    //if no idp per org, use super IDP
    try {
        const orgId = await adminDao.getOrgId(orgName);
        const response = await adminDao.getIdentityProvider(orgId);
        if (response.length === 0) {
            //login from super IDP
            return config.identityProvider;
        }
        return new IdentityProviderDTO(response[0].dataValues);
    } catch (error) {
        console.error("Failed to fetch identity provider details", error);
        return config.identityProvider;
    }
};

const login = async (req, res, next) => {

    let orgName, IDP;
    let claimNames = {
        [constants.ROLES.ROLE_CLAIM]: config.roleClaim,
        [constants.ROLES.GROUP_CLAIM]: config.groupsClaim,
        [constants.ROLES.ORGANIZATION_CLAIM]: config.orgIDClaim
    };
    if (req.params.orgName) {
        orgName = req.params.orgName;
        if (orgName !== 'portal') {
            const orgDetails = await adminDao.getOrganization(orgName);
            if (orgDetails) {
                claimNames[constants.ROLES.ROLE_CLAIM] = orgDetails.ROLE_CLAIM_NAME || config.roleClaim;
                claimNames[constants.ROLES.GROUP_CLAIM] = orgDetails.GROUPS_CLAIM_NAME || config.groupsClaim;
                claimNames[constants.ROLES.ORGANIZATION_CLAIM] = orgDetails.ORGANIZATION_CLAIM_NAME || config.orgIDClaim;
            }
        }
    }
    req.session.returnTo = req.session.returnTo ? req.session.returnTo : req.originalUrl ? req.originalUrl.replace('/login', '') : '';
    IDP = await fetchAuthJsonContent(req, orgName);
    if (IDP.clientId) {
        await configurePassport(IDP, claimNames);  // Configure passport dynamically
        passport.authenticate('oauth2')(req, res, next);
        console.log("Passport authentication done");
        //next();
    } else {
        orgName = req.params.orgName;
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'login', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        const layoutResponse = "";

        const templateContent = {
            baseUrl: '/' + orgName
        };

        const html = await renderGivenTemplate(layoutResponse, templateResponse, templateContent);
        res.send(html);
    }
};

const handleCallback = (req, res, next) => {

    passport.authenticate('oauth2', {
        failureRedirect: '/login',
        keepSessionInfo: true
    }, (err, user) => {
        if (err || !user) {
            console.log("User not present", !user)
            return next(err || new Error('Authentication failed'));
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (config.mode === constants.DEV_MODE) {
                const returnTo = req.user.returnTo || config.baseUrl;
                delete req.session.returnTo;
                res.redirect(returnTo);
            } else {
                let returnTo = req.user.returnTo;
                if (!config.advanced.disableOrgCallback && returnTo == null) {
                    returnTo = `/${req.params.orgName}`;
                }
                delete req.session.returnTo;
                console.log(`User logged in: ${user.username}, Session ID: ${req.sessionID}`);
                res.redirect(returnTo);
            }
        });
    })(req, res, next);
};

const handleSignUp = async (req, res) => {

    const authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    if (authJsonContent.signUpURL) {
        res.redirect(authJsonContent.signUpURL);
    } else {
        if (config.mode === constants.DEV_MODE) {
            const returnTo = req.session.returnTo || config.baseUrl;
            delete req.session.returnTo;
            res.redirect(returnTo);
        } else {
            const returnTo = req.session.returnTo || `/${req.params.orgName}`;
            res.redirect(returnTo);
        }
    }
};

const handleLogOut = async (req, res) => {
    const authJsonContent = await fetchAuthJsonContent(req, req.params.orgName);
    let idToken = ''
    if (req.user != null) {
        idToken = req.user.idToken;
    }
    const currentPathURI = req.originalUrl.replace('/logout', '');
    if (req.user && req.user.accessToken) {
        const referer = req.get('referer');
        const regex = /(.+\/views\/[^\/]+)\/?/;
        const match = referer.match(regex);
        const logoutURL = match ? match[1] : null;
        req.logout((err) => {
            if (err) {
                console.error("Logout error:", err);
            }
            req.session.currentPathURI = currentPathURI;
            res.redirect(`${authJsonContent.logoutURL}?post_logout_redirect_uri=${authJsonContent.logoutRedirectURI}&id_token_hint=${idToken}`);
        });
    } else {
        res.redirect(req.originalUrl.replace('/logout', ''));
    }
};

const handleLogOutLanding = async (req, res) => { 
    const currentPathURI = req.session.currentPathURI; 
    req.session.destroy();
    res.redirect(currentPathURI);
}

module.exports = {
    login,
    handleCallback,
    handleSignUp,
    handleLogOut,
    handleLogOutLanding
};
