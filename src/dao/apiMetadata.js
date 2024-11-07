const { APIMetadata } = require('../models/apiMetadata');
const ThrottlingPolicy = require('../models/throttlingPolicy');
const AdditionalProperties = require('../models/additionalAPIProperties');
const APIContent = require('../models/apiContent');
const APIImages = require('../models/apiImages');
const { Sequelize } = require('sequelize');

const createAPIMetadata = async (orgID, apiMetadata, t) => {

    let apiInfo = apiMetadata.apiInfo;
    try {
        const apiMetadataResponse = await APIMetadata.create({
            orgID: orgID,
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

const storeAPIImageMetadata = async (apiImages, apiID, orgID, t) => {

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

const updateAPIImages = async (apiImages, apiID, orgID, t) => {

    for (const image of apiImages) {
        const updateResponse = await APIImages.update(
            {
                image: image.content
            },
            {
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    imagePath: image.fileName
                }
            }
        );
    }
}


const storeAPIFile = async (apiDefinition, fileName, apiID, orgID, t) => {

    try {
        const apiFileResponse = await APIContent.create({
            apiFile: apiDefinition,
            fileName: fileName,
            apiID: apiID,
            orgID: orgID
        }, { transaction: t }
        );
        return apiFileResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAPIFiles = async (files, apiID, orgID, t) => {

    let apiContent = []
    try {
        files.forEach(file => {
            apiContent.push({
                apiFile: file.content,
                fileName: file.fileName,
                apiID: apiID,
                orgID: orgID

            })
        });
        const apiContentResponse = await APIContent.bulkCreate(apiContent, { transaction: t });
        return apiContentResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateOrCreateAPIFiles = async (files, apiID, orgID, t) => {

    let filesToCreate = []
    try {
        for (const file of files) {
            const apiFileResponse = await getAPIFile(file.fileName, orgID, apiID, t);
            if (apiFileResponse == null || apiFileResponse == undefined) {
                filesToCreate.push({
                    apiFile: file.content,
                    fileName: file.fileName,
                    apiID: apiID,
                    orgID: orgID

                })
            } else {
                const updateResponse = await APIContent.update(
                    {
                        apiFile: file.content
                    },
                    {
                        where: {
                            apiID: apiID,
                            orgID: orgID,
                            fileName: file.fileName,
                        }
                    }
                );
            }
        };
        if (filesToCreate.length > 0) {
            await APIContent.bulkCreate(filesToCreate, { transaction: t });
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getAPIFile = async (fileName, orgID, apiID, t) => {

    try {
        const apiFileResponse = await APIContent.findOne({
            where: {
                fileName: fileName,
                orgID: orgID,
                apiID: apiID
            }
        }, { transaction: t });
        return apiFileResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getAPIImageFile = async (fileName, orgID, apiID, t) => {

    try {
        const apiImageResponse = await APIImages.findOne({
            where: {
                imagePath: fileName,
                orgID: orgID,
                apiID: apiID
            }
        }, { transaction: t });
        return apiImageResponse;
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
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const deleteAPIMetadata = async (orgID, apiID, t) => {

    try {
        const apiMetadataResponse = await APIMetadata.destroy({
            where: {
                apiID: apiID,
                orgID: orgID
            }
        }, { transaction: t });
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateAPIMetadata = async (orgID, apiID, apiMetadata, t) => {

    let apiInfo = apiMetadata.apiInfo;
    try {
        const apiMetadataResponse = await APIMetadata.update({
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
        }, {
            where: {
                apiID: apiID,
                orgID: orgID
            }
        }, { transaction: t });
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

async function updateThrottlingPolicy(orgID, apiID, throttlingPolicies, t) {
    for (const policy of throttlingPolicies) {
        const updateResponse = await ThrottlingPolicy.update(
            {
                description: policy.description,
                category: policy.category
            },
            {
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    policyName: policy.policyName
                }
            }
        );
    }
}

const updateAdditionalProperties = async (orgID, apiID, additionalProperties, t) => {

    try {
        for (var propertyKey in additionalProperties) {
            const additionalProperty = await AdditionalProperties.update({
                value: additionalProperties[propertyKey]
            }, {
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    key: propertyKey
                }
            }, { transaction: t });
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateAPIImageMetadata = async (apiImages, orgID, apiID, t) => {

    try {
        for (var propertyKey in apiImages) {
            const apiImageData = await APIImages.update({
                imagePath: apiImages[propertyKey]
            }, {
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    imageTag: propertyKey
                }
            }, { transaction: t });
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateAPIFile = async (apiFile, fileName, apiID, orgID, t) => {

    try {
        const apiFileResponse = await APIContent.update({
            apiFile: apiFile,
            apiID: apiID,
            orgID: orgID
        },
            {
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    fileName: fileName,
                }
            }, { transaction: t }
        );
        return apiFileResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const deleteAPIFile = async (fileName, orgID, apiID, t) => {

    try {
        const apiFileResponse = await APIContent.destroy({
            where: {
                apiID: apiID,
                orgID: orgID,
                fileName: fileName
            }
        }, { transaction: t });
        return apiFileResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const deleteAPIImage = async (fileName, orgID, apiID, t) => {
    
        try {
            const apiImageResponse = await APIImages.destroy({
                where: {
                    apiID: apiID,
                    orgID: orgID,
                    imagePath: fileName
                }
            }, { transaction: t });
            return apiImageResponse;
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                throw error;
            }
            throw new Sequelize.DatabaseError(error);
        }
}

const getAPIId = async (apiName) => {
    try {
        const api = await APIMetadata.findOne({
            attributes: ['apiID'],
            where: {
                apiName: apiName
            }
          })
        return api.apiID;
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
    storeAPIFile,
    getAPIMetadata,
    getAllAPIMetadata,
    storeAPIImageMetadata,
    deleteAPIMetadata,
    updateAPIMetadata,
    updateThrottlingPolicy,
    updateAdditionalProperties,
    updateAPIImageMetadata,
    updateAPIFile,
    storeAPIFiles,
    updateAPIImages,
    updateOrCreateAPIFiles,
    getAPIImageFile,
    getAPIFile,
    deleteAPIFile,
    deleteAPIImage,
    getAPIId
};
