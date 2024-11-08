const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const multer = require('multer');

router.post('/organizations', adminService.createOrganization);
router.put('/organizations/:orgId', adminService.updateOrganization);
router.delete('/organizations/:orgId', adminService.deleteOrganization);

const upload = multer({ dest: '../.tmp/' }); 
router.post('/organizations/:orgId/layout', upload.single('file'), adminService.createOrgContent);
router.put('/organizations/:orgId/layout', upload.single('file'), adminService.updateOrgContent);
module.exports = router;
