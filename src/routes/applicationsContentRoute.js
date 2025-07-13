const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsContentController');
const registerPartials = require('../middlewares/registerPartials');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const path = require('path');
const fs = require('fs');

router.get('/:orgName/views/:viewName/applications', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') {
        return res.status(404).send('Not Found');
    }
    next();
}, registerPartials, ensureAuthenticated, applicationsController.loadApplications);



router.get('/:orgName/views/:viewName/applications/:applicationId', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') {
        return res.status(404).send('Not Found');
    }
    next();
}, registerPartials, ensureAuthenticated, applicationsController.loadApplication);

router.post('/:orgName/views/:viewName/applications/:applicationId/generate-sdk', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') {
        return res.status(404).send('Not Found');
    }
    next();
}, ensureAuthenticated, applicationsController.generateSDK);

router.get('/:orgName/views/:viewName/applications/:applicationId/sdk/job-progress', (req, res, next) => {
    if (req.params.orgName === 'favicon.ico') {
        return res.status(404).send('Not Found');
    }
    next();
}, ensureAuthenticated, applicationsController.streamSDKProgress);

// SDK Download route
router.get('/download/sdk/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'generated-sdks', filename);
    
    // Security check - ensure the file is within the generated-sdks directory
    const normalizedPath = path.normalize(filePath);
    const expectedDir = path.join(process.cwd(), 'generated-sdks');
    
    if (!normalizedPath.startsWith(expectedDir)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'SDK file not found' });
    }
    
    // Set appropriate headers for download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on('error', (err) => {
        console.error('Error streaming SDK file:', err);
        res.status(500).json({ error: 'Error downloading SDK' });
    });
});

module.exports = router;