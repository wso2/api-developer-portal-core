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
const { renderTemplate, renderGivenTemplate, loadLayoutFromAPI, invokeApiRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const adminDao = require('../dao/admin');
const apiMetadata = require('../dao/apiMetadata');
const util = require('../utils/util');
const filePrefix = config.pathToContent;
const controlPlaneUrl = config.controlPlane.url;
const aiSDKServiceUrl = config.aiSDKService?.url || 'http://localhost:5001';
const aiSDKServiceEndpoints = config.aiSDKService?.endpoints || {
    mergeSpecs: '/merge-openapi-specs',
    generateApp: '/generate-application-code'
};
const { ApplicationDTO } = require('../dto/application');
const APIDTO = require('../dto/apiDTO');
const adminService = require('../services/adminService');
const baseURLDev = config.baseUrl + constants.ROUTE.VIEWS_PATH;
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const os = require('os');
const archiver = require('archiver');
const unzipper = require('unzipper');
const js = require('@eslint/js');


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

    const viewName = req.params.viewName;
    const orgName = req.params.orgName;
    const orgDetails = await adminDao.getOrganization(orgName);
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.API_TYPE.DEFAULT;
    let html, metaData, templateContent;
    try {
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplications();
            templateContent = {
                applicationsMetadata: metaData,
                baseUrl: baseURLDev + viewName
            }
            html = renderTemplate('../pages/applications/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const orgName = req.params.orgName;
            const orgID = await orgIDValue(orgName);
            const applications = await adminDao.getApplications(orgID, req.user.sub)
            const metaData = await Promise.all(
                applications.map(async (application) => {
                    const subApis = await adminDao.getSubscriptions(orgID, application.APP_ID, '');
                    return {
                        ...new ApplicationDTO(application),
                        subscriptionCount: subApis.length
                    };
                })
            );
            templateContent = {
                applicationsMetadata: metaData,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                devportalMode: devportalMode
            }
            const templateResponse = await templateResponseValue('applications');
            const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
            if (layoutResponse === "") {
                html = renderTemplate('../pages/applications/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
            } else {
                html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
            }
        }
    } catch (error) {
        console.error("Error occurred while loading Applications", error);
        html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs',
            constants.COMMON_ERROR_MESSAGE, true);
    }
    res.send(html);
}

async function getMockApplications() {
    const mockApplicationsMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'applications.json');
    const mockApplicationsMetaData = JSON.parse(fs.readFileSync(mockApplicationsMetaDataPath, 'utf-8'));
    return mockApplicationsMetaData.list;
}

// ***** Load Application *****

const loadApplication = async (req, res) => {
    let html, templateContent, metaData, kMmetaData;
    const viewName = req.params.viewName;
    const orgName = req.params.orgName;
    const orgDetails = await adminDao.getOrganization(orgName);
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.API_TYPE.DEFAULT;
    try {
        const applicationId = req.params.applicationId;
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplication();
            kMmetaData = await getMockKeyManagers();
            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: baseURLDev + viewName
            }
            html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const orgName = req.params.orgName;
            const orgID = await orgIDValue(orgName);
            let groupList = [];
            if (req.query.groups) {
                groupList.push(req.query.groups.split(" "));
            }
            const subAPIs = await adminDao.getSubscribedAPIs(orgID, applicationId);
            const allAPIs = await apiMetadata.getAllAPIMetadata(orgID, groupList, viewName);

            const subscribedAPIIds = new Set(subAPIs.map(api => api.API_ID));
            const nonSubscribedAPIs = allAPIs
                .filter(api => !subscribedAPIIds.has(api.API_ID) && api.DP_SUBSCRIPTION_POLICies.length > 0)
                .map(api => new APIDTO(api));

            const userID = req[constants.USER_ID]
            const applicationList = await adminService.getApplicationKeyMap(orgID, applicationId, userID);
            metaData = applicationList;
            let applicationReference = "";
            let applicationKeyList;
            if (applicationList.appMap) {
                applicationReference = applicationList.appMap[0].appRefID;
                applicationKeyList = await getApplicationKeys(applicationList.appMap, req);
            }
            let otherAPICount = 0;
            let mcpAPICount = 0;
            let subList = [];
            if (subAPIs.length > 0) {

                subList = await Promise.all(subAPIs.map(async (sub) => {
                    const api = new APIDTO(sub);
                    let apiDTO = {};
                    apiDTO.apiInfo = {};
                    apiDTO.name = api.apiInfo.apiName;
                    apiDTO.apiID = api.apiID;
                    apiDTO.version = api.apiInfo.apiVersion;
                    apiDTO.apiType = api.apiInfo.apiType;
                    apiDTO.apiInfo.apiImageMetadata = api.apiInfo.apiImageMetadata;
                    apiDTO.image = api.apiInfo.apiImageMetadata["api-icon"];
                    apiDTO.subID = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues.SUB_ID;
                    apiDTO.policyID = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues.POLICY_ID;
                    apiDTO.refID = api.apiReferenceID;
                    apiDTO.apiHandle = api.apiHandle;
                    const apiDetails = await getAPIDetails(req, api.apiReferenceID);
                    const projectIdEntry = apiDetails?.additionalProperties?.find(item => item.name === 'projectId');
                    const projectId = projectIdEntry?.value;
                    if (apiDetails) {
                        apiDTO.security = apiDetails.securityScheme;
                    }
                    if (projectId) {
                        apiDTO.projectId = projectId;
                    }
                    const subPolicy = await apiMetadata.getSubscriptionPolicy(apiDTO.policyID, orgID);
                    if (subPolicy) {
                        apiDTO.policyName = subPolicy.dataValues.POLICY_NAME;
                    }
                    if (constants.API_TYPE.MCP === api.apiInfo.apiType) {
                        mcpAPICount++;
                    } else {
                        otherAPICount++;
                    }
                    const apiKeys = await getAPIKeys(req, api.apiReferenceID, applicationReference);
                    apiDTO.apiKeys = apiKeys;
                    apiDTO.subscriptionPolicyDetails = api.subscriptionPolicies;
                    apiDTO.scopes = apiDetails.scopes.map(scope => scope.key);
                    return apiDTO
                }));
            }
            let isApiKey = false
            let apiKeyList = subList.filter(api => api.security !== null && api.security.includes('api_key'));
            if (apiKeyList.length > 0) {
                isApiKey = true;
            }
            util.appendAPIImageURL(subList, req, orgID);

            await Promise.all(nonSubscribedAPIs.map(async (api) => {
                api.subscriptionPolicyDetails = await util.appendSubscriptionPlanDetails(orgID, api.subscriptionPolicies);
            }));
            kMmetaData = await getAPIMKeyManagers(req);
            kMmetaData = kMmetaData.filter(keyManager => keyManager.enabled);

            //TODO: handle multiple KM scenarios
            //select only one KM for chroeo.

            if (Array.isArray(kMmetaData) && kMmetaData.length > 1) {
                kMmetaData = kMmetaData.filter(keyManager =>
                    keyManager.name.includes("_internal_key_manager_") ||
                    (!kMmetaData.some(km => km.name.includes("_internal_key_manager_")) && keyManager.name.includes("Resident Key Manager")) ||
                    (!kMmetaData.some(km => km.name.includes("_internal_key_manager_") || km.name.includes("Resident Key Manager")) && keyManager.name.includes("_appdev_sts_key_manager_") && keyManager.name.endsWith("_prod"))
                );
            }

            for (var keyManager of kMmetaData) {
                if (keyManager.name === 'Resident Key Manager') {
                    keyManager.tokenEndpoint = 'https://sts.choreo.dev/oauth2/token';
                    keyManager.authorizeEndpoint = 'https://sts.choreo.dev/oauth2/authorize';
                    keyManager.revokeEndpoint = 'https://sts.choreo.dev/oauth2/revoke';
                }

                keyManager.availableGrantTypes = await mapGrants(keyManager.availableGrantTypes);
                keyManager.applicationConfiguration = await mapDefaultValues(keyManager.applicationConfiguration);
            }


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
                    clientName: client_name,
                    callbackUrl: key.callbackUrl,
                    appRefID: applicationReference
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

            let cpApplication = await getAPIMApplication(req, applicationReference);
            let subscriptionScopes = [];
            if (Array.isArray(cpApplication?.subscriptionScopes)) {
                for (const scope of cpApplication?.subscriptionScopes) {
                    subscriptionScopes.push(scope.key);
                }
            }
            //display only one key type (SANBOX).
            //TODO: handle multiple key types
            templateContent = {
                orgID: orgID,
                applicationMetadata: {
                    ...metaData,
                    subscriptionCount: subList.length
                },
                keyManagersMetadata: kMmetaData,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                subAPIs: subList,
                nonSubAPIs: nonSubscribedAPIs,
                productionKeys: productionKeys,
                isProduction: true,
                isApiKey: isApiKey,
                subscriptionScopes: subscriptionScopes,
                otherAPICount: otherAPICount,
                mcpAPICount: mcpAPICount,
                devportalMode: devportalMode
            }
            const templateResponse = await templateResponseValue('application');
            const layoutResponse = await loadLayoutFromAPI(orgID, viewName);
            if (layoutResponse === "") {
                html = renderTemplate('../pages/application/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
            } else {
                html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
            }
        }
    } catch (error) {
        console.error("Error occurred while loading application", error);
        if (Number(error?.statusCode) === 401) {
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', constants.COMMON_AUTH_ERROR_MESSAGE, true);
        } else { 
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', constants.COMMON_ERROR_MESSAGE, true);
        }    
    }
    res.send(html);
}

async function getApplicationKeys(applicationList, req) {

    //TODO: handle multiple CP applications
    for (const application of applicationList) {
        const appRef = application.appRefID;
        try {
            return await invokeApiRequest(req, 'GET', `${controlPlaneUrl}/applications/${appRef}/keys`, {}, {});
        } catch (error) {
            console.error("Error occurred while generating application keys", error);
            return null;
        }
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
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/key-managers?devPortalAppEnv=prod', null, null);
    return responseData.list;
}

async function getAPIDetails(req, apiId) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + `/apis/${apiId}`, null, null);
    return responseData;
}

async function getAPIKeys(req, apiId, applicationId) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + `/api-keys?apiId=${apiId}&keyType=PRODUCTION`, null, null);
    let apiKeys = {};
    for (const key of responseData) {
        if (key.application.id === applicationId) {
            apiKeys.key = key.keys;
            apiKeys.scopes = key.scopes;
        }
    }
    return apiKeys;
}

async function mapGrants(grantTypes) {

    let mappedGrantTypes = [];
    grantTypes.map(grantType => {
        if (grantType === 'password') {
            mappedGrantTypes.push({
                label: 'Password',
                name: grantType
            });
        } else if (grantType === 'client_credentials') {
            mappedGrantTypes.push(
                {
                    label: 'Client Credentials',
                    name: grantType
                }
            );
        } else if (grantType === 'refresh_token') {
            mappedGrantTypes.push(
                {
                    label: 'Refresh Token',
                    name: grantType
                }
            );
        } else if (grantType === 'authorization_code') {
            mappedGrantTypes.push(
                {
                    label: 'Authorization Code',
                    name: grantType
                }
            );
        } else if (grantType === 'implicit') {
            mappedGrantTypes.push(
                {
                    label: 'Implicit',
                    name: grantType
                }
            );
        }
    });
    return mappedGrantTypes;
}

async function mapDefaultValues(applicationConfiguration) {

    let appConfigs = [];
    let defaultConfigs = ["application_access_token_expiry_time", "user_access_token_expiry_time", "id_token_expiry_time"];
    applicationConfiguration.map(config => {
        if (defaultConfigs.includes(config.name) && config.default == 'N/A') {
            config.default = 900;
        } else if (config.name === 'refresh_token_expiry_time' && config.default == 'N/A') {
            config.default = 86400;
        }
        appConfigs.push(config);
    });
    return appConfigs;
}

const loadSDKGeneration = async (req, res) => {
    let html, templateContent, metaData;
    const viewName = req.params.viewName;
    const orgName = req.params.orgName;
    const applicationId = req.params.applicationId;
    const orgDetails = await adminDao.getOrganization(orgName);
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.API_TYPE.DEFAULT;
    
    try {
        if (config.mode === constants.DEV_MODE) {
            // Mock data for development
            metaData = await getMockApplication();
            const mockAPIs = [
                {
                    apiID: 'api-1',
                    name: 'Weather API',
                    version: '1.0.0',
                    apiType: 'REST',
                    image: '/images/apisHeroImg.svg'
                },
                {
                    apiID: 'api-2', 
                    name: 'User Management API',
                    version: '2.1.0',
                    apiType: 'REST',
                    image: '/images/apisHeroImg.svg'
                }
            ];
            templateContent = {
                applicationMetadata: metaData,
                subAPIs: mockAPIs,
                baseUrl: baseURLDev + viewName,
                orgName: orgName,
                viewName: viewName,
                applicationId: applicationId
            };
        } else {
            const orgID = await orgIDValue(orgName);
            const subAPIs = await adminDao.getSubscribedAPIs(orgID, applicationId);
            
            let subList = [];
            if (subAPIs.length > 0) {
                subList = await Promise.all(subAPIs.map(async (sub) => {
                    const api = new APIDTO(sub);
                    let apiDTO = {};
                    apiDTO.apiID = api.apiID;
                    apiDTO.name = api.apiInfo.apiName;
                    apiDTO.version = api.apiInfo.apiVersion;
                    apiDTO.apiType = api.apiInfo.apiType;
                    //apiDTO.image = api.apiInfo.apiImageMetadata["api-icon"] || '/images/apisHeroImg.svg';
                    apiDTO.subID = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues.SUB_ID;
                    return apiDTO;
                }));
            }
            
            // Get application metadata
            const userID = req[constants.USER_ID];
            const applicationList = await adminService.getApplicationKeyMap(orgID, applicationId, userID);
            metaData = applicationList;
            
            //util.appendAPIImageURL(subList, req, orgID);
            
            templateContent = {
                orgID: orgID,
                applicationMetadata: metaData,
                subAPIs: subList,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                orgName: orgName,
                viewName: viewName,
                applicationId: applicationId,
                devportalMode: devportalMode
            };
        }
        
        const templateResponse = await templateResponseValue('sdk-generation');
        if (config.mode === constants.DEV_MODE) {
            html = renderTemplate('../pages/sdk-generation/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const layoutResponse = await loadLayoutFromAPI(templateContent.orgID, viewName);
            if (layoutResponse === "") {
                html = renderTemplate('../pages/sdk-generation/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
            } else {
                html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
            }
        }
        
        res.send(html);
    } catch (error) {
        console.error('Error loading SDK generation page:', error);
        res.status(500).send('Error loading SDK generation page');
    }
};

// ***** Generate SDK *****

const generateSDK = async (req, res) => {
    try {
        const { selectedAPIs, sdkConfiguration } = req.body;
        const orgName = req.params.orgName;
        const applicationId = req.params.applicationId;

        // Validate input
        if (!selectedAPIs || selectedAPIs.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No APIs selected for SDK generation'
            });
        }

        // Get organization and API data
        const orgID = await orgIDValue(orgName);
        const apiSpecs = await apiMetadata.getAPISpecs(orgID, selectedAPIs);
        
        if (apiSpecs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No API specifications found for the selected APIs'
            });
        }

        const apiHandles = await getApiHandlers(orgID, selectedAPIs);
        const baseSdkName = sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`;

        // Prepare merged specification
        let mergedSpec;
        if (selectedAPIs.length === 1) {
            // Single API case
            mergedSpec = JSON.parse(apiSpecs[0].apiSpec);
        } else {
            // Multiple APIs case - merge specifications
            const mergeSpecApiRequest = prepareSDKGenerationRequest(apiSpecs, apiHandles);
            const mergedSpecsResponse = await invokeMergeSpecApi(mergeSpecApiRequest);
            mergedSpec = mergedSpecsResponse;
            console.log('Merged API specifications received');
        }

        // Generate SDK
        const sdkResult = await generateSDKWithOpenAPIGenerator(
            mergedSpec,
            sdkConfiguration,
            orgName,
            applicationId
        );

        console.log('SDK generated successfully, saved to:', sdkResult.sdkPath);

        // Process final ZIP based on mode
        let finalZipPath;
        const isAIMode = sdkConfiguration?.mode === 'ai';
        
        if (isAIMode) {
            finalZipPath = await processAIModeSDK(sdkResult, mergedSpec, sdkConfiguration, apiHandles, baseSdkName);
        } else {
            finalZipPath = await processDefaultModeSDK(sdkResult, apiHandles, baseSdkName);
        }

        // Send response
        const responseMessage = isAIMode 
            ? 'SDK and application code generated successfully' 
            : 'SDK generated successfully';

        res.json({
            success: true,
            message: responseMessage,
            data: {
                selectedAPIs: selectedAPIs,
                apiSpecsFound: apiSpecs.length,
                transformedApiHandles: apiHandles || [],
                sdkConfiguration: {
                    language: sdkConfiguration?.language || 'javascript',
                    name: baseSdkName,
                    version: '1.0.0',
                    packageName: baseSdkName,
                    mode: sdkConfiguration?.mode || 'default'
                },
                finalDownloadUrl: `/download/sdk/${path.basename(finalZipPath)}`,
                applicationCodeGenerated: isAIMode,
                mode: sdkConfiguration?.mode || 'default'
            }
        });
        
    } catch (error) {
        console.error('Error generating SDK:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating SDK',
            error: error.message
        });
    }
};

// ***** Helper Functions for SDK Generation *****


const getApiHandlers = async (orgID, selectedAPIs) => {
    const apiHandlesArray = [];
    
    for (const apiId of selectedAPIs) {
        try {
            const apiMetadataResult = await apiMetadata.getAPIMetadata(orgID, apiId);
            if (apiMetadataResult && apiMetadataResult.length > 0) {
                const apiData = apiMetadataResult[0];
                const apiHandle = apiData.API_HANDLE || apiData.dataValues?.API_HANDLE;
                
                if (apiHandle) {
                    // Transform API handle: financeapi-v1.0 -> financeapi/v1.0
                    const transformedHandle = apiHandle.replace(/-v(\d+\.\d+)$/, '/v$1');
                    apiHandlesArray.push(transformedHandle);
                }
            } else {
                console.warn(`No metadata found for API ${apiId}`);
            }
        } catch (error) {
            console.error(`Error loading metadata for API ${apiId}:`, error);
        }
    }
    
    return apiHandlesArray;
};

/**
 * Prepare the request payload for the merge OpenAPI specs API
 */
const prepareSDKGenerationRequest = (apiSpecs, apiHandlesArray) => {
    // Collect apiSpecString array for further processing
    const apiSpecStrings = apiSpecs.map(spec => {
        const parsedSpec = JSON.parse(spec.apiSpec);
        return JSON.stringify(parsedSpec).replace(/\n/g, '');
    });
    
    // Combine all specs using '\n'
    const allSpecsString = apiSpecStrings.join('\n');

    const apiHandleMap = {};
    apiHandlesArray.forEach((apiHandle, index) => {
        apiHandleMap[`spec${index + 1}`] = apiHandle;
    });
    
    return {
        "specifications": allSpecsString,
        "contexts": JSON.parse(JSON.stringify(apiHandleMap))
    };
}

/**
 * Invoke the backend merge OpenAPI specs API
 */
const invokeMergeSpecApi = async(requestPayload) => {
    try {
        const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.mergeSpecs}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        });
        if (!response.ok) {
            throw new Error(`Failed to merge API specifications: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error invoking merge spec API:", error);
        throw error;
    }
};

/**
 * Process AI mode SDK generation - extract SDK, generate application code, and create final ZIP
 */
const processAIModeSDK = async (sdkResult, mergedSpec, sdkConfiguration, apiHandles, baseSdkName) => {
    try {
        console.log('Processing AI mode SDK generation...');
        
        // Extract SDK methods for AI processing
        const sdkMethods = await extractMethodFile(sdkResult.sdkPath, sdkConfiguration?.language || 'java');
        
        // Generate application code using AI
        const applicationApiRequest = await getApplicationGenApiReqBody(
            sdkMethods.apiClassContent,
            sdkConfiguration?.language || 'java',
            mergedSpec,
            sdkConfiguration
        );
        
        const applicationCodeResponse = await invokeApplicationCodeGenApi(applicationApiRequest);
        
        // Create final ZIP with SDK + application code
        const finalZipName = createSDKFileName(apiHandles, baseSdkName, true);
        const finalZipResult = await processApplicationCodeAndCreateFinalZip(
            applicationCodeResponse,
            sdkResult.sdkPath,
            sdkConfiguration,
            finalZipName
        );
        
        return finalZipResult.finalZipPath;
        
    } catch (error) {
        console.error('Error processing AI mode SDK:', error);
        
        // Ensure cleanup of SDK folder even if processing fails
        try {
            await fs.promises.rm(sdkResult.sdkPath, { recursive: true, force: true });
            console.log('Cleaned up SDK folder after AI mode error');
        } catch (cleanupError) {
            console.error('Error cleaning up SDK folder:', cleanupError);
        }
        
        throw error;
    }
};

/**
 * Process default mode SDK generation - create ZIP with SDK only
 */
const processDefaultModeSDK = async (sdkResult, apiHandles, baseSdkName) => {
    try {
        console.log('Processing default mode SDK generation...');
        
        // Create ZIP filename and permanent directory
        const zipFileName = createSDKFileName(apiHandles, baseSdkName, false);
        const permanentDir = path.join(process.cwd(), 'generated-sdks');
        await fs.promises.mkdir(permanentDir, { recursive: true });
        
        // Create ZIP directly in permanent location
        const finalZipPath = path.join(permanentDir, zipFileName);
        
        // Create ZIP archive
        await createZipArchive(sdkResult.sdkPath, finalZipPath);
        console.log(`Default mode SDK ZIP created: ${finalZipPath}`);
        
        // Clean up temporary SDK directory
        await fs.promises.rm(sdkResult.sdkPath, { recursive: true, force: true });
        console.log('Cleaned up temporary SDK directory');
        
        return finalZipPath;
        
    } catch (error) {
        console.error('Error processing default mode SDK:', error);
        
        // Ensure cleanup of SDK folder even if processing fails
        try {
            await fs.promises.rm(sdkResult.sdkPath, { recursive: true, force: true });
            console.log('Cleaned up SDK folder after default mode error');
        } catch (cleanupError) {
            console.error('Error cleaning up SDK folder:', cleanupError);
        }
        
        throw error;
    }
};

/**
 * Create SDK filename based on API handles and mode
 */
const createSDKFileName = (apiHandles, baseSdkName, isAIMode) => {
    const apiHandlesSuffix = apiHandles.map(handle => 
        handle.replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
    ).join('-');
    
    const suffix = isAIMode ? '-with-app' : '';
    return `${baseSdkName}-${apiHandlesSuffix}${suffix}.zip`;
};

/**
 * Generate SDK using openapi-generator
 */
const generateSDKWithOpenAPIGenerator = async (mergedSpec, sdkConfiguration, orgName, applicationId) => {
    let tempDir = null;
    let outputDir = null;
    
    try {
        console.log('Starting SDK generation with OpenAPI Generator...');
        const language = sdkConfiguration?.language || 'javascript';
        const sdkName = sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`;
        
        // Create temporary directory for SDK generation
        tempDir = path.join(os.tmpdir(), 'sdk-generation', `${sdkName}-${Date.now()}`);
        const specFilePath = path.join(tempDir, 'merged-spec.json');
        outputDir = path.join(process.cwd(), 'generated-sdks', `${sdkName}-${Date.now()}`);
        
        // Create directories
        await fs.promises.mkdir(tempDir, { recursive: true });
        await fs.promises.mkdir(outputDir, { recursive: true });
        
        // Write merged spec to file
        await fs.promises.writeFile(specFilePath, JSON.stringify(mergedSpec, null, 2));
        
        // Determine the generator name based on language
        const generatorMap = {
            'javascript': 'javascript',
            'java': 'java'
        };
        
        const generator = generatorMap[language] || 'javascript';
        
        // Build openapi-generator command
        const command = [
            'openapi-generator-cli',
            'generate',
            '-i', specFilePath,
            '-g', generator,
            '-o', outputDir,
            '--package-name', sdkName,
            '--additional-properties',
            `packageName=${sdkName},projectName=${sdkName},packageVersion=1.0.0`
            ].join(' ');
        
        console.log(`Generating SDK with command: ${command}`);
        
        // Execute openapi-generator
        const { stdout, stderr } = await execAsync(command, { 
            cwd: tempDir,
            timeout: 120000 // 2 minutes timeout
        });
        
        if (stderr && !stderr.includes('WARN')) {
            console.warn('openapi-generator stderr:', stderr);
        }
                
        // Clean up temp directory
        //await fs.promises.rm(tempDir, { recursive: true, force: true });
        
        return {
            success: true,
            sdkPath: outputDir,
            language: language,
            sdkName: sdkName
        };
        
    } catch (error) {
        console.error('Error generating SDK with openapi-generator:', error);
        
        // Provide more specific error messages based on error type
        let errorMessage = 'SDK generation failed';
        
        if (error.message && error.message.includes('NullPointerException')) {
            errorMessage = 'SDK generation failed due to invalid OpenAPI specification. The specification may be missing required fields.';
        } else if (error.message && error.message.includes('Command failed')) {
            errorMessage = 'OpenAPI Generator failed to process the specification. Please check the API specification format.';
        } else if (error.code === 'ENOENT') {
            errorMessage = 'OpenAPI Generator CLI not found. Please install openapi-generator-cli: npm install -g @openapitools/openapi-generator-cli';
        } else if (error.message && error.message.includes('timeout')) {
            errorMessage = 'SDK generation timed out. The API specification might be too complex.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        // Clean up directories on error
        try {
            if (tempDir) {
                //await fs.promises.rm(tempDir, { recursive: true, force: true });
                console.log('Cleaned up temp directory after SDK generation error');
            }
            if (outputDir) {
                //await fs.promises.rm(outputDir, { recursive: true, force: true });
                console.log('Cleaned up output directory after SDK generation error');
            }
        } catch (cleanupError) {
            console.error('Error cleaning up directories after SDK generation error:', cleanupError);
        }
        
        throw new Error(errorMessage);
    }
};

/**
 * Create ZIP archive of the generated SDK
 */
const createZipArchive = async (sourceDir, outputPath) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', () => {
            console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
            resolve();
        });
        
        archive.on('error', (err) => {
            reject(err);
        });
        
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
};

/**
 * Extract ZIP and process SDK files to send to backend API
 */
const extractMethodFile = async (sdkDir, language) => {
    try {
        
        // Find the API class file based on language
        let apiClassFile = null;
        let apiClassContent = null;
        
        if (language === 'java') {
            // Look for DefaultApi.java file in src/main/java directory structure
            const javaApiPath = await findFileRecursively(sdkDir, 'DefaultApi.java');
            if (javaApiPath) {
                apiClassFile = javaApiPath;
                apiClassContent = await fs.promises.readFile(javaApiPath, 'utf8');
                console.log(`Found Java API class: ${javaApiPath}`);
            }
        } else if (language === 'javascript' || language === 'android') {
            // Look for API class in JavaScript/TypeScript SDKs
            const jsApiPath = await findFileRecursively(sdkDir, /.*[Aa]pi\.js$|.*[Aa]pi\.ts$/);
            if (jsApiPath) {
                apiClassFile = jsApiPath;
                apiClassContent = await fs.promises.readFile(jsApiPath, 'utf8');
                console.log(`Found JS/TS API class: ${jsApiPath}`);
            }
        } else if (language === 'python') {
            // Look for API class in Python SDKs
            const pythonApiPath = await findFileRecursively(sdkDir, /.*_api\.py$|.*api\.py$/);
            if (pythonApiPath) {
                apiClassFile = pythonApiPath;
                apiClassContent = await fs.promises.readFile(pythonApiPath, 'utf8');
                console.log(`Found Python API class: ${pythonApiPath}`);
            }
        }
        
        if (!apiClassContent) {
            console.warn(`No API class file found for language: ${language}`);
        }
        
        return {
            apiClassContent: apiClassContent || '',
            apiClassFile: path.basename(apiClassFile || 'UnknownApi'),
            apiClassFound: !!apiClassContent,
            SdkPath: sdkDir
        };
        
    } catch (error) {
        console.error('Error extracting and processing SDK:', error);
        throw error;
    }
};

/**
 * Recursively find a file by name or pattern
 */
const findFileRecursively = async (dir, filePattern) => {
    try {
        const items = await fs.promises.readdir(dir, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            
            if (item.isDirectory()) {
                const result = await findFileRecursively(fullPath, filePattern);
                if (result) return result;
            } else if (item.isFile()) {
                if (typeof filePattern === 'string') {
                    if (item.name === filePattern) {
                        return fullPath;
                    }
                } else if (filePattern instanceof RegExp) {
                    if (filePattern.test(item.name)) {
                        return fullPath;
                    }
                }
            }
        }
        
        return null;
    } catch (error) {
        console.error(`Error searching in directory ${dir}:`, error);
        return null;
    }
};

/**
 * Find the Java package directory where API classes are located
 * This looks for the directory that contains api/, auth/, and model/ subdirectories
 */
const findJavaPackageDirectory = async (sdkDir) => {
    try {
        console.log(`Searching for Java package directory in: ${sdkDir}`);
        
        // Common Java package paths in OpenAPI generated SDKs
        const possiblePaths = [
            'src/main/java/org/openapitools/client',
            'src/main/java/io/swagger/client',
            'src/main/java/com/example/client',
            'src/main/java'
        ];
        
        // First, try the common OpenAPI tools structure
        for (const possiblePath of possiblePaths) {
            const fullPath = path.join(sdkDir, possiblePath);
            console.log(`Checking path: ${fullPath}`);
            
            if (await fs.promises.access(fullPath).then(() => true).catch(() => false)) {
                console.log(`Path exists: ${fullPath}`);
                
                // Check if this directory contains the expected subdirectories
                const hasApiDir = await fs.promises.access(path.join(fullPath, 'api')).then(() => true).catch(() => false);
                const hasAuthDir = await fs.promises.access(path.join(fullPath, 'auth')).then(() => true).catch(() => false);
                const hasModelDir = await fs.promises.access(path.join(fullPath, 'model')).then(() => true).catch(() => false);
                
                console.log(`Directory contents check - api: ${hasApiDir}, auth: ${hasAuthDir}, model: ${hasModelDir}`);
                
                if (hasApiDir || hasAuthDir || hasModelDir) {
                    console.log(`Found Java package directory: ${fullPath}`);
                    return fullPath;
                }
            } else {
                console.log(`Path does not exist: ${fullPath}`);
            }
        }
        
        // If common paths don't work, search recursively for a directory that contains api/auth/model subdirs
        console.log('Searching recursively for Java package structure...');
        console.log('Current SDK directory structure:');
        await listDirectoryStructure(sdkDir);
        
        const foundPath = await findJavaPackageRecursively(sdkDir);
        if (foundPath) {
            console.log(`Found Java package directory recursively: ${foundPath}`);
            return foundPath;
        }
        
        console.warn('Could not find Java package directory structure');
        return null;
        
    } catch (error) {
        console.error('Error finding Java package directory:', error);
        return null;
    }
};

/**
 * Recursively search for Java package directory
 */
const findJavaPackageRecursively = async (dir, maxDepth = 10, currentDepth = 0) => {
    if (currentDepth > maxDepth) {
        return null;
    }
    
    try {
        const items = await fs.promises.readdir(dir, { withFileTypes: true });
        
        // Check if current directory has api, auth, or model subdirectories
        const subdirs = items.filter(item => item.isDirectory()).map(item => item.name);
        const hasApiDir = subdirs.includes('api');
        const hasAuthDir = subdirs.includes('auth');
        const hasModelDir = subdirs.includes('model');
        
        // If we found at least one of the expected directories, this is likely the package root
        if (hasApiDir || hasAuthDir || hasModelDir) {
            return dir;
        }
        
        // Continue searching in subdirectories
        for (const item of items) {
            if (item.isDirectory() && item.name !== 'api' && item.name !== 'auth' && item.name !== 'model') {
                const fullPath = path.join(dir, item.name);
                const result = await findJavaPackageRecursively(fullPath, maxDepth, currentDepth + 1);
                if (result) {
                    return result;
                }
            }
        }
        
        return null;
    } catch (error) {
        console.error(`Error searching directory ${dir}:`, error);
        return null;
    }
};

/**
 * Create JSON request data for backend API request
 */
const getApplicationGenApiReqBody = async (apiClassContent, language, mergedSpec, sdkConfiguration) => {
    let useCase;
    
    if (sdkConfiguration?.mode === 'ai' && sdkConfiguration?.description && sdkConfiguration.description.trim()) {
        useCase = sdkConfiguration.description.trim();
        console.log('Using AI mode with user prompt:', useCase);
    } else {
        // Default use case for default mode
        useCase = `Generate application which uses the provided APIs to demonstrate their functionality with sample data and proper error handling`;
        console.log('Using default mode with standard use case');
    }
    
    return {
        sdkMethodsFile: apiClassContent || '',
        useCase: useCase,
        language: language,
        APISpecification: JSON.stringify(mergedSpec)
    };
};

const invokeApplicationCodeGenApi = async (requestData) => {
    try {
        const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.generateApp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (!response.ok) {
            throw new Error(`Failed to generate application: ${response.statusText}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error invoking application generation API:", error);
        throw error;
    }
};

/**
 * Process application code response and create final ZIP with SDK + application code
 */
const processApplicationCodeAndCreateFinalZip = async (applicationCode, sdkPath, sdkConfiguration, zipFileName) => {
    try {
        console.log('Processing application code response and creating final ZIP...');
        const language = sdkConfiguration?.language || 'java';
        
        // Create application code files in the SDK folder
        if (applicationCode) {
            const fileExtension = getFileExtension(language);
            
            if (language === 'java') {
                // For Java projects, place Application.java in the correct package structure
                console.log('Searching for Java package directory structure...');
                const javaPackageDir = await findJavaPackageDirectory(sdkPath);
                
                if (javaPackageDir) {
                    // Place Application.java at the same level as api, auth, model packages
                    const mainAppFile = path.join(javaPackageDir, `Application.${fileExtension}`);
                    await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                    console.log(`Java Application code written to: ${mainAppFile}`);
                    
                    // Also log the relative path for clarity
                    const relativePath = path.relative(sdkPath, mainAppFile);
                    console.log(`Relative path: ${relativePath}`);
                } else {
                    // Fallback: create in application-code directory
                    console.warn('Could not find Java package directory, using fallback location');
                    const appCodeDir = path.join(sdkPath, 'application-code');
                    await fs.promises.mkdir(appCodeDir, { recursive: true });
                    const mainAppFile = path.join(appCodeDir, `Application.${fileExtension}`);
                    await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                    console.log(`Application code written to fallback location: ${mainAppFile}`);
                }
            } else {
                // For non-Java languages, use the application-code directory
                const appCodeDir = path.join(sdkPath, 'application-code');
                await fs.promises.mkdir(appCodeDir, { recursive: true });
                const mainAppFile = path.join(appCodeDir, `Application.${fileExtension}`);
                await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                console.log(`Application code written to: ${mainAppFile}`);
            }
        }
        
        // Create README with instructions based on language and structure
        await createProjectReadme(sdkPath, sdkConfiguration, language);
        
        // Create final ZIP with SDK + application code
        const permanentDir = path.join(process.cwd(), 'generated-sdks');
        await fs.promises.mkdir(permanentDir, { recursive: true });
        
        const finalZipPath = path.join(permanentDir, zipFileName);
        await createZipArchive(sdkPath, finalZipPath);
        console.log(`Final ZIP created: ${finalZipPath}`);
        
        // Clean up SDK folder
        await fs.promises.rm(sdkPath, { recursive: true, force: true });
        console.log('Cleaned up temporary SDK folder');
        
        return {
            finalZipPath: finalZipPath,
        };
        
    } catch (error) {
        console.error('Error processing application code and creating final ZIP:', error);
        
        // Ensure cleanup of SDK folder even if ZIP creation fails
        try {
            await fs.promises.rm(sdkPath, { recursive: true, force: true });
            console.log('Cleaned up SDK folder after ZIP creation error');
        } catch (cleanupError) {
            console.error('Error cleaning up SDK folder:', cleanupError);
        }
        
        throw error;
    }
};

/**
 * Get file extension based on programming language
 */
const getFileExtension = (language) => {
    const extensionMap = {
        'java': 'java',
        'javascript': 'js',
        'typescript': 'ts',
        'python': 'py',
        'csharp': 'cs',
        'go': 'go',
        'php': 'php',
        'ruby': 'rb'
    };
    return extensionMap[language] || 'java';
};

/**
 * Utility function to clean up orphaned SDK directories
 * This can be called periodically to clean up any leftover temporary directories
 */
const cleanupOrphanedSDKDirectories = async () => {
    try {
        const sdkTempPattern = path.join(os.tmpdir(), 'sdk-generation');
        const generatedSdksDir = path.join(process.cwd(), 'generated-sdks');
        
        // Clean up temporary SDK generation directories older than 1 hour
        if (await fs.promises.access(sdkTempPattern).then(() => true).catch(() => false)) {
            const tempItems = await fs.promises.readdir(sdkTempPattern, { withFileTypes: true });
            const oneHourAgo = Date.now() - (60 * 60 * 1000);
            
            for (const item of tempItems) {
                if (item.isDirectory()) {
                    const dirPath = path.join(sdkTempPattern, item.name);
                    try {
                        const stats = await fs.promises.stat(dirPath);
                        if (stats.mtime.getTime() < oneHourAgo) {
                            await fs.promises.rm(dirPath, { recursive: true, force: true });
                            console.log(`Cleaned up orphaned temp SDK directory: ${dirPath}`);
                        }
                    } catch (error) {
                        console.warn(`Error checking temp SDK directory ${dirPath}:`, error);
                    }
                }
            }
        }
        
        // Clean up generated SDK directories (not ZIP files) older than 24 hours
        if (await fs.promises.access(generatedSdksDir).then(() => true).catch(() => false)) {
            const generatedItems = await fs.promises.readdir(generatedSdksDir, { withFileTypes: true });
            const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
            
            for (const item of generatedItems) {
                if (item.isDirectory()) {
                    const dirPath = path.join(generatedSdksDir, item.name);
                    try {
                        const stats = await fs.promises.stat(dirPath);
                        if (stats.mtime.getTime() < oneDayAgo) {
                            await fs.promises.rm(dirPath, { recursive: true, force: true });
                            console.log(`Cleaned up orphaned generated SDK directory: ${dirPath}`);
                        }
                    } catch (error) {
                        console.warn(`Error checking generated SDK directory ${dirPath}:`, error);
                    }
                }
            }
        }
        
    } catch (error) {
        console.error('Error during orphaned SDK directories cleanup:', error);
    }
};

/**
 * Create a comprehensive README file for the generated SDK and application
 */
const createProjectReadme = async (sdkPath, sdkConfiguration, language) => {
    try {
        const sdkName = sdkConfiguration?.name || 'generated-sdk';
        const mode = sdkConfiguration?.mode || 'default';
        
        let readmeContent = `# ${sdkName}

Generated SDK with Application Code

## Overview
This package contains:
1. **SDK Library**: Generated from your selected API specifications
2. **Application Code**: Sample application demonstrating API usage
3. **Documentation**: This README and any additional documentation

## Configuration
- **Language**: ${language}
- **SDK Name**: ${sdkName}
- **Generation Mode**: ${mode}
- **Generated**: ${new Date().toISOString()}

`;

        if (language === 'java') {
            readmeContent += `## Java Project Structure

The generated Java SDK follows standard Maven/Gradle project structure:

\`\`\`
src/
├── main/
│   ├── AndroidManifest.xml (for Android projects)
│   └── java/
│       └── org/openapitools/client/
│           ├── Application.java          # ← Your generated application
│           ├── ApiClient.java           # Main API client
│           ├── Configuration.java       # SDK configuration
│           ├── api/                     # API endpoints
│           ├── auth/                    # Authentication classes
│           └── model/                   # Data models
├── build.gradle (or pom.xml)
└── README.md
\`\`\`

## Quick Start (Java)

### 1. Build the Project
\`\`\`bash
# For Gradle projects
./gradlew build

# For Maven projects
mvn clean compile
\`\`\`

### 2. Run the Application
\`\`\`bash
# Compile and run Application.java
javac -cp "lib/*:src/main/java" src/main/java/org/openapitools/client/Application.java
java -cp "lib/*:src/main/java" org.openapitools.client.Application

# Or use your build tool
./gradlew run
# or
mvn exec:java -Dexec.mainClass="org.openapitools.client.Application"
\`\`\`

### 3. Integration
To use this SDK in your own project:

1. **Add the SDK as a dependency** in your \`build.gradle\` or \`pom.xml\`
2. **Import the necessary classes**:
   \`\`\`java
   import org.openapitools.client.ApiClient;
   import org.openapitools.client.Configuration;
   import org.openapitools.client.api.*;
   import org.openapitools.client.model.*;
   \`\`\`
3. **Initialize the API client**:
   \`\`\`java
   ApiClient client = Configuration.getDefaultApiClient();
   client.setBasePath("https://your-api-server.com");
   \`\`\`

## Application.java
The generated \`Application.java\` file contains:
- Complete working examples of API calls
- Error handling patterns
- Authentication setup (if required)
- Sample data processing

`;
        } else {
            readmeContent += `## ${language.charAt(0).toUpperCase() + language.slice(1)} Project

Please refer to the application code in the application-code directory.

`;
        }

        readmeContent += `## API Documentation
- Check the docs/ directory for detailed API documentation
- Each API endpoint is documented with request/response examples
- Model classes are documented with field descriptions

## Authentication
If your APIs require authentication, update the configuration in Application.${getFileExtension(language)}:
- API Keys: Set in the ApiClient configuration
- OAuth2: Configure the OAuth2 flow
- Basic Auth: Set username/password in the client

## Troubleshooting

### Common Issues
1. **Compilation Errors**: Ensure all dependencies are installed
2. **Runtime Errors**: Check API endpoint URLs and authentication
3. **Network Issues**: Verify server connectivity and firewall settings

### Getting Help
- Check the generated documentation in docs/ folder
- Review the API specification used for generation
- Examine the sample code in Application.${getFileExtension(language)}

## License
This generated code is provided as-is for demonstration purposes.
Check your API provider's terms of service for usage guidelines.
`;

        const readmePath = path.join(sdkPath, 'README.md');
        await fs.promises.writeFile(readmePath, readmeContent, 'utf8');
        console.log(`Comprehensive README created: ${readmePath}`);
        
    } catch (error) {
        console.error('Error creating project README:', error);
        // Don't throw error, as this is not critical for SDK generation
    }
};

/**
 * Debug function to list directory structure (helpful for troubleshooting)
 */
const listDirectoryStructure = async (dir, prefix = '', maxDepth = 3, currentDepth = 0) => {
    if (currentDepth > maxDepth) {
        return;
    }
    
    try {
        const items = await fs.promises.readdir(dir, { withFileTypes: true });
        
        for (const item of items.slice(0, 20)) { // Limit to first 20 items to avoid spam
            console.log(`${prefix}${item.isDirectory() ? '📁' : '📄'} ${item.name}`);
            
            if (item.isDirectory() && currentDepth < maxDepth) {
                const fullPath = path.join(dir, item.name);
                await listDirectoryStructure(fullPath, prefix + '  ', maxDepth, currentDepth + 1);
            }
        }
        
        if (items.length > 20) {
            console.log(`${prefix}... and ${items.length - 20} more items`);
        }
    } catch (error) {
        console.log(`${prefix}❌ Error reading directory: ${error.message}`);
    }
};

module.exports = {
    loadApplications,
    loadApplication,
    loadSDKGeneration,
    generateSDK,
    cleanupOrphanedSDKDirectories
};