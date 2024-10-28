const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');

function configurePassport(authJsonContent) {
    passport.use(new OAuth2Strategy({
        issuer: authJsonContent.issuer,
        authorizationURL: authJsonContent.authorizationURL,
        tokenURL: authJsonContent.tokenURL,
        userInfoURL: authJsonContent.userInfoURL,
        clientID: authJsonContent.clientId,
        callbackURL: authJsonContent.callbackURL,
        scope: authJsonContent.scope ? authJsonContent.scope.split(" ") : "",
        passReqToCallback: true,
        state: true,
        pkce: true
    }, (req, accessToken, refreshToken, params, profile, done) => {
        const decodedJWT = jwt.decode(params.id_token);
        profile = {
            'name': decodedJWT['given_name'],
            'idToken': params.id_token,
            'email': decodedJWT['email'],
            'visibility':  decodedJWT['user_group']
        };
        console.log("Logged In-----")
        console.log(params.id_token)
        return done(null, profile);
    }));
}

module.exports = configurePassport;
