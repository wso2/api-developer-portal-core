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
        let asset;
        if (req.query.pageType && req.query.pageName) {
            asset = await adminService.getOrgContent(req.query.pageType, req.query.pageName, req.query.filePath);
            if (asset.pageName.endsWith('.css')) {
                res.set('Content-Type', "text/css");
            }
            contentText = asset.pageContent.toString('utf-8')
            return res.status(200).send(contentText);
        } else if (req.params.pageType) {
            asset = await adminService.getOrgContent(req.params.pageType);
            const resp = asset.map(({ pageName, pageContent }) => ({
                pageName,
                pageContent: pageContent ? pageContent.toString('utf-8') : null
            }));            
            return res.status(200).send(resp);
        } 
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const getImgContent = async (req, res) => {
    try {
        let image = await adminService.getImgContent(req.params.orgId, req.query.fileName);
        console.log("Image:", image);
        if (image.fileName.endsWith('.svg')) {
            contentType = 'image/svg+xml';
        } else if (image.fileName.endsWith('.jpg') || image.fileName.endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (image.fileName.endsWith('.png')) {
            contentType = 'image/png';
        } else if (image.fileName.endsWith('.gif')) {
            contentType = 'image/gif';
        } else {
            contentType = 'application/octet-stream'; 
        }
        res.set('Content-Type', contentType);
        res.status(200).send(Buffer.isBuffer(image.image) ? image.image : Buffer.from(image.image, 'binary'));
    } catch (error) {
        res.status(404).send();
    }
}

module.exports = {
    getOrgContent,
    getImgContent,
    getOrganization
};