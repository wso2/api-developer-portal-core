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
        html = await loadOrgContentFromFile(req, res)
    } else {
        html = await loadOrgContentFromAPI(req, res)
    }
    res.send(html);
}

const loadOrgContentFromFile = async () => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(process.cwd(), filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    let templateContent = {
        userProfiles: mockProfileData,
        baseUrl: constants.BASE_URL + config.port
    };
    return renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
}

const loadOrgContentFromAPI = async (req) => {

    let templateContent = {}
    const orgName = req.params.orgName;
    let organization = await adminDao.getOrganization(orgName);
    if (!organization) {
        res.send("Organization not found")
    }
    const html = await renderTemplateFromAPI(templateContent, organization.ORG_ID, orgName, 'pages/home');
    return html
}

module.exports = {
    loadOrgContentFromFile,
    loadOrgContentFromAPI,
    loadOrganizationContent
};
