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
const apiKeyService = require('../services/apiKeyService');
const apiDao = require('../dao/apiMetadata');
const logger = require('../config/logger');
const { config } = require('../config/configLoader');

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

function actor(req) {
    return (req.user && req.user.email) || (req.user && req.user.sub) || 'unknown';
}

function errorStatus(err) {
    return err.status || 500;
}

function parseRequiredString(raw) {
    if (typeof raw !== 'string' || !raw.trim()) {
        return null;
    }
    return raw.trim();
}

async function ensurePlatformGatewayApi(orgID, apiId) {
    const apiMetadataResponse = await apiDao.getAPIMetadata(orgID, apiId);
    if (!apiMetadataResponse || apiMetadataResponse.length === 0) {
        return { error: { status: 404, body: { code: '404', message: 'Not Found', description: 'API not found' } } };
    }
    const row = apiMetadataResponse[0];
    const gatewayType = row.GATEWAY_TYPE ?? row.dataValues?.GATEWAY_TYPE;
    if (gatewayType !== PLATFORM_GATEWAY) {
        return {
            error: {
                status: 400,
                body: { code: '400', message: 'Bad Request', description: 'API is not a Platform Gateway API' }
            }
        };
    }
    return { ok: true };
}

const listPlatformApiKeys = async (req, res) => {
    const orgID = req.params.orgId;
    const apiId = parseRequiredString(req.query.apiId);
    const subscriptionId = parseRequiredString(req.query.subscriptionId);
    const status = parseRequiredString(req.query.status);

    if (!apiId) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }

    try {
        const ensure = await ensurePlatformGatewayApi(orgID, apiId);
        if (ensure.error) {
            return res.status(ensure.error.status).json(ensure.error.body);
        }

        const keys = await apiKeyService.list(orgID, {
            apiId,
            subscriptionId: subscriptionId || undefined,
            status: status || undefined
        });
        return res.status(200).json(keys.map(k => ({
            keyId: k.KEY_ID,
            name: k.NAME,
            status: k.STATUS,
            expiresAt: k.EXPIRES_AT,
            createdAt: k.CREATED_AT,
            revokedAt: k.REVOKED_AT || undefined,
            apiId: k.API_ID
        })));
    } catch (error) {
        logger.error('Error listing platform API keys', {
            error: error.message,
            orgID
        });
        return res.status(errorStatus(error)).json({ code: String(errorStatus(error)), message: error.message });
    }
};

const generatePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const { apiId, name, expiresAt, subscriptionId } = req.body || {};

    if (!apiId || typeof apiId !== 'string' || !apiId.trim()) {
        return res.status(400).json({
            code: '400',
            message: 'Bad Request',
            description: 'apiId is required'
        });
    }

    try {
        const ensure = await ensurePlatformGatewayApi(orgID, apiId.trim());
        if (ensure.error) {
            return res.status(ensure.error.status).json(ensure.error.body);
        }

        const result = await apiKeyService.generate({
            orgId: orgID,
            apiId: apiId.trim(),
            subscriptionId,
            name,
            expiresAt,
            actor: actor(req)
        });
        return res.status(201).json(result);
    } catch (error) {
        logger.error('Error generating platform API key', {
            error: error.message,
            orgID,
            apiId
        });
        return res.status(errorStatus(error)).json({ code: String(errorStatus(error)), message: error.message });
    }
};

const regeneratePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const apiKeyId = req.params.apiKeyId;

    try {
        const result = await apiKeyService.regenerate({ orgId: orgID, keyId: apiKeyId, actor: actor(req) });
        return res.status(200).json(result);
    } catch (error) {
        logger.error('Error regenerating platform API key', {
            error: error.message,
            orgID,
            apiKeyId
        });
        return res.status(errorStatus(error)).json({ code: String(errorStatus(error)), message: error.message });
    }
};

const revokePlatformApiKey = async (req, res) => {
    if (rejectIfReadOnlyWrite(res)) {
        return;
    }
    const orgID = req.params.orgId;
    const apiKeyId = req.params.apiKeyId;

    try {
        await apiKeyService.revoke({ orgId: orgID, keyId: apiKeyId, actor: actor(req) });
        return res.status(204).send();
    } catch (error) {
        logger.error('Error revoking platform API key', {
            error: error.message,
            orgID,
            apiKeyId
        });
        return res.status(errorStatus(error)).json({ code: String(errorStatus(error)), message: error.message });
    }
};

module.exports = {
    listPlatformApiKeys,
    generatePlatformApiKey,
    regeneratePlatformApiKey,
    revokePlatformApiKey
};
