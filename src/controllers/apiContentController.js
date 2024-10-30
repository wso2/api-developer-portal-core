const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, loadMarkdown } = require('../utils/util');
const config = require('../config/config');
const markdown = require('marked');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');


filePrefix = '../../../../src/'
const generateArray = (length) => Array.from({ length });

const loadAPIs = async (req, res) => {

    const orgName = req.params.orgName;
    let metaData = await loadAPIMetaDataList(orgName);
    let html;
    let templateContent = {
        apiMetadata: metaData,
        baseUrl: '/'+ orgName
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
    const apiName = req.params.apiName;
    const metaData = await loadAPIMetaData(orgName, apiName);
    const apiContentUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;

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
            schemaUrl: config.apiMetaDataAPI + "apiDefinition?orgName=" + orgName + "&apiID=" + req.params.apiName
        }
        html = await renderTemplateFromAPI(templateContent, orgName, "api-landing");
    }
    res.send(html);
}

const loadTryOutPage = async (req, res) => {

    let orgName = req.params.orgName;
    const apiName = req.params.apiName;
    const metaData = await loadAPIMetaData(orgName, apiName);
    let html = "";
    const apiDefinition = config.apiMetaDataAPI + "apiDefinition?orgName=" + orgName + "&apiID=" + req.params.apiName
    const apiDefinitionResponse = await fetch(apiDefinition);
    const apiDefinitionContent = await apiDefinitionResponse.text();
    let templateContent = {
        apiMetadata: metaData,
        baseUrl: req.params.orgName,
        apiType: metaData.apiInfo.apiType,
        swagger: apiDefinitionContent
    }
    if (config.mode == 'single') {

        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent);

    } else if (config.mode == 'development') {
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {

        const completeTemplatePath = path.join(__dirname, '..', 'pages', 'tryout', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8');
        const layoutResponse = await loadLayoutFromAPI(orgName)
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);

    }
    res.send(html);
}

async function loadAPIMetaDataList(orgName) {

    let metaData = {};
    const apiMetaDataUrl = config.apiMetaDataAPI + "apiList?orgName=" + orgName;
    const metadataResponse = await fetch(apiMetaDataUrl);
    metaData = await metadataResponse.json();
    metaData.forEach(item => {
        item.baseUrl = '/' + orgName;
    });
    metaData.forEach(element => {
        let randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
        const images = element.apiInfo.apiArtifacts.apiImages;
        let apiImageUrl = '';
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
    return metaData;
}

async function loadAPIMetaData(orgName, apiName) {

    let metaData = {};
    if (config.mode == 'development') {
        const mockAPIDataPath = path.join(__dirname, filePrefix + '../mock', apiName + '/apiMetadata.json');
        const mockAPIData = JSON.parse(fs.readFileSync(mockAPIDataPath, 'utf-8'));
        metaData = mockAPIData;
    } else {
        const apiMetaDataUrl = config.apiMetaDataAPI + "api?orgName=" + orgName + "&apiID=" + apiName;
        const metadataResponse = await fetch(apiMetaDataUrl);
        metaData = await metadataResponse.json();

        //replace image urls
        const images = metaData.apiInfo.apiArtifacts.apiImages;
        for (var key in images) {
            let apiImageUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;
            const modifiedApiImageURL = apiImageUrl + "&fileName=" + images[key]
            images[key] = modifiedApiImageURL;
        }
    }
    return metaData;
}


module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage
};
