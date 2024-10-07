const { Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize')
const apiDao = require('../dao/apiMetadata');
const { APIResponse } = require('../models/apiMetadata');
const util = require('../utils/util');


const createAPIMetadata = async (req, res) => {

    var apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;
    console.log(apiFileName)
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const result = await sequelize.transaction(async t => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(apiMetadata, t);
            const apiID = createdAPI.dataValues.apiID;
            // Create response object
            const apiCreationResponse = new APIResponse(createdAPI);

            if (apiMetadata.throttlingPolicies) {
                let throttlingPolicies = apiMetadata.throttlingPolicies;
                if (!Array.isArray(throttlingPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const throttlingPolicyResponse = await apiDao.createThrottlingPolicy(throttlingPolicies, apiID, t);
                APIResponse.throttlingPolicies = throttlingPolicies;
            }
            if (apiMetadata.apiInfo.additionalProperties) {
                let additionalProperties = apiMetadata.apiInfo.additionalProperties;
                if (!Array.isArray(additionalProperties)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const additionalPropertyResponse = await apiDao.storeAdditionalProperties(additionalProperties, apiID, t);
                //apiCreationResponse.apiInfo.additionalProperties = additionalPropertyResponse;
            }
            const storeAPIDefinition = await apiDao.storeAPIDefinition(apiDefinitionFile, apiFileName, apiID, t)
            console.log(storeAPIDefinition);
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
    
};

const getAllAPIMetadata = async (req, res) => {
    
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
