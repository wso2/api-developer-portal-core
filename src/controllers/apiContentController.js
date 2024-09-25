const Handlebars = require('handlebars');
const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI } = require('../utils/util');
const config = require('../config/config');
const markdown = require('marked');
const exphbs = require('express-handlebars');


filePrefix = '../../../../src/'
const generateArray = (length) => Array.from({ length });

const loadAPIs = async (req, res) => {

    const orgName = req.params.orgName;
    var metaData = await loadAPIMetaDataList(orgName);
    var html;
    if (config.mode == 'single') {
        var templateContent = {
            apiMetadata: metaData,
            baseUrl: orgName
        }
        html = renderTemplate(filePrefix + 'pages/apis/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        var templateContent = {
            apiMetadata: metaData,
            baseUrl: req.params.orgName,
        }
        html = renderTemplateFromAPI(templateContent, orgName, "apis");
    }
    res.send(html);
}

const loadAPIContent = async (req, res) => {

    var html;
    const hbs = exphbs.create({});
    const orgName = req.params.orgName;
    const apiName = req.params.apiName;
    const metaData = await loadAPIMetaData(orgName, apiName);
    const apiContetnUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;

    if (config.mode == 'single') {
        const markdownResponse = await fetch(apiContetnUrl + "&fileName=apiContent.md");
        const markdownContent = await markdownResponse.text();
        const markdownHtml = markdownContent ? markdown.parse(markdownContent) : '';

        const additionalAPIContentResponse = await fetch(apiContetnUrl + "&fileName=api-content.hbs");
        const additionalAPIContent = await additionalAPIContentResponse.text();

        if (additionalAPIContent != "File not found") {
            template = additionalAPIContent;
            hbs.handlebars.registerPartial("api-content", template);
        }

        if (additionalAPIContent != "File not found") {
            template = additionalAPIContent;
            hbs.handlebars.registerPartial("api-content", template);
        }
        var templateContent = {
            content: markdownHtml,
            apiMetadata: metaData,
            baseUrl: '/' + req.params.orgName,
            schemaUrl: config.apiMetaDataAPI + "apiDefinition?orgName=" + orgName + "&apiID=" + apiName
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    } else {
        var templateContent = {
            apiMetadata: metaData,
            baseUrl: '/' + req.params.orgName,
            schemaUrl: config.apiMetaDataAPI + "apiDefinition?orgName=" + orgName + "&apiID=" + req.params.apiName
        }
        html = renderTemplateFromAPI(templateContent, orgName, "api-landing");
    }
    res.send(html);
}

const loadTryOutPage = async (req, res) => {

    const apiMetaDataUrl = config.apiMetaDataAPI + "api?orgName=" + req.params.orgName + "&apiID=" + req.params.apiName;
    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();
    var html = "";

    const apiDefinition = config.apiMetaDataAPI + "apiDefinition?orgName=" + req.params.orgName + "&apiID=" + req.params.apiName
    const apiDefinitionResponse = await fetch(apiDefinition);
    const apiDefinitionContent = await apiDefinitionResponse.text();
    var templateContent = {
        apiMetadata: metaData,
        baseUrl: req.params.orgName,
        apiType: metaData.apiInfo.apiType,
        swagger: apiDefinitionContent
    }
    if (config.mode == 'single') {
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        const completeTemplatePath = path.join(__dirname, 'pages', 'tryout', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8');
        const layoutResponse = await loadLayoutFromAPI(orgName)
        html = renderGivenTemplate(templateResponse, layoutResponse, templateContent);

    }
    res.send(html);
}

async function loadAPIMetaDataList(orgName) {

    const apiMetaDataUrl = config.apiMetaDataAPI + "apiList?orgName=" + orgName;
    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();

    metaData.forEach(item => {
        item.baseUrl = '/' + orgName;
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

    return metaData;
}

async function loadAPIMetaData(orgName, apiName) {

    const apiMetaDataUrl = config.apiMetaDataAPI + "api?orgName=" + orgName + "&apiID=" + apiName;
    const metadataResponse = await fetch(apiMetaDataUrl);
    const metaData = await metadataResponse.json();

    //replace image urls
    const images = metaData.apiInfo.apiArtifacts.apiImages;
    for (var key in images) {
        var apiImageUrl = config.apiMetaDataAPI + "apiFiles?orgName=" + orgName + "&apiID=" + apiName;
        const modifiedApiImageURL = apiImageUrl + "&fileName=" + images[key]
        images[key] = modifiedApiImageURL;
    }
    return metaData;

}


module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage
};
