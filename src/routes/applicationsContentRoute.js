const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');

router.get('/((?!favicon.ico)):orgName/views/:viewName/applications', registerPartials, ensureAuthenticated, applicationsController.loadApplications);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/create', registerPartials, ensureAuthenticated, applicationsController.loadThrottlingPolicies);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/:applicationId', registerPartials, ensureAuthenticated, applicationsController.loadApplication);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/:applicationId/edit', registerPartials, ensureAuthenticated, applicationsController.loadApplicationForEdit);

module.exports = router;