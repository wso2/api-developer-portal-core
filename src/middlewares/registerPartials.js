const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const config = require('../config/config');
const markdown = require('marked');
const orgDao = require('../dao/organization');
const apiDao = require('../dao/apiMetadata');

let filePrefix = '../../../../src/';

const registerPartials = async (req, res, next) => {

    const orgName = req.originalUrl.split("/")[1];
    let baseURL = "/" + orgName;
    let filePath = req.originalUrl.split("/" + orgName).pop();
    if (config.mode == 'development') {
        filePath = req.originalUrl.split(baseURL).pop();
    }
    if (config.mode == 'development') {
        registerPartialsFromFile(baseURL, path.join(__dirname, filePrefix, 'partials'), req.user);
        registerPartialsFromFile(baseURL, path.join(__dirname, filePrefix, 'pages', 'home', 'partials'), req.user);
        registerPartialsFromFile(baseURL, path.join(__dirname, filePrefix, 'pages', 'api-landing', 'partials'), req.user);
        registerPartialsFromFile(baseURL, path.join(__dirname, filePrefix, 'pages', 'apis', 'partials'), req.user);
        if (fs.existsSync(path.join(__dirname, filePrefix + 'pages', filePath, 'partials'))) {
            registerPartialsFromFile(baseURL, path.join(__dirname, filePrefix + 'pages', filePath, 'partials'), req.user);
        }
    } else {
        await registerPartialsFromAPI(req)
    }
    next()
}

const registerPartialsFromAPI = async (req) => {


    const orgName = req.params.orgName;
    let organization = await orgDao.getOrgID(orgName);
    let orgID = organization.ORG_ID;
    let apiID = ''
    const apiName = req.params.apiName;
    if (apiName) {
        apiID = await apiDao.getAPIId(apiName);
    }
    const url = config.adminAPI + "orgFileType?orgName=" + orgName + "&fileType=partials";
    const imageUrl = config.adminAPI + "orgFiles?orgName=" + orgName;
    const apiContetnUrl = config.apiMetaDataAPI + orgID + "/apis/" + apiID + "/template?fileName=";

    //attach partials
    const partialsResponse = await fetch(url);
    let partials = await partialsResponse.json();
    let partialObject = {}
    partials.forEach(file => {
        let fileName = file.pageName.split(".")[0];
        let content = file.pageContent;
        content = content.replaceAll("/images/", imageUrl + "&fileName=")
        partialObject[fileName] = content;
    });
    const hbs = exphbs.create({});
    hbs.handlebars.partials = partialObject;

    Object.keys(partialObject).forEach(partialName => {
        hbs.handlebars.registerPartial(partialName, partialObject[partialName]);
    });

    hbs.handlebars.partials = {
        ...hbs.handlebars.partials,
        header: hbs.handlebars.compile(partialObject['header'])({ baseUrl: '/' + orgName, profile: req.user }),
        "hero": hbs.handlebars.compile(partialObject['hero'])({ baseUrl: '/' + orgName })
    };
    if (req.originalUrl.includes("/api/")) {
        //fetch markdown content for API if exists
        let markdownResponse = await apiDao.getAPIFile("apiContent.md", orgID, apiID);
        let markdownContent = markdownResponse.API_FILE.toString('utf8');
        const markdownHtml = markdownContent ? markdown.parse(markdownContent) : '';
     
        //if hbs content available for API, render the hbs page
        let additionalAPIContentResponse = await apiDao.getAPIFile("api-content.hbs", orgID, apiID);
        let additionalAPIContent = additionalAPIContentResponse.API_FILE.toString('utf8');
        partialObject["api-content"] = additionalAPIContent ? additionalAPIContent : '';
        hbs.handlebars.partials["api-content"] = hbs.handlebars.compile(partialObject['api-content'])({ content: markdownHtml });
    }
}

function registerPartialsFromFile(baseURL, dir, profile) {

    const hbs = exphbs.create({});
    const filenames = fs.readdirSync(dir);
    filenames.forEach((filename) => {
        if (filename.endsWith('.hbs')) {
            let template = fs.readFileSync(path.join(dir, filename), 'utf8');
            hbs.handlebars.registerPartial(filename.split(".hbs")[0], template);
            if (filename == "header.hbs") {
                hbs.handlebars.partials = {
                    ...hbs.handlebars.partials,
                    header: hbs.handlebars.compile(template)({ baseUrl: baseURL, profile: profile }),
                };
            }
        }
    });
};

module.exports = registerPartials;
