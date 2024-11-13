const path = require('path');
const fs = require('fs');
const { renderTemplate, renderTemplateFromAPI } = require('../utils/util');
const config = require('../config/config');
const constants = require('../utils/constants');


let filePrefix = constants.FILE_PREFIX;


const loadOrganizationContent = async (req, res) => {

    let html = "";
    if (config.mode === constants.DEV_MODE) {
        html = await loadOrgContentFromFile(req, res)
    } else {
        html = await loadOrgContentFromAPI(req, res)
    }
    res.send(html);
}

const loadOrgContentFromFile = async (req) => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(__dirname, filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    let baseURL = "http://localhost:" + config.port;
    let templateContent = {
        userProfiles: mockProfileData,
        baseUrl: baseURL
    };
    return renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
}

const loadOrgContentFromAPI = async (req) => {
    let templateContent = {}
    const orgName = req.params.orgName;
    const html = await renderTemplateFromAPI(templateContent, orgName, 'pages/home');
    return html
}

module.exports = {
    loadOrgContentFromFile,
    loadOrgContentFromAPI,
    loadOrganizationContent
};
