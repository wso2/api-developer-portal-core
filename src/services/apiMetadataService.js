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
/* eslint-disable no-undef */
const { Sequelize } = require("sequelize");
const sequelize = require("../db/sequelize");
const apiDao = require("../dao/apiMetadata");
const util = require("../utils/util");
const path = require("path");
const fs = require("fs").promises;
const APIDTO = require("../dto/apiDTO");
const constants = require("../utils/constants");

const createAPIMetadata = async (req, res) => {

    const apiMetadata = JSON.parse(req.body.apiMetadata);
    const apiDefinitionFile = req.file.buffer;
    const apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    const orgId = req.params.orgId;
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(orgId, apiMetadata, t);
            const apiID = createdAPI.dataValues.API_ID;

            if (apiMetadata.subscriptionPolicies) {
                const subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                await apiDao.createSubscriptionPolicy(subscriptionPolicies, apiID, orgId, t);
            }
            // store api definition file
            await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t);
            apiMetadata.apiID = apiID;
        });
        res.status(201).send(apiMetadata);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const getAPIMetadata = async (req, res) => {

    const { orgId, apiId }  = dreq.params;
    if (!orgId || !apiId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const retrievedAPI = await getMetadataFromDB(orgId, apiId);
        // Create response object
        res.status(200).send(retrievedAPI);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};

const getMetadataFromDB = async (orgID, apiID) => {

    return await sequelize.transaction(async (t) => {
        const retrievedAPI = await apiDao.getAPIMetadata(orgID, apiID, t);
        if (retrievedAPI.length > 0) {
            return new APIDTO(retrievedAPI[0]);
        } else return {};
    });
};

const getAllAPIMetadata = async (req, res) => {

    const orgID = req.params.orgId;
    if (!orgID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        const retrievedAPIs = await getMetadataListFromDB(orgID);
        res.status(200).send(retrievedAPIs);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};

const getMetadataListFromDB = async (orgID) => {

    return await sequelize.transaction(async (t) => {
        const retrievedAPIs = await apiDao.getAllAPIMetadata(orgID, t);
        // Create response object
        const apiCreationResponse = retrievedAPIs.map((api) => new APIDTO(api));
        return apiCreationResponse;
    });
};

const updateAPIMetadata = async (req, res) => {

    const apiMetadata = JSON.parse(req.body.apiMetadata);
    const apiDefinitionFile = req.file.buffer;
    const apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    const { orgId, apiId }  = req.params;

    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            let [updatedRows, updatedAPI] = await apiDao.updateAPIMetadata(orgId, apiId, apiMetadata, t);
            if (!updatedRows) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            if (apiMetadata.subscriptionPolicies) {
                const subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                const subscriptionPolicyResponse = await apiDao.updateSubscriptionPolicy(orgId, apiId, subscriptionPolicies, t);
                updatedAPI[0].dataValues["DP_API_SUBSCRIPTION_POLICies"] = subscriptionPolicyResponse;
            }
            // update api definition file
            const updatedFileCount = await apiDao.updateAPIFile(apiDefinitionFile, apiFileName, apiId, orgId, t);
            if (!updatedFileCount) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            res.status(200).send(new APIDTO(updatedAPI[0].dataValues));
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_UPDATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {

    const { orgId, apiId }  = req.params;
    if (!orgId || !apiId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    await sequelize.transaction(async (t) => {
        try {
            const apiDeleteResponse = await apiDao.deleteAPIMetadata(orgId, apiId, t);
            if (apiDeleteResponse === 0) {
                throw new Sequelize.EmptyResultError("Resource not found to delete");
            } else {
                res.status(200).send("Resouce Deleted Successfully");
            }
        } catch (error) {
            console.error(`${constants.ERROR_MESSAGE.API_DELETE_ERROR}, ${error}`);
            util.handleError(res, error);
        }
    });
};

const createAPITemplate = async (req, res) => {

    try {
        const { orgId, apiId }  = req.params;
        let imageMetadata = JSON.parse(req.body.imageMetadata);
        const extractPath = path.join("/tmp", orgId + "/" + apiId);
        await fs.mkdir(extractPath, { recursive: true });
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        const apiContentFileName = req.file.originalname.split(".zip")[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, "content");
        const imagesPath = path.join(extractPath, apiContentFileName, "images");

        // Verify directories exist
        try {
            await fs.access(contentPath);
            await fs.access(imagesPath);
        } catch (err) {
            console.error(err);
            throw new Error(
                `Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}`
            );
        }
        //get api files
        let apiContent = await util.getAPIFileContent(contentPath);
        //get api images
        const apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);

        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            let apiMetadata = await apiDao.getAPIMetadata(orgId, apiId, t);
            if (apiMetadata) {
                // Store image metadata
                await apiDao.storeAPIImageMetadata(imageMetadata, apiId, t);
                await apiDao.storeAPIFiles(apiContent, apiId, t);
            } else {
                throw new Sequelize.ValidationError(constants.ERROR_MESSAGE.API_NOT_IN_ORG);
            }
        });
        await fs.rm(extractPath, { recursive: true, force: true });
        res.status(201).type("application/json").send({ message: "API Template updated successfully" });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const updateAPITemplate = async (req, res) => {

    try {
        const { orgId, apiId }  = req.params;
        const imageMetadata = JSON.parse(req.body.imageMetadata);
        const extractPath = path.join("/tmp", orgId + "/" + apiId);
        await fs.mkdir(extractPath, { recursive: true });
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        const apiContentFileName = req.file.originalname.split(".zip")[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, "content");
        const imagesPath = path.join(extractPath, apiContentFileName, "images");
        // Verify directories exist
        try {
            await fs.access(contentPath);
            await fs.access(imagesPath);
        } catch (err) {
            console.error(err);
            throw new Error(
                `Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}`
            );
        }
        //get api files
        let apiContent = await util.getAPIFileContent(contentPath);
        //get api images
        const apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);
        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            const apiMetadata = await apiDao.getAPIMetadata(orgId, apiId, t);
            if (apiMetadata) {
                // Update image metadata
                await apiDao.updateAPIImageMetadata(imageMetadata, orgId, apiId, t);
                // Update API files
                await apiDao.updateOrCreateAPIFiles(apiContent, apiId, orgId, t);
            } else {
                throw new Sequelize.ValidationError(constants.ERROR_MESSAGE.API_NOT_IN_ORG);
            }
        });
        await fs.rm(extractPath, { recursive: true, force: true });
        res.status(201).send({ message: "API Files updated successfully" });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_UPDATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const getAPIFile = async (req, res) => {

    const { orgId, apiId }  = req.params;
    const apiFileName = req.query.fileName;
    if (!orgId || !apiId || !apiFileName) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    let apiFileResponse = "";
    let apiFile;
    let contentType = "";
    try {
        const fileExtension = path.extname(apiFileName).toLowerCase();
        apiFileResponse = await apiDao.getAPIFile(apiFileName, orgId, apiId);
        if (util.isTextFile(fileExtension)) {
            apiFile = apiFileResponse.API_FILE.toString(constants.CHARSET_UTF8);
            contentType = util.retrieveContentType(apiFileName, constants.TEXT)
        } else {
            apiFile = apiFileResponse.API_FILE;
            contentType = util.retrieveContentType(apiFileName, constants.IMAGE);
        }
        res.set({
            [constants.MIME_TYPES.CONTENT_TYPE]: contentType,
            [constants.MIME_TYPES.CONTENT_DISPOSITION]: `inline; filename="${apiFileName}"`,
            [constants.MIME_TYPES.Cache_Control]: "no-cache",
        });
        if (apiFileResponse) {
            // Send file content as text
            res.status(200).send(Buffer.isBuffer(apiFile) ? apiFile : Buffer.from(apiFile, "binary"));
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};

const deleteAPIFile = async (req, res) => {

    const { orgId, apiId }  = req.params;
    const apiFileName = req.query.fileName;
    if (!orgId || !apiId || !apiFileName) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const apiFileResponse = await apiDao.deleteAPIFile(apiFileName, orgId, apiId);
        if (apiFileResponse) {
            res.status(204).send();
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_DELETE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};
module.exports = {
    createAPIMetadata,
    getAPIMetadata,
    getAllAPIMetadata,
    updateAPIMetadata,
    deleteAPIMetadata,
    createAPITemplate,
    updateAPITemplate,
    getAPIFile,
    deleteAPIFile,
    getMetadataListFromDB,
    getMetadataFromDB,
};
