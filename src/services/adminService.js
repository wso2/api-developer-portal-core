// services/organizationService.js
const { Sequelize } = require('sequelize');
const orgData = require('../data/orgData');
const orgEntities = require('../models/orgModels');
const util = require('../utils/util');

const createOrganization = async (req, res) => {

    const { orgName, authenticatedPages } = req.body;
    
    try {
        // Validate input
        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        
        const authenticatedPagesStr = authenticatedPages.join(' ');
        // Create organization in the database
        const organization = await orgData.registerOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr
        });

        // Create response object
        const orgCreationResponse = new orgEntities.OrganizationResponse(
            organization.orgName,
            organization.orgId,
            organization.authenticatedPages.split(' ').filter(Boolean)
        );

        res.status(201).send(orgCreationResponse);
    } catch (error) {
        util.handleError(res, error);
    }

};

const getOrganization = async (req, res) => {
    try {
        let param = req.query.orgId || req.query.orgName;

        if (!param) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId' or 'orgName'");       
        }

        const organization = await orgData.getOrganization(param);
        
        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

module.exports = {
    createOrganization,
    getOrganization,
};
