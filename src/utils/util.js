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
const config = require(process.cwd() + '/config.json');
const { body } = require('express-validator');
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


function renderTemplate(templatePath, layoutPath, templateContent, isTechnical) {

    let completeTemplatePath;
    if (isTechnical) {
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

async function loadLayoutFromAPI(orgID, viewName) {

    var layoutContent = await adminDao.getOrgContent({
        orgId: orgID,
        fileType: constants.FILE_TYPE.LAYOUT,
        fileName: constants.FILE_NAME.MAIN,
        viewName: viewName
    });
    if (layoutContent) {
        return layoutContent.FILE_CONTENT.toString(constants.CHARSET_UTF8);
    } else {
        return "";
    }
}

async function loadTemplateFromAPI(orgID, filePath, viewName) {

    var templateContent = await adminDao.getOrgContent({
        orgId: orgID,
        filePath: filePath,
        fileType: constants.FILE_TYPE.TEMPLATE,
        fileName: constants.FILE_NAME.PAGE,
        viewName: viewName
    });
    return templateContent ? templateContent.FILE_CONTENT.toString(constants.CHARSET_UTF8) : "";
}

async function renderTemplateFromAPI(templateContent, orgID, orgName, filePath, viewName) {

    var templatePage = await loadTemplateFromAPI(orgID, filePath, viewName);
    var layoutContent = await loadLayoutFromAPI(orgID, viewName);
    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutContent.toString());
    return layout({
        body: template(templateContent),
    });

}

async function renderGivenTemplate(templatePage, layoutPage, templateContent) {

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutPage.toString());
    return layout({
        body: template(templateContent),
    });
}

function getErrors(errors) {

    const errorList = [];
    errors.errors.forEach(element => {
        errorList.push({
            code: '400',
            message: 'input validation failed',
            description: element.msg
        })
    });
    return errorList;
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
    constants.FILE_EXTENSIONS.JSON, constants.FILE_EXTENSIONS.YAML, constants.FILE_EXTENSIONS.YML
]

const isTextFile = (fileExtension) => {
    return textFiles.includes(fileExtension)
}

const retrieveContentType = (fileName, fileType) => {

    if (fileType === constants.STYLE)
        return constants.MIME_TYPES.CSS;

    const extension = path.extname(fileName).toLowerCase();

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
            files.push({ fileName: filename, content: fileContent, type: constants.DOC_TYPES.API_LANDING });
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
            files.push({ fileName: filename.name, content: fileContent, type: constants.DOC_TYPES.IMAGES });
        }
    }
    return files;
};

const getAPIDocLinks = (documentMetadata) => {
    
    let files = [];
    documentMetadata.forEach((doc) => {
        doc.links.forEach((link) => {
            files.push({ fileName: constants.DOC_TYPES.DOCLINK_ID + link.displayName, content: link.url, type: doc.type });
        });
    });
    return files;
};

async function readDocFiles(directory, baseDir = '') {

    const files = await fs.promises.readdir(directory, { withFileTypes: true });
    let fileDetails = [];
    for (const file of files) {
        const filePath = path.join(directory, file.name);
        const relativePath = path.join(baseDir, file.name);
        if (file.isDirectory()) {
            const subDirContents = await readDocFiles(filePath, relativePath);
            fileDetails = fileDetails.concat(subDirContents);
        } else {
            if (!(file.name === '.DS_Store')) {
                let content = await fs.promises.readFile(filePath);
                fileDetails.push({
                    type: constants.DOC_TYPES.DOC_ID + baseDir,
                    fileName: file.name,
                    content: content,
                });
            }
        }
    }
    return fileDetails;
}

const invokeApiRequest = async (req, method, url, headers, body) => {

    console.log(`Invoking API: ${url}`);
    headers = headers || {};
    if (req.user) {
        headers.Authorization = "Bearer " + req.user.accessToken;
    }
    let httpsAgent;

    if (config.controlPlane.disableCertValidation) {
        httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    } else {
        const certPath = path.join(process.cwd(), config.controlPlane.pathToCertificate);
        httpsAgent = new https.Agent({
            ca: fs.readFileSync(certPath),
            rejectUnauthorized: true,
        });
    }
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

        console.log(`Error while invoking API: ${error}`);
        let message = error.message;
        if (error.response) {
            message = error.response.data.description;
        }
        throw new CustomError(error.status, 'Request failed', message);
    }
};


const validateIDP = () => {

    const validations = [

        body('authorizationURL')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('authorizationURL must be a valid URL'),
        body('tokenURL')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('tokenURL must be a valid URL'),
        body('clientId')
            .notEmpty()
            .escape(),
        body('userInfoURL')
            .optional()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('userInfoURL must be a valid URL'),
        body('callbackURL')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('callbackURL must be a valid URL'),
        body('logoutURL')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('logoutURL must be a valid URL'),
        body('logoutRedirectURI')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('logoutRedirectURI must be a valid URL'),
        body('signUpURL')
            .optional()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('signUpURL must be a valid URL'),
        body('name')
            .notEmpty()
            .escape(),
        body('*')
            .if(body('*').isString())
            .trim()
    ];
    return validations;
}

const validateOrganization = () => {

    const validations = [
        body('businessOwnerEmail')
            .optional({ checkFalsy: true })
            .isEmail(),
        body('*')
            .if(body('*').not().equals('orgHandle'))
            .optional()
            .customSanitizer(value => value.replace(/[<>"'&]/g, ''))
            .trim()
    ]
    return validations;
}

const validateProvider = () => {

    const validations = [
        body('name')
            .notEmpty()
            .escape()
            .trim(),
        body('providerURL')
            .notEmpty()
            .isURL({
                protocols: ['http', 'https'], // Allow both http and https
                require_tld: false
            }).withMessage('providerUrl must be a valid URL')
    ]
    return validations;
}

const rejectExtraProperties = (allowedKeys, payload) => {

    const extraKeys = Object.keys(payload).filter(
        (key) => !allowedKeys.includes(key)
    );
    return extraKeys;
};

async function readFilesInDirectory(directory, orgId, protocol, host, viewName, baseDir = '') {

    const files = await fs.promises.readdir(directory, { withFileTypes: true });
    let fileDetails = [];
    for (const file of files) {
        const filePath = path.join(directory, file.name);
        const relativePath = path.join(baseDir, file.name);
        if (file.isDirectory()) {
            const subDirContents = await readFilesInDirectory(filePath, orgId, protocol, host, viewName, relativePath);
            fileDetails = fileDetails.concat(subDirContents);
        } else {
            let content = await fs.promises.readFile(filePath);
            let strContent = await fs.promises.readFile(filePath, constants.CHARSET_UTF8);
            let dir = baseDir.replace(/^[^/]+\/?/, '') || '/';
            let fileType;
            if (file.name.endsWith(".css")) {
                fileType = "style"
                if (file.name === "main.css") {
                    strContent = strContent.replace(/@import\s*['"]\/styles\/([^'"]+)['"];/g,
                        `@import url("${protocol}://${host}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgId}/views/${viewName}/layout?fileType=style&fileName=$1");`);
                    content = Buffer.from(strContent, constants.CHARSET_UTF8);
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("layout")) {
                fileType = "layout"
                if (file.name === "main.hbs") {
                    strContent = strContent.replace(/\/styles\//g, `${protocol}://${host}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgId}/views/${viewName}/layout?fileType=style&fileName=`);
                    content = Buffer.from(strContent, constants.CHARSET_UTF8);
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("partials")) {
                fileType = "partial"
            } else if (file.name.endsWith(".md") && dir.endsWith("content")) {
                fileType = "markDown";
            } else if (file.name.endsWith(".hbs")) {
                fileType = "template";
            } else {
                fileType = "image";
            }

            fileDetails.push({
                filePath: dir,
                fileName: file.name,
                fileContent: content,
                fileType: fileType
            });
        }
    }
    return fileDetails;
}

async function listFiles(path) {

    let files = [];
    fs.promises.readdir(path, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        console.log('Files in directory:', files);
    });
    return files;
}

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
    getAPIDocLinks,
    isTextFile,
    invokeApiRequest,
    validateIDP,
    validateOrganization,
    getErrors,
    validateProvider,
    rejectExtraProperties,
    readFilesInDirectory,
    listFiles,
    readDocFiles
}
