const express = require('express');
const router = express.Router();
const devportalService = require('../services/devportalService');
const apiMetadataService = require('../services/apiMetadataService');
const adminService = require('../services/adminService');
const multer = require('multer');
const storage = multer.memoryStorage()
const apiDefinition = multer({ storage: storage })


router.post('/organizations', adminService.createOrganization);
router.put('/organizations/:orgId', adminService.updateOrganization);
router.get('/organizations/:orgId', devportalService.getOrganization);
router.delete('/organizations/:orgId', adminService.deleteOrganization);

router.post('/organizations/:orgId/identityProvider', adminService.createIdentityProvider);
router.put('/organizations/:orgId/identityProvider', adminService.updateIdentityProvider);
router.get('/organizations/:orgId/identityProvider', adminService.getIdentityProvider);
router.delete('/organizations/:orgId/identityProvider', adminService.deleteIdentityProvider);

const upload = multer({ dest: '../.tmp/' }); 
router.post('/organizations/:orgId/layout', upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/layout', adminService.deleteOrgContent);

router.post('/organizations/:orgId/apis', apiDefinition.single('apiDefinition'), apiMetadataService.createAPIMetadata);
router.get('/organizations/:orgId/apis/:apiId', apiMetadataService.getAPIMetadata);
router.get('/organizations/:orgId/apis', apiMetadataService.getAllAPIMetadata);
router.put('/organizations/:orgId/apis/:apiId', apiDefinition.single('apiDefinition'), apiMetadataService.updateAPIMetadata);

const apiZip = multer({ dest: '/tmp' });
router.delete('/organizations/:orgId/apis/:apiId', apiMetadataService.deleteAPIMetadata);
router.post('/organizations/:orgId/apis/:apiId/template', apiZip.single('apiContent'), apiMetadataService.createAPITemplate);
router.put('/organizations/:orgId/apis/:apiId/template', apiZip.single('apiContent'), apiMetadataService.updateAPITemplate);
router.get('/organizations/:orgId/apis/:apiId/template', apiMetadataService.getAPIFile);
router.delete('/organizations/:orgId/apis/:apiId/template', apiMetadataService.deleteAPIFile);

module.exports = router;
