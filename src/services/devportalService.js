const adminService = require('../services/adminService');


const getOrgContent = async (req, res) => {
    try {
        let asset = await adminService.getOrgContent(req.query.pageType, req.query.pageName, req.query.filePath);
        res.status(200).send(asset.pageContent);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const getImgContent = async (req, res) => {
    try {
        let image = await adminService.getImgContent(req.params.orgId, req.query.fileName);
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
    getImgContent
};