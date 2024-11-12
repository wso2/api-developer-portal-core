const { Organization, OrgContent, OrgImage } = require('../models/orgModels');
const { validate } = require('uuid');
const { Sequelize } = require('sequelize');

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
        } else {
            return [updatedRowsCount, updatedOrg];
        }
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
        } else {
            return [updatedRowsCount, updatedOrgContent];
        }
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
}

const getOrgContent = async (orgData) => {
    try {
        let organization;

        if (orgData.fileType && orgData.fileName && orgData.filePath) {
            organization = await OrgContent.findOne({ where: { ORG_ID: orgData.orgId, FILE_TYPE: orgData.fileType, 
                FILE_NAME: orgData.fileName, FILE_PATH: orgData.filePath } });
        } else if (orgData.fileType && orgData.fileName) {
            organization = await OrgContent.findOne({ where: { ORG_ID: orgData.orgId, FILE_TYPE: orgData.fileType, 
                FILE_NAME: orgData.fileName } });
        } else if (orgData.fileType) {
            organization = await OrgContent.findAll({ where: { ORG_ID: orgData.orgId, FILE_TYPE: orgData.fileType } });
        }
        return organization;
    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const deleteOrgContent = async (orgId, fileName) => {
    try {
        const deletedRowsCount = await OrgContent.destroy({ where: { ORG_ID: orgId, FILE_NAME: fileName }});
        
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
    deleteOrgContent
};
