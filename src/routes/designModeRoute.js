const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');
const apiController = require('../controllers/apiContentController');
const contentController = require('../controllers/customContentController');
const registerPartials = require('../middlewares/registerPartials');
const authController = require('../controllers/authController');


router.get('/', registerPartials, orgController.loadOrganizationContent);

router.get('/apis', registerPartials, apiController.loadAPIs);

router.get('/api/:apiName', registerPartials, apiController.loadAPIContent);

router.get('/api/:apiName/tryout', registerPartials, apiController.loadTryOutPage);

router.get('/login', registerPartials, authController.login);
router.get('/callback', registerPartials, authController.handleCallback);
router.get('/logout', registerPartials, authController.handleLogOut);
router.get('/signup', registerPartials, authController.handleSignUp);

// eslint-disable-next-line no-useless-escape
router.get('(^(?!\/(favicon\.ico|images\/|styles\/|*login*|devportal\/)))/*', registerPartials,  contentController.loadCustomContent);

module.exports = router;
