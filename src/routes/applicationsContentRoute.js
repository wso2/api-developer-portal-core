const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');



router.get('/((?!favicon.ico)):orgName/views/:viewName/applications', ensureAuthenticated, registerPartials, applicationsController.loadApplications);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/create', ensureAuthenticated, registerPartials, applicationsController.loadThrottlingPolicies);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/:applicationid', ensureAuthenticated, registerPartials, applicationsController.loadApplication);
router.get('/((?!favicon.ico)):orgName/views/:viewName/applications/:applicationid/edit', ensureAuthenticated, registerPartials, applicationsController.loadApplicationForEdit);

module.exports = router;