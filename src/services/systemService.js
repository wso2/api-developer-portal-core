/*
 * Copyright (c) 2025, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

const { or } = require('sequelize');
const adminDao = require('../dao/admin');
const apiDao = require("../dao/apiMetadata");
const apiMetadataService = require('./apiMetadataService');

const multer = require('multer');
const storage = multer.memoryStorage()
const apiDefinition = multer({ storage: storage })

const orgAction = async (req, res) => {
    const { action } = req.body; 

    if (action === "GET") {
        const { orgRef } = req.body;
        const orgId = await adminDao.getOrgIdFromReferenceId(orgRef);
        return res.status(200).json({ orgId: orgId });

    } else if (action === "POST") {
        const { payload } = req.body;
        const organization = await adminDao.createOrganization(payload);
        const orgCreationResponse = {
            orgId: organization.ORG_ID
        };
        res.status(201).send(orgCreationResponse);

    } else {
        res.status(400).send({ message: "Unknown Action" });
    }
};

const apiAction = async (req, res) => {
    const { action } = req.body; 
    if (action === "GET") {
        const { apiRef } = req.body;
        const apiId = await apiDao.getAPIIdFromReferenceId(apiRef);
        if (apiId) {
            return res.status(200).json({ apiId: apiId });
        } else {
            return res.status(404).send({ message: "API Not Found in Developer Portal" });
        } 

    } else if (action === "POST") {
        const { orgId } = req.body;
        req.params = { orgId };
        return await apiMetadataService.createAPIMetadata(req, res);

    } else if (action === "PUT") {
        const { orgId, apiId } = req.body;
        req.params = { orgId, apiId };
        return await apiMetadataService.updateAPIMetadata(req, res);

    } else if (action === "DELETE") {
        const { orgRef, apiRef } = req.body;
        const orgId = await adminDao.getOrgIdFromReferenceId(orgRef);
        if (!orgId) {
            return res.status(404).send({ message: "Organization Not Found in Developer Portal" });
        }
        const apiId = await apiDao.getAPIIdFromReferenceId(apiRef);
        if (!apiId) {
            return res.status(404).send({ message: "API Not Found in Developer Portal" });
        }
        req.params = { orgId, apiId };
        return await apiMetadataService.deleteAPIMetadata(req, res);

    } else {
        res.status(400).send({ message: "Unknown Action" });
    }
};

module.exports = {
    orgAction,
    apiAction
};
