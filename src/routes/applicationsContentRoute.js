const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/((?!favicon.ico)):orgName/applications', registerPartials, applicationsController.loadApplications);
router.get('/((?!favicon.ico)):orgName/applications/:applicationid', registerPartials, applicationsController.loadApplication);

module.exports = router;