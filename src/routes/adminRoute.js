const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const multer = require('multer');

router.post('/devportaOrg', adminService.createOrganization);
router.get('/devportaOrg', adminService.getOrganization);
router.put('/devportaOrg', adminService.updateOrganization);
router.delete('/devportaOrg', adminService.deleteOrganization);

const upload = multer({ dest: 'uploads/' }); 
router.post('/orgContent', upload.single('file'), adminService.createOrgContent);


module.exports = router;
