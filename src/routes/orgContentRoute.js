const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/(((?!favicon.ico|images)):orgName)', registerPartials, orgController.loadOrganizationContent);


module.exports = router;
