const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');

// Exclude specific paths using middleware
router.get(['/favicon.ico'], (req, res) => {
    res.status(404).send('Not found');
});
  
router.get('/:orgName/views/:viewName/applications', registerPartials, ensureAuthenticated, applicationsController.loadApplications);

router.get('/:orgName/views/:viewName/applications/create', registerPartials, ensureAuthenticated, applicationsController.loadThrottlingPolicies);

router.get('/:orgName/views/:viewName/applications/:applicationId', registerPartials, ensureAuthenticated, applicationsController.loadApplication);

router.get('/:orgName/views/:viewName/applications/:applicationId/edit', registerPartials, ensureAuthenticated, applicationsController.loadApplicationForEdit);

module.exports = router;