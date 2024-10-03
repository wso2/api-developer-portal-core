const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');

router.get('/((?!favicon.ico|images):orgName)', orgController.loadOrganizationContent);

module.exports = router;
