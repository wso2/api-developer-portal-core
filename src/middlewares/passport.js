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
        const name = decodedJWT['given_name']? decodedJWT['given_name'] : decodedJWT['nickname'];
        profile = {
            'name': name,
            'idToken': params.id_token,
            'email': decodedJWT['email']
        };
        return done(null, profile);
    }));
}

module.exports = configurePassport;
