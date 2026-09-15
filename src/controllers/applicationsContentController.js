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
const logger = require('../config/logger');
const { logUserAction } = require('../middlewares/auditLogger');
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

const orgIDValue = async (orgName) => {
    const organization = await adminDao.getOrganization(orgName);
    return organization.ORG_ID;
}

const templateResponseValue = async (pageName) => {
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', pageName, 'page.hbs');
    return fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
}

const buildProfile = (req) => {
    if (!req?.user) {
        return null;
    }
    return {
        imageURL: req.user.imageURL,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
    };
};

/**
 * Shared data loader for both application overview and manage-keys pages.
 * Keeps loadApplication / loadApplicationKeys lean and avoids drift between the two.
 */
const loadApplicationData = async (req, orgName, applicationId, viewName) => {
    const orgID = await orgIDValue(orgName);

    let groupList = [];
    if (req.query.groups) {
        groupList.push(req.query.groups.split(" "));
    }

    const subAPIs = await adminDao.getSubscribedAPIs(orgID, applicationId);

    const filteredSubAPIs = subAPIs.filter(sub => {
        const ps = sub.dataValues.DP_APPLICATIONs?.[0]?.dataValues?.DP_API_SUBSCRIPTION?.dataValues?.PAYMENT_STATUS;
        return !ps || ps === 'ACTIVE';
    });

    const allAPIs = await apiMetadata.getAllAPIMetadata(orgID, groupList, viewName);

    const subscribedAPIIds = new Set(filteredSubAPIs.map(api => api.API_ID));
    const nonSubscribedAPIs = allAPIs
        .filter(api => !subscribedAPIIds.has(api.API_ID) && api.DP_SUBSCRIPTION_POLICies.length > 0)
        .map(api => new APIDTO(api));

    const userID = req[constants.USER_ID]
    const applicationList = await adminService.getApplicationKeyMap(orgID, applicationId, userID);

    let applicationReference = "";
    let applicationKeyList;
    if (applicationList.appMap && config.controlPlane?.enabled !== false) {
        applicationReference = applicationList.appMap[0].appRefID;
        try {
            applicationKeyList = await getApplicationKeys(applicationList.appMap, req);
        } catch (keyError) {
            logger.warn('Failed to fetch application keys from CP', {
                appRefID: applicationReference, error: keyError.message
            });
        }
    }

    let otherAPICount = 0;
    let mcpAPICount = 0;
    let apiKeyEnabledAPICount = 0;
    const PLATFORM_GATEWAY_TYPE = 'wso2/api-platform';

    let subList = [];
    if (filteredSubAPIs.length > 0) {
        subList = await Promise.all(filteredSubAPIs.map(async (sub) => {
            const api = new APIDTO(sub);
            let apiDTO = {};
            apiDTO.apiInfo = {
                apiName: api.apiInfo.apiName,
                apiVersion: api.apiInfo.apiVersion,
                apiDescription: api.apiInfo.apiDescription,
                apiType: api.apiInfo.apiType,
                gatewayType: api.apiInfo.gatewayType || null,
                tokenBasedSubscriptionEnabled: api.apiInfo.tokenBasedSubscriptionEnabled || false,
                apiImageMetadata: api.apiInfo.apiImageMetadata
            };
            apiDTO.name = api.apiInfo.apiName;
            apiDTO.apiID = api.apiID;
            apiDTO.version = api.apiInfo.apiVersion;
            apiDTO.apiType = api.apiInfo.apiType;
            apiDTO.gatewayType = api.apiInfo.gatewayType || null;
            apiDTO.image = api.apiInfo.apiImageMetadata["api-icon"];
            apiDTO.subID = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues.SUB_ID;
            apiDTO.policyID = sub.dataValues.DP_APPLICATIONs[0].dataValues.DP_API_SUBSCRIPTION.dataValues.POLICY_ID;
            apiDTO.refID = api.apiReferenceID;
            apiDTO.apiHandle = api.apiHandle;

            let apiDetails = null;
            if (config.controlPlane?.enabled !== false) {
                try {
                    apiDetails = await getAPIDetails(req, api.apiReferenceID);
                } catch (apiError) {
                    logger.warn('Failed to fetch API details from CP', {
                        apiReferenceID: api.apiReferenceID, error: apiError.message
                    });
                }
            }
            const projectIdEntry = apiDetails?.additionalProperties?.find(item => item.name === 'projectId');
            const projectId = projectIdEntry?.value;
            if (apiDetails) {
                apiDTO.security = apiDetails.securityScheme;
                if (apiDTO.security && apiDTO.security.includes('api_key') && apiDTO.gatewayType !== PLATFORM_GATEWAY_TYPE) {
                    apiKeyEnabledAPICount++;
                }
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
            let productionApiKeys = [];
            let sandboxApiKeys = [];
            if (config.controlPlane?.enabled !== false) {
                try {
                    productionApiKeys = await getAPIKeys(req, api.apiReferenceID, applicationReference, 'PRODUCTION');
                    sandboxApiKeys = await getAPIKeys(req, api.apiReferenceID, applicationReference, 'SANDBOX');
                } catch (keyError) {
                    logger.warn('Failed to fetch API keys from CP', {
                        apiReferenceID: api.apiReferenceID, error: keyError.message
                    });
                }
            }
            apiDTO.apiKeys = {
                production: productionApiKeys,
                sandbox: sandboxApiKeys
            };
            apiDTO.subscriptionPolicyDetails = await util.appendSubscriptionPlanDetails(orgID, api.subscriptionPolicies);
            apiDTO.scopes = (apiDetails?.scopes || []).map(scope => scope.key);
            return apiDTO
        }));
    }

    util.appendAPIImageURL(subList, req, orgID);

    const subAPIsForApplicationKeys = subList.filter(s => s.gatewayType !== PLATFORM_GATEWAY_TYPE);
    const isApiKey = subAPIsForApplicationKeys.some(
        api => api.security && api.security.includes('api_key')
    );

    await Promise.all(nonSubscribedAPIs.map(async (api) => {
        api.subscriptionPolicyDetails = await util.appendSubscriptionPlanDetails(orgID, api.subscriptionPolicies);
    }));

    // Fetch production and sandbox key managers separately; one failing must not blank the other.
    let rawProdKeyManagers = [];
    let rawSandboxKeyManagers = [];
    let prodKeyManagerFetchFailed = false;
    let sandboxKeyManagerFetchFailed = false;
    if (config.controlPlane?.enabled !== false) {
        const [prodResult, sandboxResult] = await Promise.allSettled([
            getAPIMKeyManagers(req, constants.DEV_PORTAL_APP_ENV.PROD),
            getAPIMKeyManagers(req, constants.DEV_PORTAL_APP_ENV.SANDBOX)
        ]);
        if (prodResult.status === 'fulfilled') {
            rawProdKeyManagers = prodResult.value;
        } else {
            prodKeyManagerFetchFailed = true;
            logger.warn('Failed to fetch production key managers from CP', { error: prodResult.reason?.message });
        }
        if (sandboxResult.status === 'fulfilled') {
            rawSandboxKeyManagers = sandboxResult.value;
        } else {
            sandboxKeyManagerFetchFailed = true;
            logger.warn('Failed to fetch sandbox key managers from CP', { error: sandboxResult.reason?.message });
        }
    }

    const prodKeyManagers = filterKeyManagers(rawProdKeyManagers, constants.DEV_PORTAL_APP_ENV.PROD);
    const sandboxKeyManagers = filterKeyManagers(rawSandboxKeyManagers, constants.DEV_PORTAL_APP_ENV.SANDBOX);

    // Resident endpoints count as per-environment only when both lists have one and they differ.
    const prodResident = prodKeyManagers.find(km => km.name === constants.KEY_MANAGERS.RESIDENT_KEY_MANAGER);
    const sandboxResident = sandboxKeyManagers.find(km => km.name === constants.KEY_MANAGERS.RESIDENT_KEY_MANAGER);
    const residentEndpointsPerEnvironment = !!prodResident && !!sandboxResident
        && prodResident.tokenEndpoint !== sandboxResident.tokenEndpoint;

    const cpOrgID = req.cpOrgID ?? (await adminDao.getOrganization(orgName))?.ORGANIZATION_IDENTIFIER;

    // Per-environment endpoints keep the control plane values with the override on top; otherwise defaults plus override.
    const enrichKeyManager = async (keyManager, devPortalAppEnv) => {
        if (keyManager.name === constants.KEY_MANAGERS.RESIDENT_KEY_MANAGER) {
            if (residentEndpointsPerEnvironment) {
                Object.assign(keyManager, util.resolveResidentKMEndpointOverride(cpOrgID, devPortalAppEnv) || {});
            } else {
                const residentKMEndpoints = util.getResidentKMEndpoints(cpOrgID, devPortalAppEnv);
                keyManager.tokenEndpoint = residentKMEndpoints.tokenEndpoint;
                keyManager.authorizeEndpoint = residentKMEndpoints.authorizeEndpoint;
                keyManager.revokeEndpoint = residentKMEndpoints.revokeEndpoint;
            }
        }
        keyManager.availableGrantTypes = await mapGrants(keyManager.availableGrantTypes);
        keyManager.applicationConfiguration = await mapDefaultValues(keyManager.applicationConfiguration);
    };
    await Promise.all([
        ...prodKeyManagers.map(km => enrichKeyManager(km, constants.DEV_PORTAL_APP_ENV.PROD)),
        ...sandboxKeyManagers.map(km => enrichKeyManager(km, constants.DEV_PORTAL_APP_ENV.SANDBOX))
    ]);

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

    // Match keys per environment before concatenating, or a shared name would cross credentials.
    prodKeyManagers.forEach(keyManager => {
        productionKeys.forEach(productionKey => {
            if (productionKey.keyManager === keyManager.name) {
                keyManager.productionKeys = productionKey;
            }
        });
    });
    sandboxKeyManagers.forEach(keyManager => {
        sandboxKeys.forEach(sandboxKey => {
            if (sandboxKey.keyManager === keyManager.name) {
                keyManager.sandboxKeys = sandboxKey;
            }
        });
    });

    // One key manager per environment, so dialogs do not get duplicate DOM ids.
    const selectedProdKeyManagers = prodKeyManagers.slice(0, 1);
    const selectedSandboxKeyManagers = sandboxKeyManagers.slice(0, 1);
    selectedProdKeyManagers.forEach(keyManager => {
        keyManager.devPortalAppEnv = constants.KEY_TYPE.PRODUCTION;
    });
    selectedSandboxKeyManagers.forEach(keyManager => {
        keyManager.devPortalAppEnv = constants.KEY_TYPE.SANDBOX;
    });

    // Do not dedupe: resident key manager entries share id and name across environments.
    const kMmetaData = [...selectedProdKeyManagers, ...selectedSandboxKeyManagers];
    const hasProdKeyManagers = selectedProdKeyManagers.length > 0;
    const hasSandboxKeyManagers = selectedSandboxKeyManagers.length > 0;

    // Only the key manager's own key type, as dialog DOM ids are keyed by key type alone.
    selectedProdKeyManagers.forEach(keyManager => {
        keyManager.applicationKeys = [{
            keys: keyManager.productionKeys || {},
            keyType: constants.KEY_TYPE.PRODUCTION
        }];
    });
    selectedSandboxKeyManagers.forEach(keyManager => {
        keyManager.applicationKeys = [{
            keys: keyManager.sandboxKeys || {},
            keyType: constants.KEY_TYPE.SANDBOX
        }];
    });

    let subscriptionScopes = [];
    if (applicationReference && config.controlPlane?.enabled !== false) {
        try {
            const cpApplication = await getAPIMApplication(req, applicationReference);
            if (cpApplication && Array.isArray(cpApplication.subscriptionScopes)) {
                for (const scope of cpApplication.subscriptionScopes) {
                    subscriptionScopes.push(scope.key);
                }
            }
        } catch (appError) {
            logger.warn('Failed to fetch application from CP', {
                applicationReference, error: appError.message
            });
        }
    }

    // Load TOKEN-BASED (platform) subscriptions from CP
    let platformSubscriptions = [];
    if (req.user && config.controlPlane?.enabled !== false) {
        try {
            const cpResponse = await util.invokeApiRequest(
                req, 'GET',
                `${controlPlaneUrl}/api-platform-subscriptions`
            );
            const cpSubs = cpResponse.list || cpResponse || [];

            // Enrich with local API metadata
            const allApis = await apiMetadata.getAPIMetadataByCondition({
                ORG_ID: orgID,
                STATUS: constants.API_STATUS.PUBLISHED
            });
            const apiByRefId = {};
            for (const api of allApis) {
                apiByRefId[api.REFERENCE_ID] = api;
            }

            platformSubscriptions = await Promise.all(cpSubs.map(async (sub) => {
                const localApi = apiByRefId[sub.apiId] || {};

                let apiDetails = null;
                try {
                    apiDetails = await getAPIDetails(req, sub.apiId);
                } catch (apiError) {
                    logger.warn('Failed to fetch platform subscription API details from CP', {
                        apiId: sub.apiId, error: apiError.message
                    });
                }

                const projectIdEntry = apiDetails?.additionalProperties?.find(item => item.name === 'projectId');
                const projectId = projectIdEntry?.value;

                let security = apiDetails?.securityScheme || [];

                let productionApiKeys = [];
                let sandboxApiKeys = [];
                if (applicationReference) {
                    try {
                        productionApiKeys = await getAPIKeys(req, sub.apiId, applicationReference, 'PRODUCTION');
                        sandboxApiKeys = await getAPIKeys(req, sub.apiId, applicationReference, 'SANDBOX');
                    } catch (keyError) {
                        logger.warn('Failed to fetch platform subscription API keys from CP', {
                            apiId: sub.apiId, error: keyError.message
                        });
                    }
                }

                return {
                    id: sub.subscriptionId,
                    subID: sub.subscriptionId,
                    apiID: localApi.API_ID || '',
                    name: localApi.API_NAME || sub.apiId,
                    apiName: localApi.API_NAME || sub.apiId,
                    version: localApi.API_VERSION || '',
                    apiVersion: localApi.API_VERSION || '',
                    apiHandle: localApi.API_HANDLE || '#',
                    apiType: localApi.API_TYPE || 'REST',
                    refID: sub.apiId,
                    planName: sub.subscriptionPlanName || '',
                    policyName: sub.subscriptionPlanName || '',
                    status: sub.status,
                    subscriptionToken: sub.subscriptionToken,
                    security: security,
                    projectId: projectId || '',
                    apiKeys: {
                        production: productionApiKeys,
                        sandbox: sandboxApiKeys
                    },
                    scopes: (apiDetails?.scopes || []).map(scope => scope.key),
                    isPlatformSubscription: true,
                };
            }));
        } catch (cpError) {
            logger.warn('Failed to load platform subscriptions for application overview', {
                error: cpError.message
            });
        }
    }

    // Load platform APIs that don't require subscription (gatewayType=wso2/api-platform, tokenBasedSubscription=false)
    let noSubPlatformAPIs = [];
    if (config.controlPlane?.enabled !== false) try {
        const noSubApis = await apiMetadata.getAPIMetadataByCondition({
            ORG_ID: orgID,
            GATEWAY_TYPE: 'wso2/api-platform',
            TOKEN_BASED_SUBSCRIPTION_ENABLED: false,
            STATUS: constants.API_STATUS.PUBLISHED
        });

        if (noSubApis.length > 0) {
            noSubPlatformAPIs = await Promise.all(noSubApis.map(async (api) => {
                const apiDTO = new APIDTO(api);
                const refID = apiDTO.apiReferenceID;

                let apiDetails = null;
                try {
                    apiDetails = await getAPIDetails(req, refID);
                } catch (apiError) {
                    logger.warn('Failed to fetch no-sub platform API details from CP', {
                        apiReferenceID: refID, error: apiError.message
                    });
                }

                const projectIdEntry = apiDetails?.additionalProperties?.find(item => item.name === 'projectId');
                const projectId = projectIdEntry?.value;

                let productionApiKeys = [];
                let sandboxApiKeys = [];
                if (applicationReference) {
                    try {
                        productionApiKeys = await getAPIKeys(req, refID, applicationReference, 'PRODUCTION');
                        sandboxApiKeys = await getAPIKeys(req, refID, applicationReference, 'SANDBOX');
                    } catch (keyError) {
                        logger.warn('Failed to fetch no-sub platform API keys from CP', {
                            apiReferenceID: refID, error: keyError.message
                        });
                    }
                }

                return {
                    subID: apiDTO.apiID,
                    apiID: apiDTO.apiID,
                    name: apiDTO.apiInfo.apiName,
                    version: apiDTO.apiInfo.apiVersion,
                    apiHandle: apiDTO.apiHandle,
                    apiType: apiDTO.apiInfo.apiType || 'REST',
                    refID: refID,
                    policyName: '',
                    security: apiDetails?.securityScheme || [],
                    projectId: projectId || '',
                    apiKeys: {
                        production: productionApiKeys,
                        sandbox: sandboxApiKeys
                    },
                    scopes: (apiDetails?.scopes || []).map(scope => scope.key),
                    isNoSubPlatformAPI: true,
                };
            }));
        }
    } catch (err) {
        logger.warn('Failed to load no-subscription platform APIs', { error: err.message });
    }

    const profile = buildProfile(req);

    return {
        orgID,
        applicationList,
        keyManagersMetadata: kMmetaData,
        hasProdKeyManagers,
        hasSandboxKeyManagers,
        prodKeyManagerFetchFailed,
        sandboxKeyManagerFetchFailed,
        subAPIs: subList,
        subAPIsForApplicationKeys,
        platformSubscriptionsForApplicationKeys: [],
        noSubPlatformAPIsForApplicationKeys: [],
        nonSubAPIs: nonSubscribedAPIs,
        productionKeys,
        sandboxKeys,
        subscriptionScopes,
        otherAPICount,
        mcpAPICount,
        apiKeyEnabledAPICount,
        isApiKey,
        platformSubscriptions,
        noSubPlatformAPIs,
        profile
    };
};

// ***** Load Applications *****

const loadApplications = async (req, res) => {

    const viewName = req.params.viewName;
    const orgName = req.params.orgName;
    const orgDetails = await adminDao.getOrganization(orgName);
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.DEVPORTAL_MODE.DEFAULT;
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
                    const activeCount = subApis.filter(s => {
                        const ps = s.PAYMENT_STATUS;
                        return !ps || ps === 'ACTIVE';
                    }).length;
                    return {
                        ...new ApplicationDTO(application),
                        subscriptionCount: activeCount
                    };
                })
            );
            let profile = null;
            if (req.user) {
                profile = {
                    imageURL: req.user.imageURL,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.email,
                    isAdmin: req.user.isAdmin,
                }
            }

            templateContent = {
                applicationsMetadata: metaData,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                profile: req.isAuthenticated() ? profile : null,
                devportalMode: devportalMode,
                isReadOnlyMode: config.readOnlyMode,
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
        const templateContent = {
            devportalMode: devportalMode,
            baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
            errorMessage: constants.ERROR_MESSAGE.COMMON_ERROR_MESSAGE,
        }
        logger.error("Error occurred while loading Applications", {
            orgName: orgName,
            error: error.message,
            stack: error.stack
        });
        html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
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
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.DEVPORTAL_MODE.DEFAULT;
    req.cpOrgID = orgDetails.ORGANIZATION_IDENTIFIER;
    try {
        const applicationId = req.params.applicationId;
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplication();
            kMmetaData = await getMockKeyManagers();
            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: baseURLDev + viewName,
                features: {
                    sdkGeneration: config.features?.sdkGeneration?.enabled || false
                }
            }
            html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const data = await loadApplicationData(req, orgName, applicationId, viewName);
            metaData = data.applicationList;
            kMmetaData = data.keyManagersMetadata;

            templateContent = {
                orgID: data.orgID,
                applicationMetadata: {
                    ...metaData,
                    subscriptionCount: data.subAPIs.length
                },
                keyManagersMetadata: kMmetaData,
                hasProdKeyManagers: data.hasProdKeyManagers,
                hasSandboxKeyManagers: data.hasSandboxKeyManagers,
                prodKeyManagerFetchFailed: data.prodKeyManagerFetchFailed,
                sandboxKeyManagerFetchFailed: data.sandboxKeyManagerFetchFailed,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                subAPIs: data.subAPIs,
                nonSubAPIs: data.nonSubAPIs,
                productionKeys: data.productionKeys,
                sandboxKeys: data.sandboxKeys,
                applicationKeys: [
                    {
                        keys: data.productionKeys,
                        keyType: constants.KEY_TYPE.PRODUCTION
                    },
                    {
                        keys: data.sandboxKeys,
                        keyType: constants.KEY_TYPE.SANDBOX
                    }
                ],
                isProduction: true,
                isApiKey: data.isApiKey,
                subscriptionScopes: data.subscriptionScopes,
                otherAPICount: data.otherAPICount,
                mcpAPICount: data.mcpAPICount,
                apiKeyEnabledAPICount: data.apiKeyEnabledAPICount,
                platformSubscriptions: data.platformSubscriptions,
                noSubPlatformAPIs: data.noSubPlatformAPIs,
                profile: req.isAuthenticated() ? data.profile : null,
                devportalMode: devportalMode,
                features: {
                    sdkGeneration: config.features?.sdkGeneration?.enabled || false
                },
                isReadOnlyMode: config.readOnlyMode
            }
            const templateResponse = await templateResponseValue('application');
            const layoutResponse = await loadLayoutFromAPI(data.orgID, viewName);
            if (layoutResponse === "") {
                html = renderTemplate('../pages/application/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
            } else {
                html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
            }
        }
    } catch (error) {
        logger.error("Error occurred while loading application", {
            orgName: orgName,
            applicationId: req?.params?.applicationId,
            error: error.message,
            stack: error.stack
        });
        const templateContent = {
            baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
            devportalMode: devportalMode,
            features: {
                sdkGeneration: config.features?.sdkGeneration?.enabled || false
            },
            profile: req.isAuthenticated() ? req.user : null,
        }
        if (Number(error?.statusCode) === 401) {
            templateContent.errorMessage = constants.ERROR_MESSAGE.COMMON_AUTH_ERROR_MESSAGE;
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
        } else {
            templateContent.errorMessage = constants.ERROR_MESSAGE.COMMON_ERROR_MESSAGE;
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
        }
    }
    res.send(html);
}

const loadApplicationKeys = async (req, res) => {
    let html, templateContent, metaData, kMmetaData;
    const viewName = req.params.viewName;
    const orgName = req.params.orgName;
    const orgDetails = await adminDao.getOrganization(orgName);
    const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || constants.DEVPORTAL_MODE.DEFAULT;
    try {
        const applicationId = req.params.applicationId;
        if (config.mode === constants.DEV_MODE) {
            metaData = await getMockApplication();
            kMmetaData = await getMockKeyManagers();
            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: baseURLDev + viewName,
                productionKeys: [],
                sandboxKeys: [],
                subAPIs: [],
                orgID: null,
                subscriptionScopes: [],
                isApiKey: false,
                subAPIsForApplicationKeys: [],
                platformSubscriptionsForApplicationKeys: [],
                noSubPlatformAPIsForApplicationKeys: [],
                features: {
                    sdkGeneration: config.features?.sdkGeneration?.enabled || false
                },
                isReadOnlyMode: config.readOnlyMode
            }
            html = renderTemplate('../pages/manage-keys/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
        } else {
            const data = await loadApplicationData(req, orgName, applicationId, viewName);
            metaData = data.applicationList;
            kMmetaData = data.keyManagersMetadata;

            templateContent = {
                orgID: data.orgID,
                applicationMetadata: {
                    ...metaData,
                    subscriptionCount: data.subAPIs.length
                },
                keyManagersMetadata: kMmetaData,
                hasProdKeyManagers: data.hasProdKeyManagers,
                hasSandboxKeyManagers: data.hasSandboxKeyManagers,
                prodKeyManagerFetchFailed: data.prodKeyManagerFetchFailed,
                sandboxKeyManagerFetchFailed: data.sandboxKeyManagerFetchFailed,
                baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
                subAPIs: data.subAPIs,
                nonSubAPIs: data.nonSubAPIs,
                productionKeys: data.productionKeys,
                sandboxKeys: data.sandboxKeys,
                applicationKeys: [
                    {
                        keys: data.productionKeys,
                        keyType: constants.KEY_TYPE.PRODUCTION
                    },
                    {
                        keys: data.sandboxKeys,
                        keyType: constants.KEY_TYPE.SANDBOX
                    }
                ],
                isApiKey: data.isApiKey,
                subAPIsForApplicationKeys: data.subAPIsForApplicationKeys,
                platformSubscriptions: data.platformSubscriptions,
                platformSubscriptionsForApplicationKeys: data.platformSubscriptionsForApplicationKeys,
                noSubPlatformAPIs: data.noSubPlatformAPIs,
                noSubPlatformAPIsForApplicationKeys: data.noSubPlatformAPIsForApplicationKeys,
                subscriptionScopes: data.subscriptionScopes,
                otherAPICount: data.otherAPICount,
                mcpAPICount: data.mcpAPICount,
                apiKeyEnabledAPICount: data.apiKeyEnabledAPICount,
                profile: req.isAuthenticated() ? data.profile : null,
                devportalMode: devportalMode,
                features: {
                    sdkGeneration: config.features?.sdkGeneration?.enabled || false
                },
                isReadOnlyMode: config.readOnlyMode
            }
            const templateResponse = await templateResponseValue('manage-keys');
            const layoutResponse = await loadLayoutFromAPI(data.orgID, viewName);
            if (layoutResponse === "") {
                html = renderTemplate('../pages/manage-keys/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
            } else {
                html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
            }
        }
    } catch (error) {
        logger.error("Error occurred while loading application keys", {
            orgName: orgName,
            applicationId: req?.params?.applicationId,
            error: error.message,
            stack: error.stack
        });
        const templateContent = {
            baseUrl: '/' + orgName + constants.ROUTE.VIEWS_PATH + viewName,
            devportalMode: devportalMode,
            features: {
                sdkGeneration: config.features?.sdkGeneration?.enabled || false
            },
            profile: req.isAuthenticated() ? req.user : null,
        }
        if (Number(error?.statusCode) === 401) {
            templateContent.errorMessage = constants.ERROR_MESSAGE.COMMON_AUTH_ERROR_MESSAGE;
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
        } else {
            templateContent.errorMessage = constants.ERROR_MESSAGE.COMMON_ERROR_MESSAGE;
            html = renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
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
            logger.error("Error occurred while generating application keys", {
                applicationRefId: appRef,
                error: error.message,
                stack: error.stack
            });
            return null;
        }
    }
}

async function getAllAPIs(req) {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/apis`);
    } catch (error) {
        logger.error("Error occurred while loading APIs", {
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
}

const getSubscribedApis = async (req, appId) => {
    try {
        return await util.invokeApiRequest(req, 'GET', `${controlPlaneUrl}/subscriptions?applicationId=${appId}`);
    } catch (error) {
        logger.error("Error occurred while loading subscriptions", {
            applicationId: appId,
            error: error.message,
            stack: error.stack
        });
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

// Tie-breaker: key managers named with the environment suffix come first.
function preferEnvironmentSuffix(keyManagers, devPortalAppEnv) {
    if (!devPortalAppEnv) {
        return keyManagers;
    }
    const suffix = `_${devPortalAppEnv}`;
    return [
        ...keyManagers.filter(keyManager => keyManager.name.endsWith(suffix)),
        ...keyManagers.filter(keyManager => !keyManager.name.endsWith(suffix))
    ];
}

// Drops disabled entries and applies internal > resident > AppDev STS precedence.
function filterKeyManagers(keyManagers, devPortalAppEnv) {
    if (!Array.isArray(keyManagers)) {
        return [];
    }
    const enabled = keyManagers.filter(keyManager => keyManager.enabled);
    if (enabled.length <= 1) {
        return enabled;
    }
    const internalKeyManagerPrefix = `${constants.KEY_MANAGERS.INTERNAL_KEY_MANAGER}_`;
    const hasInternal = enabled.some(keyManager => keyManager.name.includes(internalKeyManagerPrefix));
    const hasResident = enabled.some(keyManager => keyManager.name.includes(constants.KEY_MANAGERS.RESIDENT_KEY_MANAGER));
    return preferEnvironmentSuffix(enabled.filter(keyManager =>
        keyManager.name.includes(internalKeyManagerPrefix) ||
        (!hasInternal && keyManager.name.includes(constants.KEY_MANAGERS.RESIDENT_KEY_MANAGER)) ||
        (!hasInternal && !hasResident && keyManager.name.includes(constants.KEY_MANAGERS.APP_DEV_STS_KEY_MANAGER))
    ), devPortalAppEnv);
}

// devPortalAppEnv is required; without it the control plane skips per-environment endpoints.
async function getAPIMKeyManagers(req, devPortalAppEnv) {
    if (!devPortalAppEnv) {
        throw new Error('devPortalAppEnv is required to fetch key managers');
    }
    const responseData = await invokeApiRequest(req, 'GET', `${controlPlaneUrl}/key-managers?devPortalAppEnv=${devPortalAppEnv}`, null, null);
    return Array.isArray(responseData.list) ? responseData.list : [];
}

async function getAPIDetails(req, apiId) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + `/apis/${apiId}`, null, null);
    return responseData;
}

async function getAPIKeys(req, apiId, applicationId, keyType) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + `/api-keys?apiId=${apiId}&keyType=${keyType}`, null, null);
    let apiKeys = {};
    for (const key of responseData) {
        if (key.application.id === applicationId) {
            apiKeys.key = key.keys;
            apiKeys.scopes = key.scopes;
            apiKeys.name = key.alias;
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



module.exports = {
    loadApplications,
    loadApplication,
    loadApplicationKeys
};
