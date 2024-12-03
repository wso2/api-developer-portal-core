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


const filePrefix = config.pathToContent;

const fetchAuthJsonContent = async (req, orgName) => {

    //use super admin for org creation page login
    if (req.session.returnTo) {
        if (minimatch.minimatch(req.session.returnTo, constants.ROUTE.DEVPORTAL_CONFIGURE) ||
            minimatch.minimatch(req.session.returnTo, constants.ROUTE.DEVPORTAL_ROOT)) {
            return config.identityProvider;
        }
    }
    if (config.mode === constants.DEV_MODE) {
        const authJsonPath = path.join(process.cwd(), filePrefix + '../mock', 'auth.json');
        return JSON.parse(fs.readFileSync(authJsonPath, constants.CHARSET_UTF8));
    }
    //if no idp per org, use super IDP
    if(orgName === 'undefined') {
        console.log('No org name');
        return config.identityProvider;
    }
    try {
        const organization = await adminDao.getOrganization(orgName);
        const response = await adminDao.getIdentityProvider(organization.ORG_ID);
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

    const IDP = await fetchAuthJsonContent(req, req.params.orgName);
    if (IDP.clientId) {
        console.log('Session before config:', req.session);
        configurePassport(IDP);  // Configure passport dynamically
        passport.authenticate('oauth2')(req, res, next);
        console.log('Session after config:', req.session);
        next();
    } else {
        res.status(400).send("No Identity Provider information found for the organization");
    }
};

const handleCallback = (req, res, next) => {

    passport.authenticate('oauth2', {
        failureRedirect: '/login',
        keepSessionInfo: true
    }, (err, user) => {
        if (err || !user) {
            return next(err || new Error('Authentication failed'));
        }
        req.logIn(user, (err) => {
            console.log('Session after callback:', req.session);
            if (err) {
                return next(err);
            }
            if (config.mode === constants.DEV_MODE) {
                const returnTo = req.user.returnTo || constants.BASE_URL + config.port;
                delete req.session.returnTo;
                res.redirect(returnTo);
            } else {
                const returnTo = req.user.returnTo || `/${req.params.orgName}`;
                delete req.session.returnTo;
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
            const returnTo = req.session.returnTo || constants.BASE_URL + config.port;
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
    req.session.destroy();
    req.logout(
        () => res.redirect(`${authJsonContent.logoutURL}?post_logout_redirect_uri=${authJsonContent.logoutRedirectURI}&id_token_hint=${idToken}`)
    );
};

module.exports = {
    login,
    handleCallback,
    handleSignUp,
    handleLogOut
};
