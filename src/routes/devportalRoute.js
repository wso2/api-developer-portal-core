const express = require('express');
const router = express.Router();
const devportalService = require('../services/devportalService');

router.get('/organizations/:orgId/layout', devportalService.getOrgContent);
router.get('/organizations/:orgId/image', devportalService.getImgContent);

module.exports = router;
