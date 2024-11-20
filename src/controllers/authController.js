/* eslint-disable no-undef */
const configurePassport = require('../middlewares/passport');
const passport = require('passport');
const config = require(process.cwd() + '/config.json');
const fs = require('fs');
const path = require('path');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const IdentityProviderDTO = require("../dto/identityProvider");


const filePrefix = config.pathToContent;

const fetchAuthJsonContent = async (orgName) => {
    if (config.mode === constants.DEV_MODE) {
        const authJsonPath = path.join(process.cwd(), filePrefix + '../mock', 'auth.json');
        const authJson = JSON.parse(fs.readFileSync(authJsonPath, 'utf-8'));
        return authJson;
    }
    try {
        let organization = await adminDao.getOrganization(orgName);
        if(!organization){
            res.send("Organization not found")
        }
        const response = await adminDao.getIdentityProvider(organization.ORG_ID);
        console.log("Identity Provider details fetched from DB:", response[0].dataValues);
        if (response.length === 0) {
            throw new Error(`Failed to fetch identity provider details: ${response.statusText}`);
        }
        return new IdentityProviderDTO(response[0].dataValues);
    } catch (error) {
        console.log("Failed to fetch identity provider details", error);
        throw new Error("Failed to fetch identity provider details", error);
    }
};

const login = async (req, res, next) => {

    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    console.log("Fetching identity provider details for orgName:", authJsonContent);

    if (authJsonContent.clientId) {
        configurePassport(authJsonContent);  // Configure passport dynamically
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
            if (config.mode === constants.DEV_MODE) {
                const returnTo = req.session.returnTo || constants.BASE_URL + config.port;
                delete req.session.returnTo;
                res.redirect(returnTo);
            } else {
                const returnTo = req.session.returnTo || `/${req.params.orgName}`;
                delete req.session.returnTo;
                res.redirect(returnTo);
            }
          
        });
    })(req, res, next);
};

const handleSignUp = async (req, res) => {
    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    if (authJsonContent.signUpURL) {
        res.redirect(authJsonContent.signUpURL);
    } else {
        if (config.mode === constants.DEV_MODE) {
            const returnTo = req.session.returnTo || constants.BASE_URL + config.port;
            delete req.session.returnTo;
            res.redirect(returnTo);
        } else {
            const returnTo = req.session.returnTo || `/${req.params.orgName}`;
            res.redirect(returnTo);
        }
    }
};

const handleLogOut = async (req, res) => {
    let authJsonContent = await fetchAuthJsonContent(req.params.orgName);
    let idToken = ''
    if (req.user != null) {
        idToken = req.user.idToken;
    }
    req.session.destroy();
    req.logout(
        () => res.redirect(`${authJsonContent.logoutURL}?post_logout_redirect_uri=${authJsonContent.logoutRedirectURI}&id_token_hint=${idToken}`)
    );
};

module.exports = {
    login,
    handleCallback,
    handleSignUp,
    handleLogOut
};
