const { APIMetadata } = require('../models/apiMetadata');
const ThrottlingPolicy = require('../models/throttlingPolicy');
const AdditionalProperties = require('../models/additionalAPIProperties');
const APIContent = require('../models/apiContent');
const APIImages = require('../models/apiImages');
const { Sequelize } = require('sequelize');

const createAPIMetadata = async (orgName, apiMetadata, t) => {

    let apiInfo = apiMetadata.apiInfo;
    try {
        const apiMetadataResponse = await APIMetadata.create({
            orgID: orgName,
            apiName: apiInfo.apiName,
            apiDescription: apiInfo.apiDescription,
            apiVersion: apiInfo.apiVersion,
            apiType: apiInfo.apiType,
            apiCategory: apiInfo.apiCategory,
            tags: apiInfo.tags,
            visibleGroups: apiInfo.visibleGroups.join(' '),
            visibility: apiInfo.visibility,
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

const createThrottlingPolicy = async (throttlingPolicies, apiID, orgID, t) => {

    let throttlingPolicyList = []
    try {
        throttlingPolicies.forEach(policy => {
            throttlingPolicyList.push({
                policyName: policy.policyName,
                description: policy.description,
                category: policy.category,
                apiID: apiID,
                orgID: orgID
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

const storeAdditionalProperties = async (additionalProperties, apiID, orgID, t) => {

    let additonalPropertyList = [];
    try {
        for (var propertyKey in additionalProperties) {
            additonalPropertyList.push({
                key: propertyKey,
                value: additionalProperties[propertyKey],
                apiID: apiID,
                orgID: orgID
            })
        }
        const additionalAPIPropertiesResponse = await AdditionalProperties.bulkCreate(additonalPropertyList, { transaction: t });
        return additionalAPIPropertiesResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAPIImages = async (apiImages, apiID, orgID, t) => {

    let apiImagesList = [];
    try {
        for (var propertyKey in apiImages) {
            apiImagesList.push({
                imageTag: propertyKey,
                imagePath: apiImages[propertyKey],
                apiID: apiID,
                orgID: orgID
            })
        }
        const apiImagesResponse = await APIImages.bulkCreate(apiImagesList, { transaction: t });
        return apiImagesResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAPIFile = async (apiDefinition, fileName, apiID, orgID, t) => {

    try {
        const additionalAPIProperties = await APIContent.create({
            apiFile: apiDefinition,
            fileName: fileName,
            apiID: apiID,
            orgID: orgID
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

const getAPIMetadata = async (orgID, apiID, t) => {

    try {
        const apiMetadataResponse = await APIMetadata.findAll({
            include: [{
                model: APIImages,
                where: {
                    apiID: apiID,
                    orgID: orgID
                },
                required: false
            }, {
                model: ThrottlingPolicy,
                where: {
                    apiID: apiID,
                    orgID: orgID
                },
                required: false
            }, {
                model: AdditionalProperties,
                where: {
                    apiID: apiID,
                    orgID: orgID
                }
            }],
        }, { transaction: t });
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getAllAPIMetadata = async (orgID, t) => {

    try {
        const apiMetadataResponse = await APIMetadata.findAll({
            include: [{
                model: APIImages,
                where: {
                    orgID: orgID
                },
                required: false
            }, {
                model: ThrottlingPolicy,
                where: {
                    orgID: orgID
                },
                required: false
            }, {
                model: AdditionalProperties,
                where: {
                    orgID: orgID
                }
            }],
        }, { transaction: t });
        console.log("API LIST: ")
        console.log(apiMetadataResponse)
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

module.exports = {
    createAPIMetadata,
    createThrottlingPolicy,
    storeAdditionalProperties,
    storeAPIFile,
    getAPIMetadata,
    getAllAPIMetadata,
    storeAPIImages
};
