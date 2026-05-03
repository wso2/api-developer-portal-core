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
const apiDao = require('../dao/apiMetadata');
const util = require('../utils/util');
const logger = require('../config/logger');
const { config } = require('../config/configLoader');

const controlPlaneUrl = config.controlPlane.url;
const PLATFORM_GATEWAY = 'wso2/api-platform';

const READ_ONLY_WRITE_RESPONSE = {
    code: '403',
    message: 'Forbidden',
    description: 'Write operations are disabled in read-only mode'
};

/** @returns {boolean} true if the response was sent (read-only block) */
const rejectIfReadOnlyWrite = (res) => {
    if (!config.readOnlyMode) {
        return false;
    }
    res.status(403).json(READ_ONLY_WRITE_RESPONSE);
    return true;
};

/**
 * @param {unknown} raw
 * @returns {string|null} trimmed non-empty string, or null if invalid
 */
function parseRequiredString(raw) {
    if (typeof raw !== 'string' || !raw.trim()) {
        return null;
    }
    return raw.trim();
}

/** Aligns with client `platform-api-keys-page.js` name validation */
const KEY_NAME_PATTERN = /^[a-z0-9][a-z0-9_-]{0,127}$/;

function parseAndValidateName(raw) {
    if (typeof raw !== 'string') {
        return null;
    }
    const n = raw.trim();
    return KEY_NAME_PATTERN.test(n) ? n : null;
}

const MIN_EXPIRY_MS = Date.UTC(1970, 0, 1);
const MAX_EXPIRY_MS = Date.UTC(2100, 11, 31, 23, 59, 59, 999);

/** Datetime strings passed to Date.parse must end with Z or ±HH:MM (offset). */
const EXPIRES_AT_HAS_TZ = /(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Optional expiresAt: ISO-8601 string (with Z or offset) or finite number (ms or seconds).
 * @returns {{ ok: true, iso?: string } | { ok: false, description: string }}
 */
function parseExpiresAtForCp(raw) {
    if (raw === undefined || raw === null || raw === '') {
        return { ok: true, iso: undefined };
    }
    let ms;
    if (typeof raw === 'number' && Number.isFinite(raw)) {
        ms = Math.abs(raw) < 1e12 ? Math.floor(raw * 1000) : Math.floor(raw);
    } else if (typeof raw === 'string') {
        const s = raw.trim();
        if (!s) {
            return { ok: true, iso: undefined };
        }
        const asNum = Number(s);
        if (s !== '' && Number.isFinite(asNum) && String(asNum) === s) {
            ms = asNum < 1e12 ? Math.floor(asNum * 1000) : Math.floor(asNum);
        } else {
            if (!EXPIRES_AT_HAS_TZ.test(s)) {
                return { ok: false, description: 'expiresAt must include timezone (Z or +HH:MM)' };
            }
            ms = Date.parse(s);
        }
    } else {
        return { ok: false, description: 'expiresAt must be a string, number, or omitted' };
    }
    if (Number.isNaN(ms)) {
        return { ok: false, description: 'expiresAt is invalid' };
    }
    if (ms < MIN_EXPIRY_MS || ms > MAX_EXPIRY_MS) {
        return { ok: false, description: 'expiresAt is out of allowed range' };
    }
    return { ok: true, iso: new Date(ms).toISOString() };
}

const resolvePlatformGatewayApi = async (orgID, apiId) => {
    const apiMetadataResponse = await apiDao.getAPIMetadata(orgID, apiId);
    if (!apiMetadataResponse || apiMetadataResponse.length === 0) {
        return {
            error: {
                status: 404,
                body: { code: '404', message: 'Not Found', description: 'API not found' }
            }
        };
    }
    const row = apiMetadataResponse[0];
    const refId = row.REFERENCE_ID ?? row.dataValues?.REFERENCE_ID;
    const gatewayType = row.GATEWAY_TYPE ?? row.dataValues?.GATEWAY_TYPE;
    if (!refId) {
        return {
            error: {
                status: 400,
                body: {
                    code: '400',
                    message: 'Bad Request',
                    description: 'API is missing a control-plane reference ID'
                }
            }
        };
    }
    if (gatewayType !== PLATFORM_GATEWAY) {
        return {
            error: {
                status: 400,
                body: {
                    code: '400',
                    message: 'Bad Request',
                    description: 'API is not a Platform Gateway API'
                }
            }
        };
    }
    return { refId };
};

const listPlatformApiKeys = async (req, res) => {
    const orgID = req.params.orgId;
    const apiId = parseRequiredString(req.query.apiId);

    if (!apiId) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }

    try {
        const resolved = await resolvePlatformGatewayApi(orgID, apiId);
        if (resolved.error) {
            return res.status(resolved.error.status).json(resolved.error.body);
        }

        const cpResponse = await util.invokeApiRequest(
            req,
            'GET',
            `${controlPlaneUrl}/platform-api-keys?apiId=${encodeURIComponent(resolved.refId)}`
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error listing platform API keys', {
            error: error.message,
            orgID
        });
        util.handleError(res, error);
    }
};

const generatePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const { name, expiresAt } = req.body || {};
    const apiId = parseRequiredString((req.body || {}).apiId);

    if (!apiId) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }
    const normalizedName = parseAndValidateName(name);
    if (!normalizedName) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'name must match ^[a-z0-9][a-z0-9_-]{0,127}$'
        });
    }
    const expiresParsed = parseExpiresAtForCp(expiresAt);
    if (!expiresParsed.ok) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: expiresParsed.description
        });
    }

    try {
        const resolved = await resolvePlatformGatewayApi(orgID, apiId);
        if (resolved.error) {
            return res.status(resolved.error.status).json(resolved.error.body);
        }

        const cpBody = {
            apiId: resolved.refId,
            name: normalizedName
        };
        if (expiresParsed.iso) {
            cpBody.expiresAt = expiresParsed.iso;
        }

        const cpResponse = await util.invokeApiRequest(
            req,
            'POST',
            `${controlPlaneUrl}/platform-api-keys/generate`,
            { 'Content-Type': 'application/json' },
            cpBody
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error generating platform API key', {
            error: error.message,
            orgID,
            apiId
        });
        util.handleError(res, error);
    }
};

const regeneratePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const apiKeyId = req.params.apiKeyId;
    const { name, expiresAt } = req.body || {};
    const apiId = parseRequiredString((req.body || {}).apiId);

    if (!apiId) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }
    const normalizedName = parseAndValidateName(name);
    if (!normalizedName) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'name must match ^[a-z0-9][a-z0-9_-]{0,127}$'
        });
    }
    const expiresParsed = parseExpiresAtForCp(expiresAt);
    if (!expiresParsed.ok) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: expiresParsed.description
        });
    }

    try {
        const resolved = await resolvePlatformGatewayApi(orgID, apiId);
        if (resolved.error) {
            return res.status(resolved.error.status).json(resolved.error.body);
        }

        const cpBody = {
            apiId: resolved.refId,
            name: normalizedName
        };
        if (expiresParsed.iso) {
            cpBody.expiresAt = expiresParsed.iso;
        }

        const cpResponse = await util.invokeApiRequest(
            req,
            'POST',
            `${controlPlaneUrl}/platform-api-keys/${encodeURIComponent(apiKeyId)}/regenerate`,
            { 'Content-Type': 'application/json' },
            cpBody
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error regenerating platform API key', {
            error: error.message,
            orgID,
            apiKeyId
        });
        util.handleError(res, error);
    }
};

const revokePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const apiKeyId = req.params.apiKeyId;
    const apiId = parseRequiredString(req.query.apiId);

    if (!apiId) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }

    try {
        const resolved = await resolvePlatformGatewayApi(orgID, apiId);
        if (resolved.error) {
            return res.status(resolved.error.status).json(resolved.error.body);
        }

        await util.invokeApiRequest(
            req,
            'POST',
            `${controlPlaneUrl}/platform-api-keys/${encodeURIComponent(apiKeyId)}/revoke?apiId=${encodeURIComponent(resolved.refId)}`,
            {},
            {}
        );

        return res.status(200).send();
    } catch (error) {
        logger.error('Error revoking platform API key', {
            error: error.message,
            orgID,
            apiKeyId
        });
        util.handleError(res, error);
    }
};

module.exports = {
    listPlatformApiKeys,
    generatePlatformApiKey,
    regeneratePlatformApiKey,
    revokePlatformApiKey
};
