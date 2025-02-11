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
const { renderTemplate, renderGivenTemplate, loadLayoutFromAPI, invokeApiRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const adminDao = require('../dao/admin');
const util = require('../utils/util');
const filePrefix = config.pathToContent;
const controlPlaneUrl = config.controlPlane.url;

const orgIDValue = async (orgName) => {
    const organization = await adminDao.getOrganization(orgName);
    return organization.ORG_ID;
}

const templateResponseValue = async (pageName) => {
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', pageName, 'page.hbs');
    return fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
}

// ***** Load Applications *****

const loadApplications = async (req, res) => {
    try {
        let html, metaData, templateContent;
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplications();
            templateContent = {
                applicationsMetadata: metaData,
                baseUrl: constants.BASE_URL + config.port + "/views/" + req.params.viewName
            }
            html = renderTemplate('../pages/applications/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const orgName = req.params.orgName;
            const viewName = req.params.viewName;
            const orgID = await orgIDValue(orgName);
            metaData = await getAPIMApplications(req);
            templateContent = {
                applicationsMetadata: metaData,
                baseUrl: '/' + orgName + '/views/' + viewName
            }
            const templateResponse = await templateResponseValue('applications');
            const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
            html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        }
        res.send(html);
    } catch (error) {
        console.error("Error occurred while loading Applications", error);
        const orgName = req.params.orgName;
        const viewName = req.params.viewName;
        const orgId = await orgIDValue(orgName);
        
        const templatePath = path.join(require.main.filename, '..', 'pages', 'error-page', 'page.hbs');
        const templateResponse = fs.readFileSync(templatePath, constants.CHARSET_UTF8);
        const layoutResponse = await loadLayoutFromAPI(orgId, viewName);
        let html = await renderGivenTemplate(templateResponse, layoutResponse, {});
        res.send(html);
    }
}

async function getMockApplications() {
    const mockApplicationsMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'applications.json');
    const mockApplicationsMetaData = JSON.parse(fs.readFileSync(mockApplicationsMetaDataPath, 'utf-8'));
    return mockApplicationsMetaData.list;
}

async function getAPIMApplications(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/applications', null, null);
    return responseData.list;
}

// ***** Load Throttling Policies *****

const loadThrottlingPolicies = async (req, res) => {
    let html, metaData, templateContent;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockThrottlingPolicies();
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port + "/views/" + req.params.viewName
        }
        html = renderTemplate('../pages/add-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    }
    else {
        const orgName = req.params.orgName;
        const viewName = req.params.viewName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMThrottlingPolicies(req);
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('add-application');
        const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }

    res.send(html);
}

async function getMockThrottlingPolicies() {
    const mockThrottlingPoliciesMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'throttlingPolicies.json');
    const mockThrottlingPoliciesMetaData = JSON.parse(fs.readFileSync(mockThrottlingPoliciesMetaDataPath, 'utf-8'));
    return mockThrottlingPoliciesMetaData.list;
}

async function getAPIMThrottlingPolicies(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/throttling-policies/application', null, null);
    return responseData.list;
}

// ***** Load Application *****

const loadApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        let html, templateContent, metaData, kMmetaData;
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplication();
            kMmetaData = await getMockKeyManagers();
            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: constants.BASE_URL + config.port
            }
            html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const orgName = req.params.orgName;
            const viewName = req.params.viewName;
            const orgID = await orgIDValue(orgName);
            metaData = await getAPIMApplication(req, applicationId);
            const allApis = await getAllAPIs(req);
            const subApis = await getSubscribedApis(req, applicationId);
            const subApiMap = new Map();
            subApis.list.forEach(subApi => subApiMap.set(subApi.apiId, { policy: subApi.throttlingPolicy, id: subApi.subscriptionId }));
            const apiList = [];

            allApis.list.forEach(api => {
                let subscriptionPolicies = [];
                let subscribedPolicy;

                if (subApiMap.has(api.id)) {
                    subscribedPolicy = subApiMap.get(api.id)
                } else {
                    api.throttlingPolicies.forEach(policy => {
                        subscriptionPolicies.push(policy);
                    });
                }

                apiList.push({
                    name: api.name,
                    id: api.id,
                    isSubAvailable: api.isSubscriptionAvailable,
                    subscriptionPolicies: subscriptionPolicies,
                    subscribedPolicy: subscribedPolicy
                });

            });

            kMmetaData = await getAPIMKeyManagers(req);
            kMmetaData = kMmetaData.filter(keyManager => keyManager.enabled);
            let applicationKeyList = await getApplicationKeys(req, applicationId);
            let productionKeys = [];
            let sandboxKeys = [];

            applicationKeyList?.list?.map(key => {
                let client_name;
                if (key?.additionalProperties?.client_name) {
                    client_name = key.additionalProperties.client_name;
                }
                let keyData = {
                    keyManager: key.keyManager,
                    consumerKey: key.consumerKey,
                    consumerSecret: key.consumerSecret,
                    keyMappingId: key.keyMappingId,
                    keyType: key.keyType,
                    supportedGrantTypes: key.supportedGrantTypes,
                    additionalProperties: key.additionalProperties,
                    clientName: client_name
                };
                if (key.keyType === constants.KEY_TYPE.PRODUCTION) {
                    productionKeys.push(keyData);
                } else {
                    sandboxKeys.push(keyData);
                }
                return keyData;
            }) || [];


            kMmetaData.forEach(keyManager => {
                productionKeys.forEach(productionKey => {
                    if (productionKey.keyManager === keyManager.name) {
                        keyManager.productionKeys = productionKey;
                    }
                });
                sandboxKeys.forEach(sandboxKey => {
                    if (sandboxKey.keyManager === keyManager.name) {
                        keyManager.sandboxKeys = sandboxKey;
                    }
                });
            });

            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: '/' + orgName,
                apis: apiList,
                productionKeys: productionKeys,
                sandboxKeys: sandboxKeys
            }

            const templateResponse = await templateResponseValue('application');
            const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
            html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        }

        res.send(html);
    } catch (error) {
        console.error("Error occurred while loading application", error);
        util.handleError(res, error);
    }
}

async function getApplicationKeys(req, applicationId) {
    try {
        return await invokeApiRequest(req, 'GET', `${controlPlaneUrl}/applications/${applicationId}/keys`, {}, {});
    } catch (error) {
        console.error("Error occurred while generating application keys", error);
        return null;
    }
}

async function getAllAPIs(req) {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis`);
    } catch (error) {
        console.error("Error occurred while loading APIs", error);
        throw error;
    }
}

const getSubscribedApis = async (req, appId) => {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/subscriptions?applicationId=${appId}`);
    } catch (error) {
        console.error("Error occurred while loading subscriptions", error);
        throw error;
    }
}

const loadApplicationForEdit = async (req, res) => {

    const applicationId = req.params.applicationid;
    let html, templateContent, metaData, throttlingMetaData;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplication();
        throttlingMetaData = await getMockThrottlingPolicies();
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/edit-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        const orgName = req.params.orgName;
        const viewName = req.params.viewName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMApplication(req, applicationId);
        throttlingMetaData = await getAPIMThrottlingPolicies(req);        
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('edit-application');
        const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);

    }
    res.send(html);
}

async function getMockApplication() {
    const mockApplicationMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'DefaultApplication.json');
    const mockApplicationMetaData = JSON.parse(fs.readFileSync(mockApplicationMetaDataPath, 'utf-8'));
    return mockApplicationMetaData;
}

async function getMockKeyManagers() {
    const mockKeyManagersMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'AllKeyManagers.json');
    const mockKeyManagersMetaData = JSON.parse(fs.readFileSync(mockKeyManagersMetaDataPath, 'utf-8'));
    return mockKeyManagersMetaData.list;
}

async function getAPIMApplication(req, applicationId) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/applications/' + applicationId, null, null);
    return responseData;
}

async function getAPIMKeyManagers(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/key-managers', null, null);
    return responseData.list;
}

module.exports = {
    loadApplications,
    loadThrottlingPolicies,
    loadApplication,
    loadApplicationForEdit
};