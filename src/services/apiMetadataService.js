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
const { Sequelize } = require("sequelize");
const sequelize = require("../db/sequelize");
const apiDao = require("../dao/apiMetadata");
const adminDao = require("../dao/admin");
const util = require("../utils/util");
const path = require("path");
const fs = require("fs").promises;
const fsDir = require("fs");
const { validationResult } = require('express-validator');
const APIDTO = require("../dto/apiDTO");
const ViewDTO = require("../dto/views");
const APIDocDTO = require("../dto/apiDoc");
const constants = require("../utils/constants");
const subscriptionPolicyDTO = require("../dto/subscriptionPolicy");
const { CustomError } = require("../utils/errors/customErrors");
const LabelDTO = require("../dto/label");

const createAPIMetadata = async (req, res) => {

    const apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile, apiFileName = "";
    if (req.file) {
        apiDefinitionFile = req.file.buffer;
        apiFileName = req.file.originalname;
    }
    const orgId = req.params.orgId;
    try {
        // Validate input
        if (!apiMetadata.apiInfo || !apiDefinitionFile || !apiMetadata.endPoints) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        if (apiMetadata.apiInfo.visibility === constants.API_VISIBILITY.PUBLIC && apiMetadata.apiInfo.visibleGroups) {
            throw new Sequelize.ValidationError(
                "Visible groups cannot be specified for a public API"
            );
        }
        apiMetadata.endPoints.productionURL = changeEndpoint(apiMetadata.endPoints.productionURL);
        apiMetadata.endPoints.sandboxURL = changeEndpoint(apiMetadata.endPoints.sandboxURL);
        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(orgId, apiMetadata, t);
            const apiID = createdAPI.dataValues.API_ID;
            if (apiMetadata.subscriptionPolicies) {
                const subscriptionPolicies = [];
                const apiSubscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(apiSubscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                } else {
                    for (const policy of apiSubscriptionPolicies) {
                        const subscriptionPolicy = await apiDao.getSubscriptionPolicyByName(orgId, policy.policyName);
                        if (!subscriptionPolicy) {
                            throw new Sequelize.EmptyResultError("Subscription policy not found");
                        } else {
                            subscriptionPolicies.push({ apiID: apiID, policyID: subscriptionPolicy.POLICY_ID });
                        }
                    };
                }
                await apiDao.createAPISubscriptionPolicy(subscriptionPolicies, apiID, t);
            }
            //store api labels
            if (apiMetadata.apiInfo.labels) {
                const labels = apiMetadata.apiInfo.labels;
                if (!Array.isArray(labels)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                await apiDao.createAPILabelMapping(orgId, apiID, labels, t);
            } else {
                await apiDao.createAPILabelMapping(orgId, apiID, ['default'], t);
            }
            // store api definition file
            await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, constants.DOC_TYPES.API_DEFINITION, t);
            apiMetadata.apiID = apiID;
        });


        res.status(201).send(apiMetadata);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CREATE_ERROR}`, error);
        util.handleError(res, error);
    }
};

function getRandomDarkColor() {
    let r, g, b;

    do {
        r = Math.floor(Math.random() * 128);  // Red component (0-127)
        g = Math.floor(Math.random() * 128);  // Green component (0-127)
        b = Math.floor(Math.random() * 128);  // Blue component (0-127)
    } while (r === 0 && g === 0 && b === 0);  // Skip black color

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function changeEndpoint(endPoint) {

    if (endPoint !== undefined && endPoint !== null && endPoint.includes("choreoapis")) {
        return endPoint.replace("choreoapis", "bijiraapis");
    }
    return endPoint;
}

const getAPIMetadata = async (req, res) => {

    const { orgId, apiId } = req.params;
    if (!orgId || !apiId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const retrievedAPI = await getMetadataFromDB(orgId, apiId);
        if (retrievedAPI !== "") {
            // Create response object
            res.status(200).send(retrievedAPI);
        } else {
            res.status(404).send("API not found");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_NOT_FOUND}`, error);
        util.handleError(res, error);
    }
};

const getMetadataFromDB = async (orgID, apiID) => {

    return await sequelize.transaction(async (t) => {
        const retrievedAPI = await apiDao.getAPIMetadata(orgID, apiID, t);
        if (retrievedAPI.length > 0) {
            return new APIDTO(retrievedAPI[0]);
        } else {
            return "";
        }
    });
};

const getAllAPIMetadata = async (req, res) => {
    try {
        const orgID = req.params.orgId;
        const searchTerm = req.query.query;
        const apiName = req.query.apiName;
        const apiVersion = req.query.version;
        const tags = req.query.tags;
        const view = req.query.view;
        let groupList = [];

        const allowedQueryParams = ['query', 'apiName', 'version', 'tags', 'groups', 'view'];
        const invalidParams = Object.keys(req.query).filter(param => !allowedQueryParams.includes(param));

        if (invalidParams.length > 0) {
            const parameterMessage = invalidParams.length === 1
                ? `Invalid query parameter: ${invalidParams.join(', ')}`
                : `Invalid query parameters: ${invalidParams.join(', ')}`;
            throw new Sequelize.ValidationError(parameterMessage);
        }

        if (req.query.groups) {
            groupList.push(req.query.groups.split(" "));
        }
        if (!orgID) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const retrievedAPIs = await getMetadataListFromDB(orgID, groupList, searchTerm, tags, apiName, apiVersion, view);
        res.status(200).send(retrievedAPIs);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_NOT_FOUND}`, error);
        util.handleError(res, error);
    }
};

const getMetadataListFromDB = async (orgID, groups, searchTerm, tags, apiName, apiVersion, viewName) => {

    return await sequelize.transaction(async (t) => {
        let retrievedAPIs;
        if (apiName || apiVersion || tags) {
            const condition = {};
            if (apiName) condition.API_NAME = apiName;
            if (apiVersion) condition.API_VERSION = apiVersion;
            if (tags) condition.TAGS = tags;
            condition.ORG_ID = orgID;
            retrievedAPIs = await apiDao.getAPIMetadataByCondition(condition);
        } else if (searchTerm) {
            retrievedAPIs = await apiDao.searchAPIMetadata(orgID, groups, searchTerm, viewName, t);
        } else if (viewName) {
            retrievedAPIs = await apiDao.getAllAPIMetadata(orgID, groups, viewName, t);
        }
        // Create response object
        const apiCreationResponse = retrievedAPIs ? retrievedAPIs.map((api) => new APIDTO(api)) : [];
        return apiCreationResponse;
    });
};

const updateAPIMetadata = async (req, res) => {

    const apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile, apiFileName = "";
    if (req.file) {
        apiDefinitionFile = req.file.buffer;
        apiFileName = req.file.originalname;
    }
    //TODO: Get orgId from the orgName
    const { orgId, apiId } = req.params;

    try {
        // Validate input
        if (!apiMetadata.apiInfo || !apiDefinitionFile || !apiMetadata.endPoints) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        apiMetadata.endPoints.productionURL = changeEndpoint(apiMetadata.endPoints.productionURL);
        apiMetadata.endPoints.sandboxURL = changeEndpoint(apiMetadata.endPoints.sandboxURL);

        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            console.log("Updating metadata", apiId);
            let [updatedRows, updatedAPI] = await apiDao.updateAPIMetadata(orgId, apiId, apiMetadata, t);
            if (!updatedRows) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            if (apiMetadata.apiInfo.addedLabels) {
                const labels = apiMetadata.apiInfo.addedLabels;
                if (!Array.isArray(labels)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                await apiDao.createAPILabelMapping(orgId, apiId, labels, t);
                updatedAPI[0].dataValues.addedLabels = apiMetadata.apiInfo.addedLabels;
            }
            if (apiMetadata.apiInfo.removedLabels) {
                const labels = apiMetadata.apiInfo.removedLabels;
                if (!Array.isArray(labels)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                const labelDelete = await apiDao.deleteAPILabels(orgId, apiId, labels, t);
                if (labelDelete === 0) {
                    throw new Sequelize.EmptyResultError("API Labels not found to delete");
                }
                updatedAPI[0].dataValues.removedLabels = apiMetadata.apiInfo.removedLabels;
            }
            if (apiMetadata.subscriptionPolicies) {
                const subscriptionPolicies = [];
                const apiSubscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(apiSubscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                } else {
                    for (const policy of apiSubscriptionPolicies) {
                        const subscriptionPolicy = await apiDao.getSubscriptionPolicyByName(orgId, policy.policyName);
                        if (!subscriptionPolicy) {
                            throw new Sequelize.EmptyResultError("Subscription policy not found");
                        } else {
                            subscriptionPolicies.push({ apiID: apiId, policyID: subscriptionPolicy.POLICY_ID });
                        }
                    };
                }
                // Get subscription policy IDs and fail if any policy is not found
                await apiDao.updateAPISubscriptionPolicy(subscriptionPolicies, apiId, t);
                updatedAPI[0].dataValues["DP_SUBSCRIPTION_POLICies"] = await apiDao.getSubscriptionPolicies(apiId, t);
            }
            // update api definition file
            const updatedFileCount = await apiDao.updateAPIFile(apiDefinitionFile, apiFileName, apiId, orgId, t);
            if (!updatedFileCount) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            res.status(200).send(new APIDTO(updatedAPI[0].dataValues));
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_UPDATE_ERROR}`, error);
        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {

    const { orgId, apiId } = req.params;
    if (!orgId || !apiId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    await sequelize.transaction(async (t) => {
        try {
            //check if subscriptions exist for the application
            const subApis = await adminDao.getSubscriptions(orgId, '', apiId);
            if (subApis.length > 0) {
                throw new CustomError(409, constants.ERROR_MESSAGE.ERR_SUB_EXIST, "API has subscriptions.");
            }
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
        const { orgId, apiId } = req.params;
        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }
        const zipFilePath = req.file.path;
        const extractPath = path.join("/tmp", orgId + "/" + apiId);
        await fs.mkdir(extractPath, { recursive: true });
        await util.unzipDirectory(zipFilePath, extractPath);

        const apiContentFileName = req.file.originalname.split(".zip")[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, "content");
        const imagesPath = path.join(extractPath, apiContentFileName, "images");
        const documentPath = path.join(extractPath, apiContentFileName, "documents");

        // Verify directories exist
        try {
            if (fsDir.existsSync(contentPath)) {
                await fs.access(contentPath);
            }
            if (fsDir.existsSync(imagesPath)) {
                await fs.access(imagesPath);
            }
            if (fsDir.existsSync(documentPath)) {
                await fs.access(documentPath);
            }
        } catch (err) {
            console.log("Error while trying to access directories");
            console.error(err);
            throw new Error(
                `Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}
                , Documents path: ${documentPath}`
            );
        }
        let apiContent = [];

        //get api files
        if (fsDir.existsSync(contentPath)) {
            let apiLanding = await util.getAPIFileContent(contentPath);
            apiContent.push(...apiLanding);
        }
        //get api images
        if (fsDir.existsSync(imagesPath)) {
            const apiImages = await util.getAPIImages(imagesPath);
            apiContent.push(...apiImages);
        }
        //get api documents
        if (fsDir.existsSync(documentPath)) {
            const apiDocuments = await util.readDocFiles(documentPath);
            apiContent.push(...apiDocuments);
        }
        let docMetadata = "";
        if (req.body.docMetadata) {
            docMetadata = JSON.parse(req.body.docMetadata);
            const links = util.getAPIDocLinks(docMetadata);
            apiContent.push(...links);
        }
        let imageMetadata = {};
        if (req.body.imageMetadata) {
            imageMetadata = JSON.parse(req.body.imageMetadata);
        }
        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            let apiMetadata = await apiDao.getAPIMetadata(orgId, apiId, t);
            let exsistingAPIImage = await apiDao.getImage(constants.API_ICON, apiId, t);

            if (imageMetadata[constants.API_ICON], exsistingAPIImage) {
                await apiDao.deleteImage(constants.API_ICON, apiId, t);
            }

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
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_CREATE_ERROR}`, error);
        util.handleError(res, error);
    }
};

const updateAPITemplate = async (req, res) => {

    try {
        const { orgId, apiId } = req.params;
        let imageMetadata;
        if (req.body.imageMetadata) {
            imageMetadata = JSON.parse(req.body.imageMetadata);
        }
        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }
        const zipFilePath = req.file.path;
        const extractPath = path.join("/tmp", orgId + "/" + apiId);
        await fs.mkdir(extractPath, { recursive: true });
        await util.unzipDirectory(zipFilePath, extractPath);
        const apiContentFileName = req.file.originalname.split(".zip")[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, "content");
        const imagesPath = path.join(extractPath, apiContentFileName, "images");
        const documentPath = path.join(extractPath, apiContentFileName, "documents");

        // Verify directories exist
        try {
            if (fsDir.existsSync(contentPath)) {
                await fs.access(contentPath);
            }
            if (fsDir.existsSync(imagesPath)) {
                await fs.access(imagesPath);
            }
            if (fsDir.existsSync(documentPath)) {
                await fs.access(documentPath);
            }
        } catch (err) {
            console.error(err);
            throw new Error(
                `Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath},
                Documents path: ${documentPath}`
            );
        }
        let apiContent = [];
        //get api files
        if (fsDir.existsSync(contentPath)) {
            let apiLanding = await util.getAPIFileContent(contentPath);
            apiContent.push(...apiLanding);
        }
        //get api images
        if (fsDir.existsSync(imagesPath)) {
            const apiImages = await util.getAPIImages(imagesPath);
            apiContent.push(...apiImages);
        }
        //get api documents
        if (fsDir.existsSync(documentPath)) {
            const apiDocuments = await util.readDocFiles(documentPath);
            apiContent.push(...apiDocuments);
        }

        if (req.body.docMetadata) {
            docMetadata = JSON.parse(req.body.docMetadata);
            const links = util.getAPIDocLinks(docMetadata);
            apiContent.push(...links);
        }
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

    const rules = util.validateRequestParameters();
    for (let validation of rules) {
        await validation.run(req);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(util.getErrors(errors));
    }
    const { orgId, apiId } = req.params;
    const apiFileName = req.query.fileName;
    const type = req.query.type;
    if (!orgId || !apiId || !apiFileName || !type) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    let apiFileResponse = "";
    let apiFile;
    let contentType = "";
    try {
        const fileExtension = path.extname(apiFileName).toLowerCase();
        apiFileResponse = await apiDao.getAPIFile(apiFileName, type, orgId, apiId);
        if (apiFileResponse) {
            apiFile = apiFileResponse.API_FILE;
            //convert to text to check if link
            const textContent = new TextDecoder().decode(apiFile);
            if (textContent.startsWith("http") || textContent.startsWith("https")) {
                apiFile = textContent;
                contentType = constants.MIME_TYPES.TEXT;
            } else if (util.isTextFile(fileExtension)) {
                contentType = util.retrieveContentType(apiFileName, constants.TEXT)
            } else {
                contentType = util.retrieveContentType(apiFileName, constants.IMAGE);
            }
            res.set(constants.MIME_TYPES.CONYEMT_TYPE, contentType);

            if (apiFileResponse) {
                // Send file content as text
                return res.status(200).send(Buffer.isBuffer(apiFile) ? apiFile : constants.CHARSET_UTF8);
            } else {
                res.status(404).send("API File not found");
            }
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};

const getAPIDocTypes = async (orgID, apiID) => {

    try {
        const docTypeResponse = await apiDao.getAPIDocTypes(orgID, apiID);
        const apiCreationResponse = docTypeResponse.map((doc) => new APIDocDTO(doc.dataValues));
        return apiCreationResponse;
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_DOCS_LIST_ERROR}`, error);
        util.handleError(res, error);
    }
}

const deleteAPIFile = async (req, res) => {

    const { orgId, apiId } = req.params;
    const apiFileName = req.query.fileName;
    const fileType = req.query.type;
    if (!orgId || !apiId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        let apiFileResponse;
        if (apiFileName) {
            apiFileResponse = await apiDao.deleteAPIFile(apiFileName, fileType, orgId, apiId);
        } else {
            apiFileResponse = await apiDao.deleteAllAPIFiles(fileType, orgId, apiId);
        }
        if (apiFileResponse) {
            res.status(204).send();
        } else {
            res.status(404).send("API Content not found");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_DELETE_ERROR}`, error);
        util.handleError(res, error);
    }
};

const createSubscriptionPolicy = async (req, res) => {

    const { orgId } = req.params;
    const subscriptionPolicy = req.body;
    if (!orgId || !subscriptionPolicy) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        await sequelize.transaction(async (t) => {
            const subscriptionPolicyResponse = await apiDao.createSubscriptionPolicy(orgId, subscriptionPolicy, t);
            if (subscriptionPolicyResponse) {
                res.status(201).send(new subscriptionPolicyDTO(subscriptionPolicyResponse));
            } else {
                throw new CustomError(500, constants.ERROR_CODE[500], constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_CREATE_ERROR);
            }
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const updateSubscriptionPolicy = async (req, res) => {

    const { orgId, policyID } = req.params;
    const subscriptionPolicy = req.body;
    if (!orgId || !policyID || !subscriptionPolicy) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        await sequelize.transaction(async (t) => {
            const subscriptionPolicyResponse = await apiDao.updateSubscriptionPolicy(orgId, policyID, subscriptionPolicy, t);
            if (subscriptionPolicyResponse) {
                res.status(200).send(new subscriptionPolicyDTO(subscriptionPolicyResponse[0]));
            } else {
                throw new CustomError(404, constants.ERROR_CODE[404], constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND);
            }
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};

const deleteSubscriptionPolicy = async (req, res) => {

    const { orgId, policyID } = req.params;
    if (!orgId || !policyID) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        await sequelize.transaction(async (t) => {
            const deleteCount = await apiDao.deleteSubscriptionPolicy(orgId, policyID, t);
            if (deleteCount === 0) {
                throw new CustomError(404, constants.ERROR_CODE[404], constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND);
            } else {
                res.status(204).send();
            }
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_DELETE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const getSubscriptionPolicy = async (req, res) => {

    const { orgId, policyID } = req.params;

    if (!orgId || !policyID) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }

    try {
        const subscriptionPolicyResponse = await apiDao.getSubscriptionPolicy(policyID, orgId);
        if (subscriptionPolicyResponse) {
            res.status(200).send(new subscriptionPolicyDTO(subscriptionPolicyResponse));
        } else {
            throw new CustomError(404, constants.ERROR_CODE[404], constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND);
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.SUBSCRIPTION_POLICY_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
};


const createLabels = async (req, res) => {

    const orgId = req.params.orgId;
    const labels = req.body;
    try {
        if (!orgId || !labels) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        await apiDao.createLabels(orgId, labels);
        res.status(201).send(labels);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.LABEL_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
}

const updateLabel = async (req, res) => {

    const orgId = req.params.orgId;
    const labels = req.body;
    try {
        if (!orgId || !labels) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        for (const label of labels) {
            await apiDao.updateLabel(orgId, label);
        };
        res.status(201).send(labels);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.LABEL_UPDATE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const deleteLabels = async (req, res) => {

    const orgId = req.params.orgId;
    const labelNames = req.query.names;
    if (!orgId || !labelNames) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    const labelList = labelNames.split(",");
    try {
        await apiDao.deleteLabel(orgId, labelList);
        res.status(204).send();
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.LABEL_DELETE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const retrieveLabels = async (req, res) => {

    const orgId = req.params.orgId;
    if (!orgId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const labels = await getOrgLabels(orgId);
        res.status(200).send(labels);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.LABEL_RETRIEVE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const getOrgLabels = async (orgId) => {

    try {
        const labels = await apiDao.getLabels(orgId);
        return labels.map((label) => new LabelDTO(label));
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.LABEL_UPDATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
}

const addView = async (req, res) => {

    const orgId = req.params.orgId;
    const labels = req.body.labels;
    const viewName = req.body.name;
    if (!orgId || !viewName || !labels) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    await sequelize.transaction(async (t) => {
        try {
            const viewResponse = await apiDao.addView(orgId, req.body, t);
            const viewID = viewResponse.dataValues.VIEW_ID;
            await apiDao.addViewLabels(orgId, viewID, labels, t);
            res.status(201).send({ message: "View added successfully" });
        } catch (error) {
            console.error(`${constants.ERROR_MESSAGE.VIEW_CREATE_ERROR}`, error);
            util.handleError(res, error);
        }
    });
}

const updateView = async (req, res) => {

    const orgId = req.params.orgId;
    const removedLabels = req.body.removedLabels ? req.body.removedLabels : [];
    const addedLabels = req.body.addedLabels ? req.body.addedLabels : [];
    const viewName = req.params.name;
    if (!orgId || !viewName) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        await sequelize.transaction(async (t) => {

            let viewID = "";
            if (req.body.displayName) {
                let viewResponse = await apiDao.updateView(orgId, viewName, req.body.displayName, t);
                viewID = viewResponse.dataValues.VIEW_ID;
            }
            if (removedLabels.length !== 0) {
                await apiDao.deleteViewLabels(orgId, viewID, removedLabels, t);
            }
            if (addedLabels.length !== 0) {
                viewID = viewID ? viewID : await apiDao.getViewID(orgId, viewName, t);
                await apiDao.addViewLabels(orgId, viewID, addedLabels, t);
            }
            res.status(200).send(req.body);
        });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.VIEW_UPDATE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const deleteView = async (req, res) => {

    const orgId = req.params.orgId;
    const name = req.params.name;
    if (!orgId || !name) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const viewDelete = await apiDao.deleteView(orgId, name);
        if (viewDelete === 0) {
            throw new Sequelize.EmptyResultError("Resource not found to delete");
        } else {
            res.status(204).send("View Deleted Successfully");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.VIEW_DELETE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const getView = async (req, res) => {

    const orgId = req.params.orgId;
    const name = req.params.name;
    if (!orgId || !name) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const view = await getViewInfo(orgId, name);
        if (view) {
            res.status(200).send(view);
        } else {
            res.status(404).send(`View ${name} not found`);
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.VIEW_RETRIEVE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const getViewInfo = async (orgId, name) => {

    const view = await apiDao.getView(orgId, name);
    if (view.dataValues) {
        return new ViewDTO(view.dataValues);
    } else {
        return null;
    }
}

const getAllViews = async (req, res) => {

    const orgId = req.params.orgId;
    if (!orgId) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        const views = await getViewsFromDB(orgId);
        if (views.length > 0) {
            return res.status(200).send(views);;
        } else {
            res.status(404).send("No views found");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.VIEW_RETRIEVE_ERROR}`, error);
        util.handleError(res, error);
    }
}

const getViewsFromDB = async (orgId) => {

    const views = await apiDao.getAllViews(orgId);
    if (views.length > 0) {
        return views.map((view) => new ViewDTO(view));
    } else {
        return [];
    }
}

module.exports = {
    createAPIMetadata,
    getAPIMetadata,
    getAllAPIMetadata,
    updateAPIMetadata,
    deleteAPIMetadata,
    createAPITemplate,
    updateAPITemplate,
    getAPIFile,
    getAPIDocTypes,
    deleteAPIFile,
    getMetadataListFromDB,
    getMetadataFromDB,
    createSubscriptionPolicy,
    updateSubscriptionPolicy,
    deleteSubscriptionPolicy,
    getSubscriptionPolicy,
    createLabels,
    deleteLabels,
    retrieveLabels,
    getOrgLabels,
    updateLabel,
    addView,
    updateView,
    deleteView,
    getView,
    getAllViews,
    getViewsFromDB,
    getViewInfo
};
