const path = require('path');
const fs = require('fs');
const marked = require('marked');
const Handlebars = require('handlebars');
const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');
const unzipper = require('unzipper');
const config = require('../config/config');

const { Sequelize } = require('sequelize');

const filePrefix = config.pathToContent;

function copyStyelSheetMulti() {

    if (!fs.existsSync(path.join(process.cwd(), filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(process.cwd(), filePrefix + 'styles'));
    }
    searchFile(path.join(require.main.filename, '..', 'pages', 'tryout'), ".css", [], filePrefix);
}

function copyStyelSheet() {

    if (!fs.existsSync(path.join(process.cwd(), filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(process.cwd(), filePrefix + 'styles'));
    }
    var styleDir = [];
    searchFile(path.join(process.cwd(), filePrefix + 'partials'), ".css", styleDir, filePrefix);
    searchFile(path.join(process.cwd(), filePrefix + 'layout'), ".css", styleDir, filePrefix);
    searchFile(path.join(process.cwd(), filePrefix + 'pages'), ".css", styleDir, filePrefix);
    searchFile(path.join(require.main.filename, '..', 'pages', 'tryout'), ".css", [], filePrefix);
}

function searchFile(dir, fileName, styleDir) {

    // read the contents of the directory
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        // search through the files
        for (const file of files) {
            // build the full path of the file
            const filePath = path.join(dir, file);

            // get the file stats
            fs.stat(filePath, (err, fileStat) => {
                if (err) throw err;

                // if the file is a directory, recursively search the directory
                if (fileStat.isDirectory()) {
                    searchFile(filePath, fileName, styleDir, filePrefix);
                } else if (file.endsWith(fileName)) {
                    if (!fs.existsSync(path.join(process.cwd(), filePrefix + 'styles/' + path.basename(filePath)))) {
                        fs.copyFile(filePath, path.join(process.cwd(), filePrefix + 'styles/' + path.basename(filePath)),
                            fs.constants.COPYFILE_EXCL, (err) => {
                                if (err) {
                                    console.log("Error Found:", err);
                                }
                            });
                    }
                }
            });
        }
    });

    return styleDir;
}

// Function to load and convert markdown file to HTML
function loadMarkdown(filename, dirName) {

    const filePath = path.join(process.cwd(), dirName, filename);
    console.log("filePath", filePath);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        console.log("fileContent", fileContent);
        return marked.parse(fileContent);
    } else {
        return null;
    }
};


function renderTemplate(templatePath, layoutPath, templateContent) {

    console.log("templatePath", templatePath);
    
    const completeTemplatePath = path.join(process.cwd(), templatePath);
    const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8')

    const completeLayoutPath = path.join(process.cwd(), layoutPath);
    const layoutResponse = fs.readFileSync(completeLayoutPath, 'utf-8')

    const template = Handlebars.compile(templateResponse.toString());
    const layout = Handlebars.compile(layoutResponse.toString());

    const html = layout({
        body: template(templateContent)
    });
    return html;
}

async function loadLayoutFromAPI(orgName) {
    const orgData = await adminDao.getOrganization(orgName);
    var layoutContent =  await adminDao.getOrgContent({
        orgId: orgData.ORG_ID,
        fileType: constants.FILE_TYPE.LAYOUT,
        fileName: constants.FILE_NAME.MAIN
    });

    return layoutContent.FILE_CONTENT.toString(constants.CHARSET_UTF8);
}

async function loadTemplateFromAPI(orgName, filePath) {
    const orgData = await adminDao.getOrganization(orgName);
    var templateContent = await adminDao.getOrgContent({
        orgId: orgData.ORG_ID,
        filePath: filePath,
        fileType: constants.FILE_TYPE.TEMPLATE,
        fileName: constants.FILE_NAME.PAGE
    });

    return templateContent.FILE_CONTENT.toString(constants.CHARSET_UTF8);
}

async function renderTemplateFromAPI(templateContent, orgName, filePath) {

    var templatePage = await loadTemplateFromAPI(orgName, filePath);
    var layoutContent = await loadLayoutFromAPI(orgName);

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutContent.toString());
    let html = '';
    if (Object.keys(templateContent).length === 0 && templateContent.constructor === Object) {
        html = layout({
            body: template({
                baseUrl: '/' + orgName
            }),
        });
    } else {
        html = layout({
            body: template({
                baseUrl: '/' + orgName
            }),
        });
    }
    return html;
}

async function renderGivenTemplate(templatePage, layoutPage, templateContent) {

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutPage.toString());

    const html = layout({
        body: template(templateContent),
    });
    return html;
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
        console.log("Custom Error:", error.statusCode);
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

const retrieveContentType = (fileName, fileType) => {
    console.log("File Name:", fileName, fileType);
    let contentType;
    if (fileType === constants.IMAGE) {
        if (fileName.endsWith(constants.FILE_EXTENSIONS.SVG)) {
            contentType = constants.MIME_TYPES.SVG;
        } else if (fileName.endsWith(constants.FILE_EXTENSIONS.JPG) || constants.FILE_EXTENSIONS.JPEG) {
            contentType = constants.MIME_TYPES.JPEG;
        } else if (fileName.endsWith(constants.FILE_EXTENSIONS.PNG)) {
            contentType = constants.MIME_TYPES.PNG;
        } else if (fileName.endsWith(constants.FILE_EXTENSIONS.GIF)) {
            contentType = constants.MIME_TYPES.GIF;
        } else {
            contentType = constants.MIME_TYPES.CONYEMT_TYPE_OCT;
        }
    } else if (fileType === constants.STYLE) {
        contentType = constants.MIME_TYPES.CSS;
    } else {
        contentType = constants.MIME_TYPES.TEXT;
    }
    return contentType;
};

// const unzipFile = async (zipPath, extractPath) => {
//     return new Promise((resolve, reject) => {
//         const stream = fs.createReadStream(zipPath)
//             .pipe(unzipper.Parse());
//         const promises = [];
//         stream.on('entry', async (entry) => {
//             const entryPath = entry.path;
//             if (!entryPath.includes('__MACOSX')) {
//                 const filePath = path.join(extractPath, entryPath);
//                 try {
//                     if (entry.type === 'Directory') {
//                         await fs.mkdir(filePath, { recursive: true }, (err) => {
//                             if (err) {
//                                 console.error('Error creating directory:', err);
//                             }
//                         });
//                         entry.autodrain();
//                     } else {
//                         await fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
//                             if (err) {
//                                 console.error('Error creating directory:', err);
//                             }
//                         });
//                         const writeStream = fs.createWriteStream(filePath);
//                         entry.pipe(writeStream);
//                         promises.push(
//                             new Promise((res, rej) => {
//                                 writeStream.on('finish', res);
//                                 writeStream.on('error', rej);
//                             })
//                         );
//                     }
//                 } catch (error) {
//                     reject(error);
//                 }
//             } else {
//                 entry.autodrain();
//             }
//         });
//         stream.on('close', async () => {
//             try {
//                 await Promise.all(promises);
//                 resolve();
//             } catch (error) {
//                 reject(error);
//             }
//         });
//         stream.on('error', reject);
//     });
// };


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
    const filenames = await fs.promises.readdir(directory, { withFileTypes: true});
    for (const filename of filenames) {
        if (!(filename === '.DS_Store')) {
            let fileContent = await fs.promises.readFile(path.join(directory, filename.name));
            files.push({ fileName: filename.name, content: fileContent });
        }
    }
    return files;
};

module.exports = {
    copyStyelSheet,
    copyStyelSheetMulti,
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
    getAPIImages
}
