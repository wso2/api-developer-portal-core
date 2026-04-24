/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
 * "AS IS" BASIS, WITHOUT WARRANTIES OR ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const config = require('../config/config');
const util = require('../utils/util');
const logger = require('../config/logger');

const controlPlaneUrl = config.controlPlane.url;
const PLATFORM_GATEWAY = 'wso2/api-platform';

const securitySchemeHasApiKey = (securityScheme) =>
    Array.isArray(securityScheme) && securityScheme.includes('api_key');

/**
 * API-level Platform API Keys nav: platform gateway and API Key security enabled on the API
 * (CP GET /apis/{id}.securityScheme includes api_key). When control plane is disabled, the link
 * is hidden unless existingApiDetail already includes securityScheme (no CP fetch is possible).
 *
 * @param {object} req - Express request (for invokeApiRequest auth)
 * @param {object} metaData - Metadata with apiInfo.gatewayType and apiReferenceID (APIM DTO shape)
 * @param {object|null} existingApiDetail - Optional CP GET /apis/:ref response to avoid a duplicate call
 * @returns {Promise<boolean>}
 */
async function shouldShowPlatformApiKeysNav(req, metaData, existingApiDetail = null) {
    if (!metaData?.apiInfo || metaData.apiInfo.gatewayType !== PLATFORM_GATEWAY) {
        return false;
    }
    const refId = metaData.apiReferenceID;
    let detail = existingApiDetail;

    if (detail && detail.securityScheme !== undefined) {
        return securitySchemeHasApiKey(detail.securityScheme);
    }

    if (config.controlPlane?.enabled === false || !refId) {
        return false;
    }

    try {
        detail = await util.invokeApiRequest(
            req,
            'GET',
            `${controlPlaneUrl}/apis/${encodeURIComponent(refId)}`,
            null,
            null
        );
    } catch (e) {
        logger.warn('shouldShowPlatformApiKeysNav: failed to load API from control plane', {
            error: e.message,
            refId
        });
        return false;
    }
    return securitySchemeHasApiKey(detail?.securityScheme);
}

module.exports = {
    shouldShowPlatformApiKeysNav,
    securitySchemeHasApiKey,
    PLATFORM_GATEWAY
};
