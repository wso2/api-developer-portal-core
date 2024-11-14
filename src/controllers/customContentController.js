const { renderTemplate, renderTemplateFromAPI, loadMarkdown } = require('../utils/util');
const config = require('../config/config');
const markdown = require('marked');
const fs = require('fs');
const path = require('path');
const adminDao = require('../services/adminService');
const constants = require('../utils/constants');

const filePrefix = config.pathToContent;

const loadCustomContent = async (req, res) => {

    let html = "";
    const orgName = req.originalUrl.split("/")[1];
    let filePath = req.originalUrl.split("/" + orgName + "/").pop();
    if (config.mode === constants.DEV_MODE) {

        let templateContent = {};
        templateContent["baseUrl"] = constants.BASE_URL + config.port

        //read all markdown content
        if (fs.existsSync(path.join(process.cwd(), filePrefix + 'pages', filePath, 'content'))) {
            const markdDownFiles = fs.readdirSync(path.join(process.cwd(), filePrefix + 'pages/' + filePath + '/content'));
            markdDownFiles.forEach((filename) => {
                const tempKey = filename.split('.md')[0];
                templateContent[tempKey] = loadMarkdown(filename, filePrefix + 'pages/' + filePath + '/content')
            });
        }
        html = renderTemplate(filePrefix + 'pages/' + filePath + '/page.hbs', filePrefix + 'layout/main.hbs', templateContent)

    } else {
        let content = {}
        const orgData = await adminDao.getOrganization(orgName);

        const markdownResponse = await fetch(`${config.devportalAPI}organizations${orgData.ORG_ID}filePath${filePath}`);
        let markDownFiles = await markdownResponse.json();

        if (markDownFiles.length > 0) {
            markDownFiles.forEach((item) => {
                const tempKey = item.fileName.split('.md')[0];
                content[tempKey] = markdown.parse(item.fileContent);
            });
        }
        content["baseUrl"] = "/" + orgName;
        html = await renderTemplateFromAPI(content, orgName, filePath);
    }
    res.send(html);
}



module.exports = {
    loadCustomContent
};