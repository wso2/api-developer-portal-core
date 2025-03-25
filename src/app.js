/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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
// const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
// const crypto = require('crypto');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
// const authRoute = require('./routes/authRoute');
// const devportalRoute = require('./routes/devportalRoute');
// const orgContent = require('./routes/orgContentRoute');
// const apiContent = require('./routes/apiContentRoute');
// const myAPIs = require('./routes/myAPIRoute');
// const applicationContent = require('./routes/applicationsContentRoute');
// const customContent = require('./routes/customPageRoute');
const config = require(process.cwd() + '/config.json');
// const Handlebars = require('handlebars');
const constants = require("./utils/constants");
// const designRoute = require('./routes/designModeRoute');
// const settingsRoute = require('./routes/configureRoute');
const AsyncLock = require('async-lock');
const secretConf = require(process.cwd() + '/secret.json');
const util = require('./utils/util');

const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
// const secret = require(process.cwd() + '/secret.json');
const { v4: uuidv4 } = require('uuid');

// const lock = new AsyncLock();
const app = express();
// const secret = crypto.randomBytes(64).toString('hex');
const sessionSecret = 'my-secret';
// const filePrefix = config.pathToContent;
// const configurePassport = require('./middlewares/passport');

const SERVER_ID = uuidv4();

console.log(`starting server: ${SERVER_ID}`);

// if (config.disableTLS) {
//     process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// }
const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.username,
    password: config.db.password,
    ssl: { 
        require: true, 
        rejectUnauthorized: false 
    }
});

//PostgreSQL connection pool for session store
// if (config.advanced.dbSslDialectOption) {
//     pool.ssl = { 
//         require: true, 
//         rejectUnauthorized: false 
//     };
// }

// app.engine('.hbs', engine({
//     extname: '.hbs'
// }));

// app.set('view engine', 'hbs');

// #region Register Handlebars helpers

// Handlebars.registerHelper('json', function (context) {

//     if (context) {
//         return JSON.stringify(context);
//     } else {
//         return JSON.stringify();
//     }
// });

// Handlebars.registerHelper("every", function (array, key, options) {
//     if (!Array.isArray(array)) {
//         return options.inverse(this);
//     }

//     const allMatch = array.every(item => item[key]);

//     return allMatch ? true : false;
// });

// Handlebars.registerHelper("some", function (array, key, options) {
//     if (!Array.isArray(array)) {
//         return options.inverse(this);
//     }

//     const someMatch = array.some(item => item[key]);

//     return someMatch ? true : false;
// });

// Handlebars.registerHelper('eq', function (a, b) {
//     return (a === b || (a != null && b != null && (a === b.toString() || a.toString() === b)));
// });

// Handlebars.registerHelper('in', function (value, options) {
//     const validValues = Array.isArray(options.hash.values) ? options.hash.values : options.hash.values.split(',');
//     return Array.isArray(validValues) && validValues.includes(value)
//         ? options.fn(this)
//         : options.inverse(this);
// });

// Handlebars.registerHelper('conditionalIf', function (condition, value1, value2) {
//     return condition ? value1 : value2;
// });

// Handlebars.registerHelper('contains', function (array, value) {
//     return array && array.includes(value);
// });

// Handlebars.registerHelper('let', function (name, value, options) {
//     const data = Handlebars.createFrame(options.data);
//     data[name] = value;
//     return options.fn({ ...options.hash, ...data });
// });

// Handlebars.registerHelper('and', function () {
//     const args = Array.prototype.slice.call(arguments);
//     const lastArg = args.pop();
//     return args.every(Boolean) ? lastArg.fn(this) : lastArg.inverse(this);
// });

// Handlebars.registerHelper('getValue', function (obj, key) {
//     return obj[key];
// });

// Handlebars.registerHelper('lowercase', function (str) {
//     return typeof str === 'string' ? str.toLowerCase() : str;
// });

// Handlebars.registerHelper('isMiddle', function (index, length) {
//     const middleIndex = Math.floor(length / 2);
//     return index === middleIndex;
// });

// Handlebars.registerHelper('startsWith', function (str, includeStr, options) {
//     if (str && str.startsWith(includeStr)) {
//         return options.fn(this);  
//     } else {
//         return options.inverse(this); 
//     }
// });

// #endregion

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session',
        pruneSessionInterval: 3600,
        debug: console.log,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure:false,
        maxAge: 60 * 60 * 1000,
    },
}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

let claimNames = {
    [constants.ROLES.ROLE_CLAIM]: config.roleClaim,
    [constants.ROLES.GROUP_CLAIM]: config.groupsClaim,
    [constants.ROLES.ORGANIZATION_CLAIM]: config.orgIDClaim
};
// configurePassport(config.identityProvider, claimNames);

passport.use(new OAuth2Strategy({
    name: 'Asgardeo',
    issuer: config.identityProvider.issuer,
    authorizationURL: config.identityProvider.authorizationURL,
    tokenURL: config.identityProvider.tokenURL,
    userInfoURL: config.identityProvider.userInfoURL,
    clientID: config.identityProvider.clientId,
    callbackURL: config.identityProvider.callbackURL,
    pkce: true,
    state: true,
    logoutURL: process.env.OAUTH2_LOGOUT_ENDPOINT,
    logoutRedirectURI: process.env.OAUTH2_POST_LOGOUT_REDIRECT_URI,
    certificate: '',
    jwksURL: process.env.OAUTH2_JWKS_ENDPOINT,
    passReqToCallback: true,
    scope: ['openid', 'profile', 'email'],
}, async (req, accessToken, refreshToken, params, profile, done) => {
    
    console.log('verify =================== ');
    
    if (!accessToken) {
        console.error('>>>>>>> No access token received');
        return done(new Error('Access token missing'));
    }
    console.error('>>>>>>> access token: ' + accessToken);
    let orgList;
    if (config.advanced.tokenExchanger.enabled) {
        const exchangedToken = await util.tokenExchanger(accessToken, req.session.returnTo.split("/")[1]);
        const decodedExchangedToken = jwt.decode(exchangedToken);
        orgList = decodedExchangedToken.organizations;
        req['exchangedToken'] = exchangedToken;
    }
    const decodedJWT = jwt.decode(params.id_token);
    const decodedAccessToken = jwt.decode(accessToken);
    const firstName = decodedJWT['given_name'] || decodedJWT['nickname'];
    const lastName = decodedJWT['family_name'];
    const organizationID = decodedJWT[claimNames[constants.ROLES.ORGANIZATION_CLAIM]] ? decodedJWT[config.orgIDClaim] : '';
    const roles = decodedJWT[claimNames[constants.ROLES.ROLE_CLAIM]] ? decodedJWT[config.roleClaim] : '';
    const groups = decodedJWT[claimNames[constants.ROLES.GROUP_CLAIM]] ? decodedJWT[config.groupsClaim] : '';
    let isAdmin, isSuperAdmin = false;
    if (roles.includes(constants.ROLES.SUPER_ADMIN) || roles.includes(constants.ROLES.ADMIN)) {
        isAdmin = true;
    }
    if (roles.includes(constants.ROLES.SUPER_ADMIN)) {
        isSuperAdmin = true;
    }
    const returnTo = req.session.returnTo;
    console.log("Retrieved returnTo in callback: " + returnTo);
    let view = '';
    if (returnTo) {
        const startIndex = returnTo.indexOf('/views/') + 7;
        const endIndex = returnTo.indexOf('/', startIndex) !== -1 ? returnTo.indexOf('/', startIndex) : returnTo.length;
        view = returnTo.substring(startIndex, endIndex);
    }
    profile = {
        'firstName': firstName ? (firstName.includes(" ") ? firstName.split(" ")[0] : firstName) : '',
        'lastName': lastName ? lastName : (firstName && firstName.includes(" ") ? firstName.split(" ")[1] : ''),
        'view': view,
        'idToken': params.id_token,
        'email': decodedJWT['email'],
        [constants.ROLES.ORGANIZATION_CLAIM]: organizationID,
        'returnTo': req.session.returnTo,
        accessToken,
        'authorizedOrgs': orgList,
        'exchangeToken': req.exchangedToken,
        [constants.ROLES.ROLE_CLAIM]: roles,
        [constants.ROLES.GROUP_CLAIM]: groups,
        'isAdmin': isAdmin,
        'isSuperAdmin': isSuperAdmin,
        [constants.USER_ID]: decodedAccessToken[constants.USER_ID]
    };

 

    console.log('------ verify done ---------');

    return done(null, profile);
}));

// Serialize user into the session
passport.serializeUser((user, done) => {

    console.log("Serializing user");
    console.log(('>>> User: ' + JSON.stringify(user, null, 2)))
    // const profile = {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     view: user.view,
    //     idToken: user.idToken,
    //     [constants.ROLES.ORGANIZATION_CLAIM]: user[constants.ROLES.ORGANIZATION_CLAIM],
    //     'returnTo': user.returnTo,
    //     accessToken: user.accessToken,
    //     'exchangeToken': user.exchangeToken,
    //     'organizations': user.authorizedOrgs,
    //     [constants.ROLES.ROLE_CLAIM]: user.roles,
    //     [constants.ROLES.GROUP_CLAIM]: user.groups,
    //     'isAdmin': user.isAdmin,
    //     'isSuperAdmin': user.isSuperAdmin,
    //     [constants.USER_ID]: user[constants.USER_ID]
    // };
    // lock.acquire('serialize', (release) => {
    //     release(null, profile);
    // }, (err, ret) => {
    //     if (err) {
    //         return done(err);
    //     }
    //     done(null, ret);
    // });
    done(null, user);
});

// Deserialize user from the session
// passport.deserializeUser(async (sessionData, done) => {

//     console.log("Deserializing user");
//     //return done(null, sessionData);
//     lock.acquire('deserialize', async (release) => {
//         try {
//             release(null, sessionData);
//         } catch (err) {
//             release(err);
//         }
//     }, (err, ret) => {
//         if (err) {
//             return done(err);
//         }
//         done(null, ret);
//     });
// });

passport.deserializeUser((obj, done) => {
    console.log('deserializeUser');
    done(null, obj)
});

// app.use(constants.ROUTE.TECHNICAL_STYLES, express.static(path.join(require.main.filename, '../styles')));
// app.use(constants.ROUTE.TECHNICAL_SCRIPTS, express.static(path.join(require.main.filename, '../scripts')));

// //backend routes
// app.use(constants.ROUTE.DEV_PORTAL, devportalRoute);

// if (config.mode === constants.DEV_MODE) {
//     app.use(constants.ROUTE.STYLES, express.static(path.join(process.cwd(), filePrefix + 'styles')));
//     app.use(constants.ROUTE.IMAGES, express.static(path.join(process.cwd(), filePrefix + 'images')));
//     app.use(constants.ROUTE.MOCK, express.static(path.join(process.cwd(), filePrefix + 'mock')));
//     app.use(constants.ROUTE.DEFAULT, designRoute);
// } else {
//     app.use(constants.ROUTE.STYLES, express.static(path.join(process.cwd(), './src/defaultContent/' + 'styles')));
//     app.use(constants.ROUTE.IMAGES, express.static(path.join(process.cwd(), './src/defaultContent/' + 'images')));
//     app.use(constants.ROUTE.DEFAULT, authRoute);
//     app.use(constants.ROUTE.DEFAULT, apiContent);
//     app.use(constants.ROUTE.DEFAULT, applicationContent);
//     app.use(constants.ROUTE.DEFAULT, orgContent);
//     app.use(constants.ROUTE.DEFAULT, myAPIs);
//     app.use(constants.ROUTE.DEFAULT, settingsRoute);
//     app.use(constants.ROUTE.DEFAULT, customContent);
// }

app.get('/', (req, res) => {
    res.send(`
        <h1>Server ID: ${SERVER_ID}</h1>
        <a href="/login">Login with OAuth2</a>
    `);
});

const login = async (req, res, next) => {
    console.log('========= login');
    // await configPassport(); // this is not necessary as there are no org specific idps
    await req.session.save(async (err) => {
        console.log('>>> session save');
        if (err) {
            console.error('>>> Session save failed');
            return res.status(500).send('Internal Server Error');
        }
        req.session.returnTo = "/sachinisdev/profile";
        await passport.authenticate('oauth2')(req, res, next);
    });
    console.log('>>>> login done');
}

// Login route
app.get('/login', login);

// Callback route
app.get('/signin', 
    passport.authenticate('oauth2', { failureRedirect: '/' }),
    (req, res) => {
        console.log("Return to in callback: ", req.user.returnTo);
        res.redirect('/profile');
    }
);

// Profile page (protected)
app.get('/profile', (req, res) => {
    console.log('profile');
    if (!req.isAuthenticated()) {
        console.log('Profile - Not authenticated')
        return res.redirect('/');
    }
    console.log('Profile - Authenticated');
    res.send(`
        <h1>Logged In: ${SERVER_ID}</h1>
        <pre>${JSON.stringify(req.user, null, 2)}</pre>
        <a href="/logout">Logout</a>
    `);
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.redirect('/');
    });
});


// app.use((err, req, res, next) => {

//     console.error(err.stack); // Log error for debugging
//     const templateContent = {
//         baseUrl: '/' + req.params.orgName + '/' + constants.ROUTE.VIEWS_PATH + "default"
//     }
//     if (err.status === 401) {
//         req.session.destroy((err) => {
//             if (err) {
//                 console.error("❌ Error destroying session:", err);
//                 return res.status(500).send("Logout failed");
//             }
//             console.log("✅ User logged out and session destroyed");
//         });
//         html = util.renderTemplate('../pages/authentication-error/page.hbs', 'src/pages/error-layout/main.hbs', templateContent, true);
//     } else {
//         html = util.renderTemplate('../pages/error-page/page.hbs', "./src/defaultContent/" + 'layout/main.hbs', templateContent, true);
//     }
//     res.status(err.status || 500).send(`
//       ${html}
//     `);
// });


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
