const fetch = require('node-fetch');
const config = require(process.cwd() + '/config');
const minimatch = require('minimatch');

const ensureAuthenticated = async (req, res, next) => {

    const orgDetailsResponse = await fetch(`${config.adminAPI}organisation?orgName=${req.params.orgName}`);
    var orgDetails = await orgDetailsResponse.json();


    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') && orgDetails.authenticatedPages != null
        && orgDetails.authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
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
