/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable no-undef */
const { renderTemplate, renderTemplateFromAPI, loadMarkdown } = require('../utils/util');
const config = require(process.cwd() + '/config.json');
const markdown = require('marked');
const fs = require('fs');
const path = require('path');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');

const filePrefix = config.pathToContent;
const baseURLDev = constants.BASE_URL + config.port + constants.ROUTE.VIEWS_PATH;

const loadCustomContent = async (req, res) => {

    let html = "";
    const { orgName, viewName } = req.params;
    let filePath = req.originalUrl.split("/" + orgName + constants.ROUTE.VIEWS_PATH + viewName + "/")[1];
    if (config.mode === constants.DEV_MODE) {
        let templateContent = {};
        templateContent[constants.BASE_URL_NAME] = baseURLDev + viewName;
        //read all markdown content
        if (fs.existsSync(path.join(process.cwd(), filePrefix + 'pages', filePath, 'content'))) {
            const markdDownFiles = fs.readdirSync(path.join(process.cwd(), filePrefix + 'pages/' + filePath + '/content'));
            markdDownFiles.forEach((filename) => {
                const tempKey = filename.split('.md')[0];
                templateContent[tempKey] = loadMarkdown(filename, filePrefix + 'pages/' + filePath + '/content')
            });
        }
        html = renderTemplate(filePrefix + 'pages/' + filePath + '/page.hbs', filePrefix + 'layout/main.hbs', templateContent, false)

    } else {
        let content = {};
        try {
            filePath = 'pages/' + filePath;
            let orgId = await adminDao.getOrgId(orgName);
            let markDownFiles = await adminDao.getOrgContent({
                orgId: orgId,
                fileType: 'markDown',
                viewName: viewName
            });
            if (markDownFiles.length > 0) {
                markDownFiles.forEach((item) => {
                    const tempKey = item.FILE_NAME.split('.md')[0];
                    content[tempKey] = markdown.parse(item.FILE_CONTENT.toString(constants.CHARSET_UTF8));
                });
            }
            content[constants.BASE_URL_NAME] = '/' + orgName + + constants.ROUTE.VIEWS_PATH + viewName;
            html = await renderTemplateFromAPI(content, orgId, orgName, filePath, viewName);
        } catch (error) {
            console.error(`Failed to load organization :`, error);
        }
    }
    res.send(html);
}



module.exports = {
    loadCustomContent
};