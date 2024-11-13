const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, loadMarkdown } = require('../utils/util');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const orgDao = require('../dao/organization');
const apiDao = require('../dao/apiMetadata');
const apiMetadataService = require('../services/apiMetadataService');


const filePrefix = '../../../../src/'
const generateArray = (length) => Array.from({ length });

const loadAPIs = async (req, res) => {

    const orgName = req.params.orgName;
    let organization = await orgDao.getOrgID(orgName);
    let metaData = await loadAPIMetaDataList(organization.ORG_ID, orgName);
    let html;
    let templateContent = {
        apiMetadata: metaData,
        baseUrl: '/' + orgName
    }
    if (config.mode == 'development') {
        html = renderTemplate(filePrefix + 'pages/apis/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        html = await renderTemplateFromAPI(templateContent, orgName, "apis");
    }
    res.send(html);
}

const loadAPIContent = async (req, res) => {

    let html;
    const hbs = exphbs.create({});
    const orgName = req.params.orgName;
    let organization = await orgDao.getOrgID(orgName);
    console.log("organization");
    console.log(organization);
    let orgID = organization.ORG_ID;
    const apiName = req.params.apiName;
    let apiID = await apiDao.getAPIId(apiName);
    const metaData = await loadAPIMetaData(orgID, apiID);

    if (config.mode == 'development') {
        const filePath = path.join(__dirname, filePrefix + '../mock', req.params.apiName + '/api-content.hbs');
        if (fs.existsSync(filePath)) {
            hbs.handlebars.registerPartial('api-content', fs.readFileSync(filePath, 'utf-8'));
        }
        let templateContent = {
            content: loadMarkdown('apiContent.md', filePrefix + '../mock/' + req.params.apiName),
            apiMetadata: metaData,
            baseUrl: '/' + orgName,
            schemaUrl: orgName + '/mock/' + apiName + '/apiDefinition.xml'
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    } else {
        let templateContent = {
            apiMetadata: metaData,
            baseUrl: '/' + orgName,
            schemaUrl: config.apiMetaDataAPI + orgID + "/apis/" + apiID 
        }
        html = await renderTemplateFromAPI(templateContent, orgName, "api-landing");
    }
    res.send(html);
}

const loadTryOutPage = async (req, res) => {

    let orgName = req.params.orgName;
    let organization = await orgDao.getOrgID(orgName);
    let orgID = organization.ORG_ID;
    const apiName = req.params.apiName;
    let apiID = await apiDao.getAPIId(apiName);
    const metaData = await loadAPIMetaData(orgID, apiID);
    let html = "";
    let apiDefinition = await apiDao.getAPIFile("apiDefinition.json", orgID, apiID)
    apiDefinition = apiDefinition.API_FILE.toString('utf8')
    let templateContent = {
        apiMetadata: metaData,
        baseUrl: req.params.orgName,
        apiType: metaData.apiInfo.apiType,
        swagger: apiDefinition
    }
    if (config.mode == 'development') {
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        const completeTemplatePath = path.join(__dirname, '..', 'pages', 'tryout', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8');
        const layoutResponse = await loadLayoutFromAPI(orgName)
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }
    res.send(html);
}

async function loadAPIMetaDataList(orgID, orgName) {

    let metaData = {};
    metaData =  await apiMetadataService.getMetadataListFromDB(orgID);
    metaData.forEach(item => {
        item.baseUrl = '/' + orgName;
    });
    metaData.forEach(element => {
        let randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
        const images = element.apiInfo.apiImageMetadata;
        let apiImageUrl = '';
        for (var key in images) {
            apiImageUrl = config.apiMetaDataAPI + orgID + "/apis/" + element.apiID + "/template?fileName="
            const modifiedApiImageURL = apiImageUrl + images[key]
            element.apiInfo.apiImageMetadata[key] = modifiedApiImageURL;
        }
    });
    return metaData;
}

async function loadAPIMetaData(orgID, apiID) {

    let metaData = {};
    metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID);

    //replace image urls
    let images = metaData ? metaData.apiInfo.apiImageMetadata : {};
    for (var key in images) {
        let apiImageUrl = config.apiMetaDataAPI + orgID + "/apis/" + apiID + "/template?fileName="
        const modifiedApiImageURL = apiImageUrl + images[key]
        images[key] = modifiedApiImageURL;
    }
    return metaData;
}


module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage
};
