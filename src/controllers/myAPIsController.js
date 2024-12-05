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
const { renderGivenTemplate, loadLayoutFromAPI, renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiMetadataService = require('../services/apiMetadataService');
const util = require('../utils/util');

const loadMyAPIs = async (req, res) => {
    const orgName = req.params.orgName;
    const orgId = await adminDao.getOrgId(orgName);
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'myAPIs', 'page.hbs');
    const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
    const layoutResponse = await loadLayoutFromAPI(orgId);
    let metaData = await apiMetadataService.getMetadataListFromDB(orgId);
    const apiRefIds = new Set(metaData.map(api => api.apiReferenceID));

    let subscriptions = [];
    let applications = [];
    let subscribedApps = [];

    for (const apiRefId of apiRefIds) {
        const subs = await loadSubscriptions(res, apiRefId);

        if (subs) {
            for (const sub of subs.list) {
                subscriptions.push({
                    id: sub.subscriptionId,
                    apiName: sub.apiInfo.name,
                    applicationName: sub.applicationInfo.name,
                    applicationId: sub.applicationInfo.applicationId,
                    throttlingTier: sub.throttlingPolicy,
                    appStatus: sub.status,
                });

            }
        }
    }

    // Load modal content with subscribed applications and applications that are not subscribed
    if (req.query.apiId) {
        const apps = await loadApplications();
        const apiSubs = await loadSubscriptions(res, req.query.apiId);
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

    const templateContent = {
        subscriptions: subscriptions,
        applications: applications,
        subscribedApps: subscribedApps,
        baseUrl: '/' + orgName
    };

    const html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    res.send(html);
}

const loadSubscriptions = async (res, apiId) => {
    try {
        return await util.invokeApiRequest('GET', `${config.controlPlaneUrl}/subscriptions?apiId=${apiId}`);
    } catch (error) {
        console.error("Error occurred while loading subscriptions", error);
        util.handleError(res, error);
        return null;
    }
}

const loadApplications = async () => {
    try {
        return await util.invokeApiRequest('GET', `${config.controlPlaneUrl}/applications?sortBy=name&sortOrder=asc`);
    } catch (error) {
        console.error("Error occurred while loading applications", error);
        util.handleError(res, error);
    }
}

// Load default content for the dev mode
const loadDefaultContent = async (req, res) => {
    const filePrefix = config.pathToContent;
    let html = renderTemplate('../pages/myAPIs/page.hbs', filePrefix + 'layout/main.hbs', {});
    res.send(html);
}

module.exports = {
    loadMyAPIs,
    loadDefaultContent
};