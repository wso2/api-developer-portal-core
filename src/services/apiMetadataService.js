const { Sequelize, Utils } = require('sequelize');
const sequelize = require('../db/sequelize')
const apiDao = require('../dao/apiMetadata');
const util = require('../utils/util');
const path = require('path');
const fs = require('fs').promises;
const unzipper = require('unzipper');
const APIDTO = require('../dto/apiDTO');


const createAPIMetadata = async (req, res) => {

    let apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    let orgId = req.params.orgId;
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const result = await sequelize.transaction(async t => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(orgId, apiMetadata, t);
            const apiID = createdAPI.dataValues.apiID;
            // Store image metadata
            const imageMetadata = apiMetadata.apiInfo.apiArtifacts.apiImages;
            const imageResponse = await apiDao.storeAPIImageMetadata(imageMetadata, apiID, orgId, t);
            if (apiMetadata.throttlingPolicies) {
                let throttlingPolicies = apiMetadata.throttlingPolicies;
                if (!Array.isArray(throttlingPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const throttlingPolicyResponse = await apiDao.createThrottlingPolicy(throttlingPolicies, apiID, orgId, t);
            }
            if (apiMetadata.apiInfo.additionalProperties) {
                let additionalProperties = apiMetadata.apiInfo.additionalProperties;
                const additionalPropertyResponse = await apiDao.storeAdditionalProperties(additionalProperties, apiID, orgId, t);
                //apiCreationResponse.apiInfo.additionalProperties = additionalPropertyResponse;
            }
            const storeAPIDefinition = await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t)
            apiMetadata.apiID = apiID;
            res.status(201).send(apiMetadata);
        });
        // store api definition file

    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
};

const getAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;

    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        const result = await sequelize.transaction(async t => {
            const retrievedAPI = await apiDao.getAPIMetadata(orgID, apiID, t);
            console.log(retrievedAPI)
            // Create response object
            const apiCreationResponse = new APIDTO(retrievedAPI[0]);
            res.status(200).send(apiCreationResponse);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }

};

const getAllAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    if (!orgID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        const result = await sequelize.transaction(async t => {
            const retrievedAPIs = await apiDao.getAllAPIMetadata(orgID, t);
            // Create response object
            const apiCreationResponse = retrievedAPIs.map(api => new APIDTO(api));
            res.status(200).send(apiCreationResponse);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
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
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const result = await sequelize.transaction(async t => {
            // Create apimetadata record
            const updatedAPI = await apiDao.updateAPIMetadata(orgId, apiID, apiMetadata, t);
            // Store image metadata
            const imageMetadata = apiMetadata.apiInfo.apiArtifacts.apiImages;
            const imageResponse = await apiDao.updateAPIImageMetadata(imageMetadata, orgId, apiID, t);
            if (apiMetadata.throttlingPolicies) {
                let throttlingPolicies = apiMetadata.throttlingPolicies;
                if (!Array.isArray(throttlingPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const throttlingPolicyResponse = await apiDao.updateThrottlingPolicy(orgId, apiID, throttlingPolicies, t);
            }
            if (apiMetadata.apiInfo.additionalProperties) {
                let additionalProperties = apiMetadata.apiInfo.additionalProperties;
                const additionalPropertyResponse = await apiDao.updateAdditionalProperties(orgId, apiID, additionalProperties, t);
            }
            const storeAPIDefinition = await apiDao.updateAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t)
            apiMetadata.apiID = apiID;
            res.status(200).send(apiMetadata);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    const result = await sequelize.transaction(async t => {
        try {
            const apiDeleteResponse = await apiDao.deleteAPIMetadata(orgID, apiID, t);
            res.status(200).send("Resouce Deleted Successfully");
        } catch (error) {
            console.log(error)
            util.handleError(res, error);
        }
    })
};

const createAPITemplate = async (req, res) => {

    try {
        let apiId = req.params.apiId;
        let orgId = req.params.orgId;
        const filePath = req.file.path; // Full path to the stored file
        const directory = await unzipper.Open.file(filePath);
        let extractPath = path.join('/tmp', req.params.orgId + '/' + req.params.apiId + '/');
        fs.mkdirSync(extractPath, { recursive: true });
        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split('.zip')[0];

        let apiContent = util.getAPIFileContent(extractPath + '/' + apiContentFileName + '/' + 'content');
        let apiImages = util.getAPIFileContent(extractPath + '/' + apiContentFileName + '/' + 'images');

        const result = await sequelize.transaction(async t => {
            const fileResponse = await apiDao.storeAPIFiles(apiContent, apiId, orgId, t);
            const imageResponse = await apiDao.updateAPIImages(apiImages, apiId, orgId, t);
        });
        await fs.rmSync(extractPath, { recursive: true, force: true });
        res.status(201).type('application/json').send({ message: 'API Template created successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        util.handleError(res, error);
    }
}

const updateAPITemplate = async (req, res) => {

    try {
        let apiId = req.params.apiId;
        let orgId = req.params.orgId;
        let extractPath = path.join('/tmp', req.params.orgId + '/' + req.params.apiId);
        await fs.mkdir(extractPath, { recursive: true });
        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split('.zip')[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, 'content');
        const imagesPath = path.join(extractPath, apiContentFileName, 'images');

        // Verify directories exist
        try {
            await fs.access(contentPath);
            await fs.access(imagesPath);
        } catch (err) {
            throw new Error(`Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}`);
        }

        let apiContent = util.getAPIFileContent(contentPath);
        let apiImages = util.getAPIFileContent(imagesPath);

        await sequelize.transaction(async t => {
            await apiDao.updateOrCreateAPIFiles(apiContent, apiId, orgId, t);
            await apiDao.updateAPIImages(apiImages, apiId, orgId, t);
        });
        await fs.rm(extractPath, { recursive: true, force: true });

        res.status(201).type('application/json').send({ message: 'API Template updated successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        util.handleError(res, error);
    }
}

const getAPIFile = async (req, res) => {

}

const deleteAPIFile = async (req, res) => {

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
    deleteAPIFile
};
