const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');
const apiController = require('../controllers/apiContentController');
const contentController = require('../controllers/customContentController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/', registerPartials, orgController.loadOrganizationContent);

router.get('/apis', registerPartials, apiController.loadAPIs);

router.get('/api/:apiName', registerPartials, apiController.loadAPIContent);

router.get('/api/:apiName/tryout', registerPartials, apiController.loadTryOutPage);

router.get('((?!favicon.ico|images|styles)/mock)\/*', registerPartials,  contentController.loadCustomContent);

module.exports = router;
