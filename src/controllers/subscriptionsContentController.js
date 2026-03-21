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
/* eslint-disable no-undef */
const { renderTemplateFromAPI, renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const logger = require('../config/logger');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const util = require('../utils/util');
const APIDTO = require('../dto/apiDTO');

const controlPlaneUrl = config.controlPlane.url;

const loadSubscriptions = async (req, res) => {

    let html;
    const { orgName, viewName } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        const orgID = orgDetails.ORG_ID;
        const cpOrgID = orgDetails.ORGANIZATION_IDENTIFIER;
        req.cpOrgID = cpOrgID;

        if (!req.user) {
            return res.redirect(`/${orgName}${constants.ROUTE.VIEWS_PATH}${viewName}/login`);
        }
        const userID = req.user.sub;
        const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.API_TYPE.DEFAULT;

        // 1. Load TOKEN-BASED subscriptions from CP (all user subscriptions, no apiId filter)
        let tokenBasedSubscriptions = [];
        if (config.controlPlane?.enabled !== false) {
            try {
                const cpResponse = await util.invokeApiRequest(
                    req, 'GET',
                    `${controlPlaneUrl}/api-platform-subscriptions`
                );
                const cpSubs = cpResponse.list || cpResponse || [];

                // Enrich with local API metadata for display
                const allApis = await apiDao.getAPIMetadataByCondition({
                    ORG_ID: orgID,
                    STATUS: constants.API_STATUS.PUBLISHED
                });
                const apiByRefId = {};
                for (const api of allApis) {
                    apiByRefId[api.REFERENCE_ID] = api;
                }

                tokenBasedSubscriptions = cpSubs.map(sub => {
                    const localApi = apiByRefId[sub.apiId] || {};
                    return {
                        id: sub.subscriptionId,
                        type: 'TOKEN_BASED',
                        apiName: localApi.API_NAME || sub.apiId,
                        apiVersion: localApi.API_VERSION || '',
                        apiHandle: localApi.API_HANDLE || '#',
                        planName: sub.subscriptionPlanName || '',
                        applicationName: sub.applicationName || null,
                        applicationId: sub.applicationId || null,
                        status: sub.status,
                        subscriptionToken: sub.subscriptionToken,
                        createdAt: sub.createdTime || null,
                    };
                });
            } catch (cpError) {
                logger.warn('Failed to load platform subscriptions from CP', {
                    error: cpError.message, orgID
                });
            }
        }

        // 2. Load APP-BASED subscriptions
        const applications = await adminDao.getApplications(orgID, userID);
        const appBasedSubscriptions = [];
        for (const app of applications) {
            const subscribedAPIs = await adminDao.getSubscribedAPIs(orgID, app.APP_ID);
            for (const sub of subscribedAPIs) {
                const api = new APIDTO(sub);
                const subMapping = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues;
                const subPolicy = await apiDao.getSubscriptionPolicy(subMapping.POLICY_ID, orgID);
                appBasedSubscriptions.push({
                    id: subMapping.SUB_ID,
                    type: 'APP_BASED',
                    apiName: api.apiInfo.apiName,
                    apiVersion: api.apiInfo.apiVersion,
                    apiHandle: api.apiHandle,
                    apiRefId: api.apiReferenceID,
                    planName: subPolicy ? subPolicy.dataValues.POLICY_NAME : '',
                    applicationName: app.NAME,
                    appId: app.APP_ID,
                    // App-based subscriptions have no STATUS column in the local DB schema
                    // (DP_API_SUBSCRIPTION). Unlike token-based subscriptions whose status
                    // is managed by the control plane (ACTIVE/INACTIVE), app-based
                    // subscriptions are always considered active while they exist and are
                    // removed entirely when unsubscribed. This is an intentional limitation.
                    status: 'ACTIVE',
                    subscriptionToken: null,
                    createdAt: subMapping.createdAt || null,
                });
            }
        }

        // 3. Merge and sort (newest first)
        const allSubscriptions = [...tokenBasedSubscriptions, ...appBasedSubscriptions]
            .sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return dateB - dateA;
            });

        const profile = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            imageURL: req.user.picture || req.user.imageURL || '/images/default-profile.png',
        };

        const templateContent = {
            baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
            profile: profile,
            devportalMode: devportalMode,
            orgID: orgID,
            subscriptions: allSubscriptions,
            isReadOnlyMode: config.readOnlyMode,
        };

        html = await renderTemplateFromAPI(templateContent, orgID, orgName, 'pages/subscriptions', viewName);
        res.send(html);
    } catch (error) {
        logger.error('Error loading subscriptions page', {
            error: error.message,
            stack: error.stack,
            orgName
        });
        const devportalMode = constants.API_TYPE.DEFAULT;
        const templateContent = {
            baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
            devportalMode: devportalMode,
            errorMessage: constants.ERROR_MESSAGE.COMMON_ERROR_MESSAGE,
        };
        html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
        res.status(500).send(html);
    }
};

module.exports = { loadSubscriptions };
