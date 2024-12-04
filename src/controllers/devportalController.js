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
const util = require('../utils/util');
const config = require('../../config.json');

const unsubscribeAPI = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        res.send(await util.invokeApiRequest('DELETE', `${config.controlPlanAPI}/subscriptions/${subscriptionId}`, {}, {}));
    } catch (error) {
        console.error("Error occurred while unsubscribing from API", error);
        util.handleError(res, error);
    }
}

const subscribeAPI = async (req, res) => {
    try {
        res.send(await util.invokeApiRequest('POST', `${config.controlPlanAPI}/subscriptions`, {}, req.body));
    } catch (error) {
        console.error("Error occurred while subscribing to API", error);
        util.handleError(res, error);
    }
}

const createApplication = async (req, res) => {
    try {
        const payload = {
            ...req.body,
            throttlingPolicy: 'Unlimited'
        };
        res.send(await util.invokeApiRequest('POST', `${config.controlPlanAPI}/applications`, {}, payload));
    } catch (error) {
        console.error("Error occurred while creating application", error);
        util.handleError(res, error);
    }
}

module.exports = {
    unsubscribeAPI,
    subscribeAPI,
    createApplication
};