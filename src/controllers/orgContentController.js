const path = require('path');
const fs = require('fs');
const { renderTemplate, renderTemplateFromAPI } = require('../utils/util');
const config = require('../config/config');


filePrefix = '../../../../src/'

const loadOrganizationContent = async (req, res) => {

    var html = "";
    if (config.mode == 'single') {
        html = loadOrgContentFromFile(req, res)
    } else {
        html = await loadOrgContentFromAPI(req, res)
    }
    res.send(html);
}

const loadOrgContentFromFile = async (req, res) => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(__dirname, filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    var templateContent = {
        userProfiles: mockProfileData,
        baseUrl: req.params.orgName
    };
    return renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
}

const loadOrgContentFromAPI = async (req, res) => {

    var templateContent = {}
    const orgName = req.params.orgName;
    const html = await renderTemplateFromAPI(templateContent, orgName, 'home');
    return html
}

module.exports = {
    loadOrgContentFromFile,
    loadOrgContentFromAPI,
    loadOrganizationContent
};
