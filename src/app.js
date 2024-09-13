const express = require('express');
const passport = require('passport');
const authRoute = require('./routes/authRoute');
const config = require('./config/config');
const session = require('express-session');
const crypto = require('crypto');

const app = express();

const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use('/', authRoute);

app.listen(config.port);
