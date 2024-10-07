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
    try {
        let param = req.query.orgId || req.query.orgName;

        if (!param) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId' or 'orgName'");
        }

        const organization = await apiDao.getOrganization(param);

        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

const getAllAPIMetadata = async (req, res) => {
    try {
        let param = req.query.orgId || req.query.orgName;

        if (!param) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId' or 'orgName'");
        }

        const organization = await apiDao.getOrganization(param);

        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

const updateAPIMetadata = async (req, res) => {
    try {
        let orgId = req.query.orgId;
        const { orgName, authenticatedPages } = req.body;

        if (!orgId) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId'");
        }

        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        // Create organization in the database
        const [updatedRowsCount, updatedOrg] = await apiDao.updateOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr,
            orgId
        });

        res.status(200).json({
            orgId: updatedOrg[0].dataValues.orgId,
            orgName: updatedOrg[0].dataValues.orgName,
            authenticatedPages: updatedOrg[0].dataValues.authenticatedPages.split(' ').filter(Boolean)
        });

    } catch (error) {
        console.log(error);

        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {
    try {
        let orgId = req.query.orgId;

        if (!orgId) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId'");
        }

        const deletedRowsCount = await apiDao.deleteOrganization(orgId);
        if (deletedRowsCount > 0) {
            res.status(204).send();
        } else {
            throw new Sequelize.EmptyResultError('Organization not foundw');
        }
    } catch (error) {
        util.handleError(res, error);
    }
};

module.exports = {
    createAPIMetadata,
    getAPIMetadata,
    getAllAPIMetadata,
    updateAPIMetadata,
    deleteAPIMetadata
};
