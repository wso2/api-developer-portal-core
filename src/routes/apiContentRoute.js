const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiContentController');
const registerPartials = require('../middlewares/registerPartials');



router.get('/((?!favicon.ico)):orgName/apis', registerPartials, apiController.loadAPIs);

router.get('/((?!favicon.ico)):orgName/api/:apiName', registerPartials, apiController.loadAPIContent);

router.get('/((?!favicon.ico)):orgName/api/:apiName/tryout', registerPartials, apiController.loadTryOutPage);

module.exports = router;