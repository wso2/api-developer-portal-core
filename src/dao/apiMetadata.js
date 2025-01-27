/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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
const { APIMetadata } = require('../models/apiMetadata');
const SubscriptionPolicy = require('../models/subscriptionPolicy');
const APIContent = require('../models/apiContent');
const APIImageMetadata = require('../models/apiImages');
const { Sequelize, Op } = require('sequelize');
const constants = require('../utils/constants');

const createAPIMetadata = async (orgID, apiMetadata, t) => {

    const apiInfo = apiMetadata.apiInfo;
    let owners = {};
    if (apiInfo.owners) {
        owners = apiInfo.owners;
    }
    try {
        const apiMetadataResponse = await APIMetadata.create({
            REFERENCE_ID: apiInfo.referenceID,
            PROVIDER: apiInfo.provider,
            API_NAME: apiInfo.apiName,
            API_DESCRIPTION: apiInfo.apiDescription,
            API_VERSION: apiInfo.apiVersion,
            API_TYPE: apiInfo.apiType,
            VISIBILITY: apiInfo.visibility,
            VISIBLE_GROUPS: apiInfo.visibleGroups ? apiInfo.visibleGroups.join(' ') : null,
            TECHNICAL_OWNER: owners.technicalOwner,
            TECHNICAL_OWNER_EMAIL: owners.technicalOwnerEmail,
            BUSINESS_OWNER_EMAIL: owners.businessOwnerEmail,
            BUSINESS_OWNER: owners.businessOwner,
            SANDBOX_URL: apiMetadata.endPoints.sandboxURL,
            PRODUCTION_URL: apiMetadata.endPoints.productionURL,
            METADATA_SEARCH: apiMetadata,
            ORG_ID: orgID
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

const createSubscriptionPolicy = async (subscriptionPolicies, apiID, orgID, t) => {

    let subscriptionPolicyList = []
    try {
        subscriptionPolicies.forEach(policy => {
            subscriptionPolicyList.push({
                POLICY_NAME: policy.policyName,
                API_ID: apiID
            })
        });
        const subscriptionPolicyResponse = await SubscriptionPolicy.bulkCreate(subscriptionPolicyList, { transaction: t });
        return subscriptionPolicyResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const storeAPIImageMetadata = async (apiImages, apiID, t) => {

    let apiImagesList = [];
    try {
        for (var propertyKey in apiImages) {
            apiImagesList.push({
                IMAGE_TAG: propertyKey,
                IMAGE_NAME: apiImages[propertyKey],
                API_ID: apiID
            })
        }
        const apiImagesResponse = await APIImageMetadata.bulkCreate(apiImagesList, { transaction: t });
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
        const apiFileResponse = await APIContent.create({
            API_FILE: apiDefinition,
            FILE_NAME: fileName,
            API_ID: apiID
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

const storeAPIFiles = async (files, apiID, t) => {

    let apiContent = []
    try {
        files.forEach(file => {
            apiContent.push({
                API_FILE: file.content,
                FILE_NAME: file.fileName,
                API_ID: apiID
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
                    API_FILE: file.content,
                    FILE_NAME: file.fileName,
                    API_ID: apiID
                })
            } else {
                const updateResponse = await APIContent.update(
                    {
                        API_FILE: file.content,
                    },
                    {
                        where: {
                            API_ID: apiID,
                            FILE_NAME: apiFileResponse.FILE_NAME,
                        },
                        include: [
                            {
                                model: APIMetadata,
                                where: {
                                    ORG_ID: orgID
                                }
                            }
                        ]
                    }
                );
                if (!updateResponse) {
                    throw new Sequelize.DatabaseError('Error while updating API files');
                }
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
                FILE_NAME: fileName,
                API_ID: apiID
            },
            include: [
                {
                    model: APIMetadata,
                    where: {
                        ORG_ID: orgID
                    }
                }
            ]
        }, { transaction: t });
        return apiFileResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getAPIMetadataByCondition = async (condition, t) => {
    try {
        const tags = condition.TAGS;
        if (tags) {
            const tagsArray = tags.split(",").map(tag => tag.trim());
            console.log("tagsArray", tagsArray);

            condition.TAGS = {
                [Op.and]: tagsArray.map(tag => ({
                    [Sequelize.Op.like]: `%${tag}%`
                }))
            };
        }

        const apiMetadataResponse = await APIMetadata.findAll({
            include: [{
                model: APIImageMetadata,
                required: false
            }, {
                model: SubscriptionPolicy,
                required: false
            }
            ],
            where: condition
        }, { transaction: t });
        return apiMetadataResponse;
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
                model: APIImageMetadata,
                where: {
                    API_ID: apiID
                },
                required: false
            }, {
                model: SubscriptionPolicy,
                where: {
                    API_ID: apiID
                },
                required: false
            }
            ],
            where: {
                ORG_ID: orgID,
                API_ID: apiID
            }
        }, { transaction: t });
        return apiMetadataResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getAllAPIMetadata = async (orgID, groups, t) => {

    let apiList = [];
    for (const group of groups) {
        try {
            const apiMetadataResponse = await APIMetadata.findAll({
                where: {
                    ORG_ID: orgID,
                    VISIBLE_GROUPS: {
                        [Op.like]: `%${group}%`
                    }
                },
                include: [{
                    model: APIImageMetadata,
                    required: false
                }, {
                    model: SubscriptionPolicy,
                    required: false
                }],
            }, { transaction: t });
            if (apiMetadataResponse) {
                apiList.push(...apiMetadataResponse);
            }
        } catch (error) {
            {
                if (error instanceof Sequelize.UniqueConstraintError) {
                    throw error;
                }
                throw new Sequelize.DatabaseError(error);
            }
        }
    }
    // add all public apis
    try {
        const publicAPIS = await APIMetadata.findAll({
            where: {
                ORG_ID: orgID,
                VISIBILITY: constants.API_VISIBILITY.PUBLIC
            },
            include: [{
                model: APIImageMetadata,
                required: false
            }, {
                model: SubscriptionPolicy,
                required: false
            }],
        }, { transaction: t });
        apiList.push(...publicAPIS);
    } catch (error) {
        {
            if (error instanceof Sequelize.UniqueConstraintError) {
                throw error;
            }
            throw new Sequelize.DatabaseError(error);
        }
    }
    return apiList;
};

const searchAPIMetadata = async (orgID, groups, searchTerm, t) => {
    try {
        const query = `
        SELECT 
            metadata.*,
            COALESCE(
                JSON_AGG("DP_API_IMAGEDATA") FILTER (WHERE "DP_API_IMAGEDATA"."API_ID" IS NOT NULL), 
                '[]'
            ) AS "DP_API_IMAGEDATA",
             COALESCE(
                JSON_AGG("DP_API_SUBSCRIPTION_POLICY") FILTER (WHERE "DP_API_SUBSCRIPTION_POLICY"."API_ID" IS NOT NULL), 
                '[]'
            ) AS "DP_API_SUBSCRIPTION_POLICY"
        FROM 
            "DP_API_METADATA" metadata
        JOIN 
            "DP_API_CONTENT" content 
            ON metadata."API_ID" = content."API_ID"
        LEFT OUTER JOIN 
            "DP_API_IMAGEDATA" 
            ON metadata."API_ID" = "DP_API_IMAGEDATA"."API_ID"
        LEFT OUTER JOIN 
            "DP_API_SUBSCRIPTION_POLICY" 
            ON metadata."API_ID" = "DP_API_SUBSCRIPTION_POLICY"."API_ID"
        WHERE 
            (
                to_tsvector('english', metadata."METADATA_SEARCH"::text) @@ plainto_tsquery('english', :searchTerm)
                OR to_tsvector('english', convert_from(content."API_FILE", 'UTF8')) @@ plainto_tsquery('english', :searchTerm)
            )
            AND metadata."ORG_ID" = :orgID
            AND (
                content."FILE_NAME" LIKE '%.hbs' 
                OR content."FILE_NAME" LIKE '%md%' 
            )
            AND (
                (
                    :groups IS NOT NULL AND string_to_array(metadata."VISIBLE_GROUPS", ' ') && :groups
                )
                OR metadata."VISIBILITY" = 'PUBLIC'
            )
        GROUP BY 
            metadata."API_ID";
        `;
        const formattedGroups = `{${groups.map((g) => `"${g}"`).join(',')}}`;

        const results = await APIMetadata.sequelize.query(query, {
            replacements: { searchTerm, orgID, groups: formattedGroups },
            type: Sequelize.QueryTypes.SELECT,
        });

        return results;
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
                API_ID: apiID,
                ORG_ID: orgID
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

    const apiInfo = apiMetadata.apiInfo;
    let owners = {};
    if (apiInfo.owners) {
        owners = apiInfo.owners;
    }
    try {
        const [updateCount, apiMetadataResponse] = await APIMetadata.update({
            REFERENCE_ID: apiInfo.referenceID,
            PROVIDER: apiInfo.provider,
            API_NAME: apiInfo.apiName,
            API_DESCRIPTION: apiInfo.apiDescription,
            API_VERSION: apiInfo.apiVersion,
            API_TYPE: apiInfo.apiType,
            VISIBILITY: apiInfo.visibility,
            VISIBLE_GROUPS: apiInfo.visibleGroups ? apiInfo.visibleGroups.join(' ') : null,
            TECHNICAL_OWNER: owners.technicalOwner,
            TECHNICAL_OWNER_EMAIL: owners.technicalOwnerEmail,
            BUSINESS_OWNER_EMAIL: owners.businessOwnerEmail,
            BUSINESS_OWNER: owners.businessOwner,
            SANDBOX_URL: apiMetadata.endPoints.sandboxURL,
            PRODUCTION_URL: apiMetadata.endPoints.productionURL,
            METADATA_SEARCH: apiMetadata,
        }, {
            where: {
                API_ID: apiID,
                ORG_ID: orgID,
            },
            returning: true,
        }, { transaction: t });
        return [updateCount, apiMetadataResponse];
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

async function updateSubscriptionPolicy(orgID, apiID, subscriptionPolicies, t) {

    let policiesToCreate = [];
    let existingPolicies = [];
    try {
        for (const policy of subscriptionPolicies) {
            const subscriptionResponse = await getSubscriptionPolicy(policy.policyName, apiID, orgID, t);
            if (subscriptionResponse == null || subscriptionResponse == undefined) {
                policiesToCreate.push({
                    POLICY_NAME: policy.policyName,
                    API_ID: apiID
                })
            } else {
                existingPolicies.push(subscriptionResponse.dataValues);
            }
        }
        if (policiesToCreate.length > 0) {
            return await SubscriptionPolicy.bulkCreate(policiesToCreate, { transaction: t });
        } else {
            return existingPolicies;
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getSubscriptionPolicy = async (policyName, apiID, orgID, t) => {

    try {
        const subscriptionPolicyResponse = await SubscriptionPolicy.findOne({
            where: {
                API_ID: apiID,
                POLICY_NAME: policyName
            },
            include: [
                {
                    model: APIMetadata,
                    where: {
                        ORG_ID: orgID
                    }
                }
            ]
        }, { transaction: t });
        return subscriptionPolicyResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateAPIImageMetadata = async (apiImages, orgID, apiID, t) => {

    let imageCreateList = [];
    try {
        for (const propertyKey in apiImages) {
            let apiImageResponse = await getImageMetadata(propertyKey, apiImages[propertyKey], orgID, apiID, t);
            if (apiImageResponse == null || apiImageResponse == undefined) {
                imageCreateList.push({
                    IMAGE_NAME: apiImages[propertyKey],
                    API_ID: apiID,
                    IMAGE_TAG: propertyKey
                })
            } else {
                const apiImageDataUpdate = await APIImageMetadata.update({
                    IMAGE_NAME: apiImages[propertyKey],
                    IMAGE_TAG: propertyKey
                }, {
                    where: {
                        [Op.or]: [
                            { IMAGE_TAG: apiImageResponse.IMAGE_TAG },
                            { IMAGE_NAME: apiImageResponse.IMAGE_NAME }
                        ],
                        API_ID: apiID
                    },
                    include: [
                        {
                            model: APIMetadata,
                            where: {
                                ORG_ID: orgID
                            }
                        }
                    ]
                }, { transaction: t });
                if (!apiImageDataUpdate) {
                    throw new Sequelize.EmptyResultError("Error updating API Image Metadata");
                }
            }
            if (imageCreateList.length > 0) {
                await APIImageMetadata.bulkCreate(imageCreateList, { transaction: t });
            }
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getImageMetadata = async (imageTag, imageName, orgID, apiID, t) => {

    try {
        const apiImageData = await APIImageMetadata.findOne({
            where: {
                [Op.or]: [
                    { IMAGE_TAG: imageTag },
                    { IMAGE_NAME: imageName }
                ],
                API_ID: apiID
            },
            include: [
                {
                    model: APIMetadata,
                    where: {
                        ORG_ID: orgID
                    }
                }
            ]
        }, { transaction: t });
        return apiImageData;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateAPIFile = async (apiFile, fileName, apiID, orgID, t) => {

    try {
        const apiFileResponse = await getAPIFile(fileName, orgID, apiID, t);
        let fileUpdateResponse;
        if (apiFileResponse == null || apiFileResponse == undefined) {
            fileUpdateResponse = await APIContent.create({
                API_FILE: apiFile,
                FILE_NAME: fileName,
                API_ID: apiID
            }, { transaction: t });
        } else {
            fileUpdateResponse = await APIContent.update({
                API_FILE: apiFile,
                API_ID: apiID,
                FILE_NAME: fileName
            },
                {
                    where: {
                        API_ID: apiID,
                        FILE_NAME: fileName,
                    },
                    include: [
                        {
                            model: APIMetadata,
                            where: {
                                ORG_ID: orgID
                            }
                        }
                    ]
                },
                { transaction: t }
            );
        }
        return fileUpdateResponse;
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
                FILE_NAME: fileName,
                API_ID: apiID,
            },
            include: [
                {
                    model: APIMetadata,
                    where: {
                        ORG_ID: orgID
                    }
                }
            ]
        }, { transaction: t });
        return apiFileResponse;
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
            attributes: ['API_ID'],
            where: {
                API_NAME: apiName
            }
        })
        return api.API_ID;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

module.exports = {
    createAPIMetadata,
    createSubscriptionPolicy,
    storeAPIFile,
    getAPIMetadata,
    getAllAPIMetadata,
    storeAPIImageMetadata,
    deleteAPIMetadata,
    updateAPIMetadata,
    updateSubscriptionPolicy,
    updateAPIImageMetadata,
    updateAPIFile,
    storeAPIFiles,
    updateOrCreateAPIFiles,
    getAPIFile,
    deleteAPIFile,
    getAPIId,
    getAPIMetadataByCondition,
    searchAPIMetadata
};
