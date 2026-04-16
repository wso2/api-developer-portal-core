const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const viewConfigureController = require('../controllers/viewConfigureController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const authController = require('../controllers/authController');

// Org-level settings: Organizations, Views, Labels, IDP, API Provider
router.get('/:orgName/configure', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') return res.status(404).send('Not Found');
    next();
}, authController.handleSilentSSO, registerPartials, ensureAuthenticated, settingsController.loadOrgSettingsPage);

// View-level settings: API Workflows
router.get('/:orgName/views/:viewName/configure', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') return res.status(404).send('Not Found');
    next();
}, authController.handleSilentSSO, registerPartials, ensureAuthenticated, viewConfigureController.loadViewSettingsPage);

module.exports = router;
