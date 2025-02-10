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
const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, loadMarkdown } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const util = require('../utils/util');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const apiMetadataService = require('../services/apiMetadataService');
const adminService = require('../services/adminService');
const subscriptionPolicyDTO = require('../dto/subscriptionPolicy');
const { CustomError } = require('../utils/errors/customErrors');


const filePrefix = config.pathToContent;
const generateArray = (length) => Array.from({ length });

const loadAPIs = async (req, res) => {

    const orgName = req.params.orgName;
    let html;
    if (config.mode === constants.DEV_MODE) {
        const templateContent = {
            apiMetadata: await loadAPIMetaDataList(),
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate(filePrefix + 'pages/apis/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const viewName = req.params.viewName;
            const searchTerm = req.query.query;
            const tags = req.query.tags;
            const metaData = await loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName);
            const apiData = await loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName);
            let apiTags = [];
            apiData.forEach(api => {
                if (api.apiInfo.tags) {
                    api.apiInfo.tags.forEach(tag => {
                        if (!apiTags.includes(tag)) {
                            apiTags.push(tag);
                        }
                    });
                }
            });
            const templateContent = {
                apiMetadata: metaData,
                tags: apiTags,
                baseUrl: '/' + orgName + '/views/' + viewName
            };
            html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/apis", viewName);
        } catch (error) {
            console.error(constants.ERROR_MESSAGE.API_LISTING_LOAD_ERROR, error);
            html = constants.ERROR_MESSAGE.API_LISTING_LOAD_ERROR;

        }
    }
    res.send(html);
}

const loadAPIContent = async (req, res) => {

    let html;
    const hbs = exphbs.create({});
    const { orgName, apiName } = req.params;

    if (config.mode === constants.DEV_MODE) {
        const metaData = loadAPIMetaDataFromFile(apiName);
        const filePath = path.join(process.cwd(), filePrefix + '../mock', req.params.apiName + "/" + constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME);
        if (fs.existsSync(filePath)) {
            hbs.handlebars.registerPartial('api-content', fs.readFileSync(filePath, constants.CHARSET_UTF8));
        }
        let subscriptionPlans = [];
        metaData.subscriptionPolicies.forEach(policy => {
            const subscriptionPlan = {
                name: policy.policyName,
                description: "Sample description",
                tierPlan: "Sample tier"
            };
            subscriptionPlans.push(subscriptionPlan);
        });

        const templateContent = {
            devMode: true,
            providerUrl: '#subscriptionPlans',
            apiContent: await loadMarkdown(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, filePrefix + '../mock/' + req.params.apiName),
            apiMetadata: metaData,
            subscriptionPlans: subscriptionPlans,
            baseUrl: constants.BASE_URL + config.port,
            schemaUrl: orgName + '/mock/' + apiName + '/apiDefinition.xml'
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
        res.send(html);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiName);
            const viewName = req.params.viewName;
            const metaData = await loadAPIMetaData(req, orgID, apiID);
            let subscriptionPlans = [];

            //load subscription plans for authenticated users
            for (const policy of metaData.subscriptionPolicies) {
                const subscriptionPlan = await loadSubscriptionPlan(orgID, policy.policyName);
                subscriptionPlans.push({
                    displayName: subscriptionPlan.displayName,
                    policyName: subscriptionPlan.policyName,
                    description: subscriptionPlan.description,
                    billingPlan: subscriptionPlan.billingPlan,
                });

            }

            let providerUrl;
            if (metaData.provider === "WSO2") {
                providerUrl = '#subscriptionPlans';
            } else {
                const providerList = await adminService.getAllProviders(orgID);
                providerUrl = providerList.find(provider => provider.name === metaData.provider)?.providerURL || '#subscriptionPlans';
            }

            const templateContent = {
                provider: metaData.provider,
                providerUrl: providerUrl,
                apiMetadata: metaData,
                subscriptionPlans: subscriptionPlans,
                baseUrl: '/' + orgName + '/views/' + viewName,
                schemaUrl: `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}/${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}${constants.FILE_NAME.API_DEFINITION_XML}`
            };
            html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/api-landing", viewName);
            res.send(html);
        } catch (error) {
            console.error(`Failed to load api content: ,${error}`);
            html = "An error occurred while loading the API content.";
        }
    }
}

const loadSubscriptionPlan = async (orgID, policyName) => {

    try {
        const policyData = await apiDao.getSubscriptionPolicyByName(orgID, policyName);
        if (policyData) {
            return new subscriptionPolicyDTO(policyData);
        } else {
            throw new CustomError(404, constants.ERROR_CODE[404], constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND);
        }
    } catch (error) {
        console.error("Error occurred while loading subscription plans", error);
        util.handleError(res, error);
    }
}

const loadTryOutPage = async (req, res) => {

    const { orgName, apiName, viewName } = req.params;
    let html = "";
    if (config.mode === constants.DEV_MODE) {
        const metaData = loadAPIMetaDataFromFile(apiName);
        let apiDefinition = path.join(process.cwd(), filePrefix + '../mock', req.params.apiName + '/apiDefinition.json');
        if (fs.existsSync(apiDefinition)) {
            apiDefinition = await fs.readFileSync(apiDefinition, constants.CHARSET_UTF8);
        }
        const templateContent = {
            apiMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port,
            apiType: metaData.apiInfo.apiType,
            swagger: apiDefinition
        }
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiName);
            const metaData = await loadAPIMetaData(req, orgID, apiID);
            let apiDefinition;
            if (metaData.apiInfo.apiType !== "GraphQL") {
                apiDefinition = "";
                apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, orgID, apiID);
                apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8);
            }
            const templateContent = {
                apiMetadata: metaData,
                baseUrl: req.params.orgName + '/views/' + viewName,
                apiType: metaData.apiInfo.apiType,
                swagger: apiDefinition
            };
            const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'tryout', 'page.hbs');
            const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
            const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
            html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        } catch (error) {
            console.error(`Failed to load api tryout :`, error);
        }
    }
    res.send(html);
}

async function loadAPIMetaDataList() {

    const mockAPIMetaDataPath = path.join(process.cwd(), filePrefix + '../mock', 'apiMetadata.json');
    let mockAPIMetaData = JSON.parse(fs.readFileSync(mockAPIMetaDataPath, 'utf-8'));
    mockAPIMetaData.forEach(element => {
        const randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
    });
    return mockAPIMetaData;
}

async function loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName) {

    let groups = "";
    let groupList = [];
    if (req.user && req.user[constants.ROLES.GROUP_CLAIM]) {
        groups = req.user[constants.ROLES.GROUP_CLAIM];
    }
    if (groups !== "") {
        groupList = groups.split(" ");
    }
    let metaData = await apiMetadataService.getMetadataListFromDB(orgID, groupList, searchTerm, tags, null, null, viewName);
    metaData.forEach(element => {
        const randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
        const images = element.apiInfo.apiImageMetadata;
        let apiImageUrl = '';
        for (const key in images) {
            apiImageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.API_FILE_PATH}${element.apiID}${constants.API_TEMPLATE_FILE_NAME}`;
            const modifiedApiImageURL = apiImageUrl + images[key];
            element.apiInfo.apiImageMetadata[key] = modifiedApiImageURL;
        }
    });
    let data = JSON.stringify(metaData);
    return JSON.parse(data);
}

async function loadAPIMetaData(req, orgID, apiID, viewName) {

    let metaData = {};
    metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID, viewName);
    const data = metaData ? JSON.stringify(metaData) : {};
    metaData = JSON.parse(data);
    //replace image urls
    let images = metaData.apiInfo.apiImageMetadata;
    for (const key in images) {
        let apiImageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}`
        const modifiedApiImageURL = apiImageUrl + images[key]
        images[key] = modifiedApiImageURL;
    }
    return metaData;
}

function loadAPIMetaDataFromFile(apiName) {

    const mockAPIDataPath = path.join(process.cwd(), filePrefix + '../mock', apiName + '/apiMetadata.json');
    return JSON.parse(fs.readFileSync(mockAPIDataPath, constants.CHARSET_UTF8));
}

module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage,
};
