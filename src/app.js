/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable no-undef */
const express = require('express');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
const authRoute = require('./routes/authRoute');
const devportalRoute = require('./routes/devportalRoute');
const orgContent = require('./routes/orgContentRoute');
const apiContent = require('./routes/apiContentRoute');
const myAPIs = require('./routes/myAPIRoute');
const applicationContent = require('./routes/applicationsContentRoute');
const customContent = require('./routes/customPageRoute');
const config = require(process.cwd() + '/config.json');
const Handlebars = require('handlebars');
const constants = require("./utils/constants");
const designRoute = require('./routes/designModeRoute');
const settingsRoute = require('./routes/configureRoute');

const app = express();
const secret = crypto.randomBytes(64).toString('hex');
const filePrefix = config.pathToContent;

if (config.disableTLS) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

Handlebars.registerHelper('json', function(context) {

    if(context) {
        return JSON.stringify(context);
    } else {
        return JSON.stringify();
    }
});

Handlebars.registerHelper('eq', function (a, b) {
    return (a === b || (a != null && b != null && (a === b.toString() || a.toString() === b)));
});

Handlebars.registerHelper('in', function (value, options) {
    const validValues = Array.isArray(options.hash.values) ? options.hash.values : options.hash.values.split(',');
    return Array.isArray(validValues) && validValues.includes(value)
        ? options.fn(this)
        : options.inverse(this);
});

Handlebars.registerHelper('conditionalIf', function (condition, value1, value2) {
    return condition ? value1 : value2;
});

Handlebars.registerHelper('contains', function (array, value) {
    return array && array.includes(value);
});

Handlebars.registerHelper('let', function (name, value, options) {
    const data = Handlebars.createFrame(options.data);
    data[name] = value;
    return options.fn({ ...options.hash, ...data });
});

Handlebars.registerHelper('and', function () {
    const args = Array.prototype.slice.call(arguments);
    const lastArg = args.pop();
    return args.every(Boolean) ? lastArg.fn(this) : lastArg.inverse(this);
});

Handlebars.registerHelper('getValue', function (obj, key) {
    return obj[key];
});

Handlebars.registerHelper('lowercase', function (str) {
    return typeof str === 'string' ? str.toLowerCase() : str;
});

Handlebars.registerHelper('isMiddle', function(index, length) {
    const middleIndex = Math.floor(length / 2);
    return index === middleIndex;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(constants.ROUTE.STYLES, express.static(path.join(process.cwd(), filePrefix + 'styles')));
app.use(constants.ROUTE.IMAGES, express.static(path.join(process.cwd(), filePrefix + 'images')));
app.use(constants.ROUTE.TECHNICAL_STYLES, express.static(path.join(require.main.filename, '../styles')));
app.use(constants.ROUTE.TECHNICAL_SCRIPTS, express.static(path.join(require.main.filename, '../scripts')));

//backend routes
app.use(constants.ROUTE.DEV_PORTAL, devportalRoute);

if (config.mode === constants.DEV_MODE) {
    app.use(constants.ROUTE.MOCK, express.static(path.join(process.cwd(), filePrefix + 'mock')));
    app.use(constants.ROUTE.DEFAULT, designRoute);
} else {
    app.use(constants.ROUTE.DEFAULT, authRoute);
    app.use(constants.ROUTE.DEFAULT, apiContent);
    app.use(constants.ROUTE.DEFAULT, applicationContent);
    app.use(constants.ROUTE.DEFAULT, orgContent);
    app.use(constants.ROUTE.DEFAULT, myAPIs);
    app.use(constants.ROUTE.DEFAULT, settingsRoute);
    app.use(constants.ROUTE.DEFAULT, customContent);
}

const PORT = process.env.PORT || config.defaultPort;
if (config.advanced.http) {
    http.createServer(app).listen(PORT, '0.0.0.0', () => {
        logStartupInfo();
    });

} else {
    try {
        const certPath = path.join(process.cwd(), config.serverCerts.pathToCert);
        const keyPath = path.join(process.cwd(), config.serverCerts.pathToPK);
        const caPath = path.join(process.cwd(), config.serverCerts.pathToCA);

        const serverCert = fs.readFileSync(certPath);
        const serverKey = fs.readFileSync(keyPath);
        const caCert = fs.readFileSync(caPath);

        https.createServer({
            key: serverKey,
            cert: serverCert,
            ca: caCert, 
            requestCert: true,  
            rejectUnauthorized: false  
        }, app).listen(PORT, () => {
            logStartupInfo();
        });

    } catch (err) {
        console.error('\n' + chalk.red.bold('Error setting up HTTPS server:') + '\n', chalk.red(err.message) + '\n');
    }
}

const logStartupInfo = () => {
    console.log('\n' + chalk.green.bold(`Developer Portal V2 is running on port ${PORT}`) + '\n');
    console.log('\n' + chalk.cyan.bold(`Mode: ${config.mode}`) + '\n');

    if (config.mode === constants.DEV_MODE) {
        console.log('\n' + chalk.yellow('⚠️  Since you are in DEV mode...') + '\n');
        console.log(chalk.greenBright('✅ Ensure that the default content is correctly available at the configured "pathToContent".') + '\n');
        console.log(chalk.greenBright('✅ The "Mock" folder must exist in the same root directory as "pathToContent".') + '\n');
    }

    console.log(chalk.blue(`🔗 Visit: ${chalk.underline(config.baseUrl + (config.mode === constants.DEV_MODE ? "/views/default" : "/<organization>/views/default"))}`) + '\n');
};

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('\n' + chalk.bgRed.white.bold(' Uncaught Exception ') + '\n', chalk.red(err.stack || err.message) + '\n');
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('\n' + chalk.bgRed.white.bold(' Unhandled Rejection ') + '\n', chalk.red('Promise:', promise, '\nReason:', reason) + '\n');
});
