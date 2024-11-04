const { APIMetadata } = require('../models/apiMetadata');
const APIImages = require('../models/apiImages');
const ThrottlingPolicy = require('../models/throttlingPolicy');
const AdditionalProperties = require('../models/additionalAPIProperties');
const APIContent = require('../models/apiContent');
const { Sequelize } = require('sequelize');

const createAPIMetadata = async (apiMetadata, t) => {

    let apiInfo = apiMetadata.apiInfo;
    try {
        const apiMetadataResponse = await APIMetadata.create({
            orgID: apiInfo.orgName,
            apiName: apiInfo.apiName,
            apiDescription: apiInfo.apiDescription,
            apiVersion: apiInfo.apiVersion,
            apiType: apiInfo.apiType,
            apiCategory: apiInfo.apiCategory,
            tags: apiInfo.tags,
            authorizedRoles: apiInfo.authorizedRoles.join(' '),
            technicalOwner: apiInfo.owners.technicalOwner,
            businessOwner: apiInfo.owners.businessOwner,
            sandboxUrl: apiMetadata.endPoints.sandboxUrl,
            productionUrl: apiMetadata.endPoints.productionUrl,
            metadata: JSON.stringify(apiMetadata)
        },
            { transaction: t }
        );
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const createThrottlingPolicy = async (throttlingPolicies, apiID, t) => {

    let throttlingPolicyList = []
    try {
        throttlingPolicies.forEach(policy => {
            throttlingPolicyList.push({
                policyName: policy.policyName,
                description: policy.description,
                category: policy.category,
                apiID: apiID
            })
        });
        const throttilingPolicy = await ThrottlingPolicy.bulkCreate(throttlingPolicyList, { transaction: t });
        return throttilingPolicy;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAdditionalProperties = async (additionalProperties, apiID, t) => {

    let additonalPropertyList = [];
    try {
        additionalProperties.forEach(property => {
            for (var propertyKey in property) {
                additonalPropertyList.push({
                    key: propertyKey,
                    value: property[propertyKey],
                    apiID: apiID
                })
            }
        });
        const additionalAPIPropertiesResponse = await AdditionalProperties.bulkCreate(additonalPropertyList, { transaction: t });
        return additionalAPIPropertiesResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAPIDefinition = async (apiDefinition, fileName, apiID, t) => {

    try {
        const additionalAPIProperties = await APIContent.create({
            apiContent: apiDefinition,
            fileName: fileName,
            apiID: apiID
        }, { transaction: t }
        );
        return additionalAPIProperties;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getAPIMetadata = async (orgId, apiId) => {
    try {
        const apiMetadata = await APIMetadata.findOne({ where: { apiId: apiId } });
        const apiImages = await APIImages.findOne({ where: { apiId: apiId } });
        const subscriptionPlan = await SubscriptionPlan.findOne({ where: { apiId: apiId } });

        if (!apiMetadata) {
            throw new Sequelize.EmptyResultError('No API Metadata not found');
        }
        let apiMetadataElement = {};
        apiMetadataElement.apiInfo = apiMetadata.toJSON();
        apiMetadataElement.apiInfo.apiArtifacts = {};
        apiMetadataElement.apiInfo.apiArtifacts.apiImages = apiImages

        return apiMetadataElement;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getAllAPIMetadata = async (orgId) => {
    try {
        const apiMetadatas = await APIMetadata.findAll({ where: { orgId: orgId } });
        const apiImages = await APIImages.findOne({ where: { orgId: orgId } });

        if (!apiMetadatas) {
            throw new Sequelize.EmptyResultError('No API Metadata not found');
        }
    
        let apiMetadataList = [];
        apiMetadatas.forEach(element => {
            let apiMetadata = {};
            apiMetadata.apiInfo = element.toJSON();
            apiMetadata.apiInfo.apiArtifacts = {};
            apiMetadata.apiInfo.apiArtifacts.apiImages = apiImages
            apiMetadataList.push(apiMetadata);
        });
        return apiMetadataList;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

module.exports = {
    createAPIMetadata,
    createThrottlingPolicy,
    storeAdditionalProperties,
    storeAPIDefinition,
    getAPIMetadata,
    getAllAPIMetadata
};
