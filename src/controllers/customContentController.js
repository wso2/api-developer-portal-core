/* eslint-disable no-undef */
const { renderTemplate, renderTemplateFromAPI, loadMarkdown } = require('../utils/util');
const config = require(process.cwd() + '/config');
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
    filePath = 'pages/' + filePath;
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

        let markDownFiles = await adminDao.getOrgContent({
            orgId: orgData.ORG_ID,
            fileType: 'markDown',

        });
        if (markDownFiles.length > 0) {
            markDownFiles.forEach((item) => {
                const tempKey = item.FILE_NAME.split('.md')[0];
                content[tempKey] = markdown.parse(item.FILE_CONTENT.toString(constants.CHARSET_UTF8));
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