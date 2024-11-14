const configurePassport = require('../middlewares/passport');
const passport = require('passport');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');
const constants = require('../utils/constants');

const filePrefix = config.pathToContent;

const fetchAuthJsonContent = async (orgName) => {
    if (config.mode === constants.DEV_MODE) {
        const authJsonPath = path.join(process.cwd(), filePrefix + '../mock', 'auth.json');
        const authJson = JSON.parse(fs.readFileSync(authJsonPath, 'utf-8'));
        return authJson;
    }
    try {
        const response = await fetch(`${config.devportalAPI}identityProvider?orgName=${orgName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch identity provider details: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch identity provider details", error);
    }
};

const login = async (req, res, next) => {
    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    console.log("Fetching identity provider details for orgName:", authJsonContent);

    if (authJsonContent.length > 0) {
        configurePassport(authJsonContent[0]);  // Configure passport dynamically
        passport.authenticate('oauth2')(req, res, next);
        next();
    } else {
        res.status(400).send("No Identity Provider information found for the organization");
    }
};

const handleCallback = (req, res, next) => {
    passport.authenticate('oauth2', {
        failureRedirect: '/login',
        keepSessionInfo: true
    }, (err, user) => {
        if (err || !user) {
            return next(err || new Error('Authentication failed'));
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo || `/${req.params.orgName}`;
            delete req.session.returnTo;
            res.redirect(returnTo);
        });
    })(req, res, next);
};

const handleSignUp = async (req, res) => {
    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    res.redirect(authJsonContent[0].signUpURL);
};

const handleLogOut = async (req, res) => {
    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    let idToken = ''
    if (req.user != null) {
        idToken = req.user.idToken;
    }
    req.session.destroy();
    req.logout(
        () => res.redirect(`${authJsonContent[0].logoutURL}?post_logout_redirect_uri=${authJsonContent[0].logoutRedirectURI}&id_token_hint=${idToken}`)
    );
};

module.exports = {
    login,
    handleCallback,
    handleSignUp,
    handleLogOut
};
