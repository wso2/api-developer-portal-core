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
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
const https = require('https');
const constants = require('../utils/constants');
const util = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const secret = require(process.cwd() + '/secret.json');


async function configurePassport(authJsonContent, claimNames) {
    console.log(">>>>>>>>>>>>>>>>>>>> Inside configurePassport method");
    const agent = new https.Agent({
        rejectUnauthorized: false
    });    
    //set scopes to call API Manager REST apis
    const requestedScopes = "openid profile apim:subscribe admin dev";
    let scope = requestedScopes.split(" ");
    scope.push(...(authJsonContent.scope ? authJsonContent.scope.split(" ") : ""));
    const strategy = new OAuth2Strategy({
        issuer: authJsonContent.issuer,
        authorizationURL: authJsonContent.authorizationURL,
        tokenURL: authJsonContent.tokenURL,
        userInfoURL: authJsonContent.userInfoURL,
        clientID: authJsonContent.clientId,
        callbackURL: authJsonContent.callbackURL,
        scope: scope,
        passReqToCallback: true,
        store: true,
        pkce: true
    }, async (req, accessToken, refreshToken, params, profile, done) => {
        if (!accessToken) {
            console.error('No access token received');
            return done(new Error('Access token missing'));
        }
        let orgList;
        if (config.advanced.tokenExchanger.enabled) {
            console.log(">>>>>>>>>>>>>>>>>>>> config.advanced.tokenExchanger.enabled is enabled");
            const exchangedToken = await util.tokenExchanger(accessToken, req.session.returnTo.split("/")[1]);
            console.log(">>>>>>>>>>>>>>>>>>>> Token exchange done. Exchange token: " + exchangedToken);
            const decodedExchangedToken = jwt.decode(exchangedToken);
            console.log(">>>>>>>>>>>>>>>>>>>> Decoded Exchange token: " + JSON.stringify(decodedExchangedToken));
            orgList = decodedExchangedToken.organizations;
            req['exchangedToken'] = exchangedToken;
        }
        const decodedJWT = jwt.decode(params.id_token);
        const decodedAccessToken = jwt.decode(accessToken);
        const firstName = decodedJWT['given_name'] || decodedJWT['nickname'];
        const lastName = decodedJWT['family_name'];
        const organizationID = decodedJWT[claimNames[constants.ROLES.ORGANIZATION_CLAIM]] ? decodedJWT[config.orgIDClaim] : '';
        const roles = decodedJWT[claimNames[constants.ROLES.ROLE_CLAIM]] ? decodedJWT[config.roleClaim] : '';
        const groups = decodedJWT[claimNames[constants.ROLES.GROUP_CLAIM]] ? decodedJWT[config.groupsClaim] : '';
        let isAdmin, isSuperAdmin = false;
        if (roles.includes(constants.ROLES.SUPER_ADMIN) || roles.includes(constants.ROLES.ADMIN)) {
            isAdmin = true;
        }
        if (roles.includes(constants.ROLES.SUPER_ADMIN)) {
            isSuperAdmin = true;
        }
        const returnTo = req.session.returnTo;
        console.log(">>>>>>>>>>>>>>>>>>>> returnTo value: " + returnTo);
        let view = '';
        if (returnTo) {
            const startIndex = returnTo.indexOf('/views/') + 7;
            const endIndex = returnTo.indexOf('/', startIndex) !== -1 ? returnTo.indexOf('/', startIndex) : returnTo.length;
            view = returnTo.substring(startIndex, endIndex);
        }
        profile = {
            'firstName': firstName ? (firstName.includes(" ") ? firstName.split(" ")[0] : firstName) : '',
            'lastName': lastName ? lastName : (firstName && firstName.includes(" ") ? firstName.split(" ")[1] : ''),
            'view': view,
            'idToken': params.id_token,
            'email': decodedJWT['email'],
            [constants.ROLES.ORGANIZATION_CLAIM]: organizationID,
            'returnTo': req.session.returnTo,
            accessToken,
            'authorizedOrgs': orgList,
            'exchangeToken': req.exchangedToken,
            [constants.ROLES.ROLE_CLAIM]: roles,
            [constants.ROLES.GROUP_CLAIM]: groups,
            'isAdmin': isAdmin,
            'isSuperAdmin': isSuperAdmin,
            [constants.USER_ID]: decodedAccessToken[constants.USER_ID]
        };
        console.log(">>>>>>>>>>>>>>>>>>>> profile object after token exchange and JWT decoding: " + JSON.stringify(profile));
        console.log(">>>>>>>>>>>>>>>>>>>> Returning profile");
        return done(null, profile);
    });
    strategy._oauth2.setAgent(agent);

    const originalGetOAuthAccessToken = strategy._oauth2.getOAuthAccessToken;
    console.log(">>>>>>>>>>>>>>>>>>>> originalGetOAuthAccessToken from stratergy: " + originalGetOAuthAccessToken);
    strategy._oauth2.getOAuthAccessToken = function (code, params, callback) {
        originalGetOAuthAccessToken.call(this, code, params, (err, accessToken, refreshToken, results) => {
            if (err) {
                console.error('Error during token exchange:', err);
            }
            callback(err, accessToken, refreshToken, results);
        });
    };
    passport.use(strategy);
}

module.exports = configurePassport;
