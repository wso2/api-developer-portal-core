const { Sequelize } = require("sequelize");
const sequelize = require("../db/sequelize");
const apiDao = require("../dao/apiMetadata");
const util = require("../utils/util");
const path = require("path");
const fs = require("fs").promises;
const APIDTO = require("../dto/apiDTO");
const constants = require("../utils/constants");

const createAPIMetadata = async (req, res) => {

    let apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    let orgId = req.params.orgId;
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
                let subscriptionPolicies = apiMetadata.subscriptionPolicies;
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
        console.log(error);
        util.handleError(res, error);
    }
};

const getAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;

    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        let retrievedAPI = await getMetadataFromDB(orgID, apiID);
        // Create response object
        res.status(200).send(retrievedAPI);
    } catch (error) {
        console.log(error);
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

    let orgID = req.params.orgId;
    if (!orgID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        let retrievedAPIs = await getMetadataListFromDB(orgID);
        res.status(200).send(retrievedAPIs);
    } catch (error) {
        console.log(error);
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

    let apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    let orgId = req.params.orgId;
    let apiID = req.params.apiId;
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError(
                "Missing or Invalid fields in the request payload"
            );
        }
        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            let [updatedRows, updatedAPI] = await apiDao.updateAPIMetadata(orgId, apiID, apiMetadata, t);
            if (!updatedRows) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            if (apiMetadata.subscriptionPolicies) {
                let subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                const subscriptionPolicyResponse = await apiDao.updateSubscriptionPolicy(orgId, apiID, subscriptionPolicies, t);
                updatedAPI[0].dataValues["DP_API_SUBSCRIPTION_POLICies"] = subscriptionPolicyResponse;
            }
            // update api definition file
            const updatedFileCount = await apiDao.updateAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t);
            if (!updatedFileCount) {
                throw new Sequelize.EmptyResultError("No record found to update");
            }
            res.status(200).send(new APIDTO(updatedAPI[0].dataValues));
        });
    } catch (error) {
        console.log(error);
        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    await sequelize.transaction(async (t) => {
        try {
            const apiDeleteResponse = await apiDao.deleteAPIMetadata(orgID, apiID, t);
            if (apiDeleteResponse === 0) {
                throw new Sequelize.EmptyResultError("Resource not found to delete");
            } else {
                res.status(200).send("Resouce Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
            util.handleError(res, error);
        }
    });
};

const createAPITemplate = async (req, res) => {

    try {
        let apiID = req.params.apiId;
        let orgId = req.params.orgId;
        let imageMetadata = JSON.parse(req.body.imageMetadata);
        let extractPath = path.join("/tmp", req.params.orgId + "/" + req.params.apiId);
        await fs.mkdir(extractPath, { recursive: true });
        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split(".zip")[0];

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
        let apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);

        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            let apiMetadata = await apiDao.getAPIMetadata(orgId, apiID, t);
            if (apiMetadata) {
                // Store image metadata
                await apiDao.storeAPIImageMetadata(imageMetadata, apiID, t);
                await apiDao.storeAPIFiles(apiContent, apiID, t);
            } else {
                throw new Sequelize.ValidationError("API does not belong to given organization");
            }
        });
        await fs.rm(extractPath, { recursive: true, force: true });
        res.status(201).type("application/json").send({ message: "API Template updated successfully" });
    } catch (error) {
        console.error("Error processing file:", error);
        util.handleError(res, error);
    }
};

const updateAPITemplate = async (req, res) => {

    try {
        let apiId = req.params.apiId;
        let orgId = req.params.orgId;
        let imageMetadata = JSON.parse(req.body.imageMetadata);
        let extractPath = path.join("/tmp", req.params.orgId + "/" + req.params.apiId);
        await fs.mkdir(extractPath, { recursive: true });

        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split(".zip")[0];

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
        let apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);
        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            let apiMetadata = await apiDao.getAPIMetadata(orgId, apiId, t);
            if (apiMetadata) {
                // Update image metadata
                await apiDao.updateAPIImageMetadata(imageMetadata, orgId, apiId, t);
                // Update API files
                await apiDao.updateOrCreateAPIFiles(apiContent, apiId, orgId, t);
            } else {
                throw new Sequelize.ValidationError("API does not belong to given organization");
            }
        });
        await fs.rm(extractPath, { recursive: true, force: true });
        res.status(201).send({ message: "API Files updated successfully" });
    } catch (error) {
        console.error("Error processing file:", error);
        util.handleError(res, error);
    }
};

const getAPIFile = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    let apiFileName = req.query.fileName;
    if (!orgID || !apiID || !apiFileName) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    let apiFileResponse = "";
    let apiFile;
    let contentType = "";
    try {
        const fileExtension = path.extname(apiFileName).toLowerCase();
        apiFileResponse = await apiDao.getAPIFile(apiFileName, orgID, apiID);
        console.log(apiFileResponse);
        if (fileExtension === constants.FILE_EXTENSIONS.HTML || fileExtension === constants.FILE_EXTENSIONS.HBS ||
            fileExtension === constants.FILE_EXTENSIONS.MD || fileExtension === constants.FILE_EXTENSIONS.JSON ||
            fileExtension === constants.FILE_EXTENSIONS.YAML || fileExtension === constants.FILE_EXTENSIONS.YML ||
            fileExtension === constants.FILE_EXTENSIONS.SVG) {
            apiFile = apiFileResponse.API_FILE.toString(constants.CHARSET_UTF8);
            if (fileExtension === constants.FILE_EXTENSIONS.JSON) {
                contentType = constants.MIME_TYPES.JSON;
            } else if (fileExtension === constants.FILE_EXTENSIONS.YAML || fileExtension === constants.FILE_EXTENSIONS.YML) {
                contentType = constants.MIME_TYPES.YAML;
            } else {
                contentType = constants.MIME_TYPES.TEXT;
            }
        } else {
            apiFile = apiFileResponse.API_FILE;
            if (fileExtension === constants.FILE_EXTENSIONS.SVG) {
                contentType = constants.MIME_TYPES.SVG;
            } else if (fileExtension === constants.FILE_EXTENSIONS.JPG || fileExtension === constants.FILE_EXTENSIONS.JPEG) {
                contentType = constants.MIME_TYPES.JPEG;
            } else if (fileExtension === constants.FILE_EXTENSIONS.PNG) {
                contentType = constants.MIME_TYPES.PNG;
            } else if (fileExtension === constants.FILE_EXTENSIONS.GIF) {
                contentType = constants.MIME_TYPES.GIF;
            } else {
                contentType = constants.MIME_TYPES.OCTETSTREAM;
            }
        }
        res.set({
            [constants.MIME_TYPES.CONTENT_TYPE]: contentType,
            [constants.MIME_TYPES.CONTENT_DISPOSITION]: `inline; filename="${apiFileName}"`,
            [[constants.MIME_TYPES.Cache_Control]]: "no-cache",
        });
        if (apiFileResponse) {
            // Send file content as text
            res.status(200).send(Buffer.isBuffer(apiFile) ? apiFile : Buffer.from(apiFile, "binary"));
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.log(error);
        util.handleError(res, error);
    }
};

const deleteAPIFile = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    let apiFileName = req.query.fileName;
    let apiFileResponse = "";
    if (!orgID || !apiID || !apiFileName) {
        throw new Sequelize.ValidationError(
            "Missing or Invalid fields in the request payload"
        );
    }
    try {
        apiFileResponse = await apiDao.deleteAPIFile(apiFileName, orgID, apiID);
        if (apiFileResponse) {
            // Send file content as text
            res.status(204).send();
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.log(error);
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
