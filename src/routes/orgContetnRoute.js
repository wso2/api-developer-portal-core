const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgContentController');


router.get('/((?!favicon.ico)):orgName', orgController.loadOrganizationContent);

module.exports = router;