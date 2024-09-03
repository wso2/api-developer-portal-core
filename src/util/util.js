const path = require('path');
const fs = require('fs');


function copyStyelSheetMulti(filePrefix) {

    if (!fs.existsSync(path.join(__dirname, filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(__dirname, filePrefix + 'styles'));
    }
    searchFile(path.join('src', 'pages', 'tryout'), ".css", [], filePrefix);
}


function copyStyelSheet(filePrefix) {

    if (!fs.existsSync(path.join(__dirname, filePrefix + 'styles'))) {
        fs.mkdirSync(path.join(__dirname, filePrefix + 'styles'));
    }
    var styleDir = [];
    searchFile(path.join(__dirname, filePrefix + 'partials'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, filePrefix + 'layout'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, filePrefix + 'pages'), ".css", styleDir, filePrefix);
    searchFile(path.join(__dirname, '..', 'src', 'pages', 'tryout'), ".css", [], filePrefix);
}

function searchFile(dir, fileName, styleDir, filePrefix) {
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

module.exports = { copyStyelSheet, copyStyelSheetMulti }
