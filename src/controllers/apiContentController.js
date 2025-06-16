/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
const { ApplicationDTO } = require('../dto/application');
const APIDTO = require('../dto/apiDTO');
const controlPlaneUrl = config.controlPlane.url;

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
            const orgDetails = await adminDao.getOrganization(orgName);
            const cpOrgID = orgDetails.ORGANIZATION_IDENTIFIER;
            req.cpOrgID = cpOrgID;
            const orgID = orgDetails.ORG_ID;
            const searchTerm = req.query.query;
            const tags = req.query.tags;
            let metaDataList = await loadAPIMetaDataListFromAPI(req, orgID, orgName, searchTerm, tags, viewName);
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
            //retrieve api list from control plane
            const allowedAPIList = await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis?limit=1000`, {}, {});
            if (allowedAPIList) {
                //filter apis based on the roles
                metaDataList = util.filterAllowedAPIs(metaDataList, allowedAPIList.list);
            } else {
                console.log("Cannot retrieve allowed API list from control plane");
                metaDataList = [];
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
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs',
            constants.COMMON_ERROR_MESSAGE , true);
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
            schemaUrl: orgName + '/mock/' + apiHandle + '/apiDefinition.xml'
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
        res.send(html);
    } else {
        try {
            const orgDetails = await adminDao.getOrganization(orgName);
            const cpOrgID = orgDetails.ORGANIZATION_IDENTIFIER;
            req.cpOrgID = cpOrgID;
            const orgID = orgDetails.ORG_ID;
            const apiID = await apiDao.getAPIId(orgID, apiHandle);
            const metaData = await loadAPIMetaData(req, orgID, apiID);
            let apiName = metaData? metaData.apiHandle?.split('-v')[0] : "";
            const version = metaData? metaData.apiInfo.apiVersion : "";
            //check whether user has access to the API
            let allowedAPIList = await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis?query=name:"${apiName}"+version:${version}`, {}, {});
            if (allowedAPIList.count === 0) {
                apiName = metaData.apiInfo.apiName;
                allowedAPIList = await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis?query=name:"${apiName}"+version:${version}`, {}, {});
                
            }
            let templateContent = {
                errorMessage: constants.ERROR_MESSAGE.UNAUTHORIZED_API
            }
            if (allowedAPIList.count === 0) {
                if (!(req.user)) {
                    console.log("User is not authorized to access the API or user session expired, hence redirecting to login page");
                    res.redirect(req.originalUrl.split("/api/")[0] + '/login');
                } else {
                    html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
                    res.send(html);
                }
            }
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
            let apiDetails = "";
            let schemaDefinition = "";
            let apiDefinition = {};
            const markdownResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
            if (!markdownResponse) {
                let additionalAPIContentResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
                if (!additionalAPIContentResponse) {
                    loadDefault = true;
                    if (metaData.apiInfo && metaData.apiInfo.apiType !== "GraphQL") {
                        apiDefinition = "";
                        apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, constants.DOC_TYPES.API_DEFINITION, orgID, apiID);
                        apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8);
                        apiDetails = await parseSwagger(JSON.parse(apiDefinition))
                        if (metaData.endPoints.productionURL === "" && metaData.endPoints.sandboxURL === "") {
                            apiDetails["serverDetails"] = "";
                        } else {
                            apiDetails["serverDetails"] = metaData.endPoints;
                        }
                    }
                    if (constants.API_TYPE.MCP === metaData.apiInfo?.apiType) {
                        try {
                            let rawSchema = await apiDao.getAPIFile(
                                constants.FILE_NAME.SCHEMA_DEFINITION_FILE_NAME,
                                constants.DOC_TYPES.SCHEMA_DEFINITION,
                                orgID,
                                apiID
                            );
                            const schemaString = rawSchema.API_FILE.toString(constants.CHARSET_UTF8);
                            schemaDefinition = JSON.parse(schemaString);
                        } catch (err) {
                            console.error("Failed to load or parse schema definition:", err);
                            throw err;
                        }
                    }
                }
            }
            let appList = [];
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
            templateContent = {
                isAuthenticated: req.isAuthenticated(),
                applications: appList,
                provider: metaData.provider,
                providerUrl: providerUrl,
                apiMetadata: metaData,
                subscriptionPlans: subscriptionPlans,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                schemaUrl: `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}/${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}${constants.FILE_NAME.API_DEFINITION_XML}`,
                loadDefault: loadDefault,
                resources: apiDetails,
                orgID: orgID,
                schemaDefinition: schemaDefinition,
            };
        html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/api-landing", viewName);
        } catch (error) {
            console.error(`Failed to load api content:`, error);
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', 
            constants.COMMON_ERROR_MESSAGE, true);
            res.send(html);
        }
        res.send(html);
    }
}

const loadAPIDefinition = async (orgName, viewName, apiHandle) => {

    let metaData, templateContent = {};
    if (config.mode === constants.DEV_MODE) {
        metaData = loadAPIMetaDataFromFile(apiHandle);
        let apiDefinition = path.join(process.cwd(), filePrefix + '../mock', apiHandle + '/apiDefinition.json');
        if (fs.existsSync(apiDefinition)) {
            apiDefinition = await fs.readFileSync(apiDefinition, constants.CHARSET_UTF8);
        }
        templateContent.apiType = metaData.apiInfo.apiType;
        templateContent.swagger = JSON.parse(apiDefinition);
    } else {
        const orgID = await adminDao.getOrgId(orgName);
        const apiID = await apiDao.getAPIId(orgID, apiHandle);
        metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID, viewName);
        const data = metaData ? JSON.stringify(metaData) : {};
        metaData = JSON.parse(data);
        apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, constants.DOC_TYPES.API_DEFINITION, orgID, apiID);
        apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8);
        templateContent.apiType = metaData.apiInfo.apiType;
        templateContent.swagger = apiDefinition;
        templateContent.metaData = metaData;
    }
    return templateContent;
}

const loadDocsPage = async (req, res) => {

    const { orgName, apiHandle, viewName, docType } = req.params;
    let html = "";
    if (config.mode === constants.DEV_MODE) {
        const apiMetadata = await loadAPIMetaDataFromFile(apiHandle);
        const docNames = apiMetadata.docTypes;
        const templateContent = {
            apiMD: await loadMarkdown("api-doc.md", filePrefix + '../mock/' + apiHandle + "/" + docType),
            baseUrl: constants.BASE_URL + config.port + "/views/" + viewName + "/api/" + apiHandle,
            docTypes: docNames
        }
        html = renderTemplate(filePrefix + 'pages/docs/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiHandle);
            const viewName = req.params.viewName;
            const docNames = await apiMetadataService.getAPIDocTypes(orgID, apiID)
            const templateContent = {
                baseUrl: '/' + orgName + '/views/' + viewName + "/api/" + apiHandle,
                docTypes: docNames
            };
            html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/docs", viewName);
        } catch (error) {
            console.error(`Failed to load api docs:`, error);
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', 
            constants.COMMON_ERROR_MESSAGE, true);
        }
    }
    res.send(html);
}

const loadDocument = async (req, res) => {

    const { orgName, apiHandle, viewName, docType, docName } = req.params;
    const hbs = exphbs.create({});
    let templateContent = {
        "isAPIDefinition": false
    };
    const orgDetails = await adminDao.getOrganization(orgName);
    const cpOrgID = orgDetails.ORGANIZATION_IDENTIFIER;
    req.cpOrgID = cpOrgID;
    const definitionResponse = await loadAPIDefinition(orgName, viewName, apiHandle);
    templateContent.apiType = definitionResponse.apiType;
    let apiMetadata = definitionResponse.metaData;
    let apiName = apiMetadata ? apiMetadata.apiHandle?.split('-v')[0] : "";
    const version = apiMetadata ? apiMetadata.apiInfo.apiVersion : "";
    //check whether user has access to the API

    let allowedAPIList = await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis?query=name:"${apiName}"+version:${version}`, {}, {});
    if (allowedAPIList.count == 0) {
        apiName = apiMetadata.apiInfo.apiName;
        allowedAPIList = await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis?query=name:"${apiName}"+version:${version}`, {}, {});
    }
    if (allowedAPIList.count === 0) {
        templateContent = {
            errorMessage: constants.ERROR_MESSAGE.UNAUTHORIZED_API
        }
        html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
        res.send(html);
    }
    //load API definition
    if (req.originalUrl.includes(constants.FILE_NAME.API_SPECIFICATION_PATH)) {
       
      
        let modifiedSwagger = replaceEndpointParams(JSON.parse(definitionResponse.swagger), apiMetadata.endPoints.productionURL, apiMetadata.endPoints.sandboxURL);
        const response = await util.invokeApiRequest(req, 'GET', controlPlaneUrl + `/apis/${apiMetadata.apiReferenceID}`, null, null);
        if (response.securityScheme.includes("api_key")) {
            modifiedSwagger.components.securitySchemes.ApiKeyAuth = { "type": "apiKey", "name": `${response.apiKeyHeader}`, "in": "header" };
            for (let path in modifiedSwagger.paths) {
                for (let method in modifiedSwagger.paths[path]) {
                    if (modifiedSwagger.paths[path].hasOwnProperty(method)) {
                        modifiedSwagger.paths[path][method].security[0].ApiKeyAuth = [];
                    }
                }
            }
        }
        templateContent.swagger = JSON.stringify(modifiedSwagger);
        templateContent.isAPIDefinition = true;
    }
    if (config.mode === constants.DEV_MODE) {
        const apiMetadata = await loadAPIMetaDataFromFile(apiHandle);
        const docNames = apiMetadata.docTypes;
        let apiMD = "";
        if (docType !== undefined && docName !== undefined) {
            const filePath = path.join(process.cwd(), filePrefix + '../mock', apiHandle + "/" + docType + "/" + docName);
            if (fs.existsSync(filePath) && (filePath.endsWith('.hbs') || filePath.endsWith('.html'))) {
                hbs.handlebars.registerPartial(constants.FILE_NAME.API_DOC_PARTIAL_NAME, fs.readFileSync(filePath, constants.CHARSET_UTF8));
            }
            apiMD = await loadMarkdown(docName, filePrefix + '../mock/' + apiHandle + "/" + docType);
        }
        templateContent.baseUrl = constants.BASE_URL + config.port + "/views/" + viewName + "/api/" + apiHandle;
        templateContent.docTypes = docNames;
        templateContent.apiMD = apiMD;
        html = renderTemplate(filePrefix + 'pages/docs/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false);
    } else {
        try {
            const orgID = await adminDao.getOrgId(orgName);
            const apiID = await apiDao.getAPIId(orgID, apiHandle);
            const viewName = req.params.viewName;
            const docNames = await apiMetadataService.getAPIDocTypes(orgID, apiID)
            templateContent.baseUrl = '/' + orgName + '/views/' + viewName + "/api/" + apiHandle;
            templateContent.docTypes = docNames;
            html = await renderTemplateFromAPI(templateContent, orgID, orgName, "pages/docs", viewName);
        } catch (error) {
            console.error(`Failed to load api content :`, error);
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', 
            constants.COMMON_ERROR_MESSAGE, true);
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
    if (metaData !== "") {
        const data = metaData ? JSON.stringify(metaData) : {};
        metaData = JSON.parse(data);
        //replace image urls
        let images = metaData.apiInfo.apiImageMetadata;
        for (const key in images) {
            let apiImageUrl = `${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}`;
            const modifiedApiImageURL = apiImageUrl + images[key];
            images[key] = modifiedApiImageURL;
        }
    }
    return metaData;
}

function loadAPIMetaDataFromFile(apiName) {

    const mockAPIDataPath = path.join(process.cwd(), filePrefix + '../mock', apiName + '/apiMetadata.json');
    return JSON.parse(fs.readFileSync(mockAPIDataPath, constants.CHARSET_UTF8));
}

async function parseSwagger(api) {
    try {
        // Extract general API info
        const title = api.info?.title || "No title";
        const apiDescription = api.info?.description || "No description available";
        //const servers = api.servers || [];

        // Extract endpoints
        const endpoints = Object.entries(api.paths || {}).map(([path, methods]) => ({
            path,
            methods: Object.keys(methods).map(method => ({
                method: method.toUpperCase(),
                summary: methods[method]?.summary || "No summary",
                description: methods[method]?.description || "No description",
            })),
        }));
        return { title, description: apiDescription, endpoints };
    } catch (error) {
        console.error("Error parsing OpenAPI:", error);
    }
}

function replaceEndpointParams(apiDefinition, prodEndpoint, sandboxEndpoint) {

    if (apiDefinition?.swagger?.startsWith('2.')) {
        if (prodEndpoint.trim().length !== 0) {
            apiDefinition.host = prodEndpoint.replace(/https?:\/\//, '');
            apiDefinition.schemes = [prodEndpoint.startsWith('https') ? 'https' : 'http'];
        }
    }
    let servers = [];
    if (prodEndpoint.trim().length !== 0) {
        servers.push({
            url: prodEndpoint
        });
    }
    if (sandboxEndpoint.trim().length !== 0) {
        servers.push({
            url: sandboxEndpoint
        });
    }
    apiDefinition.servers = servers;
    return apiDefinition;
}

module.exports = {
    loadAPIs,
    loadAPIContent,
    loadDocsPage,
    loadDocument,
};
