const path = require('path');
const fs = require('fs');
const { registerPartials, renderTemplate } = require('../utils/util');

filePrefix = '../../../../src/'

const loadOrgContent = (req, res, next) => {

    //TODO fetch from DB
    const mockProfileDataPath = path.join(__dirname, filePrefix + '../mock', '/userProfiles.json');
    const mockProfileData = JSON.parse(fs.readFileSync(mockProfileDataPath, 'utf-8'));

    registerPartials(req.params.orgName, path.join(__dirname, filePrefix, 'pages', 'home', 'partials'), req.user);
    registerPartials(req.params.orgName, path.join(__dirname, filePrefix, 'partials'), req.user);

    var templateContent = {
        userProfiles: mockProfileData,
        baseUrl: req.params.orgName
    };

    const html = renderTemplate(filePrefix + 'pages/home/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    res.send(html);

}

module.exports = {
    loadOrgContent
};
