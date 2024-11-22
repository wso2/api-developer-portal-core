/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const { renderTemplate, renderTemplateFromAPI } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminDao = require('../dao/admin');

const filePrefix = config.pathToContent;

const loadOrganizationContent = async (req, res) => {

    let html = "";
    if (config.mode === constants.DEV_MODE) {
        html = await loadOrgContentFromFile(req, res);
    } else {
        html = await loadOrgContentFromAPI(req, res);
    }
    res.send(html);
}

const loadOrgContentFromFile = async () => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(process.cwd(), filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, constants.CHARSET_UTF8));
    const templateContent = {
        userProfiles: mockProfileData,
        baseUrl: constants.BASE_URL + config.port
    };
    return renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
}

const loadOrgContentFromAPI = async (req) => {

    let html;
    try {
        const organization = await adminDao.getOrganization(orgName);
        html = await renderTemplateFromAPI({}, organization.ORG_ID, req.params.orgName, 'pages/home');
    } catch (error) {
        console.error(`Failed to load organization :, ${error}`);
        console.log(`Rendering default organization landing page from file`);
        let templateContent = {
            baseUrl: '/' + orgName
        };
        html = await renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    }
    return html;
}

module.exports = {
    loadOrgContentFromFile,
    loadOrgContentFromAPI,
    loadOrganizationContent
};
