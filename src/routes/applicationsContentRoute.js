const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/((?!favicon.ico)):orgName/applications', registerPartials, applicationsController.loadApplications);
router.get('/((?!favicon.ico)):orgName/applications/create', registerPartials, applicationsController.loadThrottlingPolicies);
router.get('/((?!favicon.ico)):orgName/applications/:applicationid', registerPartials, applicationsController.loadApplication);
router.get('/((?!favicon.ico)):orgName/applications/:applicationid/edit', registerPartials, applicationsController.loadApplicationForEdit);

router.post('/applications', registerPartials, applicationsController.saveApplication);
router.put('/applications/:applicationid', registerPartials, applicationsController.updateApplication);
router.delete('/applications/:applicationid', registerPartials, applicationsController.deleteApplication);
router.post('/applications/:applicationid/reset-throttle-policy', registerPartials, applicationsController.resetThrottlingPolicy);
router.post('/applications/:applicationid/api-keys/:env/generate', registerPartials, applicationsController.generateAPIKeys);

module.exports = router;