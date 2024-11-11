const adminService = require('../services/adminService');
const adminDao = require('../dao/admin');
const util = require('../utils/util');

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

            if (asset.FILE_TYPE === 'image') {
                if (asset.FILE_NAME.endsWith('.svg')) {
                    contentType = 'image/svg+xml';
                } else if (asset.FILE_NAME.endsWith('.jpg') || asset.FILE_NAME.endsWith('.jpeg')) {
                    contentType = 'image/jpeg';
                } else if (asset.FILE_NAME.endsWith('.png')) {
                    contentType = 'image/png';
                } else if (asset.FILE_NAME.endsWith('.gif')) {
                    contentType = 'image/gif';
                } else {
                    contentType = 'application/octet-stream';
                }
                res.set('Content-Type', contentType);
                return res.status(200).send(Buffer.isBuffer(asset.FILE_CONTENT) ? asset.FILE_CONTENT : asset.FILE_CONTENT.toString('utf-8'));
            } else if (asset.FILE_NAME.endsWith('.css')) {
                res.set('Content-Type', "text/css");
            }
            return res.status(200).send(asset.FILE_CONTENT.toString('utf-8'));
        } else if (req.params.fileType) {
            const assets = await adminService.getOrgContent(req.params.orgId, req.params.fileType);
            const results = [];
            for (const asset of assets) {
                const resp = {
                    orgId: asset.ORG_ID,
                    fileName: asset.FILE_NAME,
                    fileContent: asset.FILE_CONTENT ? asset.FILE_CONTENT.toString('utf-8') : null
                };
                results.push(resp);
            }
            
            return res.status(200).send(results);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getOrgContent,
    getOrganization
};