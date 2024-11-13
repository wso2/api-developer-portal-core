const express = require('express');
const router = express.Router();
const devportalService = require('../services/devportalService');
const adminService = require('../services/adminService');
const multer = require('multer');

router.post('/organizations', adminService.createOrganization);
router.put('/organizations/:orgId', adminService.updateOrganization);
router.get('/organizations/:orgId', devportalService.getOrganization);
router.delete('/organizations/:orgId', adminService.deleteOrganization);

const upload = multer({ dest: '../.tmp/' }); 
router.post('/organizations/:orgId/layout', upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', upload.single('file'), adminService.updateOrgContent);
router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/layout/:fileType', devportalService.getOrgContent);
router.delete('/organizations/:orgId/layout', adminService.deleteOrgContent);

module.exports = router;
