const express = require('express');
const { engine } = require('express-handlebars');
const passport = require('passport');
const authRoute = require('./routes/authRoute');
const singleOrgContent = require('./routes/singleOrgContentRoute');
const multiOrgContent = require('./routes/multipleOrgContentRoute');
const session = require('express-session');
const crypto = require('crypto');
const config = require('../src/config/config');
const { copyStyelSheet, copyStyelSheetMulti } = require('./utils/util');
const path = require('path');
const Handlebars = require('handlebars');


const app = express();
const secret = crypto.randomBytes(64).toString('hex');
var filePrefix = '../../../src/';


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

app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use('/', authRoute);

if (config.mode == 'single') {
    //register images and stylesheet folders for single tenante scenario
    app.use('/images', express.static(path.join(__dirname, filePrefix + 'images')));

    copyStyelSheet();
    app.use('/', singleOrgContent);

} else if (config.mode == 'multi') {
    copyStyelSheetMulti();
    app.use('/', multiOrgContent);

}
app.use('/styles', express.static(path.join(__dirname, filePrefix + 'styles')));
const folderToDelete = path.join(__dirname, '../../../src/' + '/styles');

process.on('SIGINT', () => {
    if (fs.existsSync(folderToDelete)) {
        fs.rmSync(folderToDelete, { recursive: true, force: true });
    }
    process.exit();
});

process.on('exit', () => {
    if (fs.existsSync(folderToDelete)) {
        fs.rmSync(folderToDelete, { recursive: true, force: true });
    }
});

Handlebars.registerHelper('eq', function (a, b) {
    return (a == b);
});

Handlebars.registerHelper('in', function (value, options) {
    const validValues = options.hash.values.split(',');
    return validValues.includes(value) ? options.fn(this) : options.inverse(this);
});

app.listen(config.port);
