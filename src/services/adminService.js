const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const orgEntities = require('../models/orgModels');
const util = require('../utils/util');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const { concatAST } = require('graphql');

const createOrganization = async (req, res) => {

    const { orgName, authenticatedPages } = req.body;

    try {
        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new CustomError(400, "Bad Request", "Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        const organization = await adminDao.createOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr
        });

        const orgCreationResponse = new orgEntities.OrganizationResponse(
            organization.orgName,
            organization.orgId,
            organization.authenticatedPages.split(' ').filter(Boolean)
        );

        res.status(201).send(orgCreationResponse);
    } catch (error) {
        util.handleError(res, error);
    }

};

const getOrganization = async (req, res) => {
    try {

        const organization = await adminDao.getOrganization(req.params.orgId);

        res.status(200).json({
            orgId: organization.orgId,
            orgName: organization.orgName,
            authenticatedPages: organization.authenticatedPages.split(' ').filter(Boolean) // Convert back to array
        });
    } catch (error) {
        util.handleError(res, error);
    }
};

const updateOrganization = async (req, res) => {
    try {
        let orgId = req.params.orgId;
        const { orgName, authenticatedPages } = req.body;

        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }

        if (!orgName || !authenticatedPages || !Array.isArray(authenticatedPages)) {
            throw new CustomError("Missing or Invalid fields in the request payload");
        }

        const authenticatedPagesStr = authenticatedPages.join(' ');
        // Create organization in the database
        const [updatedRowsCount, updatedOrg] = await adminDao.updateOrganization({
            orgName,
            authenticatedPages: authenticatedPagesStr,
            orgId
        });
        res.status(200).json({
            orgId: updatedOrg[0].dataValues.orgId,
            orgName: updatedOrg[0].dataValues.orgName,
            authenticatedPages: updatedOrg[0].dataValues.authenticatedPages.split(' ').filter(Boolean)
        });

    } catch (error) {
        console.log(error);

        util.handleError(res, error);
    }
};
const deleteOrganization = async (req, res) => {
    try {
        let orgId = req.param.orgId;

        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }

        const deletedRowsCount = await adminDao.deleteOrganization(orgId);
        if (deletedRowsCount > 0) {
            res.status(204).send();
        } else {
            throw new CustomError(404, "Records Not Found", 'Organization not found');
        }
    } catch (error) {
        util.handleError(res, error);
    }
};

const createOrgContent = async (req, res) => {
    console.log(req.file);
    let orgId = req.params.orgId;
    const zipPath = req.file.path;
    const extractPath = path.join(__dirname, '..', '.tmp', orgId);

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
                    entry.pipe(fs.createWriteStream(filePath));
                }
            } else {
                entry.autodrain();
            }
        })
        .on('close', async () => {
            const files = await readFilesInDirectory(extractPath);
            try {
                for (const { filePath, pageName, pageContent } of files) {
                    if (pageName != null && !pageName.startsWith('.')) {
                        let pageType;
                        if (pageName.endsWith(".css")) {
                            pageType = "styles"
                        } else if (pageName.endsWith(".hbs") && path.basename(filePath) == "layout") {
                            pageType = "layout"
                        } else if (pageName.endsWith(".hbs") && path.basename(filePath) == "partials") {
                            pageType = "partials"
                        } else if (pageName.endsWith(".md") && path.basename(filePath) == "content") {
                            pageType = "markDown";
                        } else if (pageName.endsWith(".hbs")) {
                            pageType = "template";
                        } else {
                            await adminDao.createImageRecord({
                                fileName: pageName,
                                image: pageContent,
                                orgId: orgId
                            });
                        }
                        if (pageType) {
                            const organization = await adminDao.getOrganization(req.params.orgId);

                            const orgContent = await adminDao.createOrgContent({
                                pageType: pageType,
                                pageName: pageName,
                                pageContent: pageContent,
                                filePath: filePath,
                                orgId: orgId,
                                orgName: organization.orgName
                            });
                        }
                    }
                }
                res.status(201).send({ "orgId": orgId, "file": req.file.originalname });
            } catch (error) {
                util.handleError(res, error);
            }
        });
};

async function readFilesInDirectory(directory, baseDir = '') {
    const files = await fs.promises.readdir(directory, { withFileTypes: true });

    let fileDetails = [];

    for (const file of files) {
        const filePath = path.join(directory, file.name);
        const relativePath = path.join(baseDir, file.name);

        if (file.isDirectory()) {
            const subDirContents = await readFilesInDirectory(filePath, relativePath);
            fileDetails = fileDetails.concat(subDirContents);
        } else {
            console.log(filePath)
            const content = await fs.promises.readFile(filePath, 'utf-8');
            fileDetails.push({
                filePath: baseDir || '/',
                pageName: file.name,
                pageContent: content
            });
        }
    }
    return fileDetails;
}


module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent,
};
