 
const minimatch = require('minimatch');
const adminDao = require('../dao/admin');

const ensureAuthenticated = async (req, res, next) => {

    const orgName = req.params.orgName;
    const orgData = await adminDao.getOrganization(orgName);

    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') && orgData.authenticatedPages != null
        && orgData.authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.session.returnTo = req.originalUrl || `/${req.params.orgName}`;
            res.redirect(`/${req.params.orgName}/login`);
        }
    } else {
        return next();
    };
};

module.exports = ensureAuthenticated;
