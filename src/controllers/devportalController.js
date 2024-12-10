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

const unsubscribeAPI = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        res.send(await invokeApiRequest('DELETE', `${controlPlaneUrl}/subscriptions/${subscriptionId}`, {}, {}));
    } catch (error) {
        console.error("Error occurred while unsubscribing from API", error);
        handleError(res, error);
    }
}

const subscribeAPI = async (req, res) => {
    try {
        res.send(await invokeApiRequest('POST', `${controlPlaneUrl}/subscriptions`, {}, req.body));
    } catch (error) {
        console.error("Error occurred while subscribing to API", error);
        handleError(res, error);
    }
}

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    try {
        let { name, throttlingPolicy, description } = req.body;

        if (!throttlingPolicy) {
            throttlingPolicy = 'Unlimited';
        }

        const responseData = await invokeApiRequest('POST', `${controlPlaneUrl}/applications`, {
            'Content-Type': 'application/json'
        }, {
            name,
            throttlingPolicy,
            description,
            tokenType: 'JWT',
            groups: [],
            attributes: {},
            subscriptionScopes: []
        });
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error occurred while creating the application", error);
        handleError(res, error);
    }
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    try {
        const { name, throttlingPolicy, description } = req.body;
        const applicationId = req.params.applicationid;
        const responseData = await invokeApiRequest('PUT', `${controlPlaneUrl}/applications/${applicationId}`, {
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
        handleError(res, error);
    }
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const responseData = await invokeApiRequest('DELETE', `${controlPlaneUrl}/applications/${applicationId}`, null, null);
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        handleError(res, error);
    }
}

// ***** Save Application *****

const resetThrottlingPolicy = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const { userName } = req.body;
        const responseData = await invokeApiRequest('POST', `${controlPlaneUrl}/applications/${applicationId}/reset-throttle-policy`, {
            'Content-Type': 'application/json'
        }, {
            userName
        });
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        console.error("Error occurred while resetting the application", error);
        handleError(res, error);
    }
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const environment = req.params.env;
        const { validityPeriod, additionalProperties } = req.body;
        const responseData = await invokeApiRequest('POST', `${controlPlaneUrl}/applications/${applicationId}/api-keys/${environment}/generate`, {
            'Content-Type': 'application/json'
        }, {
            validityPeriod, additionalProperties
        });
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        handleError(res, error);
    }
};

module.exports = {
    unsubscribeAPI,
    subscribeAPI,
    saveApplication,
    updateApplication,
    deleteApplication,
    resetThrottlingPolicy,
    generateAPIKeys
};