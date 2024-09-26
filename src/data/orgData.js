const orgEntities = require('../models/orgModels');
const { validate } = require('uuid');
const { Sequelize } = require('sequelize');

const registerOrganization = async (orgData) => {
    try {
        // Create an organization in the database without `isPublic`
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

module.exports = {
    registerOrganization,
    getOrganization,
};
