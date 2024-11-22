const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, loadMarkdown } = require('../utils/util');
const fs = require('fs');
const path = require('path');
const adminDao = require('../dao/admin');


const loadSettingPage = async (req, res) => {

    let templateContent = {
        baseUrl: req.params.orgName,
        
    }
    let orgName = req.params.orgName;
    let organization = await adminDao.getOrganization(orgName);
    let orgID = organization.ORG_ID;
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'configure', 'page.hbs');
    const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8');
    const layoutResponse = await loadLayoutFromAPI(orgID)
    let html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    res.send(html);
}


module.exports = {
    loadSettingPage
};