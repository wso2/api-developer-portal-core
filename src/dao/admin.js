const { Organization, OrgContent, OrgImage } = require('../models/orgModels');
const { validate } = require('uuid');
const { Sequelize } = require('sequelize');

const createOrganization = async (orgData) => {
    try {
        const organization = await Organization.create({
            orgName: orgData.orgName,
            authenticatedPages: orgData.authenticatedPages
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
    const condition = isUUID ? { orgId: param } : { orgName: param };

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
                orgName: orgData.orgName,
                authenticatedPages: orgData.authenticatedPages
            },
            {
                where: { orgId: orgData.orgId },
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
            where: { orgId }
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
            pageType: orgData.pageType,
            pageName: orgData.pageName,
            pageContent: orgData.pageContent,
            filePath: orgData.filePath,
            orgId: orgData.orgId,
        });
        return orgContent;
    } catch (error) {
        throw new Sequelize.DatabaseError(error);
    }
}

const createImageRecord = async (imgData) => {
    try {
        const imageRecord = await OrgImage.create({
            fileName: imgData.fileName,
            image: imgData.image,
            orgId: imgData.orgId
        });
        return imageRecord;
    } catch (error) {
        throw new Sequelize.DatabaseError(error);
    }
}

const updateOrgContent = async (orgData) => {
    try {
        const [updatedRowsCount, updatedOrgContent] = await OrgContent.update({
            pageType: orgData.pageType,
            pageName: orgData.pageName,
            pageContent: orgData.pageContent,
            filePath: orgData.filePath,
        },
        {
            where: { pageType: orgData.pageType, pageName: orgData.pageName, filePath: orgData.filePath },
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

        if (orgData.pageType && orgData.pageName && orgData.filePath) {
            organization = await OrgContent.findOne({ where: { pageType: orgData.pageType, pageName: orgData.pageName, filePath: orgData.filePath } });
        } else if (orgData.pageType && orgData.pageName) {
            organization = await OrgContent.findOne({ where: { pageType: orgData.pageType, pageName: orgData.pageName } });
        } else if (orgData.pageType) {
            organization = await OrgContent.findAll({ where: { pageType: orgData.pageType } });
        }             
        return organization;

    } catch (error) {
        if (error instanceof Sequelize.EmptyResultError) {
            throw error;
        }
        throw new Sequelize.DatabaseError(error);
    }
};

const updateImageRecord = async (imgData) => {
    try {
        const [updatedRowsCount, updatedOrgImages] =  await OrgImage.update({
            image: imgData.image,
        },
        {
            where: { orgId: imgData.orgId, fileName: imgData.fileName },
            returning: true
        });
        if (updatedRowsCount < 1) {
            throw new Sequelize.EmptyResultError('Organization Image not found');
        } else {
            return [updatedRowsCount, updatedOrgImages];
        }
    } catch (error) {
        throw new Sequelize.DatabaseError(error);
    }
};

const getImgContent = async (orgData) => {
    try {
        const orgImage = await OrgImage.findOne({ where: { orgId: orgData.orgId, fileName: orgData.fileName } });
        return orgImage;
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
    createImageRecord,
    updateOrgContent,
    updateImageRecord,
    getOrgContent,
    getImgContent
};
