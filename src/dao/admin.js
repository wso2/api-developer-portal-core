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

const createOrganization = async (orgData) => {

    try {
        const organization = await Organization.create({
            ORG_NAME: orgData.orgName,
            BUSINESS_OWNER: orgData.businessOwner,
            BUSINESS_OWNER_CONTACT: orgData.businessOwnerContact,
            BUSINESS_OWNER_EMAIL: orgData.businessOwnerEmail
        });
        return organization;
    } catch (error) {
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

const updateOrganization = async (orgData) => {

    try {
        const [updatedRowsCount, updatedOrg] = await Organization.update(
            {
                ORG_NAME: orgData.orgName,
                BUSINESS_OWNER: orgData.businessOwner,
                BUSINESS_OWNER_CONTACT: orgData.businessOwnerContact,
                BUSINESS_OWNER_EMAIL: orgData.businessOwnerEmail
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
            NAME: idpData.name,
            ISSUER: idpData.issuer,
            AUTHORIZATION_URL: idpData.authorizationURL,
            TOKEN_URL: idpData.tokenURL,
            USER_INFOR_URL: idpData.userInfoURL,
            CLIENT_ID: idpData.clientId,
            CALLBACK_URL: idpData.callbackURL,
            SIGNUP_URL: idpData.signUpURL,
            LOGOUT_URL: idpData.logoutURL,
            LOGOUT_REDIRECT_URL: idpData.logoutRedirectURI,
            SCOPE: ""
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
        const [updatedRowsCount, idpContent,] = await IdentityProvider.update(
            {
                ORG_ID: idpData.orgId,
                ISSUER: idpData.issuer,
                NAME: idpData.name,
                AUTHORIZATION_URL: idpData.authorizationURL,
                TOKEN_URL: idpData.tokenURL,
                USER_INFOR_URL: idpData.userInfoURL,
                CLIENT_ID: idpData.clientId,
                CALLBACK_URL: idpData.callbackURL,
                SIGNUP_URL: idpData.signUpURL,
                LOGOUT_URL: idpData.logoutURL,
                LOGOUT_REDIRECT_URI: idpData.logoutRedirectURI,
                SCOPE: idpData.scope
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
    deleteIdentityProvider
};
