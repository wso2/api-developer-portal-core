const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiContentController');


router.get('/((?!favicon.ico)):orgName/apis', apiController.loadAPIs);

router.get('/((?!favicon.ico)):orgName/api/:apiName', apiController.loadAPIContent);

router.get('/((?!favicon.ico)):orgName/api/:apiName/tryout', apiController.loadTryOutPage);

router.get('/((?!favicon.ico)):orgName/myAPIs', apiController.loadMyAPIs);
module.exports = router;