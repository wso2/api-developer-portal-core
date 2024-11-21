const { renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config');
const constants = require('../utils/constants');
const path = require('path');
// const adminDao = require('../dao/admin');
const fs = require('fs');

const filePrefix = config.pathToContent;

const loadApplications = async (req, res) => {

    // const orgName = req.params.orgName;
    let html;
    if (config.mode === constants.DEV_MODE) {
        let metaData = await loadApplicationsMetaDataList()
        let templateContent = {
            applicationsMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate(filePrefix + 'pages/applications/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        // let organization = await adminDao.getOrganization(orgName);
        // let metaData = await loadAPIMetaDataListFromAPI(organization.ORG_ID, orgName);
        // let templateContent = {
        //     apiMetadata: metaData,
        //     baseUrl: '/' + orgName
        // }
        // html = await renderTemplateFromAPI(templateContent, orgName, "pages/apis");
    }
    res.send(html);
}

async function loadApplicationsMetaDataList() {
    const mockApplicationsMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'applications.json');
    const mockApplicationsMetaData = JSON.parse(fs.readFileSync(mockApplicationsMetaDataPath, 'utf-8'));
    return mockApplicationsMetaData.list;
}

const loadApplication = async (req, res) => {

    // const orgName = req.params.orgName;
    let html;
    if (config.mode === constants.DEV_MODE) {
        let metaData = await loadApplicationMetaData()
        let templateContent = {
            applicationMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate(filePrefix + 'pages/applications/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        // let organization = await adminDao.getOrganization(orgName);
        // let metaData = await loadAPIMetaDataListFromAPI(organization.ORG_ID, orgName);
        // let templateContent = {
        //     apiMetadata: metaData,
        //     baseUrl: '/' + orgName
        // }
        // html = await renderTemplateFromAPI(templateContent, orgName, "pages/apis");
    }
    res.send(html);
}

async function loadApplicationMetaData() {
    const mockApplicationMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'DefaultApplication.json');
    const mockApplicationMetaData = JSON.parse(fs.readFileSync(mockApplicationMetaDataPath, 'utf-8'));
    return mockApplicationMetaData;
}

module.exports = {
    loadApplications,
    loadApplication
};