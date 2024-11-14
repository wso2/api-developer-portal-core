const express = require('express');
const router = express.Router();
const apiMetadataService = require('../services/apiMetadataService');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadZip = multer({ dest: '/tmp' });

router.post('/organizations/:orgId/apis', upload.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', upload.single('apiDefinition'), apiMetadataService.updateAPIMetadata);
router.delete('/organizations/:orgId/apis/:apiId', apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', uploadZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', uploadZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', apiMetadataService.deleteAPIFile);


module.exports = router;
