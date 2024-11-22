/* eslint-disable no-undef */
const adminService = require('../services/adminService');
const adminDao = require('../dao/admin');
const util = require('../utils/util');
const constants = require('../utils/constants');
const { retrieveContentType } = require('../utils/util');

const getOrganization = async (req, res) => {

    try {
        const organization = await adminDao.getOrganization(req.params.orgId);
        res.status(200).json({
            orgId: organization.ORG_ID,
            orgName: organization.ORG_NAME,
            businessOwner: organization.BUSINESS_OWNER,
            businessOwnerContact: organization.BUSINESS_OWNER_CONTACT,
            businessOwnerEmail: organization.BUSINESS_OWNER_EMAIL
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

const getOrgContent = async (req, res) => {

    try {
        if (req.query.fileType && req.query.fileName) {
            const asset = await adminService.getOrgContent(req.params.orgId, req.query.fileType, req.query.fileName, req.query.filePath);
            const contentType = retrieveContentType(asset.FILE_NAME, asset.FILE_TYPE);
            res.set(constants.MIME_TYPES.CONYEMT_TYPE, contentType);
            return res.status(200).send(Buffer.isBuffer(asset.FILE_CONTENT) ? asset.FILE_CONTENT : constants.CHARSET_UTF8);
        } else if (req.params.fileType) {
            const assets = await adminService.getOrgContent(req.params.orgId, req.params.fileType);
            const results = [];
            for (const asset of assets) {
                const resp = {
                    orgId: asset.ORG_ID,
                    fileName: asset.FILE_NAME,
                    fileContent: asset.FILE_CONTENT ? asset.FILE_CONTENT.toString(constants.CHARSET_UTF8) : null
                };
                results.push(resp);
            }
            return res.status(200).send(results);
        } else {        
            res.status(400).send('Invalid request');
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getOrgContent,
    getOrganization
};
