/* eslint-disable no-undef */
const { renderTemplate, renderTemplateFromAPI, loadMarkdown } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const markdown = require('marked');
const fs = require('fs');
const path = require('path');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');

const filePrefix = config.pathToContent;

const loadCustomContent = async (req, res) => {
    
    let html = "";
    const orgName = req.originalUrl.split("/")[1];
    let filePath = req.originalUrl.split("/" + orgName + "/").pop();
    if (config.mode === constants.DEV_MODE) {
        let templateContent = {};
        templateContent[constants.BASE_URL_NAME] = constants.BASE_URL + config.port;
        //read all markdown content
        if (fs.existsSync(path.join(process.cwd(), filePrefix + 'pages', filePath, 'content'))) {
            const markdDownFiles = fs.readdirSync(path.join(process.cwd(), filePrefix + 'pages/' + filePath + '/content'));
            markdDownFiles.forEach((filename) => {
                const tempKey = filename.split('.md')[0];
                templateContent[tempKey] = loadMarkdown(filename, filePrefix + 'pages/' + filePath + '/content')
            });
        }
        html = renderTemplate(filePrefix + 'pages/' + filePath + '/page.hbs', filePrefix + 'layout/main.hbs', templateContent);
    } else {
        let content = {};
        try {
            const orgData = await adminDao.getOrganization(orgName);
            filePath = 'pages/' + filePath;
            let orgId = orgData.ORG_ID;
            let markDownFiles = await adminDao.getOrgContent({
                orgId: orgId,
                fileType: 'markDown',
            });
            if (markDownFiles.length > 0) {
                markDownFiles.forEach((item) => {
                    const tempKey = item.FILE_NAME.split('.md')[0];
                    content[tempKey] = markdown.parse(item.FILE_CONTENT.toString(constants.CHARSET_UTF8));
                });
            }
            content[constants.BASE_URL_NAME] = "/" + orgName;
            html = await renderTemplateFromAPI(content, orgId, orgName, filePath);
        } catch (error) {
            console.error(`Failed to load organization: , ${error}`);
        }
    }
    res.send(html);
}



module.exports = {
    loadCustomContent
};