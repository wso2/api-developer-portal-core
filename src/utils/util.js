const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
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

function registerPartials(orgName, dir, profile) {

    const hbs = exphbs.create({});
    const filenames = fs.readdirSync(dir);
    filenames.forEach((filename) => {
        if (filename.endsWith('.hbs')) {
            var template = fs.readFileSync(path.join(dir, filename), 'utf8');
            hbs.handlebars.registerPartial(filename.split(".hbs")[0], template);
            if (filename == "header.hbs") {
                hbs.handlebars.partials = {
                    ...hbs.handlebars.partials,
                    header: hbs.handlebars.compile(template)({ baseUrl: '/' + orgName, profile: profile }),
                };
            }
        }
    });
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

function handleError(res, error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
        return res.status(404).json({
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
    } else if (error instanceof Sequelize.DatabaseError) {
        return res.status(500).json({
            "code": "500",
            "reason": "Internal Server Error",
            "message": error.original.errors ? error.original.errors[0].message : error.message.replaceAll('"', ''),
        });
    } else {
        return res.status(500).json({
            "code": "500",
            "reason": "Internal Server Error",
            "message": error.message
        });
    }
};

module.exports = { copyStyelSheet, copyStyelSheetMulti, loadMarkdown, registerPartials, renderTemplate, handleError }
