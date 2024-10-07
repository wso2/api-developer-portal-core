const { APIMetadata } = require('../models/apiMetadata');
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



module.exports = {
    createAPIMetadata,
    createThrottlingPolicy,
    storeAdditionalProperties,
    storeAPIDefinition
};
