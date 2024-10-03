const { Sequelize } = require('sequelize');
const orgDao = require('../dao/organization');
const orgEntities = require('../models/orgModels');
const util = require('../utils/util');
const e = require('express');

const createOrganization = async (req, res) => {

    const { orgName, authenticatedPages } = req.body;

    try {
        // Validate input
        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        // Create organization in the database
        const organization = await orgDao.createOrganization({
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

        const organization = await orgDao.getOrganization(param);

        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

const updateOrganization = async (req, res) => {
    try {
        let orgId = req.query.orgId;
        const { orgName, authenticatedPages } = req.body;

        if (!orgId) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId'");
        }

        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        // Create organization in the database
        const [updatedRowsCount, updatedOrg] = await orgDao.updateOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr,
            orgId
        });

        res.status(200).json({
            orgId: updatedOrg[0].dataValues.orgId,
            orgName: updatedOrg[0].dataValues.orgName,
            authenticatedPages: updatedOrg[0].dataValues.authenticatedPages.split(' ').filter(Boolean)
        });

    } catch (error) {
        console.log(error);

        util.handleError(res, error);
    }
};
const deleteOrganization = async (req, res) => {
    try {
        let orgId = req.query.orgId;

        if (!orgId) {
            throw new Sequelize.ValidationError("Missing required parameter: 'orgId'");
        }

        const deletedRowsCount = await orgDao.deleteOrganization(orgId);
        if (deletedRowsCount > 0) {
            res.status(204).send();
        } else {
            throw new Sequelize.EmptyResultError('Organization not foundw');
        }
    } catch (error) {
        util.handleError(res, error);
    }
};

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization
};
