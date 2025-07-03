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
const { ApplicationDTO } = require('../dto/application');
const APIDTO = require('../dto/apiDTO');
const adminService = require('../services/adminService');
const baseURLDev = config.baseUrl + constants.ROUTE.VIEWS_PATH;
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const os = require('os');
const archiver = require('archiver');
const FormData = require('form-data');
const unzipper = require('unzipper');


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
        const viewName = req.params.viewName;
        const applicationId = req.params.applicationId;
        
        // console.log('SDK Generation Request:', {
        //     orgName,
        //     viewName,
        //     applicationId,
        //     selectedAPIs,
        //     sdkConfiguration
        // });

        if (!selectedAPIs || selectedAPIs.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No APIs selected for SDK generation'
            });
        }

        // Get organization ID
        const orgID = await orgIDValue(orgName);
        
        const apiSpecs = await apiMetadata.getAPISpecs(orgID, selectedAPIs);

        if (apiSpecs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No API specifications found for the selected APIs'
            });
        }

        console.log(`Found ${apiSpecs.length} API specifications`);

        // Load API metadata for each selected API and transform API handles
        const apiHandlesArray = [];
        for (const apiId of selectedAPIs) {
            try {
                const apiMetadataResult = await apiMetadata.getAPIMetadata(orgID, apiId);
                if (apiMetadataResult && apiMetadataResult.length > 0) {
                    const apiData = apiMetadataResult[0];
                    const apiHandle = apiData.API_HANDLE || apiData.dataValues?.API_HANDLE;
                    
                    if (apiHandle) {
                        // Transform API handle
                        // Example: financeapi-v1.0 -> financeapi/v1.0
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

        const mergeSpecApiRequest = prepareSDKGenerationRequest(apiSpecs, apiHandlesArray);

        const mergedSpecsResponse = await invokeMergeSpecApi(mergeSpecApiRequest);

        console.log('Merged API specifications received');
        
        // Generate SDK using openapi-generator
        const sdkResult = await generateSDKWithOpenAPIGenerator(
            mergedSpecsResponse.mergedSpec || mergedSpecsResponse,
            sdkConfiguration,
            orgName,
            applicationId,
            apiHandlesArray
        );

        const extractedData = await extractAndProcessSDK(
            sdkResult.sdkPath, sdkResult.language
        );

        if (!extractedData.apiClassFound) {
            return res.status(404).json({
                success: false,
                message: 'API class not found in SDK',
            });
        }

        const formData = await createBackendFormData(
            extractedData.apiClassContent,
            'java',
            mergedSpecsResponse,
            sdkConfiguration,
            path.basename(extractedData.apiClassFile || 'UnknownApi')
        );

        console.log('Form data prepared for backend API');

        const applicationResponse = await invokeApplicationCodeGenApi(
            formData
        );
        
        console.log('Backend API response received:', applicationResponse);

        // Process application code and create final ZIP
        const finalZipResult = await processApplicationCodeAndCreateFinalZip(
            applicationResponse,
            extractedData.extractedSdkPath,
            sdkResult.zipFileName,
            sdkConfiguration
        );

        res.json({
            success: true,
            message: 'SDK and application code generated successfully',
            data: {
                selectedAPIs: selectedAPIs,
                apiSpecsFound: apiSpecs.length,
                transformedApiHandles: apiHandlesArray,
                sdkConfiguration: {
                    language: sdkConfiguration?.language || 'javascript',
                    name: sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`,
                    version: '1.0.0',
                    packageName: sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`
                },
                originalSdkDownloadUrl: sdkResult.downloadUrl,
                finalDownloadUrl: finalZipResult.downloadUrl,
                finalZipFileName: finalZipResult.finalZipFileName,
                sdkPath: sdkResult.sdkPath,
                zipFileName: sdkResult.zipFileName,
                apiClassExtracted: extractedData.apiClassFound,
                applicationCodeGenerated: !!applicationResponse.applicationCode,
                backendApiResponse: applicationResponse
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

/**
 * Prepare the request payload for the merge OpenAPI specs API
 */
function prepareSDKGenerationRequest(apiSpecs, apiHandlesArray) {
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
        const response = await fetch('http://localhost:5001/merge-openapi-specs', {
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
 * Generate SDK using openapi-generator
 */
const generateSDKWithOpenAPIGenerator = async (mergedSpec, sdkConfiguration, orgName, applicationId, apiHandles) => {
    try {
        const language = sdkConfiguration?.language || 'javascript';
        const sdkName = sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`;
        
        // Create temporary directory for SDK generation
        const tempDir = path.join(os.tmpdir(), 'sdk-generation', `${sdkName}-${Date.now()}`);
        const specFilePath = path.join(tempDir, 'merged-spec.json');
        const outputDir = path.join(tempDir, 'generated-sdk');
        
        // Create directories
        await fs.promises.mkdir(tempDir, { recursive: true });
        await fs.promises.mkdir(outputDir, { recursive: true });
        
        // Write merged spec to file
        await fs.promises.writeFile(specFilePath, JSON.stringify(mergedSpec, null, 2));
        
        console.log(`Generating SDK for language: ${language}`);
        console.log(`SDK output directory: ${outputDir}`);
        
        // Determine the generator name based on language
        const generatorMap = {
            'javascript': 'javascript',
            'typescript': 'typescript-axios',
            'python': 'python',
            'java': 'java',
            'csharp': 'csharp',
            'go': 'go',
            'php': 'php',
            'ruby': 'ruby'
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
        
        console.log(`Executing command: ${command}`);
        
        // Execute openapi-generator
        const { stdout, stderr } = await execAsync(command, { 
            cwd: tempDir,
            timeout: 120000 // 2 minutes timeout
        });
        
        if (stderr && !stderr.includes('WARN')) {
            console.warn('openapi-generator stderr:', stderr);
        }
        
        console.log('SDK generation completed successfully');
        
        // Create ZIP filename in the format: applicationName-<apiHandles>.zip
        const apiHandlesSuffix = apiHandles.map(handle => 
            handle.replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        ).join('-');
        const zipFileName = `${sdkName}-${apiHandlesSuffix}.zip`;
        const zipPath = path.join(tempDir, zipFileName);
        
        await createZipArchive(outputDir, zipPath);
        
        // Move ZIP to a permanent location
        const permanentDir = path.join(process.cwd(), 'generated-sdks');
        await fs.promises.mkdir(permanentDir, { recursive: true });
        
        const finalZipPath = path.join(permanentDir, zipFileName);
        await fs.promises.copyFile(zipPath, finalZipPath);
        
        console.log(`SDK ZIP created: ${finalZipPath}`);
        
        const downloadUrl = `/download/sdk/${zipFileName}`;
        
        return {
            success: true,
            sdkPath: finalZipPath,
            downloadUrl: downloadUrl,
            language: language,
            generator: generator,
            zipFileName: zipFileName
        };
        
    } catch (error) {
        console.error('Error generating SDK with openapi-generator:', error);
        throw new Error(`SDK generation failed: ${error.message}`);
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
const extractAndProcessSDK = async (zipPath, language) => {
    try {
        console.log('Extracting SDK ZIP file for processing...');
        
        const extractDir = path.join(process.cwd(), 'generated-sdks', 'sdk-extraction', `extract-${Date.now()}`);
        await fs.promises.mkdir(extractDir, { recursive: true });
        
        // Extract ZIP file
        await new Promise((resolve, reject) => {
            fs.createReadStream(zipPath)
                .pipe(unzipper.Extract({ path: extractDir }))
                .on('close', resolve)
                .on('error', reject);
        });
        
        console.log(`SDK extracted to: ${extractDir}`);
        
        // Find the API class file based on language
        let apiClassFile = null;
        let apiClassContent = null;
        
        if (language === 'java') {
            // Look for DefaultApi.java file in src/main/java directory structure
            const javaApiPath = await findFileRecursively(extractDir, 'DefaultApi.java');
            if (javaApiPath) {
                apiClassFile = javaApiPath;
                apiClassContent = await fs.promises.readFile(javaApiPath, 'utf8');
                console.log(`Found Java API class: ${javaApiPath}`);
            }
        } else if (language === 'javascript' || language === 'typescript') {
            // Look for API class in JavaScript/TypeScript SDKs
            const jsApiPath = await findFileRecursively(extractDir, /.*[Aa]pi\.js$|.*[Aa]pi\.ts$/);
            if (jsApiPath) {
                apiClassFile = jsApiPath;
                apiClassContent = await fs.promises.readFile(jsApiPath, 'utf8');
                console.log(`Found JS/TS API class: ${jsApiPath}`);
            }
        } else if (language === 'python') {
            // Look for API class in Python SDKs
            const pythonApiPath = await findFileRecursively(extractDir, /.*_api\.py$|.*api\.py$/);
            if (pythonApiPath) {
                apiClassFile = pythonApiPath;
                apiClassContent = await fs.promises.readFile(pythonApiPath, 'utf8');
                console.log(`Found Python API class: ${pythonApiPath}`);
            }
        }
        
        if (!apiClassContent) {
            console.warn(`No API class file found for language: ${language}`);
        }
        
        // Copy extracted folder to generated-sdks for later use
        // const permanentExtractDir = path.join(process.cwd(), 'generated-sdks', `extracted-sdk-${Date.now()}`);
        // await fs.promises.mkdir(path.dirname(permanentExtractDir), { recursive: true });
        // await fs.promises.cp(extractDir, permanentExtractDir, { recursive: true });
        // console.log(`Extracted SDK copied to: ${permanentExtractDir}`);
        
        // Clean up temporary extraction directory
        // await fs.promises.rm(extractDir, { recursive: true, force: true });
        
        return {
            apiClassContent: apiClassContent || '',
            apiClassFile: path.basename(apiClassFile || 'UnknownApi'),
            apiClassFound: !!apiClassContent,
            extractedSdkPath: extractDir
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
 * Create form data for backend API request
 */
const createBackendFormData = async (apiClassContent, language, mergedSpec, sdkConfiguration, fileName) => {
    const formData = new FormData();
    
    // Add API class file as a buffer
    if (apiClassContent) {
        formData.append('sdkMethodsFile', Buffer.from(apiClassContent, 'utf8'), {
            filename: fileName,
            contentType: 'text/plain'
        });
    }
    
    // Add use case (you can customize this based on your requirements)
    const useCase = `Generate application which uses weather api to get weather of a given city and generate financial cost if the weather is rainy`;
    formData.append('useCase', useCase);
    
    // Add language
    formData.append('language', language);
    
    // Add merged API spec as JSON
    formData.append('mergedApiSpec', JSON.stringify(mergedSpec), {
        filename: 'merged-spec.json',
        contentType: 'application/json'
    });
    
    return formData;
};

const invokeApplicationCodeGenApi = async (formData) => {
    try {
        const response = await fetch('http://localhost:5001/generate-application-code', {
            method: 'POST',
            body: formData
            // Don't set Content-Type header - let fetch handle it automatically for FormData
        });
        if (!response.ok) {
            throw new Error(`Failed to generate application: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error invoking application generation API:", error);
        throw error;
    }
};

/**
 * Process application code response and create final ZIP with SDK + application code
 */
const processApplicationCodeAndCreateFinalZip = async (applicationResponse, extractedSdkPath, zipFileName, sdkConfiguration) => {
    try {
        console.log('Processing application code response and creating final ZIP...');
        
        // Create application code files in the extracted SDK folder
        if (applicationResponse && applicationResponse.applicationCode) {
            const appCodeDir = path.join(extractedSdkPath, 'application-code');
            await fs.promises.mkdir(appCodeDir, { recursive: true });
            
            // Write main application file
            const mainAppFile = path.join(appCodeDir, 'Application.java');
            await fs.promises.writeFile(mainAppFile, applicationResponse.applicationCode, 'utf8');
            console.log(`Application code written to: ${mainAppFile}`);
            
            // Write additional files if present
            if (applicationResponse.additionalFiles) {
                for (const [fileName, fileContent] of Object.entries(applicationResponse.additionalFiles)) {
                    const filePath = path.join(appCodeDir, fileName);
                    await fs.promises.writeFile(filePath, fileContent, 'utf8');
                    console.log(`Additional file written: ${filePath}`);
                }
            }
            
            // Create README with instructions
            const readmeContent = `# Generated Application with SDK

This package contains:
1. SDK generated from your selected APIs
2. Application code that demonstrates API usage

## SDK Configuration
- Language: ${sdkConfiguration?.language || 'java'}
- SDK Name: ${sdkConfiguration?.name || 'generated-sdk'}

## Application Code
The application code is located in the 'application-code' directory.

## Usage
1. Extract this ZIP file
2. Follow the SDK documentation to set up dependencies
3. Compile and run the application code

Generated on: ${new Date().toISOString()}
`;
            const readmePath = path.join(extractedSdkPath, 'README.md');
            await fs.promises.writeFile(readmePath, readmeContent, 'utf8');
        }
        
        // Create final ZIP with SDK + application code
        const finalZipFileName = zipFileName.replace('.zip', '-with-app.zip');
        const finalZipPath = path.join(process.cwd(), 'generated-sdks', finalZipFileName);
        
        await createZipArchive(extractedSdkPath, finalZipPath);
        console.log(`Final ZIP created: ${finalZipPath}`);
        
        // Clean up extracted SDK folder
        await fs.promises.rm(extractedSdkPath, { recursive: true, force: true });
        
        return {
            finalZipPath: finalZipPath,
            finalZipFileName: finalZipFileName,
            downloadUrl: `/download/sdk/${finalZipFileName}`
        };
        
    } catch (error) {
        console.error('Error processing application code and creating final ZIP:', error);
        throw error;
    }
};

module.exports = {
    loadApplications,
    loadApplication,
    loadSDKGeneration,
    generateSDK,
};