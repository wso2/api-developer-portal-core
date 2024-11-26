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
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const Handlebars = require('handlebars');
const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');
const unzipper = require('unzipper');
const axios = require('axios');
const https = require('https');

const { Sequelize } = require('sequelize');

// Function to load and convert markdown file to HTML
function loadMarkdown(filename, dirName) {

    const filePath = path.join(process.cwd(), dirName, filename);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, constants.CHARSET_UTF8);
        return marked.parse(fileContent);
    } else {
        return null;
    }
};


function renderTemplate(templatePath, layoutPath, templateContent) {

    let completeTemplatePath;
    if (templatePath.includes('tryout')) {
        completeTemplatePath = path.join(require.main.filename, templatePath);
    } else {
        completeTemplatePath = path.join(process.cwd(), templatePath);
    }

    const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);

    const completeLayoutPath = path.join(process.cwd(), layoutPath);
    const layoutResponse = fs.readFileSync(completeLayoutPath, constants.CHARSET_UTF8)

    const template = Handlebars.compile(templateResponse.toString());
    const layout = Handlebars.compile(layoutResponse.toString());

    return layout({
        body: template(templateContent)
    });
}

async function loadLayoutFromAPI(orgID) {

    var layoutContent = await adminDao.getOrgContent({
        orgId: orgID,
        fileType: constants.FILE_TYPE.LAYOUT,
        fileName: constants.FILE_NAME.MAIN
    });

    return layoutContent.FILE_CONTENT.toString(constants.CHARSET_UTF8);
}

async function loadTemplateFromAPI(orgID, filePath) {

    var templateContent = await adminDao.getOrgContent({
        orgId: orgID,
        filePath: filePath,
        fileType: constants.FILE_TYPE.TEMPLATE,
        fileName: constants.FILE_NAME.PAGE
    });
    return templateContent ? templateContent.FILE_CONTENT.toString(constants.CHARSET_UTF8) : "";
}

async function renderTemplateFromAPI(templateContent, orgID, orgName, filePath) {

    var templatePage = await loadTemplateFromAPI(orgID, filePath);
    var layoutContent = await loadLayoutFromAPI(orgID);

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutContent.toString());
    if (Object.keys(templateContent).length === 0 && templateContent.constructor === Object) {
        return layout({
            body: template({
                baseUrl: '/' + orgName
            }),
        });
    } else {
        return layout({
            body: template(templateContent),
        });
    }
}

async function renderGivenTemplate(templatePage, layoutPage, templateContent) {

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutPage.toString());
    return layout({
        body: template(templateContent),
    });
}

function handleError(res, error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({
            code: "409",
            message: "Conflict",
            description: error.errors ? error.errors[0].message : error.message.replaceAll('"', ''),
        });
    } else if (error instanceof Sequelize.ValidationError) {
        return res.status(400).json({
            code: "400",
            message: "Bad Request",
            description: error.message
        });
    } else if (error instanceof Sequelize.EmptyResultError) {
        return res.status(404).json({
            code: "404",
            message: "Resource Not Found",
            description: error.message
        });
    } else if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            code: error.statusCode,
            message: error.message,
            description: error.description
        });
    } else {
        let errorDescription = error.message;
        if (error instanceof Sequelize.DatabaseError) {
            errorDescription = "Internal Server Error";
        }
        return res.status(500).json({
            "code": "500",
            "message": "Internal Server Error",
            "description": errorDescription
        });
    }
};

const unzipFile = async (zipPath, extractPath) => {
    const extractedFiles = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(zipPath)
            .pipe(unzipper.Parse())
            .on('entry', entry => {
                const entryPath = entry.path;

                if (!entryPath.includes('__MACOSX')) {
                    const filePath = path.join(extractPath, entryPath);

                    if (entry.type === 'Directory') {
                        fs.mkdirSync(filePath, { recursive: true });
                        entry.autodrain();
                    } else {
                        extractedFiles.push(filePath);
                        entry.pipe(fs.createWriteStream(filePath));
                    }
                } else {
                    entry.autodrain();
                }
            })
            .on('close', async () => {
                extractedFiles.length > 0 ? resolve() : reject(new Error('No files were extracted'));
            })
            .on('error', err => {
                reject(new Error(`Unzip failed: ${err.message}`));
            });
    });
};

const imageMapping = {
    [constants.FILE_EXTENSIONS.SVG]: constants.MIME_TYPES.SVG,
    [constants.FILE_EXTENSIONS.JPG]: constants.MIME_TYPES.JPEG,
    [constants.FILE_EXTENSIONS.JPEG]: constants.MIME_TYPES.JPEG,
    [constants.FILE_EXTENSIONS.PNG]: constants.MIME_TYPES.PNG,
    [constants.FILE_EXTENSIONS.GIF]: constants.MIME_TYPES.GIF,
};
const fileMapping = {
    [constants.FILE_EXTENSIONS.JSON]: constants.MIME_TYPES.JSON,
    [constants.FILE_EXTENSIONS.YAML]: constants.MIME_TYPES.YAML,
    [constants.FILE_EXTENSIONS.YML]: constants.MIME_TYPES.YAML,
    [constants.FILE_EXTENSIONS.XML]: constants.MIME_TYPES.XML
}

const textFiles = [
    constants.FILE_EXTENSIONS.HTML, constants.FILE_EXTENSIONS.HBS, constants.FILE_EXTENSIONS.MD,
    constants.FILE_EXTENSIONS.JSON, constants.FILE_EXTENSIONS.YAML, constants.FILE_EXTENSIONS.YML,
    constants.FILE_EXTENSIONS.SVG
]

const isTextFile = (fileExtension) => {
    return textFiles.includes(fileExtension)
}

const retrieveContentType = (fileName, fileType) => {

    if (fileType === constants.STYLE)
        return constants.MIME_TYPES.CSS;
    const filenameParts = fileName.split('.');
    const extension = filenameParts.length > 1 ? filenameParts.pop() : '';
    if (fileType === constants.IMAGE) {
        return imageMapping[extension] || constants.MIME_TYPES.CONYEMT_TYPE_OCT;
    }
    if (fileType === constants.TEXT) {
        return fileMapping[extension] || constants.MIME_TYPES.TEXT;
    }
    return constants.MIME_TYPES.TEXT;
};

const getAPIFileContent = (directory) => {
    let files = [];
    const filenames = fs.readdirSync(directory);
    filenames.forEach((filename) => {
        if (!(filename === '.DS_Store')) {
            let fileContent = fs.readFileSync(path.join(directory, filename), 'utf8');
            files.push({ fileName: filename, content: fileContent });
        }
    });
    return files;
};

const getAPIImages = async (directory) => {
    let files = [];
    const filenames = await fs.promises.readdir(directory, { withFileTypes: true });
    for (const filename of filenames) {
        if (!(filename === '.DS_Store')) {
            let fileContent = await fs.promises.readFile(path.join(directory, filename.name));
            files.push({ fileName: filename.name, content: fileContent });
        }
    }
    return files;
};

const invokeApiRequest = async (method, url, headers, body) => {

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, 
    });

    try {
        const options = {
            method,
            headers,
            httpsAgent,
        };

        if (body) {
            options.data = body;
        }
        
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        console.log(`Error during ${error}`);
    }
};


module.exports = {
    loadMarkdown,
    renderTemplate,
    loadLayoutFromAPI,
    loadTemplateFromAPI,
    renderTemplateFromAPI,
    renderGivenTemplate,
    handleError,
    unzipFile,
    retrieveContentType,
    getAPIFileContent,
    getAPIImages,
    isTextFile,
    invokeApiRequest
}
