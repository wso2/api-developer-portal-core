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
const { ApplicationDTO } = require('../dto/application');
const SwaggerParser = require("swagger-parser");

const filePrefix = config.pathToContent;
const generateArray = (length) => Array.from({ length });
const baseURLDev = config.baseUrl + constants.ROUTE.VIEWS_PATH;

const loadAPIs = async (req, res) => {

    const { orgName, viewName } = req.params;
    let html;
    if (config.mode === constants.DEV_MODE) {
        const metaDataList = await loadAPIMetaDataList();
        for (const metaData of metaDataList) {
            let subscriptionPlans = [];
            subscriptionPlans.push({
                displayName: "Sample",
                policyName: "Sample",
                description: "Sample",
                billingPlan: "Sample",
                requestCount: "1000",
            });
            metaData.subscriptionPolicyDetails = subscriptionPlans;
        }
        const templateContent = {
            apiMetadata: metaDataList,
            baseUrl: baseURLDev + viewName
        }
        html = renderTemplate(filePrefix + 'pages/apis/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const searchTerm = req.query.query;
            const tags = req.query.tags;
            const metaDataList = await loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName);
            const apiData = await loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName);
            let appList = [];
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

            for (const metaData of metaDataList) {
                metaData.subscriptionPolicyDetails = await util.appendSubscriptionPlanDetails(orgID, metaData.subscriptionPolicies);
                if (req.user) {
                    let applications = await adminDao.getApplications(orgID, req.user.sub);
                    if (applications.length > 0) {
                        appList = await Promise.all(
                            applications.map(async (app) => {
                                const subscription = await adminDao.getAppApiSubscription(orgID, app.APP_ID, metaData.apiID);
                                return {
                                    ...new ApplicationDTO(app),
                                    subscribed: subscription.length > 0,
                                };
                            })
                        );
                    }
                }
                metaData.applications = appList;
            }

            const templateContent = {
                isAuthenticated: req.isAuthenticated(),
                apiMetadata: metaDataList,
                tags: apiTags,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                orgID: orgID,
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
    let { orgName, apiHandle, viewName } = req.params;

    if (config.mode === constants.DEV_MODE) {
        const metaData = loadAPIMetaDataFromFile(apiHandle);
        const filePath = path.join(process.cwd(), filePrefix + '../mock', apiHandle + "/" + constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME);
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
            baseUrl: baseURLDev + viewName,
            schemaUrl: orgName + '/mock/' + apiName + '/apiDefinition.xml'
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
        res.send(html);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiHandle);
            const metaData = await loadAPIMetaData(req, orgID, apiID);
            let subscriptionPlans = await util.appendSubscriptionPlanDetails(orgID, metaData.subscriptionPolicies);

            let providerUrl;
            if (metaData.provider === "WSO2") {
                providerUrl = '#subscriptionPlans';
            } else {
                const providerList = await adminService.getAllProviders(orgID);
                providerUrl = providerList.find(provider => provider.name === metaData.provider)?.providerURL || '#subscriptionPlans';
            }
            //check whether api content exists
            let loadDefault = false
            let apiDefinition, apiDetails = "";
            const markdownResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, orgID, apiID);
            if (!markdownResponse) {
                let additionalAPIContentResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME, orgID, apiID);
                if (!additionalAPIContentResponse) {
                    loadDefault = true;
                    if (metaData.apiInfo.apiType !== "GraphQL") {
                        apiDefinition = "";
                        apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, orgID, apiID);
                        apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8);
                    }
                    apiDetails = await parseSwaggerFromObject(JSON.parse(apiDefinition));
                }
            }
            let appList = [];
            let applications = await adminDao.getApplications(orgID, req.user.sub);
            if (applications.length > 0) {
                appList = await Promise.all(
                    applications.map(async (app) => {
                        const subscription = await adminDao.getAppApiSubscription(orgID, app.APP_ID, metaData.apiID);
                        return {
                            ...new ApplicationDTO(app),
                            subscribed: subscription.length > 0,
                        };
                    })
                );
            }

            const templateContent = {
                applications: appList,
                provider: metaData.provider,
                providerUrl: providerUrl,
                apiMetadata: metaData,
                subscriptionPlans: subscriptionPlans,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                schemaUrl: `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}/${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}${constants.FILE_NAME.API_DEFINITION_XML}`,
                loadDefault: loadDefault,
                resources: apiDetails,
                orgID: orgID
            };
            html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/api-landing", viewName);
            res.send(html);
        } catch (error) {
            console.error(`Failed to load api content:`, error);
            html = "An error occurred while loading the API content.";
        }
    }
}

const loadTryOutPage = async (req, res) => {

    const { orgName, apiHandle, viewName } = req.params;
    let html = "";
    if (config.mode === constants.DEV_MODE) {
        const metaData = loadAPIMetaDataFromFile(apiHandle);
        let apiDefinition = path.join(process.cwd(), filePrefix + '../mock', apiHandle + '/apiDefinition.json');
        if (fs.existsSync(apiDefinition)) {
            apiDefinition = await fs.readFileSync(apiDefinition, constants.CHARSET_UTF8);
        }
        const templateContent = {
            apiMetadata: metaData,
            baseUrl: baseURLDev + viewName,
            apiType: metaData.apiInfo.apiType,
            swagger: apiDefinition
        }
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiHandle);
            const metaData = await loadAPIMetaData(req, orgID, apiID);
            let apiDefinition;
            if (metaData.apiInfo.apiType !== "GraphQL") {
                apiDefinition = "";
                apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, orgID, apiID);
                apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8);
            }
            const templateContent = {
                apiMetadata: metaData,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
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
    });
    util.appendAPIImageURL(metaData, req, orgID);

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

async function parseSwaggerFromObject(swaggerObject) {
    try {
        // Dereference the Swagger object (resolve $ref references)
        const api = await SwaggerParser.dereference(swaggerObject);
        const servers = api.servers || [];
        // Extract API metadata
        const apiTitle = api.info?.title || "No title";
        const apiDescription = api.info?.description || "No description available";

        // Extract endpoints
        const endpoints = Object.entries(api.paths || {}).map(([path, methods]) => ({
            path,
            methods: Object.keys(methods).map(method => ({
                path: path,
                method: method.toUpperCase(),
                summary: methods[method]?.summary || "No summary",
                description: methods[method]?.description || "No description",
            })),
        }));
        return { title: apiTitle, description: apiDescription, serverDetails: servers, endpoints };
    } catch (error) {
        console.error("Error parsing Swagger data:", error);
    }
}

module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage,
};
