/* eslint-disable no-undef */
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
const { invokeApiRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const controlPlaneUrl = config.controlPlane.url;
const util = require('../utils/util');
const passport = require('passport');
const { Strategy: CustomStrategy } = require('passport-custom');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');
const { ApplicationDTO } = require('../dto/application');
const sequelize = require('../db/sequelize');

const unsubscribeAPI = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ROLES.ORGANIZATION_CLAIM]);
        const { appID, apiReferenceID, subscriptionID } = req.query;
        const sharedToken = await adminDao.getApplicationKeyMapping(orgID, appID, true);
        const nonSharedToken = await adminDao.getApplicationKeyMapping(orgID, appID, false);

        await sequelize.transaction(async (t) => {
            try {
                if (nonSharedToken.length > 0) {
                    await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/subscriptions/${nonSharedToken.dataValues.SUBSCRIPTION_REF_ID}` , {}, {})
                }
                if (sharedToken.length === 1) {
                    await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/subscriptions/${sharedToken[0].dataValues.SUBSCRIPTION_REF_ID}`, {}, {})
                } else {
                    for (const dataValues of sharedToken) {
                        if (dataValues.API_REF_ID === apiReferenceID) {
                            await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/subscriptions/${dataValues.SUBSCRIPTION_REF_ID}`, {}, {})
                        }
                    };
                }
                await handleUnsubscribe(nonSharedToken, sharedToken, orgID, appID, apiReferenceID, subscriptionID, t);
                return res.status(204).send();
            } catch (error) {
                if (error.statusCode && error.statusCode === 404) {
                    await handleUnsubscribe(nonSharedToken, sharedToken, orgID, appID, apiReferenceID, subscriptionID, t);
                    return res.status(204).send();
                }
                console.error("Error occurred while unsubscribing from API", error);
                return util.handleError(res, error);
            }
        });
    } catch (error) {
        console.error("Error occurred while unsubscribing from API", error);
        return util.handleError(res, error);
    }
}

async function handleUnsubscribe(nonSharedToken, sharedToken, orgID, appID, apiRefID, subID, t) {
    try {
        await sequelize.transaction(async (t) => {

            if (nonSharedToken.length > 0) {
                await adminDao.deleteAppKeyMapping(orgID, appID, apiRefID);
            }
            if (sharedToken.length === 1) {
                await adminDao.updateApplicationKeyMapping(apiRefID, {
                    orgID: sharedToken[0].dataValues.ORG_ID,
                    appID: sharedToken[0].dataValues.APP_ID,
                    cpAppRef: sharedToken[0].dataValues.CP_APP_REF,
                    apiRefID: null,
                    subscriptionRefID: null,
                    sharedToken: true,
                    tokenType: constants.TOKEN_TYPES.OAUTH
                });
            } else {
                await adminDao.deleteAppKeyMapping(orgID, appID, apiRefID, t);
            }
            await adminDao.deleteSubscription(orgID, subID, t);
        });
    } catch (error) {
        console.error("Transaction failed during unsubscribing", error);
        throw error;
    }
}    

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ROLES.ORGANIZATION_CLAIM]);
        const application = await adminDao.createApplication(orgID, req.user.sub, req.body);
        return res.status(201).json(new ApplicationDTO(application.dataValues));
    } catch (error) {
        console.error("Error occurred while creating the application", error);
        util.handleError(res, error);
    }
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    try {
        const { name, throttlingPolicy, description } = req.body;
        const applicationId = req.params.applicationId;
        const responseData = await invokeApiRequest(req, 'PUT', `${controlPlaneUrl}/applications/${applicationId}`, {
            'Content-Type': 'application/json',
        }, {
            name,
            throttlingPolicy,
            description,
            tokenType: 'JWT',
            groups: [],
            attributes: {},
            subscriptionScopes: []
        });
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        console.error("Error occurred while updating the application", error);
        util.handleError(res, error);
    }
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const responseData = await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${applicationId}`, null, null);
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
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
        console.error("Error occurred while resetting the application", error);
        util.handleError(res, error);
    }
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const environment = req.params.env;
        const { validityPeriod, additionalProperties } = req.body;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/api-keys/${environment}/generate`, {
            'Content-Type': 'application/json'
        }, {
            validityPeriod, additionalProperties
        });
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        util.handleError(res, error);
    }
};

const generateApplicationKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/generate-keys`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the application keys", error);
        util.handleError(res, error);
    }
};

const generateOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}/generate-token`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
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
        console.error("Error occurred while generating the OAuth keys", error);
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
        console.error("Error occurred while generating the OAuth keys", error);
        util.handleError(res, error);
    }
};

const updateOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'PUT', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
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
            console.error("Error occurred while logging in", err);
            return util.handleError(res, err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return util.handleError(res, err);
            }
            console.log("Login successful", req.user);
            res.status(200).json({ message: 'Login successful' });
        });
    })(req, res);
};

module.exports = {
    unsubscribeAPI,
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
    login
};