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
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const logger = require('./config/logger');
const { auditMiddleware } = require('./middlewares/auditLogger');
const authRoute = require('./routes/authRoute');
const devportalRoute = require('./routes/devportalRoute');
const orgContent = require('./routes/orgContentRoute');
const apiContent = require('./routes/apiContentRoute');
const applicationContent = require('./routes/applicationsContentRoute');
const sdkJobService = require('./services/sdkJobService');
const customContent = require('./routes/customPageRoute');
const subscriptionsContent = require('./routes/subscriptionsContentRoute');
const mcpRegistryRoute = require('./routes/mcpRegistryRoute');
const config = require(process.cwd() + '/config.json');
const Handlebars = require('handlebars');
const constants = require("./utils/constants");
const { registerHelpers: registerHandlebarsHelpers } = require("./utils/handlebarsHelpers");
const designRoute = require('./routes/designModeRoute');
const settingsRoute = require('./routes/configureRoute');
const apiFlowsRoute = require('./routes/apiFlowsRoute');
const AsyncLock = require('async-lock');
const util = require('./utils/util');

const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
const secretConf = require(process.cwd() + '/secret.json');
const { v4: uuidv4 } = require('uuid');

const lock = new AsyncLock();
const app = express();
// const secret = crypto.randomBytes(64).toString('hex');
const sessionSecret = 'my-secret';
const filePrefix = config.pathToContent;

const SERVER_ID = uuidv4();

logger.info(`Starting server with ID: ${SERVER_ID}`);

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

// #region Register Handlebars helpers

// Helper bodies live in src/utils/handlebarsHelpers.js so that templates can be
// compiled outside a running server (see the render tests).
registerHandlebarsHelpers(Handlebars);

// #endregion

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session',
        pruneSessionInterval: 3600,
        debug: (message) => logger.debug('Session store debug', { message }),
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000,
    },
}));

// Stripe webhook endpoint MUST use raw body parser for signature verification
const billingController = require('./controllers/billingController');
app.post('/webhooks/stripe/:orgId', express.raw({ type: 'application/json' }), billingController.handleStripeWebhook);

app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(
        'User-agent: *\nAllow: /\n\n# AI agent guidance: /{orgName}/views/{viewName}/llms.txt\n'
    );
});

app.get('/llms.txt', (req, res) => {
    const baseUrl = config.baseUrl;
    res.type('text/plain').send(
        `# API Developer Portal — AI Agent Entry Point\n\n` +
        `This portal provides APIs, MCP servers, and API workflows organized by organization and view.\n` +
        `The portal host is the origin you fetched this file from: ${baseUrl}\n\n` +
        `## Exploring APIs\n\n` +
        `To discover APIs, MCP servers, and API workflows published by an organization, fetch the org/view-specific index:\n\n` +
        `  ${baseUrl}/{orgName}/views/{viewName}/llms.txt\n\n` +
        `If the user has provided a URL that contains the organization name and view name, extract them from it.\n\n` +
        `If the organization name is not known, ask the user to provide it — do not guess.\n` +
        `If the view name is not specified, use \`default\`.\n`
    );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add audit logging middleware
app.use(auditMiddleware({
    excludePaths: ['/health', '/metrics', '/favicon.ico', '/styles', '/scripts', '/images', '/technical-styles', '/technical-scripts'],
    sensitiveFields: ['password', 'token', 'secret', 'key', 'authorization', 'idToken', 'accessToken', 'refreshToken']
}));

app.use(passport.initialize());
app.use(passport.session());


let claimNames = {
    [constants.ROLES.ROLE_CLAIM]: config.roleClaim,
    [constants.ROLES.GROUP_CLAIM]: config.groupsClaim,
    [constants.ROLES.ORGANIZATION_CLAIM]: config.orgIDClaim
};
// configurePassport(config.identityProvider, claimNames);

if (config.identityProvider?.clientId) {
const strategy = new OAuth2Strategy({
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
    if (!accessToken) {
        return done(new Error('Access token missing'));
    }
    let orgList, userOrg;
    let isAdmin, isSuperAdmin = false;
    if (config.advanced.tokenExchanger?.enabled) {
        try {
            const exchangedToken = await util.tokenExchanger(accessToken, req.session.returnTo.split("/")[1]);
            const decodedExchangedToken = jwt.decode(exchangedToken);
            orgList = decodedExchangedToken.organizations;
            userOrg = decodedExchangedToken.organization.uuid;
            req['exchangedToken'] = exchangedToken;
            const exchangeTokenScopes = (decodedExchangedToken?.scope || '').split(' ');
            isAdmin = exchangeTokenScopes.includes(config.advanced.tokenExchanger.admin_scope || "apim:admin");
        } catch (error) {
            logger.error('Token exchange failed during authentication', {
                error: error.message,
                returnTo: req.session.returnTo
            });
            return done(error);
        }
    }
    const decodedJWT = jwt.decode(params.id_token);
    const decodedAccessToken = jwt.decode(accessToken);
    /* Not every identity provider returns a given name. The email IdP sends given_name or
       nickname, so the header showed "ashera"; the enterprise IdP sends neither, and the
       header renders profile.firstName beside the avatar - so it fell back to an empty
       span and the user saw only an icon. The local part of the address is a better last
       resort than showing nothing, and it keeps every provider consistent. */
    const emailClaim = decodedJWT['email'] || req.session.username || '';
    const nameFromEmail = emailClaim.includes('@') ? emailClaim.split('@')[0] : emailClaim;
    const firstName = decodedJWT['given_name'] || decodedJWT['nickname'] || nameFromEmail;
    const lastName = decodedJWT['family_name'];
    const organizationID = decodedJWT[claimNames[constants.ROLES.ORGANIZATION_CLAIM]] ? decodedJWT[config.orgIDClaim] : '';
    const roles = decodedJWT[claimNames[constants.ROLES.ROLE_CLAIM]] ? decodedJWT[config.roleClaim] : '';
    const groups = decodedJWT[claimNames[constants.ROLES.GROUP_CLAIM]] ? decodedJWT[config.groupsClaim] : '';
    if (roles.includes(constants.ROLES.SUPER_ADMIN) || roles.includes(constants.ROLES.ADMIN)) {
        isAdmin = true;
    }
    if (roles.includes(constants.ROLES.SUPER_ADMIN)) {
        isSuperAdmin = true;
    }
    const returnTo = req.session.returnTo;
    let view = '';
    if (returnTo) {
        const startIndex = returnTo.indexOf('/views/') + 7;
        const endIndex = returnTo.indexOf('/', startIndex) !== -1 ? returnTo.indexOf('/', startIndex) : returnTo.length;
        view = returnTo.substring(startIndex, endIndex);
    }
    let imageURL = "https://raw.githubusercontent.com/wso2/docs-bijira/refs/heads/main/en/devportal-theming/profile.svg";
    if (decodedJWT['google_pic_url']) {
        imageURL = decodedJWT['google_pic_url'];
    } else {
        imageURL = decodedJWT['picture'] ? decodedJWT['picture'] : imageURL;
    }
    profile = {
        'firstName': firstName ? (firstName.includes(" ") ? firstName.split(" ")[0] : firstName) : '',
        'lastName': lastName ? lastName : (firstName && firstName.includes(" ") ? firstName.split(" ")[1] : ''),
        'view': view,
        'idToken': params.id_token,
        'email': decodedJWT['email'] || req.session.username,
        [constants.ROLES.ORGANIZATION_CLAIM]: organizationID,
        'returnTo': req.session.returnTo,
        accessToken,
        refreshToken,
        'authorizedOrgs': orgList,
        'exchangeToken': req.exchangedToken,
        [constants.ROLES.ROLE_CLAIM]: roles,
        [constants.ROLES.GROUP_CLAIM]: groups,
        'isAdmin': isAdmin,
        'isSuperAdmin': isSuperAdmin,
        [constants.USER_ID]: decodedAccessToken[constants.USER_ID],
        serverId: SERVER_ID,
        imageURL: imageURL,
        userOrg: userOrg
    };
    req.session.regenerate((err) => {
        if (err) {
            logger.error('Session regeneration failed', { 
                error: err.message, 
                stack: err.stack,
                operation: 'sessionRegeneration'
            });
            return done(err);
        }
        // Store the new user profile in the session
        req.login(profile, (err) => {
            if (err) {
                logger.error('Login failed after session regeneration', { 
                    error: err.message, 
                    stack: err.stack,
                    operation: 'loginAfterSessionRegen'
                });
                return done(err);
            }
            return done(null, profile);
        });
    });

    logger.debug('Returning profile', { userId: profile.sub, organization: userOrg });

    //return done(null, profile);
});

strategy.authorizationParams = function (options) {
    const params = {};
    if (options.prompt) {
        params.prompt = options.prompt;
    }
    if (options.fidp) {
        params.fidp = options.fidp;
    }
    if (options.username) {
        params.username = options.username;
    }
    return params;
};

passport.use(strategy);
} // end if (config.identityProvider?.clientId)

// Serialize user into the session
passport.serializeUser((user, done) => {
    logger.debug('Serializing user', { userId: user.sub });
    const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageURL: user.imageURL,
        view: user.view,
        idToken: user.idToken,
        [constants.ROLES.ORGANIZATION_CLAIM]: user[constants.ROLES.ORGANIZATION_CLAIM],
        'returnTo': user.returnTo,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        'exchangeToken': user.exchangeToken,
        'authorizedOrgs': user.authorizedOrgs,
        [constants.ROLES.ROLE_CLAIM]: user.roles,
        [constants.ROLES.GROUP_CLAIM]: user.groups,
        'isAdmin': user.isAdmin,
        'isSuperAdmin': user.isSuperAdmin,
        [constants.USER_ID]: user[constants.USER_ID],
        'userOrg': user.userOrg,
        'isLocalAuth': user.isLocalAuth || false,
    };
    lock.acquire('serialize', (release) => {
        release(null, profile);
    }, (err, ret) => {
        if (err) {
            return done(err);
        }
        done(null, ret);
    });
    //done(null, user);
});

// Deserialize user from the session
passport.deserializeUser(async (sessionData, done) => {
    //return done(null, sessionData);
    lock.acquire('deserialize', async (release) => {
        try {
            release(null, sessionData);
        } catch (err) {
            release(err);
        }
    }, (err, ret) => {
        if (err) {
            return done(err);
        }
        done(null, ret);
    });
});

// passport.deserializeUser((obj, done) => {
//     done(null, obj)
// });

app.use(constants.ROUTE.TECHNICAL_STYLES, express.static(path.join(require.main.filename, '../styles')));
app.use(constants.ROUTE.TECHNICAL_SCRIPTS, express.static(path.join(require.main.filename, '../scripts')));

// Redirect unrecognised root-level paths (e.g. /robots.txt, /sitemap.xml) before
// the /:orgName route can treat them as org IDs.
app.use((req, res, next) => {
    const segments = req.path.split('/').filter(Boolean);
    if (segments.length === 1 && segments[0].includes('.')) {
        return res.redirect('/');
    }
    next();
});

//backend routes
app.use(constants.ROUTE.DEV_PORTAL, devportalRoute);

// MCP Server Registry (OpenAPI v0.1)
app.use('/registry/:orgHandle', mcpRegistryRoute);
app.use('/:orgHandle/registry', mcpRegistryRoute);

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
    app.use(constants.ROUTE.DEFAULT, settingsRoute);
    app.use(constants.ROUTE.DEFAULT, apiFlowsRoute);
    app.use(constants.ROUTE.DEFAULT, subscriptionsContent);
    app.use(constants.ROUTE.DEFAULT, customContent);
}


app.use((req, res) => {
    res.redirect('/');
});

app.use( (err, req, res, next) => {
    Handlebars.registerPartial('header', '');
    Handlebars.registerPartial('sidebar', '');
    logger.error('Application error', { 
        error: err.message, 
        stack: err.stack,
        url: req.url,
        method: req.method,
        operation: 'expressErrorHandler'
    });
    let templateContent = {
        devportalMode: 'DEFAULT',
        baseUrl: '/' + req.originalUrl?.split('/')[1] + '/' + constants.ROUTE.VIEWS_PATH + "default",
        errorMessage: "Oops! Something went wrong",
        profile: typeof req.isAuthenticated === 'function' && req.isAuthenticated() ? req.user : null,
    }
    let html = "";
    if (err.status === 401) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Logout failed");
            }
        });
        templateContent.errorMessage = constants.ERROR_MESSAGE.COMMON_AUTH_ERROR_MESSAGE;
        html = util.renderTemplate('../pages/error-page/page.hbs', 'src/pages/error-layout/main.hbs', templateContent, true);
    } else {
        html = util.renderTemplate('../pages/error-page/page.hbs', 'src/pages/error-layout/main.hbs', templateContent, true);
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
        logger.error('Error setting up HTTPS server', { 
            error: err.message, 
            stack: err.stack,
            operation: 'httpsServerSetup'
        });
    }
}

const logStartupInfo = () => {
    logger.info(`Developer Portal V2 is running on port ${PORT}`);
    logger.info(`Mode: ${config.mode}`);

    if (config.mode === constants.DEV_MODE) {
        logger.info('⚠️  Since you are in DEV mode, ensure default content is available at configured pathToContent ' + 
            'and mock folder must exist in root directory');
    }

    const visitUrl = config.baseUrl + (config.mode === constants.DEV_MODE ? "/views/default" : "/<organization>/views/default");
    logger.info(`Visit ${visitUrl}`);
    
    // Start SDK cleanup scheduler
    try {
        sdkJobService.startSDKCleanupScheduler();
        logger.info('SDK cleanup scheduler started successfully');
    } catch (error) {
        logger.warn('Could not start SDK cleanup scheduler', { 
            error: error.message, 
            stack: error.stack 
        });
    }
};

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception - Application will exit', { 
        error: err.message, 
        stack: err.stack,
        type: 'uncaughtException'
    });
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection - Application will exit', { 
        reason: reason?.message || reason, 
        promise: promise?.toString(),
        type: 'unhandledRejection'
    });
});

// Graceful shutdown handlers
const gracefulShutdown = (signal) => {
    logger.info('Graceful shutdown initiated...', { 
        signal,
        message: `Received ${signal}. Gracefully shutting down...`
    });
    
    // Stop SDK cleanup scheduler
    try {
        sdkJobService.stopSDKCleanupScheduler();
        logger.info('SDK cleanup scheduler stopped successfully');
    } catch (error) {
        logger.warn('Error stopping SDK cleanup scheduler', { 
            error: error.message, 
            stack: error.stack 
        });
    }
    
    logger.info('Application shutdown complete');
    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
