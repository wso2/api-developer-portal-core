const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

router.post('/api', adminService.createOrganization);
router.get('/api', adminService.getOrganization);
router.get('/apis', adminService.getOrganization);
router.put('/api', adminService.getOrganization);
router.delete('/api', adminService.getOrganization);


module.exports = router;
