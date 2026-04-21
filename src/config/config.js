/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source || {})) {
        if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else if (source[key] !== undefined) {
            result[key] = source[key];
        }
    }
    return result;
}

function loadConfig() {
    // 1. Built-in defaults from sample_config.yaml
    const defaultsPath = path.join(process.cwd(), 'sample_config.yaml');
    const defaults = yaml.load(fs.readFileSync(defaultsPath, 'utf8'));

    // 2. Deep-merge user's config.yaml if present
    const userConfigPath = path.join(process.cwd(), 'config.yaml');
    let merged = defaults;
    if (fs.existsSync(userConfigPath)) {
        const userConfig = yaml.load(fs.readFileSync(userConfigPath, 'utf8')) || {};
        merged = deepMerge(defaults, userConfig);
    }

    // 3. Deep-merge secret.yaml if present (secrets kept separate from main config)
    const secretPath = path.join(process.cwd(), 'secret.yaml');
    if (fs.existsSync(secretPath)) {
        const userSecrets = yaml.load(fs.readFileSync(secretPath, 'utf8')) || {};
        merged = deepMerge(merged, userSecrets);
    }

    // 4. Apply DP_* environment variable overrides
    const e = process.env;

    if (e.DP_DB_HOST)     merged.db.host     = e.DP_DB_HOST;
    if (e.DP_DB_PORT)     merged.db.port     = parseInt(e.DP_DB_PORT, 10);
    if (e.DP_DB_USER)     merged.db.username = e.DP_DB_USER;
    if (e.DP_DB_PASSWORD) merged.db.password = e.DP_DB_PASSWORD;
    if (e.DP_DB_NAME)     merged.db.database = e.DP_DB_NAME;
    if (e.DP_BASE_URL)    merged.baseUrl     = e.DP_BASE_URL;

    if (e.DP_PORTAL_ORG_NAME) {
        merged.portal = { ...(merged.portal || {}), orgName: e.DP_PORTAL_ORG_NAME };
    }

    if (merged.identityProvider) {
        if (e.DP_OIDC_ISSUER)         merged.identityProvider.issuer           = e.DP_OIDC_ISSUER;
        if (e.DP_OIDC_CLIENT_ID)      merged.identityProvider.clientId         = e.DP_OIDC_CLIENT_ID;
        if (e.DP_OIDC_AUTH_URL)       merged.identityProvider.authorizationURL = e.DP_OIDC_AUTH_URL;
        if (e.DP_OIDC_TOKEN_URL)      merged.identityProvider.tokenURL         = e.DP_OIDC_TOKEN_URL;
        if (e.DP_OIDC_CALLBACK_URL)   merged.identityProvider.callbackURL      = e.DP_OIDC_CALLBACK_URL;
        if (e.DP_OIDC_LOGOUT_URL)     merged.identityProvider.logoutURL        = e.DP_OIDC_LOGOUT_URL;
        if (e.DP_OIDC_SCOPE)          merged.identityProvider.scope            = e.DP_OIDC_SCOPE;
        if (e.DP_OIDC_JWKS_URL)       merged.identityProvider.jwksURL          = e.DP_OIDC_JWKS_URL;
    }

    return merged;
}

// Loaded once at startup; Node module cache ensures all requires share the same object.
module.exports = loadConfig();
