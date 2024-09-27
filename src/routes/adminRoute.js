const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

router.post('/organisation', adminService.createOrganization);
router.get('/organisation', adminService.getOrganization);

module.exports = router;
