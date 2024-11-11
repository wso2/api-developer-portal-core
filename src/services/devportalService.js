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
        if (req.query.pageType && req.query.pageName) {
           const asset = await adminService.getOrgContent(req.params.orgId, req.query.pageType, req.query.pageName, req.query.filePath);
           console.log("Asset:", asset.PAGE_TYPE);

            if (asset.PAGE_TYPE === 'imege') {
                if (asset.PAGE_NAME.endsWith('.svg')) {
                    contentType = 'image/svg+xml';
                } else if (asset.PAGE_NAME.endsWith('.jpg') || asset.PAGE_NAME.endsWith('.jpeg')) {
                    contentType = 'image/jpeg';
                } else if (asset.PAGE_NAME.endsWith('.png')) {
                    contentType = 'image/png';
                } else if (asset.PAGE_NAME.endsWith('.gif')) {
                    contentType = 'image/gif';
                } else {
                    contentType = 'application/octet-stream';
                }
                res.set('Content-Type', contentType);
                res.status(200).send(Buffer.isBuffer(image.image) ? image.image : Buffer.from(image.image, 'binary'));
            } else if (asset.PAGE_NAME.endsWith('.css')) {
                res.set('Content-Type', "text/css");
            }
            contentText = asset.PAGE_CONTENT.toString('utf-8')
            return res.status(200).send(contentText);
        } else if (req.params.pageType) {
            const assets = await adminService.getOrgContent(req.params.orgId, req.params.pageType);
            const results = [];
            for (const asset of assets) {
                const resp = {
                    orgId: asset.ORG_ID,
                    pageName: asset.PAGE_NAME,
                    pageContent: asset.PAGE_CONTENT ? asset.PAGE_CONTENT.toString('utf-8') : null
                };
                results.push(resp);
            }
            
            // At this point, `results` will contain the processed asset data
            console.log(results);
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