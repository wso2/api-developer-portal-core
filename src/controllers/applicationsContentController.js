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
const sdkJobService = require('../services/sdkJobService');

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

const streamSDKProgress = (req, res) => {
    const { jobId } = req.params;
    
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    console.log(`Client connected to SSE for job: ${jobId}`);

    const onProgress = (progressData) => {
        if (progressData.jobId === jobId) {
            const dataToSend = { ...progressData, type: 'progress' };
            res.write(`data: ${JSON.stringify(dataToSend)}\n\n`);
        }
    };

    sdkJobService.on('progress', onProgress);

    // Send initial ping
    res.write(`data: ${JSON.stringify({ type: 'ping', jobId })}\n\n`);

    req.on('close', () => {
        console.log(`Client disconnected from SSE for job: ${jobId}`);
        sdkJobService.removeListener('progress', onProgress);
    });
};

// ***** Cancel SDK Job *****

const cancelSDK = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        console.log(`Received request to cancel SDK job: ${jobId}`);
        
        await sdkJobService.cancelJob(jobId);
        
        res.status(200).json({ 
            success: true, 
            message: 'SDK generation cancelled successfully',
            jobId: jobId
        });
        
    } catch (error) {
        console.error('Error cancelling SDK generation:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Failed to cancel SDK generation'
        });
    }
};

// ***** Generate SDK *****

const generateSDK = async (req, res) => {
    try {
        const { selectedAPIs, sdkConfiguration } = req.body;
        const orgName = req.params.orgName;
        const applicationId = req.params.applicationId;

        // Validate input - require at least 1 API
        if (!selectedAPIs || selectedAPIs.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'At least 1 API must be selected for SDK generation'
            });
        }

        if (!sdkConfiguration) {
            return res.status(400).json({
                success: false,
                message: 'Please provide SDK configuration details'
            });
        }

        // Validate AI description is provided
        if (!sdkConfiguration.description || sdkConfiguration.description.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'AI description is required for SDK generation'
            });
        }

        const orgID = await orgIDValue(orgName);
        
        // Create job for tracking progress
        const jobPayload = {
            selectedAPIs,
            sdkConfiguration,
            orgName,
            applicationId,
            orgId: orgID
        };
        const job = await sdkJobService.createJob(orgID, applicationId, jobPayload);
        const jobId = job.JOB_ID;

        // Send immediate response with job ID
        res.json({
            success: true,
            message: 'SDK generation job started successfully',
            data: {
                jobId: jobId,
                status: 'PENDING',
                progress: 0,
                currentStep: 'Initializing',
                sseEndpoint: `/${orgName}/views/default/applications/${applicationId}/sdk/job-progress/${jobId}`
            }
        });
        
    } catch (error) {
        console.error('Error starting SDK generation job:', error);
        res.status(500).json({
            success: false,
            message: 'Error starting SDK generation job',
            error: error.message
        });
    }
};

/**
 * Utility function to clean up generated SDK files and folders older than 10 minutes
 * This runs periodically to remove all files and folders in the generated-sdks directory
 */
const cleanupGeneratedSDKs = async () => {
    try {
        const generatedSdksDir = path.join(process.cwd(), 'generated-sdks');
        
        if (!(await fs.promises.access(generatedSdksDir).then(() => true).catch(() => false))) {
            return;
        }
        
        const tenMinutesAgo = Date.now() - (10 * 60 * 1000); // 10 minutes in milliseconds
        
        try {
            const items = await fs.promises.readdir(generatedSdksDir, { withFileTypes: true });
            let cleanedCount = 0;
            
            for (const item of items) {
                const itemPath = path.join(generatedSdksDir, item.name);
                
                try {
                    const stats = await fs.promises.stat(itemPath);
                    
                    // Check if the item is older than 10 minutes (using creation time)
                    if (stats.birthtime.getTime() < tenMinutesAgo) {
                        if (item.isDirectory()) {
                            await fs.promises.rm(itemPath, { recursive: true, force: true });
                            console.log(`Cleaned up SDK directory (${Math.round((Date.now() - stats.birthtime.getTime()) / 60000)} minutes old): ${itemPath}`);
                        } else {
                            await fs.promises.unlink(itemPath);
                            console.log(`Cleaned up SDK file (${Math.round((Date.now() - stats.birthtime.getTime()) / 60000)} minutes old): ${itemPath}`);
                        }
                        cleanedCount++;
                    }
                } catch (error) {
                    console.warn(`Error processing SDK item ${itemPath}:`, error.message);
                }
            }
            
            if (cleanedCount > 0) {
                console.log(`SDK cleanup completed: ${cleanedCount} items removed from generated-sdks directory`);
            }
            
        } catch (error) {
            console.warn(`Error reading generated-sdks directory: ${error.message}`);
        }
        
    } catch (error) {
        console.error('Error during generated SDK cleanup:', error);
    }
};



// Global variable to store the cleanup interval
let sdkCleanupInterval = null;

/**
 * Start the periodic SDK cleanup process
 * Runs every 5 minutes to check for files/folders older than 10 minutes
 */
const startSDKCleanupScheduler = () => {
    if (sdkCleanupInterval) {
        return; 
    }
    
    console.log('Starting SDK cleanup scheduler - runs every 5 minutes to clean files older than 10 minutes');

    cleanupGeneratedSDKs();
    
    // Set up periodic cleanup every 5 minutes
    sdkCleanupInterval = setInterval(async () => {
        try {
            await cleanupGeneratedSDKs();
        } catch (error) {
            console.error('Error in scheduled SDK cleanup:', error);
        }
    }, 5 * 60 * 1000);
};

/**
 * Stop the periodic SDK cleanup process
 */
const stopSDKCleanupScheduler = () => {
    if (sdkCleanupInterval) {
        clearInterval(sdkCleanupInterval);
        sdkCleanupInterval = null;
        console.log('SDK cleanup scheduler stopped');
    }
};

module.exports = {
    loadApplications,
    loadApplication,
    generateSDK,
    streamSDKProgress,
    cleanupGeneratedSDKs,
    startSDKCleanupScheduler,
    stopSDKCleanupScheduler,
    cancelSDK
};
