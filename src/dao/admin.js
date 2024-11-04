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

const getOrganization = async (orgId) => {
    try {
        const organization = await Organization.findOne({ where: { orgId: orgId } });

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
        const [updatedRowsCount, updatedOrg] = await Organization.Organization.update(
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
        console.log(orgData.orgId)
        console.log(orgData.orgName)
        const organization = await OrgContent.create({
            pageType: orgData.pageType,
            pageName: orgData.pageName,
            pageContent: orgData.pageContent,
            filePath: orgData.filePath,
            orgId: orgData.orgId,
            orgName: orgData.orgName,
        });
        return organization;
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

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent,
    createImageRecord
};
