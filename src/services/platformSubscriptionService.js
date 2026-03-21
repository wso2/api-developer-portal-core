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
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const { CustomError } = require('../utils/errors/customErrors');
const apiDao = require('../dao/apiMetadata');
const util = require('../utils/util');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const config = require(process.cwd() + '/config.json');

const controlPlaneUrl = config.controlPlane.url;

const createPlatformGatewaySubscription = async (req, res) => {

    const orgID = req.params.orgId;
    const { apiId, subscriptionPlanName, applicationId } = req.body;

    if (!apiId) {
        return res.status(400).json({
            code: "400",
            message: "Bad Request",
            description: "apiId is required"
        });
    }

    try {
        const apiMetadataResponse = await apiDao.getAPIMetadata(orgID, apiId);
        if (!apiMetadataResponse || apiMetadataResponse.length === 0) {
            return res.status(404).json({
                code: "404",
                message: "Not Found",
                description: "API not found"
            });
        }

        const apiMetadata = apiMetadataResponse[0];
        if (!apiMetadata.TOKEN_BASED_SUBSCRIPTION_ENABLED) {
            return res.status(400).json({
                code: "400",
                message: "Bad Request",
                description: "This API does not support token-based subscriptions"
            });
        }

        if (!apiMetadata.REFERENCE_ID) {
            return res.status(400).json({
                code: "400",
                message: "Bad Request",
                description: "API is missing a control-plane reference ID and cannot be subscribed to"
            });
        }

        const cpBody = {
            apiId: apiMetadata.REFERENCE_ID,
        };
        if (subscriptionPlanName) {
            cpBody.subscriptionPlanName = subscriptionPlanName;
        }
        if (applicationId) {
            cpBody.applicationId = applicationId;
        }

        const cpResponse = await util.invokeApiRequest(
            req, 'POST',
            `${controlPlaneUrl}/api-platform-subscriptions`,
            null,
            cpBody
        );

        return res.status(201).json(cpResponse);
    } catch (error) {
        logger.error('Error creating platform gateway subscription', {
            error: error.message, orgID, apiId
        });
        util.handleError(res, error);
    }
};

const listPlatformGatewaySubscriptions = async (req, res) => {

    const orgID = req.params.orgId;
    const apiId = req.query.apiId;

    try {
        let queryString = '';
        if (apiId) {
            const apiMetadataResponse = await apiDao.getAPIMetadata(orgID, apiId);
            if (!apiMetadataResponse || apiMetadataResponse.length === 0) {
                return res.status(404).json({
                    code: "404",
                    message: "Not Found",
                    description: "API not found"
                });
            }
            if (!apiMetadataResponse[0].REFERENCE_ID) {
                return res.status(400).json({
                    code: "400",
                    message: "Bad Request",
                    description: "API is missing a control-plane reference ID"
                });
            }
            queryString = `?apiId=${encodeURIComponent(apiMetadataResponse[0].REFERENCE_ID)}`;
        }

        const cpResponse = await util.invokeApiRequest(
            req, 'GET',
            `${controlPlaneUrl}/api-platform-subscriptions${queryString}`
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error listing platform gateway subscriptions', {
            error: error.message, orgID
        });
        util.handleError(res, error);
    }
};

const getPlatformGatewaySubscription = async (req, res) => {

    const subscriptionId = req.params.subscriptionId;

    try {
        const cpResponse = await util.invokeApiRequest(
            req, 'GET',
            `${controlPlaneUrl}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error getting platform gateway subscription', {
            error: error.message, subscriptionId
        });
        util.handleError(res, error);
    }
};

const updatePlatformGatewaySubscription = async (req, res) => {

    const subscriptionId = req.params.subscriptionId;
    const { status } = req.body;

    if (!status || !['ACTIVE', 'INACTIVE'].includes(status)) {
        return res.status(400).json({
            code: "400",
            message: "Bad Request",
            description: "status must be 'ACTIVE' or 'INACTIVE'"
        });
    }

    try {
        const cpResponse = await util.invokeApiRequest(
            req, 'PUT',
            `${controlPlaneUrl}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`,
            null,
            { status }
        );

        return res.status(200).json(cpResponse);
    } catch (error) {
        logger.error('Error updating platform gateway subscription', {
            error: error.message, subscriptionId, status
        });
        util.handleError(res, error);
    }
};

const deletePlatformGatewaySubscription = async (req, res) => {

    const subscriptionId = req.params.subscriptionId;

    try {
        const cpResponse = await util.invokeApiRequest(
            req, 'DELETE',
            `${controlPlaneUrl}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`
        );

        return res.status(200).json({
            message: "Subscription deleted successfully"
        });
    } catch (error) {
        logger.error('Error deleting platform gateway subscription', {
            error: error.message, subscriptionId
        });
        util.handleError(res, error);
    }
};

module.exports = {
    createPlatformGatewaySubscription,
    listPlatformGatewaySubscriptions,
    getPlatformGatewaySubscription,
    updatePlatformGatewaySubscription,
    deletePlatformGatewaySubscription
};
