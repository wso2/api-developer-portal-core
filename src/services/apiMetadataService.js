const { Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize')
const apiDao = require('../dao/apiMetadata');
const { APIResponse } = require('../models/apiMetadata');
const util = require('../utils/util');
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
            // Create response object
            const apiCreationResponse = new APIResponse(createdAPI);
            // Store image metadata
            const imageMetadata = apiMetadata.apiInfo.apiArtifacts.apiImages;
            const imageResponse = await apiDao.storeAPIImages(imageMetadata, apiID, orgId, t);
            if (apiMetadata.throttlingPolicies) {
                let throttlingPolicies = apiMetadata.throttlingPolicies;
                if (!Array.isArray(throttlingPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const throttlingPolicyResponse = await apiDao.createThrottlingPolicy(throttlingPolicies, apiID, orgId, t);
                APIResponse.throttlingPolicies = throttlingPolicies;
            }
            if (apiMetadata.apiInfo.additionalProperties) {
                let additionalProperties = apiMetadata.apiInfo.additionalProperties;
                const additionalPropertyResponse = await apiDao.storeAdditionalProperties(additionalProperties, apiID, orgId, t);
                //apiCreationResponse.apiInfo.additionalProperties = additionalPropertyResponse;
            }
            const storeAPIDefinition = await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t)
            console.log(APIResponse);
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
    const result = await sequelize.transaction(async t => {
        const retrievedAPI = await apiDao.getAPIMetadata(orgID, apiID, t);
        // Create response object
        const apiCreationResponse = new APIDTO(retrievedAPI[0]);
        res.status(200).send(apiCreationResponse);
    });
};

const getAllAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    if (!orgID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    const result = await sequelize.transaction(async t => {
        const retrievedAPIs = await apiDao.getAllAPIMetadata(orgID, t);
        // Create response object
        const apiCreationResponse = retrievedAPIs.map(api => new APIDTO(api));
        res.status(200).send(apiCreationResponse);
    });

};

const updateAPIMetadata = async (req, res) => {

};
const deleteAPIMetadata = async (req, res) => {

};

module.exports = {
    createAPIMetadata,
    getAPIMetadata,
    getAllAPIMetadata,
    updateAPIMetadata,
    deleteAPIMetadata
};
