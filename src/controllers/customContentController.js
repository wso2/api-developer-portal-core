const Handlebars = require('handlebars');
const { renderTemplate, renderTemplateFromAPI, loadMarkdown } = require('../utils/util');
const config = require('../config/config');
const markdown = require('marked');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');


const loadCustomContent = async (req, res) => {

    var html = "";
    const orgName = req.originalUrl.split("/")[1];
    const filePath = req.originalUrl.split("/" + orgName + "/").pop();
    if(config.mode == 'single') {
        var templateContent = {};
        templateContent["baseUrl"] = '/' + req.params.orgName;
    
        //read all markdown content
        if (fs.existsSync(path.join(__dirname, filePrefix + 'pages', filePath, 'content'))) {
            const markdDownFiles = fs.readdirSync(path.join(__dirname, filePrefix + 'pages/' + filePath + '/content'));
            markdDownFiles.forEach((filename) => {
                const tempKey = filename.split('.md')[0];
                templateContent[tempKey] = loadMarkdown(filename, filePrefix + 'pages/' + filePath + '/content')
            });
        }
        html = renderTemplate(filePrefix + 'pages/' + filePath + '/page.hbs', filePrefix + 'layout/main.hbs', templateContent)
    } else {
        var content = {}
        const markdownResponse = await fetch(config.adminAPI + "orgFileType?orgName=" + orgName + "&fileType=markDown&filePath=" + filePath);
        var markDownFiles = await markdownResponse.json();
        if (markDownFiles.length > 0) {
            markDownFiles.forEach((item) => {
                const tempKey = item.pageName.split('.md')[0];
                content[tempKey] = markdown.parse(item.pageContent);
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