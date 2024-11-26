const express = require('express');
const router = express.Router();
const settingsController = require('../controllers//settingsController');
const registerPartials = require('../middlewares/registerPartials');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.get('/(((?!favicon.ico|images)):orgName/configure)', ensureAuthenticated, registerPartials, settingsController.loadSettingPage);

router.post('/settings', registerPartials, ensureAuthenticated, settingsController.storePortalSettings);

//router.ge('/settings', registerPartials, settingsController.storePortalSettings);

module.exports = router;
