const orgEntities = require('../models/orgModels');
const subEntities = require('../models/subscritionPlanModel');
const { validate } = require('uuid');
const { Sequelize } = require('sequelize');

const createOrganization = async (orgData) => {
    try {
        const organization = await orgEntities.Organization.create({
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
    const whereCondition = validate(param) ? { orgId: param } : { orgName: param };
    try {
        const organization = await orgEntities.Organization.findOne({ where: whereCondition });

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
        const [updatedRowsCount, updatedOrg] = await orgEntities.Organization.update(
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
        const deletedRowsCount = await orgEntities.Organization.destroy({
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

const createOrgContent = async (orgId) => {
    try {
        const organization = await orgEntities.OrgContent.create({
            pageType: req.body.pageType,
            pageName: req.body.pageName,
            pageContent: req.body.pageContent,
            filePath: req.file.path,
            orgId: orgId
        });
        console.log(req.file);
    } catch (error) {
        console.log(error);
    }
}

const createSubscriptionPlan = async (subData) => {
    try {
        const subscriptionPlan = await subEntities.SubscriptionPlan.create({
            policyName: subData.policyName,
            description: subData.description,
            orgId: subData.orgId,
        });
        return subscriptionPlan;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent,
    createSubscriptionPlan
};
