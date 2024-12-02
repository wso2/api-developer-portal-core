const express = require('express');
const router = express.Router();
const settingsController = require('../controllers//settingsController');
const registerPartials = require('../middlewares/registerPartials');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const multer = require('multer');


router.get('/(((?!favicon.ico|images)):orgName/configure)', ensureAuthenticated, registerPartials, settingsController.loadSettingPage);

router.post('/(((?!favicon.ico|images)):orgName/identityprovider)', registerPartials, ensureAuthenticated, settingsController.identityprovider);

const upload = multer({ dest: '../.tmp/' }); 

router.post('/(((?!favicon.ico|images)):orgName/orgcontent)', ensureAuthenticated, 
upload.single('zipFile'), settingsController.storeOrgContent);

//router.ge('/settings', registerPartials, settingsController.storePortalSettings);

module.exports = router;
