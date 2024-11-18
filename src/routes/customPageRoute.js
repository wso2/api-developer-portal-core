const express = require('express');
const router = express.Router();
const contentController = require('../controllers/customContentController');
const registerPartials = require('../middlewares/registerPartials');

router.get('(^(?!\/(favicon\.ico|images\/|styles\/|login|devportal\/))/:orgName/*)', registerPartials, contentController.loadCustomContent);

module.exports = router;