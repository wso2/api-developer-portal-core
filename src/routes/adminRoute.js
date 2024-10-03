const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

router.post('/organisation', adminService.createOrganization);
router.get('/organisation', adminService.getOrganization);
router.put('/organisation', adminService.updateOrganization);
router.delete('/organisation', adminService.deleteOrganization);

module.exports = router;
