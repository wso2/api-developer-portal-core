/* eslint-disable no-undef */
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
const { invokeApiRequest, invokeGraphQLRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const logger = require('../config/logger');
const controlPlaneUrl = config.controlPlane.url;
const controlPlaneGraphqlUrl = config.controlPlane.graphqlURL;
const util = require('../utils/util');
const passport = require('passport');
const { Strategy: CustomStrategy } = require('passport-custom');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');
const { ApplicationDTO } = require('../dto/application');
const { Sequelize } = require("sequelize");
const adminService = require('../services/adminService');
const apiDao = require('../dao/apiMetadata');
const { trackAppCreationStart, trackAppCreationEnd, trackAppDeletion, trackGenerateKey } = require('../utils/telemetry');
const fs = require('fs');
const yaml = require('js-yaml');
const { ImportedApplicationDTO } = require('../dto/importedApplication');
const { CustomError } = require('../utils/errors/customErrors');
const { APIMetadata, APILabels } = require('../models/apiMetadata');
const sequelize = require('../db/sequelize');
const { cat } = require('shelljs');

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        trackAppCreationStart({ orgId: orgID, appName: req.body.name, idpId: req.isAuthenticated() ? (req[constants.USER_ID] || req.user.sub) : undefined }, req);
        const application = await adminDao.createApplication(orgID, req.user.sub, req.body);
        trackAppCreationEnd({ orgId: orgID, appName: req.body.name, idpId: req.isAuthenticated() ? (req[constants.USER_ID] || req.user.sub) : undefined }, req);
        return res.status(201).json(new ApplicationDTO(application.dataValues));
    } catch (error) {
        logger.error('Error occurred while creating the application', { 
            orgId: req.user[constants.ORG_IDENTIFIER],
            appName: req.body.name,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        const appID = req.params.applicationId;
        const [updatedRows, updatedApp] = await adminDao.updateApplication(orgID, appID, req.user.sub, req.body);
        if (!updatedRows) {
            throw new Sequelize.EmptyResultError("No record found to update");
        }
        res.status(200).send(new ApplicationDTO(updatedApp[0].dataValues));
    } catch (error) {
        logger.error("Error occurred while updating the application", { 
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        const applicationId = req.params.applicationId;
        try {
            //delete the CP application
            //TODO: handle non-shared scenarios
            const app = await adminDao.getApplicationKeyMapping(orgID, applicationId, true);
            if (app.length > 0) {
                cpAppID = app[0].dataValues.CP_APP_REF;
                await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${cpAppID}`, {}, {});
            }
            const appDeleteResponse = await adminDao.deleteApplication(orgID, applicationId, req.user.sub);
            if (appDeleteResponse === 0) {
                throw new Sequelize.EmptyResultError("Resource not found to delete");
            } else {
                trackAppDeletion({ orgId: orgID, appId: applicationId, idpId: req.isAuthenticated() ? (req[constants.USER_ID] || req.user.sub) : undefined }, req);
                res.status(200).send("Resouce Deleted Successfully");
            }
        } catch (error) {
            if (error.statusCode === 404) {
                const appDeleteResponse = await adminDao.deleteApplication(orgID, applicationId, req.user.sub);
                if (appDeleteResponse === 0) {
                    throw new Sequelize.EmptyResultError("Resource not found to delete");
                } else {
                    res.status(200).send("Resouce Deleted Successfully");
                }
            }
            logger.error('Error occurred while deleting the application', { 
                orgId: orgID,
                appId: appID,
                error: error.message, 
                stack: error.stack
            });
            util.handleError(res, error);
        }
    } catch (error) {
        logger.error('Error occurred while deleting the application', { 
            appId: req.params.appId,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
}

// ***** Save Application *****

const resetThrottlingPolicy = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const { userName } = req.body;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/reset-throttle-policy`, {
            'Content-Type': 'application/json'
        }, {
            userName
        });
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        logger.error("Error occurred while resetting the application", { 
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    try {
        const requestBody = req.body;
        const apiID = requestBody.apiId;
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        let cpAppID = requestBody.applicationId;

        const nonSharedKeyMapping = await adminDao.getApplicationAPIMapping(orgID, requestBody.devportalAppId, apiID, cpAppID, false);
        const sharedKeyMapping = await adminDao.getApplicationAPIMapping(orgID, requestBody.devportalAppId, apiID, cpAppID, true);

        if (!(nonSharedKeyMapping.length > 0 || sharedKeyMapping.length > 0)) { 
            const cpApp = await adminService.createCPApplication(req, requestBody.devportalAppId);
            cpAppID = cpApp.applicationId;

            const apiSubscription = await adminService.createCPSubscription(req, apiID, cpAppID, requestBody.subscriptionPlan);

            const appKeyMappping = {
                orgID: orgID,
                appID: requestBody.devportalAppId,
                cpAppRef: cpAppID,
                apiRefID: apiSubscription.apiId,
                subscriptionRefID: apiSubscription.subscriptionId,
                sharedToken: false,
                tokenType: constants.TOKEN_TYPES.API_KEY
            }
            await adminDao.createApplicationKeyMapping(appKeyMappping);
        } else if (!(nonSharedKeyMapping[0]?.dataValues.SUBSCRIPTION_REF_ID || sharedKeyMapping[0]?.dataValues.SUBSCRIPTION_REF_ID)) {
            const apiSubscription = await adminService.createCPSubscription(req, apiID, cpAppID, requestBody.subscriptionPlan);
            const appKeyMappping = {
                orgID: orgID,
                appID: requestBody.devportalAppId,
                cpAppRef: cpAppID,
                apiRefID: apiSubscription.apiId,
                subscriptionRefID: apiSubscription.subscriptionId,
                sharedToken: false,
                tokenType: constants.TOKEN_TYPES.API_KEY
            }
            await adminDao.updateApplicationKeyMapping(apiSubscription.apiId, appKeyMappping);
        }
        
        const query = `
        query ($orgUuid: String!, $projectId: String!) {
          environments(orgUuid: $orgUuid, projectId: $projectId) {
            name
            templateId
          }
        }
      `;

        const variables = {
            orgUuid: req.user[constants.ORG_IDENTIFIER],
            projectId: requestBody.projectID
        };

        const orgDetails = await invokeGraphQLRequest(req, `${controlPlaneGraphqlUrl}`, query, variables, {});
        const environments = orgDetails?.data?.environments || [];
        const apiHandle = await apiDao.getAPIHandle(orgID, req.body.apiId);

        if (!requestBody.keyType || ![constants.KEY_TYPE.PRODUCTION, constants.KEY_TYPE.SANDBOX].includes(requestBody.keyType)) {
            throw new Error('Invalid or missing keyType. Expected ' + constants.KEY_TYPE.PRODUCTION + ' or ' + constants.KEY_TYPE.SANDBOX + '.');
        }
        // If the client didn't provide a name, fall back to the existing auto-generated convention
        if (!requestBody.name) {
            requestBody.name = apiHandle + "-" + cpAppID + "-" + requestBody.keyType;
        }
        requestBody.environmentTemplateId = environments.find(env => env.name === 'Production').templateId;
        requestBody.applicationId = cpAppID;
        delete requestBody.projectID;
        delete requestBody.devportalAppId;

        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/generate`, {
            'Content-Type': 'application/json'
        }, requestBody);
        responseData.appRefId = cpAppID;
        res.status(200).json(responseData);
    } catch (error) {
        logger.error('Error occurred while generating API keys', { 
            apiId: req.body.apiId,
            appId: req.body.devportalAppId,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

const revokeAPIKeys = async (req, res) => {
    const apiKeyID = req.params.apiKeyID;
    try {
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/${apiKeyID}/revoke`, {}, {});
        // await adminDao.deleteAppKeyMapping(await adminDao.getOrgId((req.user[constants.ORG_IDENTIFIER])), req.body.applicationId, req.body.apiRefID);
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while revoking the API key", { 
            apiKeyID,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
}

const regenerateAPIKeys = async (req, res) => {
    const apiKeyID = req.params.apiKeyID;
    try {
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/${apiKeyID}/regenerate`, { 'x-source-portal': 'bijira-devportal' }, {});
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while regenerating the API key", {
            apiKeyID,
            error: error.message,
            stack: error.stack
        });
        util.handleError(res, error);
    }
}

const generateApplicationKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/generate-keys`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while generating the application keys", { 
            appId: req.params.applicationId,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

const generateOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}/generate-token`, {}, req.body);
        trackGenerateKey({
            orgId: req.user[constants.ORG_ID],
            appId: applicationId,
            idpId: req.isAuthenticated() ? (req[constants.USER_ID] || req.user.sub) : undefined
        }, req);
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while generating the OAuth keys", { 
            appId: req.params.applicationId,
            error: error.message, 
            stack: error.stack 
        });
        util.handleError(res, error);
    }
};

const revokeOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}`, {}, {});
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while generating the OAuth keys", { 
            appId: req.params.applicationId,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

const cleanUp = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}/clean-up`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while generating the OAuth keys", { 
            appId: req.params.applicationId,
            error: error.message, 
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

const updateOAuthKeys = async (req, res) => {
    let tokenDetails = req.body;
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'PUT', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}`, {}, tokenDetails);
        res.status(200).json(responseData);
    } catch (error) {
        logger.error("Error occurred while generating the OAuth keys", { 
            appId: req.params.applicationId,
            error: error.message, 
            stack: error.stack, 
        });
        util.handleError(res, error);
    }
};

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const defaultUser = config.defaultAuth.users.find(user => user.username === username && user.password === password);
    passport.use(
        'default-auth',
        new CustomStrategy((req, done) => {
            if (defaultUser) {
                const user = { ...defaultUser };
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid credentials' });
            }
        })
    );

    passport.authenticate('default-auth', (err, user, info) => {
        if (err) {
            logger.error("Error occurred while logging in", { 
                error: err.message, 
                stack: err.stack
            });
            return util.handleError(res, err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return util.handleError(res, err);
            }
            res.status(200).json({ message: 'Login successful' });
        });
    })(req, res);
};
// Import Application with API Subscriptions
const importApplications = async (req, res) => {
    let orgID;
    let createDevPortalApplication;
    let controlPlaneApplication;
    let orgDetails;
    try {
        orgDetails = await adminDao.getOrganization(req.params.orgId);
        orgID = orgDetails.ORG_ID;
        // Validate required inputs
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'Missing application.yaml file' });
        }

        const patToken = req.headers['pat_token'] || req.headers['PAT_TOKEN'];
        if (!patToken) {
            return res.status(400).json({ message: 'Missing PAT Token in request headers' });
        }

        // Parse YAML file
        let importedApplication;
        try {
            const fileContent = req.file.buffer.toString('utf8');
            const data = yaml.load(fileContent);
            importedApplication = new ImportedApplicationDTO(data);
        } catch (fileReadError) {
            logger.error('Error reading application.yaml file', {
                orgId: req.params.orgId,
                error: fileReadError.message,
                stack: fileReadError.stack
            });
            const error = new CustomError(400, "Bad Request", "Unable to read application.yaml file");
            return util.handleError(res, error);
        }

        // Create DevPortal application
        const applicationTobeCreated = {
            name: importedApplication.applicationInfo.name,
            description: importedApplication.applicationInfo.description,
            type: "WEB"
        };

        try {
            createDevPortalApplication = await adminDao.createApplication(
                orgID,
                importedApplication.applicationInfo.owner,
                applicationTobeCreated
            );
        } catch (appCreationError) {
            logger.error('Error creating application in Devportal', {
                orgId: req.params.orgId,
                appName: importedApplication.applicationInfo.name,
                error: appCreationError.message,
                stack: appCreationError.stack
            });
            const error = new CustomError(500, "Internal Server Error", "Failed to create application in Devportal");
            return util.handleError(res, error);
        }

        // Create Control Plane application
        try {
            controlPlaneApplication = await adminService.createCPApplicationOnBehalfOfUser(
                createDevPortalApplication.APP_ID,
                importedApplication.applicationInfo.owner,
                orgDetails.ORGANIZATION_IDENTIFIER,
                patToken
            );
        } catch (cpAppError) {
            logger.error('Error creating application in Control Plane', {
                orgId: req.params.orgId,
                appName: importedApplication.applicationInfo.name,
                error: cpAppError.message,
                stack: cpAppError.stack
            });

            // Rollback DevPortal application
            await adminDao.deleteApplication(orgID, createDevPortalApplication.APP_ID, importedApplication.applicationInfo.owner);
            const error = new CustomError(500, "Internal Server Error", "Failed to create application in Control Plane");
            return util.handleError(res, error);
        }

        // Create subscriptions
        const failedSubscriptions = await createSubscriptions(
            importedApplication.subscribedAPIs,
            orgDetails,
            createDevPortalApplication.APP_ID,
            controlPlaneApplication.applicationId,
            patToken
        );

        const response = failedSubscriptions.length > 0
            ? { status: "Incomplete", failedSubscriptions }
            : { status: "Success" };

        return res.status(200).json(response);

    } catch (error) {
        logger.error('Error importing applications', {
            orgId: req.params.orgId,
            error: error.message,
            stack: error.stack
        });
        util.handleError(res, error);
    }
};

// Helper function for subscription creation
const createSubscriptions = async (subscribedAPIs, orgDetails, appId, cpAppId,patToken) => {
    const failedSubscriptions = [];

    try {
        const [allApis, subscriptionPolicies] = await Promise.all([
            apiDao.getAllAPIMetadata(orgDetails.ORG_ID, [], "default"),
            apiDao.getAllSubscriptionPolicies(orgDetails.ORG_ID)
        ]);

        for (const apiSubscription of subscribedAPIs) {
            try {
                const api = allApis.find(apiItem =>
                    apiItem.API_NAME === apiSubscription.apiId.apiName &&
                    apiItem.API_VERSION === apiSubscription.apiId.version
                );

                const policy = subscriptionPolicies.find(policy =>
                    policy.POLICY_NAME === apiSubscription.throttlingPolicy
                );

                if (!api || !policy) {
                    logger.warn(`Skipping subscription - API or policy not found`, {
                        orgId: orgID,
                        apiName: apiSubscription.apiId.apiName,
                        policyName: apiSubscription.throttlingPolicy
                    });
                    failedSubscriptions.push(apiSubscription);
                    continue;
                }

                await createSingleSubscription(api, policy, orgDetails, appId, cpAppId, apiSubscription, failedSubscriptions,patToken);

            } catch (subscriptionError) {
                logger.error(`Error creating subscription for API: ${apiSubscription.apiId.apiName}`, {
                    orgId: orgID,
                    apiName: apiSubscription.apiId.apiName,
                    error: subscriptionError.message,
                    stack: subscriptionError.stack
                });
                failedSubscriptions.push(apiSubscription);
            }
        }
    } catch (error) {
        logger.error('Failed to fetch APIs or policies', {
            orgId: orgID,
            error: error.message,
            stack: error.stack
        });
        // Add all subscriptions to failed list if we can't fetch metadata
        failedSubscriptions.push(...subscribedAPIs);
    }

    return failedSubscriptions;
};

// Helper function for creating individual subscriptions
const createSingleSubscription = async (api, policy, orgDetails, appId, cpAppId, apiSubscription, failedSubscriptions,patToken) => {
    const subscription = {
        applicationID: appId,
        apiId: api.API_ID,
        policyId: policy.POLICY_ID
    };

    let subscriptionInDevportal;

    try {
        subscriptionInDevportal = await sequelize.transaction({ timeout: 60000 }, async (t) => {
            return await adminDao.createSubscription(orgDetails.ORG_ID, subscription, t);
        });

        try {
            await adminService.createCPSubscriptionOnBehalfOfUser(
                api.REFERENCE_ID,
                cpAppId,
                policy.POLICY_NAME,
                orgDetails.ORGANIZATION_IDENTIFIER,
                patToken
            );
        } catch (cpSubError) {
            logger.error(`Error creating CP subscription for API: ${apiSubscription.apiId.apiName}`, {
                orgId: orgDetails.ORG_ID,
                apiName: apiSubscription.apiId.apiName,
                error: cpSubError.message,
                stack: cpSubError.stack
            });

            // Rollback DevPortal subscription
            await sequelize.transaction({ timeout: 60000 }, async (t) => {
                await adminDao.deleteSubscription(orgDetails.ORG_ID, subscriptionInDevportal.SUBSCRIPTION_ID);
            });

            failedSubscriptions.push(apiSubscription);
        }
    } catch (devPortalSubError) {
        logger.error(`Error creating DevPortal subscription for API: ${apiSubscription.apiId.apiName}`, {
            orgId: orgDetails.ORG_ID,
            apiName: apiSubscription.apiId.apiName,
            error: devPortalSubError.message,
            stack: devPortalSubError.stack
        });
        failedSubscriptions.push(apiSubscription);
    }
};

module.exports = {
    saveApplication,
    updateApplication,
    deleteApplication,
    resetThrottlingPolicy,
    generateAPIKeys,
    generateApplicationKeys,
    generateOAuthKeys,
    revokeOAuthKeys,
    updateOAuthKeys,
    cleanUp,
    login,
    revokeAPIKeys,
    regenerateAPIKeys,
    importApplications
};