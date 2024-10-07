const express = require('express');
const router = express.Router();
const apiMetadataService = require('../services/apiMetadataService');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/api', upload.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/api', apiMetadataService.getAPIMetadata);
router.get('/apis', apiMetadataService.getAllAPIMetadata);
router.put('/api', upload.single('apiDefinition'), apiMetadataService.updateAPIMetadata);
router.delete('/api', apiMetadataService.deleteAPIMetadata);


module.exports = router;
