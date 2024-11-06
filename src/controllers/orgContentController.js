const path = require('path');
const fs = require('fs');
const { renderTemplate, renderTemplateFromAPI } = require('../utils/util');
const config = require('../config/config');


filePrefix = '../../../../src/'


const loadOrganizationContent = async (req, res) => {

    console.log("Loading content from Landing@@@@@@@@@@@@@@@@@@@@@@@@@@\n");
    let html = "";
    if (config.mode == 'single' || config.mode == 'design') {
        html = await loadOrgContentFromFile(req, res)
    } else {
        html = await loadOrgContentFromAPI(req, res)
    }
    console.log("HTML:", html);
    res.send(html);
}

const loadOrgContentFromFile = async (req, res) => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(__dirname, filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    let baseURL = "http://localhost:" + config.port;
    if (config.mode == 'single')
        baseURL = req.params.orgName
    let templateContent = {
        userProfiles: mockProfileData,
        baseUrl: baseURL
    };
    return renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
}

const loadOrgContentFromAPI = async (req, res) => {

    console.log("Loading content from API@@@@@@@@@@@@@@@@@@@@@@@@@@\n");
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
