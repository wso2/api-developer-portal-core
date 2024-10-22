const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const multer = require('multer');

router.post('/organizations', adminService.createOrganization);
router.get('/organizations/:orgId', adminService.getOrganization);
router.put('/organizations/:orgId', adminService.updateOrganization);
router.delete('/organizations/:orgId', adminService.deleteOrganization);

const upload = multer({ dest: 'uploads/' }); 
router.post('/organizations/:orgId/layout', upload.single('file'), adminService.createOrgContent);


router.post('/organizations/:orgId/subscription-plans', adminService.createSubscriptionPlan);
router.get('/organizations/:orgId/producers/:producer-id/subscription-plans/{sub-plan-id}', adminService.getOrganization);

module.exports = router;
