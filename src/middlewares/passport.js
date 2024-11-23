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

function configurePassport(authJsonContent) {
    
    passport.use(new OAuth2Strategy({
        issuer: authJsonContent.issuer,
        authorizationURL: authJsonContent.authorizationURL,
        tokenURL: authJsonContent.tokenURL,
        userInfoURL: authJsonContent.userInfoURL,
        clientID: authJsonContent.clientId,
        callbackURL: authJsonContent.callbackURL,
        scope: authJsonContent.scope ? authJsonContent.scope.split(" ") : "",
        passReqToCallback: true,
        state: true,
        pkce: true
    }, (req, accessToken, refreshToken, params, profile, done) => {
        const decodedJWT = jwt.decode(params.id_token);
        const name = decodedJWT['given_name']? decodedJWT['given_name'] : decodedJWT['nickname'];
        profile = {
            'name': name,
            'idToken': params.id_token,
            'email': decodedJWT['email']
        };
        return done(null, profile);
    }));
}

module.exports = configurePassport;
