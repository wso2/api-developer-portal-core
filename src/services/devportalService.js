const adminService = require('../services/adminService');


const getOrgContent = async (req, res) => {
    try {
        let asset;
        if (req.query.pageType && req.query.pageName) {
            asset = await adminService.getOrgContent(req.query.pageType, req.query.pageName, req.query.filePath);
            if (asset.pageName.endsWith('.css')) {
                res.set('Content-Type', "text/css");
            }
            return res.status(200).send(asset.pageContent);
        } else if (req.params.pageType) {
            asset = await adminService.getOrgContent(req.params.pageType);
            const resp = asset.map(({ pageName, pageContent }) => ({ pageName, pageContent }));
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
    getImgContent
};