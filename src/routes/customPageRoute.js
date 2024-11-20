const express = require('express');
const router = express.Router();
const contentController = require('../controllers/customContentController');
const registerPartials = require('../middlewares/registerPartials');

// eslint-disable-next-line no-useless-escape
router.get('(^(?!\/(favicon\.ico|images\/|styles\/|*login*|devportal\/))/:orgName/*)', registerPartials, contentController.loadCustomContent);
module.exports = router;