const orgEntities = require('../models/orgModels');

const registerOrganization = async (orgData) => {
    try {
        // Create an organization in the database without `isPublic`
        const organization = await orgEntities.Organization.create({
            organizationName: orgData.orgName,
            authenticatedPages: orgData.authenticatedPages
        });
        return organization;
    } catch (error) {
        console.error('Error creating organization in database:', error);
        throw error;
    }
};

const getOrganizationById = async (orgId) => {
    console.log('Fetching organization:', orgId);
    try {
        const organization = await orgEntities.Organization.findOne({ where: { orgId } });
        if (!organization) {
            throw new Error('Organization not found');
        }
        return organization;
    } catch (error) {
        throw new Error(`Error fetching organization: ${error.message}`);
    }
};

module.exports = {
    registerOrganization,
    getOrganizationById
};
