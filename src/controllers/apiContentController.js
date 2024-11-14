const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, loadMarkdown } = require('../utils/util');
const config = require(process.cwd() + '/config');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const apiMetadataService = require('../services/apiMetadataService');

const filePrefix = config.pathToContent;
const generateArray = (length) => Array.from({ length });

const loadAPIs = async (req, res) => {

    const orgName = req.params.orgName;
    let html;
    if (config.mode === constants.DEV_MODE) {
        let metaData = await loadAPIMetaDataList()
        let templateContent = {
            apiMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate(filePrefix + 'pages/apis/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        let organization = await adminDao.getOrganization(orgName);
        (orgName);
        let metaData = await loadAPIMetaDataListFromAPI(organization.ORG_ID, orgName);
        let templateContent = {
            apiMetadata: metaData,
            baseUrl: '/' + orgName
        }
        html = await renderTemplateFromAPI(templateContent, orgName, "pages/apis");
    }
    res.send(html);
}

const loadAPIContent = async (req, res) => {

    let html;
    const hbs = exphbs.create({});
    const orgName = req.params.orgName;
    const apiName = req.params.apiName;

    if (config.mode === constants.DEV_MODE) {
        let metaData = loadAPIMetaDataFromFile(apiName)
        const filePath = path.join(process.cwd(), filePrefix + '../mock', req.params.apiName + "/" + constants.API_HBS_CONTENT_FILE_NAME);
        if (fs.existsSync(filePath)) {
            hbs.handlebars.registerPartial('api-content', fs.readFileSync(filePath, constants.CHARSET_UTF8));
        }
        let templateContent = {
            apiContent: await loadMarkdown(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, filePrefix + '../mock/' + req.params.apiName),
            apiMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port,
            schemaUrl: orgName + '/mock/' + apiName + '/apiDefinition.xml'
        }
        html = renderTemplate(filePrefix + 'pages/api-landing/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    } else {
        let organization = await adminDao.getOrganization(orgName);
        let orgID = organization.ORG_ID;
        let apiID = await apiDao.getAPIId(apiName);
        let metaData = await loadAPIMetaData(orgID, apiID);

        let templateContent = {
            apiMetadata: metaData,
            baseUrl: '/' + orgName,
            schemaUrl: config.apiMetaDataAPI + orgID + "/apis/" + apiID
        }
        html = await renderTemplateFromAPI(templateContent, orgName, "pages/api-landing");
        console.log(html);
    }
    res.send(html);
}

const loadTryOutPage = async (req, res) => {

    let orgName = req.params.orgName;
    let apiName = req.params.apiName;
    let html = "";
    if (config.mode === constants.DEV_MODE) {
        const metaData = loadAPIMetaDataFromFile(apiName)
        let apiDefinition = path.join(process.cwd(), filePrefix + '../mock', req.params.apiName + '/apiDefinition.json');
        if (fs.existsSync(apiDefinition)) {
            apiDefinition = await fs.readFileSync(apiDefinition, 'utf-8');
        }
        let templateContent = {
            apiMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port,
            apiType: metaData.apiInfo.apiType,
            swagger: apiDefinition
        }
        html = renderTemplate('../pages/tryout/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        let organization = await adminDao.getOrganization(orgName);
        let orgID = organization.ORG_ID;
        let apiID = await apiDao.getAPIId(apiName);
        const metaData = await loadAPIMetaData(orgID, apiID);
        let apiDefinition = await apiDao.getAPIFile(constants.FILE_NAME.API_DEFINITION_FILE_NAME, orgID, apiID)
        apiDefinition = apiDefinition.API_FILE.toString(constants.CHARSET_UTF8)
        let templateContent = {
            apiMetadata: metaData,
            baseUrl: req.params.orgName,
            apiType: metaData.apiInfo.apiType,
            swagger: apiDefinition
        }
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'tryout', 'page.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8');
        const layoutResponse = await loadLayoutFromAPI(orgName)
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }
    res.send(html);
}

async function loadAPIMetaDataList() {

    const mockAPIMetaDataPath = path.join(process.cwd(), filePrefix + '../mock', 'apiMetadata.json');
    const mockAPIMetaData = JSON.parse(fs.readFileSync(mockAPIMetaDataPath, 'utf-8'));
    mockAPIMetaData.forEach(element => {
        let randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
    });
    return mockAPIMetaData;
}



async function loadAPIMetaDataListFromAPI(orgID, orgName) {

    let metaData = await apiMetadataService.getMetadataListFromDB(orgID);
    metaData.forEach(item => {
        item.baseUrl = '/' + orgName;
    });
    metaData.forEach(element => {
        console.log(element.apiInfo)
        let randomNumber = Math.floor(Math.random() * 3) + 3;
        element.apiInfo.ratings = generateArray(randomNumber);
        element.apiInfo.ratingsNoFill = generateArray(5 - randomNumber);
        const images = element.apiInfo.apiImageMetadata;
        let apiImageUrl = '';
        for (var key in images) {
            apiImageUrl = config.apiMetaDataAPI + orgID + constants.ROUTE.API_FILE_PATH + element.apiID + constants.API_TEMPLATE_FILE_NAME
            const modifiedApiImageURL = apiImageUrl + images[key]
            element.apiInfo.apiImageMetadata[key] = modifiedApiImageURL
        }
    });
    let data = JSON.stringify(metaData);
    return JSON.parse(data);
}

async function loadAPIMetaData(orgID, apiID) {

    let metaData = {};
    metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID);
    let data = metaData ? JSON.stringify(metaData) : {};
    metaData  = JSON.parse(data)
    //replace image urls
    let images = metaData.apiInfo.apiImageMetadata;
    for (var key in images) {
        let apiImageUrl = config.apiMetaDataAPI + orgID + constants.ROUTE.API_FILE_PATH + apiID + constants.API_TEMPLATE_FILE_NAME
        const modifiedApiImageURL = apiImageUrl + images[key]
        images[key] = modifiedApiImageURL;
    }
    return metaData;
}

function loadAPIMetaDataFromFile(apiName) {

    const mockAPIDataPath = path.join(process.cwd(), filePrefix + '../mock', apiName + '/apiMetadata.json');
    return JSON.parse(fs.readFileSync(mockAPIDataPath, 'utf-8'));
}


module.exports = {
    loadAPIs,
    loadAPIContent,
    loadTryOutPage,
};
