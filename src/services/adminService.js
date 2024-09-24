// services/organizationService.js
const orgData = require('../data/orgData');
const orgEntities = require('../models/orgModels');

const createOrganization = async (req, res) => {

    const { orgName, authenticatedPages } = req.body;
    const authenticatedPagesStr = authenticatedPages.join(' ');

    try {
        // Validate input
        if (!orgName) {
            throw new Error('Invalid input');
        }

        // Create organization in the database
        const organization = await orgData.registerOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr
        });

        // Create response object
        const orgCreationResponse = new orgEntities.OrganizationResponse(
            organization.organizationName,
            organization.orgId,
            organization.authenticatedPages.split(' ').filter(Boolean) 
        );

        res.status(201).send(orgCreationResponse);
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(400).json({
            "code": error.original.code,
            "reason": error.original.detail,
            "message": error.errors[0].message
          });
    }

};

const getOrganization = async (req, res) => {
    try {
        const orgId = req.query.orgId;
        console.log('Fetching organization:', req.query.orgId);
        const organization = await orgData.getOrganizationById(orgId);
        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        console.error('Error retrieving organization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrganization,
    getOrganization
};
