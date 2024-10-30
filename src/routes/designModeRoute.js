const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');
const apiController = require('../controllers/apiContentController');
const contentController = require('../controllers/customContentController');


router.get('/', orgController.loadOrganizationContent);

router.get('/apis', apiController.loadAPIs);

router.get('/api/:apiName', apiController.loadAPIContent);

router.get('/api/:apiName/tryout', apiController.loadTryOutPage);

router.get('((?!favicon.ico|images|styles)/mock)\/*', contentController.loadCustomContent);
//'/((?!favicon.ico|images|styles):orgName/*)'
module.exports = router;
