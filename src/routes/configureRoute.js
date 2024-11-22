const express = require('express');
const router = express.Router();
const settingsController = require('../controllers//settingsController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/(((?!favicon.ico|images)):orgName/configure)', registerPartials, settingsController.loadSettingPage);


module.exports = router;
