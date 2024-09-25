const path = require('path');
const fs = require('fs');
const { renderTemplate, renderTemplateFromAPI } = require('../utils/util');
const config = require('../config/config');


filePrefix = '../../../../src/'

const loadOrganizationContent = async (req, res) => {

    if (config.mode == 'single') {
        loadOrgContentFromFile(req, res)
    } else {
        loadOrgContentFromAPI(req, res)
    }

}

const loadOrgContentFromFile = async (req, res) => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(__dirname, filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    var templateContent = {
        userProfiles: mockProfileData,
        baseUrl: req.params.orgName
    };
    const html = renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    res.send(html);

}

const loadOrgContentFromAPI = async (req, res) => {

    var templateContent = {}
    const orgName = req.params.orgName;
    const html = renderTemplateFromAPI(templateContent, orgName);
    res.send(html);

}

module.exports = {
    loadOrgContentFromFile,
    loadOrgContentFromAPI,
    loadOrganizationContent
};
