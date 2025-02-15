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
const path = require('path');
const fs = require('fs');
const { renderGivenTemplate, loadLayoutFromAPI} = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const apiMetadataService = require('../services/apiMetadataService');
const adminService = require('../services/adminService');
const util = require('../utils/util');
const APIDTO = require('../dto/apiDTO');

let controlPlaneUrl = "";
const loadMyAPIs = async (req, res) => {
    const orgName = req.params.orgName;
    const orgId = await adminDao.getOrgId(orgName);
    const viewName = req.params.viewName;

    const provider = await adminService.getProvidetByName(orgId, "WSO2");
    controlPlaneUrl = provider.providerURL;
    let groups = "";
    let groupList = [];
    if (req.user && req.user[constants.ROLES.GROUP_CLAIM]) {
        groups = req.user[constants.ROLES.GROUP_CLAIM];
    }
    if (groups !== "") {
        groupList = groups.split(" ");
    }

    try {
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'myAPIs', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        const layoutResponse = await loadLayoutFromAPI(orgId, viewName);
        let metaData = await apiMetadataService.getMetadataListFromDB(orgId, groupList, null, null, null, null, req.params.viewName);
        const apiRefIds = new Set(metaData.map(api => api.apiReferenceID));

        let subscriptions = [];
        let applications = [];
        let subscribedApps = [];

        for (const apiRefId of apiRefIds) {
            const subs = await loadSubscriptions(req, apiRefId);

            if (subs) {
                for (const sub of subs.list) {
                    subscriptions.push({
                        id: sub.subscriptionId,
                        apiName: sub.apiInfo.name,
                        apiVersion: sub.apiInfo.version,
                        applicationName: sub.applicationInfo.name,
                        applicationId: sub.applicationInfo.applicationId,
                        throttlingTier: sub.throttlingPolicy,
                        appStatus: sub.status,
                    });

                }
            }
        }

        // Load modal content with subscribed applications and applications that are not subscribed
        let apiName = req.query.apiName;
        if (apiName) {
            const apps = await loadApplications(req);
            const condition = {
                API_NAME: apiName,
                API_VERSION: req.query.apiVersion,
                ORG_ID: orgId,
            };
            const metaData = await apiDao.getAPIMetadataByCondition(condition);
            const apiId = new APIDTO(metaData[0]).apiReferenceID;
            const apiSubs = await loadSubscriptions(req, apiId.replace(/[^a-zA-Z0-9\s-]/g, ''));
            if (Array.isArray(apiSubs.list)) {
                const subAppIds = new Set(apiSubs.list.map(sub => sub.applicationInfo.applicationId));

                for (const app of apps.list) {
                    if (!subAppIds.has(app.applicationId)) {
                        applications.push({
                            name: app.name,
                            id: app.applicationId,
                        });
                    } else {
                        subscribedApps.push({
                            name: app.name,
                            id: app.applicationId,
                            subscribed: true,
                        });
                    }
                }
            }
        }
        const templateContent = {
            subscriptions: subscriptions,
            applications: applications,
            subscribedApps: subscribedApps,
            baseUrl: '/' + orgName + + constants.ROUTE.VIEWS_PATH + viewName
        };

        const html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        res.send(html);
    } catch (error) {
        console.error("Error occurred while loading My APIs", error);
        const templatePath = path.join(require.main.filename, '..', 'pages', 'error-page', 'page.hbs');
        const templateResponse = fs.readFileSync(templatePath, constants.CHARSET_UTF8);
        const layoutResponse = await loadLayoutFromAPI(orgId, viewName);
        let html = await renderGivenTemplate(templateResponse, layoutResponse, {});
        res.send(html);
    }
}

const loadSubscriptions = async (req, apiId) => {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/subscriptions?apiId=${apiId}`);
    } catch (error) {
        console.error("Error occurred while loading subscriptions", error);
    }
}

const loadApplications = async (req) => {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/applications?sortBy=name&sortOrder=asc`);
    } catch (error) {
        console.error("Error occurred while loading applications", error);
        throw error;
    }
}

// Load default content for the dev mode
const loadDefaultContent = async (req, res) => {
    const filePrefix = config.pathToContent;
    const subscriptionPath = path.join(process.cwd(), filePrefix + '../mock', 'subscriptions.json');
    const subscriptionResponse = JSON.parse(fs.readFileSync(subscriptionPath, constants.CHARSET_UTF8));
    const templateContent = {
        subscriptions: subscriptionResponse,
    };

    const templatePath = path.join(require.main.filename, '..', 'pages', 'myAPIs', 'page.hbs');
    const templateResponse = fs.readFileSync(templatePath, constants.CHARSET_UTF8);

    const layoutPath = path.join(process.cwd(), filePrefix, 'layout', 'main.hbs');
    const layoutResponse = fs.readFileSync(layoutPath, constants.CHARSET_UTF8);

    let html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    res.send(html);
}

module.exports = {
    loadMyAPIs,
    loadDefaultContent
};