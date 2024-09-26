const path = require('path');
const fs = require('fs');
const marked = require('marked');
const Handlebars = require('handlebars');
const config = require('../config/config');

const { Sequelize } = require('sequelize');

var filePrefix = '../../../../src/';

function copyStyelSheetMulti() {

    if (!fs.existsSync(path.join(__dirname, filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(__dirname, filePrefix + 'styles'));
    }
    searchFile(path.join(__dirname, '..', 'pages', 'tryout'), ".css", [], filePrefix);
}

function copyStyelSheet() {

    if (!fs.existsSync(path.join(__dirname, filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(__dirname, filePrefix + 'styles'));
    }
    var styleDir = [];
    searchFile(path.join(__dirname, filePrefix + 'partials'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, filePrefix + 'layout'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, filePrefix + 'pages'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, '..', 'pages', 'tryout'), ".css", [], filePrefix);
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
                    if (!fs.existsSync(path.join(__dirname, filePrefix + 'styles/' + path.basename(filePath)))) {
                        fs.copyFile(filePath, path.join(__dirname, filePrefix + 'styles/' + path.basename(filePath)),
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

    const filePath = path.join(__dirname, dirName, filename);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return marked.parse(fileContent);
    } else {
        return null;
    }
};


function renderTemplate(templatePath, layoutPath, templateContent) {

    const completeTemplatePath = path.join(__dirname, templatePath);
    const templateResponse = fs.readFileSync(completeTemplatePath, 'utf-8')

    const completeLayoutPath = path.join(__dirname, layoutPath);
    const layoutResponse = fs.readFileSync(completeLayoutPath, 'utf-8')

    const template = Handlebars.compile(templateResponse.toString());
    const layout = Handlebars.compile(layoutResponse.toString());

    const html = layout({
        body: template(templateContent)
    });
    return html;
}

async function loadLayoutFromAPI(orgName) {

    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;
    const layoutResponse = await fetch(templateURL + "&fileType=layout&filePath=main&fileName=main.hbs");
    var layoutContent = await layoutResponse.text();
    return layoutContent;
}

async function loadTemplateFromAPI(orgName, templatePageName) {

    const templateURL = config.adminAPI + "orgFileType?orgName=" + orgName;
    console.log(templateURL + "&fileType=template&fileName=page.hbs&filePath=" + templatePageName)
    const templateResponse = await fetch(templateURL + "&fileType=template&fileName=page.hbs&filePath=" + templatePageName);
    var templateContent = await templateResponse.text();
    return templateContent;

}

async function renderTemplateFromAPI(templateContent, orgName, templatePageName) {

    var templatePage = await loadTemplateFromAPI(orgName, templatePageName);
    var layoutContent = await loadLayoutFromAPI(orgName);

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutContent.toString());
    var html;
    if (Object.keys(templateContent).length === 0 && templateContent.constructor === Object) {
        html = layout({
            body: template
        });
    } else {
        html = layout({
            body: template(templateContent)
        });
    }
    return html;
}

async function renderGivenTemplate(templatePage, layoutPage, templateContent) {

    const template = Handlebars.compile(templatePage.toString());
    const layout = Handlebars.compile(layoutPage.toString());

    html = layout({
        body: template(templateContent),
    });
    return html;
}

function handleError(res, error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({
            code: "409",
            reason: "Conflict",
            "message": error.errors ? error.errors[0].message : error.message.replaceAll('"', ''),
        });
    } else if (error instanceof Sequelize.ValidationError) {
        return res.status(400).json({
            code: "400",
            reason: "Bad Request",
            message: error.message
        });
    } else if (error instanceof Sequelize.EmptyResultError) {
        return res.status(404).json({
            code: "404",
            reason: "Resource Not Found",
            message: error.message
        });

    } else {
        let errorMessage = error.message;
        if (error instanceof Sequelize.DatabaseError) {
            errorMessage = error.original.errors ? error.original.errors[0].message : error.message.replaceAll('"', '');
        }
        return res.status(500).json({
            "code": "500",
            "reason": "Internal Server Error",
            "message": errorMessage
        });
    }
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
    handleError
}