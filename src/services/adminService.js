const { CustomError } = require('../utils/errors/customErrors');
const orgDao = require('../dao/organization');
const orgEntities = require('../models/orgModels');
const util = require('../utils/util');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const createOrganization = async (req, res) => {

    const { orgName, authenticatedPages } = req.body;

    try {
        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new CustomError(400, "Bad Request", "Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        const organization = await orgDao.createOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr
        });

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
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId' or 'orgName'");
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
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }

        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new CustomError("Missing or Invalid fields in the request payload");
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
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }

        const deletedRowsCount = await orgDao.deleteOrganization(orgId);
        if (deletedRowsCount > 0) {
            res.status(204).send();
        } else {
            throw new CustomError(404, "Records Not Found", 'Organization not found');
        }
    } catch (error) {
        util.handleError(res, error);
    }
};

const createOrgContent = async (req, res) => {

    console.log(req.file);
    const zipPath = req.file.path;  // Temporary path to the uploaded zip file
    const extractPath = path.join(__dirname, 'extracted');  // Path to extract the files

    // Unzip the file
    fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on('close', async () => {
            const orgContent = await orgDao.createOrgContent(req.query.orgId);
            res.send('File unzipped successfully');
        })
        .on('error', (err) => {
            throw new CustomError(500, "Internal Server Error", "Failed to extract the zip file");
        });
};

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent
};
