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
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
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
const AsyncLock = require('async-lock');
const secretConf = require(process.cwd() + '/secret.json');
const util = require('./utils/util');

const lock = new AsyncLock();
const app = express();
const secret = crypto.randomBytes(64).toString('hex');
const filePrefix = config.pathToContent;
const configurePassport = require('./middlewares/passport');

if (config.disableTLS) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}
let pool;

//PostgreSQL connection pool for session store
if (config.advanced.dbSslDialectOption) {
    pool = new Pool({
        user: config.db.username,
        host: config.db.host,
        database: config.db.database,
        password: secretConf.dbSecret,
        port: config.db.port,
        ssl: { require: true, rejectUnauthorized: false } 
    });
} else {
    pool = new Pool({
        user: config.db.username,
        host: config.db.host,
        database: config.db.database,
        password: secretConf.dbSecret,
        port: config.db.port
    });
}

app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

Handlebars.registerHelper('json', function (context) {

    if (context) {
        return JSON.stringify(context);
    } else {
        return JSON.stringify();
    }
});

Handlebars.registerHelper("every", function (array, key, options) {
    if (!Array.isArray(array)) {
        return options.inverse(this);
    }

    const allMatch = array.every(item => item[key]);

    return allMatch ? true : false;
});

Handlebars.registerHelper("some", function (array, key, options) {
    if (!Array.isArray(array)) {
        return options.inverse(this);
    }

    const someMatch = array.some(item => item[key]);

    return someMatch ? true : false;
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

Handlebars.registerHelper('isMiddle', function (index, length) {
    const middleIndex = Math.floor(length / 2);
    return index === middleIndex;
});

Handlebars.registerHelper('startsWith', function (str, includeStr, options) {
    if (str && str.startsWith(includeStr)) {
        return options.fn(this);  
    } else {
        return options.inverse(this); 
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new pgSession({
    pool: pool,
    tableName: 'session',
    pruneSessionInterval: 3600,
    debug: console.log,
});

app.use(session({
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure:false,
        maxAge: 60 * 60 * 1000
    }
}));


app.use(passport.initialize());
app.use(passport.session());

// Serialize user into the session
passport.serializeUser((user, done) => {

    console.log("Serializing user");
    const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        view: user.view,
        idToken: user.idToken,
        [constants.ROLES.ORGANIZATION_CLAIM]: user[constants.ROLES.ORGANIZATION_CLAIM],
        'returnTo': user.returnTo,
        accessToken: user.accessToken,
        'exchangeToken': user.exchangeToken,
        'organizations': user.authorizedOrgs,
        [constants.ROLES.ROLE_CLAIM]: user.roles,
        [constants.ROLES.GROUP_CLAIM]: user.groups,
        'isAdmin': user.isAdmin,
        'isSuperAdmin': user.isSuperAdmin,
        [constants.USER_ID]: user[constants.USER_ID]
    };
    lock.acquire('serialize', (release) => {
        console.log(">>>>>>>>>>>>>>>>>>>> Acquiring lock while Serializing user");
        console.log(">>>>>>>>>>>>>>>>>>>> Profile of serialized user: " + JSON.stringify(profile));
        release(null, profile);
    }, (err, ret) => {
        if (err) {
            return done(err);
        }
        console.log(">>>>>>>>>>>>>>>>>>>> Successfully serialized user");
        done(null, ret);
    });
    //done(null, user);
});

// Deserialize user from the session
passport.deserializeUser(async (sessionData, done) => {

    console.log("Deserializing user");
    //return done(null, sessionData);
    lock.acquire('deserialize', async (release) => {
        try {
            console.log(">>>>>>>>>>>>>>>>>>>> Acquiring lock while deserializing user");
            console.log(">>>>>>>>>>>>>>>>>>>> session data while deserializing user: " + JSON.stringify(sessionData));
            release(null, sessionData);
        } catch (err) {
            release(err);
        }
    }, (err, ret) => {
        if (err) {
            return done(err);
        }
        console.log(">>>>>>>>>>>>>>>>>>>> Successfully deserialized user");
        done(null, ret);
    });
});

app.use(constants.ROUTE.TECHNICAL_STYLES, express.static(path.join(require.main.filename, '../styles')));
app.use(constants.ROUTE.TECHNICAL_SCRIPTS, express.static(path.join(require.main.filename, '../scripts')));

//backend routes
app.use(constants.ROUTE.DEV_PORTAL, devportalRoute);

if (config.mode === constants.DEV_MODE) {
    app.use(constants.ROUTE.STYLES, express.static(path.join(process.cwd(), filePrefix + 'styles')));
    app.use(constants.ROUTE.IMAGES, express.static(path.join(process.cwd(), filePrefix + 'images')));
    app.use(constants.ROUTE.MOCK, express.static(path.join(process.cwd(), filePrefix + 'mock')));
    app.use(constants.ROUTE.DEFAULT, designRoute);
} else {
    app.use(constants.ROUTE.STYLES, express.static(path.join(process.cwd(), './src/defaultContent/' + 'styles')));
    app.use(constants.ROUTE.IMAGES, express.static(path.join(process.cwd(), './src/defaultContent/' + 'images')));
    app.use(constants.ROUTE.DEFAULT, authRoute);
    app.use(constants.ROUTE.DEFAULT, apiContent);
    app.use(constants.ROUTE.DEFAULT, applicationContent);
    app.use(constants.ROUTE.DEFAULT, orgContent);
    app.use(constants.ROUTE.DEFAULT, myAPIs);
    app.use(constants.ROUTE.DEFAULT, settingsRoute);
    app.use(constants.ROUTE.DEFAULT, customContent);
}

app.use((err, req, res, next) => {

    console.error(err.stack); // Log error for debugging
    const templateContent = {
        baseUrl: '/' + req.params.orgName + '/' + constants.ROUTE.VIEWS_PATH + "default"
    }
    if (err.status === 401) {
        html = util.renderTemplate('../pages/authentication-error/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
    } else {
        html = util.renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
    }
    res.status(err.status || 500).send(`
      ${html}
    `);
});


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
