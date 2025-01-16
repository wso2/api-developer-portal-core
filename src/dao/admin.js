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
const { Organization, OrgContent } = require('../models/orgModels');
const { validate } = require('uuid');
const { Sequelize } = require('sequelize');
const { IdentityProvider } = require('../models/identityProvider');
const Provider = require('../models/provider');

const createOrganization = async (orgData) => {

    let devPortalID = "";
    if (orgData.devPortalURLIdentifier) {
        devPortalID = orgData.devPortalURLIdentifier
    }
    const createOrgData = {
        ORG_NAME: orgData.orgName,
        BUSINESS_OWNER: orgData.businessOwner,
        BUSINESS_OWNER_CONTACT: orgData.businessOwnerContact,
        BUSINESS_OWNER_EMAIL: orgData.businessOwnerEmail,
        DEV_PORTAL_URL_IDENTIFIER: devPortalID,
        ROLE_CLAIM_NAME: orgData.roleClaimName,
        GROUPS_CLAIM_NAME: orgData.groupsClaimName,
        ORGANIZATION_CLAIM_NAME: orgData.organizationClaimName,
        ORGANIZATION_IDENTIFIER: orgData.organizationIdentifier,
        ADMIN_ROLE: orgData.adminRole,
        SUBSCRIBER_ROLE: orgData.subscriberRole,
        SUPER_ADMIN_ROLE: orgData.superAdminRole
    };
    try {
        const organization = await Organization.create(createOrgData);
        return organization;
    } catch (error) {
        console.log(error)
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getOrganization = async (param) => {

    const isUUID = validate(param);
    const condition = isUUID ? { ORG_ID: param } : { ORG_NAME: param };
    try {
        const organization = await Organization.findOne({ where: condition });
        if (!organization) {
            throw new Sequelize.EmptyResultError('Organization not found');
        }
        return organization;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getOrgId = async (orgName) => {
    try {
        const organization = await Organization.findOne({ where: { ORG_NAME: orgName } });
        if (!organization) {
            throw new Sequelize.EmptyResultError('Organization not found');
        }
        return organization.ORG_ID;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getOrganizations = async () => {

    try {
        const organizations = await Organization.findAll();
        if (organizations.length === 0) {
            return [];
        }
        return organizations;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const updateOrganization = async (orgData) => {

    let devPortalID = "";
    if (orgData.devPortalURLIdentifier) {
        devPortalID = orgData.devPortalURLIdentifier
    }
    try {
        const [updatedRowsCount, updatedOrg] = await Organization.update(
            {
                ORG_NAME: orgData.orgName,
                BUSINESS_OWNER: orgData.businessOwner,
                BUSINESS_OWNER_CONTACT: orgData.businessOwnerContact,
                BUSINESS_OWNER_EMAIL: orgData.businessOwnerEmail,
                DEV_PORTAL_URL_IDENTIFIER: devPortalID,
                ROLE_CLAIM_NAME: orgData.roleClaimName,
                GROUPS_CLAIM_NAME: orgData.groupsClaimName,
                ORGANIZATION_CLAIM_NAME: orgData.organizationClaimName,
                ORGANIZATION_IDENTIFIER: orgData.organizationIdentifier,
                ADMIN_ROLE: orgData.adminRole,
                SUBSCRIBER_ROLE: orgData.subscriberRole,
                SUPER_ADMIN_ROLE: orgData.superAdminRole
            },
            {
                where: { ORG_ID: orgData.orgId },
                returning: true
            }
        );
        if (updatedRowsCount < 1) {
            throw new Sequelize.EmptyResultError('Organization not found');
        }
        return [updatedRowsCount, updatedOrg];

    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const deleteOrganization = async (orgId) => {

    try {
        const deletedRowsCount = await Organization.destroy({
            where: { ORG_ID: orgId }
        });
        if (deletedRowsCount < 1) {
            throw Object.assign(new Sequelize.EmptyResultError('Organization not found'));
        } else {
            return deletedRowsCount;
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const createIdentityProvider = async (orgId, idpData) => {

    try {
        const idpResponse = await IdentityProvider.create({
            ORG_ID: orgId,
            ISSUER: idpData.issuer,
            NAME: idpData.name,
            AUTHORIZATION_URL: idpData.authorizationURL,
            TOKEN_URL: idpData.tokenURL,
            ...(idpData.userInfoURL && { USER_INFOR_URL: idpData.userInfoURL }),
            CLIENT_ID: idpData.clientId,
            CALLBACK_URL: idpData.callbackURL,
            ...(idpData.signUpURL && { SIGNUP_URL: idpData.signUpURL }),
            LOGOUT_URL: idpData.logoutURL,
            LOGOUT_REDIRECT_URL: idpData.logoutRedirectURI,
            ...(idpData.scope && { SCOPE: idpData.scope }),
            ...(idpData.jwksURL && { JWKS_URL: idpData.jwksURL }),
            ...(idpData.certificate && { CERTIFICATE: idpData.certificate })
        });
        return idpResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateIdentityProvider = async (orgID, idpData) => {

    try {
        const [updatedRowsCount, idpContent] = await IdentityProvider.update(
            {
                ORG_ID: idpData.orgId,
                ISSUER: idpData.issuer,
                NAME: idpData.name,
                AUTHORIZATION_URL: idpData.authorizationURL,
                TOKEN_URL: idpData.tokenURL,
                ...(idpData.userInfoURL && { USER_INFOR_URL: idpData.userInfoURL }),
                CLIENT_ID: idpData.clientId,
                CALLBACK_URL: idpData.callbackURL,
                ...(idpData.signUpURL && { SIGNUP_URL: idpData.signUpURL }),
                LOGOUT_URL: idpData.logoutURL,
                LOGOUT_REDIRECT_URI: idpData.logoutRedirectURI,
                SCOPE: idpData.scope,
                ...(idpData.jwksURL && { JWKS_URL: idpData.jwksURL }),
                ...(idpData.certificate && { CERTIFICATE: idpData.certificate })
            },
            {
                where: {
                    ORG_ID: orgID
                },
                returning: true
            }
        );
        if (updatedRowsCount < 1) {
            throw new Sequelize.EmptyResultError('IdentityProvider not found');
        }
        return [updatedRowsCount, idpContent];

    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getIdentityProvider = async (orgID) => {

    try {
        const idpResponse = await IdentityProvider.findAll({
            where: {
                ORG_ID: orgID,
            }
        }
        );
        return idpResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const deleteIdentityProvider = async (orgID) => {

    try {
        const idpResponse = await IdentityProvider.destroy({
            where: {
                ORG_ID: orgID
            }
        });
        return idpResponse;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const createOrgContent = async (orgData) => {

    try {
        const orgContent = await OrgContent.create({
            FILE_TYPE: orgData.fileType,
            FILE_NAME: orgData.fileName,
            FILE_CONTENT: orgData.fileContent,
            FILE_PATH: orgData.filePath,
            ORG_ID: orgData.orgId,
        });
        return orgContent;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateOrgContent = async (orgData) => {

    try {
        const [updatedRowsCount, updatedOrgContent] = await OrgContent.update({
            FILE_TYPE: orgData.fileType,
            FILE_NAME: orgData.fileName,
            FILE_CONTENT: orgData.fileContent,
            FILE_PATH: orgData.filePath,
        },
            {
                where: { FILE_TYPE: orgData.fileType, FILE_NAME: orgData.fileName, FILE_PATH: orgData.filePath, ORG_ID: orgData.orgId },
                returning: true
            });
        if (updatedRowsCount < 1) {
            throw new Sequelize.EmptyResultError('No new resources found');
        }
        return [updatedRowsCount, updatedOrgContent];

    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}



const getOrgContent = async (orgData) => {

    try {
        if (orgData.fileName || orgData.filePath) {
            return await OrgContent.findOne(
                {
                    where: {
                        ORG_ID: orgData.orgId,
                        FILE_TYPE: orgData.fileType,
                        ...(orgData.fileName && { FILE_NAME: orgData.fileName }),
                        ...(orgData.filePath && { FILE_PATH: orgData.filePath })
                    }
                });
        } else {
            return await OrgContent.findAll(
                {
                    where: {
                        ORG_ID: orgData.orgId,
                        FILE_TYPE: orgData.fileType,
                    }
                });
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const deleteOrgContent = async (orgId, fileName) => {

    try {
        const deletedRowsCount = await OrgContent.destroy({ where: { ORG_ID: orgId, FILE_NAME: fileName } });

        if (deletedRowsCount < 1) {
            throw Object.assign(new Sequelize.EmptyResultError('Organization content not found'));
        } else {
            return deletedRowsCount;
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const createProvider = async (orgID, provider) => {


    let providerDataList = [];
    for (const [key, value] of Object.entries(provider)) {
        if (key !== 'name') {
            const providerData = {
                ORG_ID: orgID,
                NAME: provider.name,
                PROPERTY: key,
                VALUE: value
            };
            providerDataList.push(providerData);
        }
    }
    try {
        const provider = await Provider.bulkCreate(providerDataList);
        return provider;
    } catch (error) {
        console.log(error)
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const updateProvider = async (orgID, provider) => {

    try {
        let updatedProviders = [];
        for (const [key, value] of Object.entries(provider)) {
            if (key !== 'name') {
                const [updatedRowsCount, providerContent] = await Provider.update(
                    {
                        VALUE: value
                    },
                    {
                        where: {
                            ORG_ID: orgID,
                            PROPERTY: key,
                            NAME: provider.name
                        },
                        returning: true
                    }
                );
                updatedProviders.push(providerContent)
                if (updatedRowsCount < 1) {
                    throw new Sequelize.EmptyResultError('API Provider not found');
                }
            }
        }
        return updatedProviders;
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const deleteProviderProperty = async (orgID, property, name) => {

    try {
        const deletedRowsCount = await Provider.destroy({
            where: {
                ORG_ID: orgID,
                PROPERTY: property,
                NAME: name
            }
        });
        if (deletedRowsCount < 1) {
            throw Object.assign(new Sequelize.EmptyResultError('Organization not found'));
        } else {
            return deletedRowsCount;
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const deleteProvider = async (orgID, name) => {

    try {
        const deletedRowsCount = await Provider.destroy({
            where: {
                ORG_ID: orgID,
                NAME: name
            }
        });
        if (deletedRowsCount < 1) {
            throw Object.assign(new Sequelize.EmptyResultError('Organization not found'));
        } else {
            return deletedRowsCount;
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getProviders = async (orgID) => {

    try {
        const providers = await Provider.findAll(
            {
                attributes: [
                    'NAME',
                    [
                        Sequelize.fn(
                            'JSON_OBJECT_AGG',
                            Sequelize.col('PROPERTY'),
                            Sequelize.col('VALUE')
                        ),
                        'properties'
                    ]
                ],
                where: { ORG_ID: orgID },
                group: ['NAME']
            }
        );
        if (providers.length === 0) {
            return [];
        }
        return providers;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const getProvider = async (orgID, name) => {

    try {
        return await Provider.findAll(
            {
                where: {
                    ORG_ID: orgID,
                    NAME: name
                }
            });
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }

}

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent,
    updateOrgContent,
    getOrgContent,
    deleteOrgContent,
    createIdentityProvider,
    updateIdentityProvider,
    getIdentityProvider,
    deleteIdentityProvider,
    getOrgId,
    getOrganizations,
    createProvider,
    deleteProviderProperty,
    deleteProvider,
    updateProvider,
    getProviders,
    getProvider
};
