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
const { renderGivenTemplate, loadLayoutFromAPI,  renderTemplate} = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiMetadataService = require('../services/apiMetadataService');
const util = require('../utils/util');

const loadMyAPIs = async (req, res) => {
    const orgId = await adminDao.getOrgId(req.params.orgName);
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'myAPIs', 'page.hbs');
    const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
    const layoutResponse = await loadLayoutFromAPI(orgId);
    let metaData = await apiMetadataService.getMetadataListFromDB(orgId);
    const apiRefIds = new Set(metaData.map(api => api.apiReferenceID));

    let subscriptions = [];
    for (const apiRefId of apiRefIds) {
        const subs = await loadSubscriptions(apiRefId);
        if (subs) {
            for (const sub of subs.list) {
                subscriptions.push({
                    id: sub.subscriptionId,
                    apiName: sub.apiInfo.name,
                    applicationName: sub.applicationInfo.name,
                    throttlingTier: sub.throttlingPolicy,
                    appStatus: sub.status,
                });

            }
        }
    }

    const templateContent = {
        subscriptions: subscriptions
    };

    html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    res.send(html);
}

const loadSubscriptions = async (apiId) => {
    return await util.invokeApiRequest('GET', `${config.controlPlanAPI}/subscriptions?apiId=${apiId}`);
}

const loadDefaultContent = async (req, res) => {
    const filePrefix = config.pathToContent;
    html = renderTemplate('../pages/myAPIs/page.hbs', filePrefix + 'layout/main.hbs', {});
    res.send(html);
}

module.exports = {
    loadMyAPIs,
    loadDefaultContent
};