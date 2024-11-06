const express = require('express');
const router = express.Router();
const apiMetadataService = require('../services/apiMetadataService');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const fs = require('fs');
const path = require('path');


// const zipStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let filePath = req.params.orgId + '/' + req.params.apiId + '/';
//         const uploadPath = path.join('/tmp', filePath);
//         file.path = uploadPath;
//         fs.mkdirSync(uploadPath, { recursive: true });
//         cb(null, uploadPath);
//     },
//     // filename: function (req, file, cb) {
//     //     cb(null, file.fieldname + '.' + mime.extension(file.mimetype));
//     // }
// })

//const uploadZip = multer({ storage: zipStorage });

const uploadZip = multer({ dest: '/tmp' });


//const zipUpload = multer({ zipStorage });


router.post('/organizations/:orgId/apis', upload.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', upload.single('apiDefinition'), apiMetadataService.updateAPIMetadata);
router.delete('organizations/:orgId/apis/:apiId', apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', uploadZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', uploadZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', apiMetadataService.deleteAPIFile);


module.exports = router;
