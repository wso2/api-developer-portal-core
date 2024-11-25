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
const authRoute = require('./routes/authRoute');
const devportalRoute = require('./routes/devportalRoute');
const orgContent = require('./routes/orgContentRoute');
const apiContent = require('./routes/apiContentRoute');
const applicationContent = require('./routes/applicationsContentRoute');
const customContent = require('./routes/customPageRoute');
const config = require(process.cwd() + '/config.json');
const Handlebars = require('handlebars');
const constants = require("./utils/constants");
const designRoute = require('./routes/designModeRoute');

const app = express();
const secret = crypto.randomBytes(64).toString('hex');
const filePrefix = config.pathToContent;

app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

Handlebars.registerHelper('eq', function (a, b) {
    return (a === b);
});

Handlebars.registerHelper('in', function (value, options) {
    const validValues = options.hash.values.split(',');
    return validValues.includes(value) ? options.fn(this) : options.inverse(this);
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
    app.use(constants.ROUTE.DEFAULT, customContent);  
}

app.listen(config.port);
