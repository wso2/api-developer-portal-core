const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const markdown = require('marked');
const fs = require('fs');
const Handlebars = require('handlebars');
var config = require('../config');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const minimatch = require('minimatch');
const crypto = require('crypto');
const { copyStyelSheetMulti } = require('./util/util');
const jwt = require('jsonwebtoken');

const secret = crypto.randomBytes(64).toString('hex');
const app = express();

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.use(express.static(path.join(__dirname, '../public')));
const router = express.Router();

Handlebars.registerHelper('eq', function (a, b) {
    return (a == b);
});

Handlebars.registerHelper('in', function (value, options) {
    const validValues = options.hash.values.split(',');
    return validValues.includes(value) ? options.fn(this) : options.inverse(this);
});

const generateArray = (length) => Array.from({ length });

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

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

copyStyelSheetMulti('../../../../src/');
app.use('/styles', express.static(path.join(__dirname, '/../../../src/' + '/styles')));
const folderToDelete = path.join(__dirname, '/../../../src/' + '/styles');

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

// Route to start the authentication process
app.get('/((?!favicon.ico)):orgName/login', async (req, res, next) => {
    const authJsonResponse = await fetch(config.adminAPI + "identityProvider?orgName=" + req.params.orgName);
    var authJsonContent = await authJsonResponse.json();

    if (authJsonContent.length > 0) {
        passport.use(new OAuth2Strategy({
            issuer: authJsonContent[0].issuer,
            authorizationURL: authJsonContent[0].authorizationURL,
            tokenURL: authJsonContent[0].tokenURL,
            userInfoURL: authJsonContent[0].userInfoURL,
            clientID: authJsonContent[0].clientId,
            callbackURL: authJsonContent[0].callbackURL,
            scope: authJsonContent[0].scope ? authJsonContent[0].scope.split(" ") : "",
        }, (accessToken, refreshToken, profile, done) => {
            // Here you can handle the user's profile and tokens
            profile = {
                'name': jwt.decode(params.id_token)['given_name'],
                'idToken': params.id_token,
                'email': decodedJWT['email']
            };
            return done(null, profile);
        }));
        next();
    } else {
        res.status(400).send("No Identity Provider information found for the organization");
    }
}, passport.authenticate('oauth2'));

// Route for the callback
app.get('/((?!favicon.ico)):orgName/callback', (req, res, next) => {
    next();
}, passport.authenticate('oauth2', {
    failureRedirect: '/login',
    keepSessionInfo: true
}), (req, res) => {
    const returnTo = req.session.returnTo || '/' + req.params.orgName;
    // Clear the returnTo variable from the session
    delete req.session.returnTo;
    res.redirect(returnTo);
});

// Middleware to check authentication
const ensureAuthenticated = async (req, res, next) => {

    const orgDetailsResponse = await fetch(config.adminAPI + "organisation?orgName=" + req.params.orgName);
    var orgDetails = await orgDetailsResponse.json();


    if ((req.originalUrl != '/favicon.ico' | req.originalUrl != '/images') && orgDetails.authenticatedPages != null
        && orgDetails.authenticatedPages.some(pattern => minimatch.minimatch(req.originalUrl, pattern))) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.session.returnTo = req.originalUrl || '/' + req.params.orgName;
            res.redirect("/" + req.params.orgName + '/login');
        }
    } else {
        return next();
    };

};

// Middleware to load partials from the database
app.use(/\/((?!favicon.ico|images).*)/, async (req, res, next) => {

    if (!req.hostname.match("localhost")) {
        config.adminAPI = process.env.AdminURL;
        config.apiMetaDataAPI = process.env.APIMetaDataURL;
    }
    const orgName = req.originalUrl.split("/")[1];

    const apiName = req.originalUrl.split("/").pop();
    const url = config.adminAPI + "orgFileType?orgName=" + orgName + "&fileType=partials";
    const apiContetnUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;
    const imageUrl = config.adminAPI + "orgFiles?orgName=" + orgName;
    //attach partials
    const partialsResponse = await fetch(url);
    var partials = await partialsResponse.json();
    var partialObject = {}
    partials.forEach(file => {
        var fileName = file.pageName.split(".")[0];
        var content = file.pageContent;
        content = content.replaceAll("/images/", imageUrl + "&fileName=")
        partialObject[fileName] = content;
    });


    const markdownResponse = await fetch(apiContetnUrl + "&fileName=apiContent.md");
    const markdownContent = await markdownResponse.text();
    const markdownHtml = markdownContent ? markdown.parse(markdownContent) : '';

    const additionalAPIContentResponse = await fetch(apiContetnUrl + "&fileName=api-content.hbs");
    const additionalAPIContent = await additionalAPIContentResponse.text();
    partialObject["api-content"] = additionalAPIContent;

    const hbs = exphbs.create({});
    hbs.handlebars.partials = partialObject;

    Object.keys(partialObject).forEach(partialName => {
        hbs.handlebars.registerPartial(partialName, partialObject[partialName]);
    });

    hbs.handlebars.partials = {
        ...hbs.handlebars.partials,
        header: hbs.handlebars.compile(partialObject['header'])({ baseUrl: '/' + req.originalUrl.split("/")[1], profile: profile }),
        "api-content": hbs.handlebars.compile(partialObject['api-content'])({ content: markdownHtml }),
        "hero": hbs.handlebars.compile(partialObject['hero'])({ baseUrl: '/' + req.originalUrl.split("/")[1] })
    };
    next();
});

app.get('/((?!favicon.ico)):orgName/logout', async (req, res) => {
    const authJsonResponse = await fetch(config.adminAPI + "identityProvider?orgName=" + req.params.orgName);
    var authJsonContent = await authJsonResponse.json();

    var idToken = ''
    if (req.user.idToken != null) {
        idToken = req.user.idToken;
    }

    req.session.destroy();
    req.logout(
        () => res.redirect(authJsonContent[0].logoutURL + '?post_logout_redirect_uri=' + authJsonContent[0].logoutRedirectURI + '&id_token_hint=' + idToken)
    );
});

// Route to render Handlebars templates fetched from the database
router.get('/((?!favicon.ico)):orgName', ensureAuthenticated, async (req, res) => {

    if (!req.hostname.match("localhost")) {
        config.adminAPI = process.env.AdminURL;
        config.apiMetaDataAPI = process.env.APIMetaDataURL;
    }
    const orgName = req.params.orgName;
    const url = config.adminAPI + "orgFiles?orgName=" + orgName;
    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;

    try {
        const templateResponse = await fetch(templateURL + "&fileType=template&filePath=home&fileName=page.hbs");
        var templateContent = await templateResponse.text();
        const layoutResponse = await fetch(templateURL + "&fileType=layout&filePath=main&fileName=main.hbs");
        var layoutContent = await layoutResponse.text();

        const template = Handlebars.compile(templateContent.toString());
        const layout = Handlebars.compile(layoutContent.toString());
        const html = layout({
            body: template
        });
        res.send(html);
    } catch (err) {
        console.log(err);
    }
});

router.get('/((?!favicon.ico)):orgName/apis', ensureAuthenticated, async (req, res) => {

    if (!req.hostname.match("localhost")) {
        config.adminAPI = process.env.AdminURL;
        config.apiMetaDataAPI = process.env.APIMetaDataURL;
    }
    const orgName = req.params.orgName;
    const apiMetaDataUrl = config.apiMetaDataAPI + "apiList?orgName=" + orgName;
    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;

    const templateResponse = await fetch(templateURL + "&fileType=template&filePath=apis&fileName=page.hbs");
    var templateContent = await templateResponse.text();

    const layoutResponse = await fetch(templateURL + "&fileType=layout&filePath=main&fileName=main.hbs");
    var layoutContent = await layoutResponse.text();

    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();

    metaData.forEach(item => {
        item.baseUrl = '/' + req.params.orgName;
    });

    metaData.forEach(element => {
        let randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);

        const images = element.apiInfo.apiArtifacts.apiImages;
        var apiImageUrl = '';
        for (var key in images) {
            if (config.env == 'local') {
                apiImageUrl = config.apiImageURL + "apiFiles?orgName=" + element.apiInfo.orgName + "&apiID=" + element.apiInfo.apiName;
            } else {
                apiImageUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + element.apiInfo.orgName + "&apiID=" + element.apiInfo.apiName;
            }
            const modifiedApiImageURL = apiImageUrl + "&fileName=" + images[key]
            element.apiInfo.apiArtifacts.apiImages[key] = modifiedApiImageURL;
        }
    });

    const template = Handlebars.compile(templateContent.toString());
    const layout = Handlebars.compile(layoutContent.toString());

    var html = layout({
        body: template({
            apiMetadata: metaData,
            baseUrl: req.params.orgName,
        }),
    });
    res.send(html);

});

router.get('/((?!favicon.ico)):orgName/api/:apiName', ensureAuthenticated, async (req, res) => {

    const orgName = req.params.orgName;
    const apiName = req.params.apiName;
    const apiMetaDataUrl = config.apiMetaDataAPI + "api?orgName=" + orgName + "&apiID=" + req.params.apiName;
    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;


    const templateResponse = await fetch(templateURL + "&fileType=template&filePath=api-landing&fileName=page.hbs");
    var templateContent = await templateResponse.text();

    const layoutResponse = await fetch(templateURL + "&fileType=layout&filePath=main&fileName=main.hbs");
    var layoutContent = await layoutResponse.text();

    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();

    //replace image urls
    const images = metaData.apiInfo.apiArtifacts.apiImages;

    for (var key in images) {
        var apiImageUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;
        const modifiedApiImageURL = apiImageUrl + "&fileName=" + images[key]
        images[key] = modifiedApiImageURL;
    }
    const template = Handlebars.compile(templateContent.toString());
    const layout = Handlebars.compile(layoutContent.toString());

    var html = layout({
        body: template({
            apiMetadata: metaData,
            baseUrl: '/' + req.params.orgName,
            schemaUrl: config.apiMetaDataAPI + "apiDefinition?orgName=" + orgName + "&apiID=" + req.params.apiName
        }),
    });
    res.send(html);
});

router.get('/((?!favicon.ico)):orgName/api/:apiName/tryout', ensureAuthenticated, async (req, res) => {

    const orgName = req.params.orgName;
    const apiMetaDataUrl = config.apiMetaDataAPI + "api?orgName=" + req.params.orgName + "&apiID=" + req.params.apiName;
    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();

    const apiDefinition = config.apiMetaDataAPI + "apiDefinition?orgName=" + req.params.orgName + "&apiID=" + req.params.apiName
    const apiDefinitionResponse = await fetch(apiDefinition);
    const apiDefinitionContent = await apiDefinitionResponse.text();

    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;

    const layoutResponse = await fetch(templateURL + "&fileType=layout&filePath=main&fileName=main.hbs");
    var layoutContent = await layoutResponse.text();

    const completeTemplatePath = path.join(__dirname, 'pages', 'tryout', 'page.hbs');
    const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8')

    const template = Handlebars.compile(templateResponse.toString());
    const layout = Handlebars.compile(layoutContent.toString());

    var html = layout({
        body: template({
            apiMetadata: metaData,
            baseUrl: req.params.orgName,
            apiType: metaData.apiInfo.apiType,
            swagger: apiDefinitionContent
        }),
    });
    res.send(html);
});

router.get('/((?!favicon.ico|images):orgName/*)', ensureAuthenticated, async (req, res) => {

    if (!req.hostname.match("localhost")) {
        config.adminAPI = process.env.AdminURL;
        config.apiMetaDataAPI = process.env.APIMetaDataURL;
    }
    const orgName = req.params.orgName;
    const filePath = req.originalUrl.split(orgName + "/")[1];

    const url = config.adminAPI + "orgFiles?orgName=" + orgName;
    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName + "&fileType=template&filePath=" + filePath + "&fileName=page.hbs";
    try {
        const templateResponse = await fetch(templateURL);
        var templateContent = await templateResponse.text();
        templateContent = templateContent.replace("/images/", url + "&fileName=");
        const layoutResponse = await fetch(url + "&fileName=main.hbs");
        var layoutContent = await layoutResponse.text();

        var content = {}
        const markdownResponse = await fetch(config.adminAPI + "orgFileType?orgName=" + orgName + "&fileType=markDown&filePath=" + filePath);
        var markDownFiles = await markdownResponse.json();
        if (markDownFiles.length > 0) {
            markDownFiles.forEach((item) => {
                const tempKey = item.pageName.split('.md')[0];
                content[tempKey] = markdown.parse(item.pageContent);
            });
        }
        content["baseUrl"] = "/" + orgName;
        const template = Handlebars.compile(templateContent.toString());
        const layout = Handlebars.compile(layoutContent.toString());
        const html = layout({
            body: template(content),
        });
        res.send(html);
    } catch (err) {
        console.log(err);
    }
});


app.use('/', router);

app.listen(config.port);