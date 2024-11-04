const express = require('express');
const router = express.Router();
const apiMetadataService = require('../services/apiMetadataService');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/:orgId/api', upload.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/:orgId/api/:apiId', apiMetadataService.getAPIMetadata);
router.get('/:orgId/apis', apiMetadataService.getAllAPIMetadata);
router.put('/:orgId/api/:apiId', upload.single('apiDefinition'), apiMetadataService.updateAPIMetadata);
router.delete('/:orgId/api/:apiId', apiMetadataService.deleteAPIMetadata);


module.exports = router;
