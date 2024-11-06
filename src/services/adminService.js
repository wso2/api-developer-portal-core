const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const orgEntities = require('../models/orgModels');
const util = require('../utils/util');
const fs = require('fs');
const path = require('path');
const { concatAST } = require('graphql');
const config = require('../config/config');

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
    let orgId = req.params.orgId;
    const zipPath = req.file.path;
    const extractPath = path.join(__dirname, '..', '.tmp', orgId);

    util.unzipFile(zipPath, extractPath);

    try {
        const files = await readFilesInDirectory(extractPath, orgId);
        for (const { filePath, pageName, pageContent, pageType } of files) {
            await createContent(filePath, pageName, pageContent, pageType, orgId);
        }
        res.status(201).send({ "orgId": orgId, "file": req.file.originalname });

    } catch (error) {
        return util.handleError(res, error);
    }
};

const createContent = async (filePath, pageName, pageContent, pageType, orgId) => {
    let content;
    try {
        if (pageName != null && !pageName.startsWith('.')) {
            if (pageType) {
                content = await adminDao.createOrgContent({
                    pageType: pageType,
                    pageName: pageName,
                    pageContent: pageContent,
                    filePath: filePath,
                    orgId: orgId
                });
            } else {
                content = await adminDao.createImageRecord({
                    fileName: pageName,
                    image: pageContent,
                    orgId: orgId
                });
            }
        }
    } catch (error) {
        throw error;
    }

    return content;
};

const updateOrgContent = async (req, res) => {
    let orgId = req.params.orgId;
    const zipPath = req.file.path;
    const extractPath = path.join(__dirname, '..', '.tmp', orgId);

    util.unzipFile(zipPath, extractPath);

    const files = await readFilesInDirectory(extractPath, orgId);
    try {
        for (const { filePath, pageName, pageContent, pageType } of files) {
            if (pageName != null && !pageName.startsWith('.')) {
                const organization = await adminDao.getOrganization(req.params.orgId);
                let organizationContent;
                if (pageType) {
                    organizationContent = await getOrgContent(pageType, pageName, filePath);
                }
                const imgContent = await getImgContent(orgId, pageName);

                if (organizationContent || imgContent) {
                    if (pageType && organizationContent) {
                        const orgContent = await adminDao.updateOrgContent({
                            pageType: pageType,
                            pageName: pageName,
                            pageContent: pageContent,
                            filePath: filePath,
                            orgId: orgId
                        });
                    } else {
                        await adminDao.updateImageRecord({
                            fileName: pageName,
                            image: pageContent,
                            orgId: orgId
                        });
                    }
                } else {
                    console.log("Creating new content@@@@@@@@@@@@@@@@@@@@\n");
                    await createContent(filePath, pageName, pageContent, pageType, orgId);
                }
            }
        }
        res.status(201).send({ "orgId": orgId, "file": req.file.originalname });
    } catch (error) {
        util.handleError(res, error);
    }
};

const getOrgContent = async (pageType, pageName, filePath) => {
    return await adminDao.getOrgContent({
        pageType: pageType,
        pageName: pageName,
        filePath: filePath
    });
};

const getImgContent = async (orgId, pageName) => {
    return await adminDao.getImgContent({
        orgId: orgId,
        fileName: pageName
    });
};

async function readFilesInDirectory(directory, orgId,  baseDir = '') {
    console.log(directory);
    const files = await fs.promises.readdir(directory, { withFileTypes: true });

    let fileDetails = [];

    for (const file of files) {
        const filePath = path.join(directory, file.name);
        const relativePath = path.join(baseDir, file.name);

        if (file.isDirectory()) {
            const subDirContents = await readFilesInDirectory(filePath, orgId, relativePath);
            fileDetails = fileDetails.concat(subDirContents);
        } else {
            let content = await fs.promises.readFile(filePath, 'utf-8');
            let dir = baseDir.replace(/^[^/]+\/?/, '') || '/';
            let pageType;

            if (file.name.endsWith(".css")) {
                pageType = "styles"
                if (file.name == "main.css") {
                    content = content.replace(/@import\s*'\/styles\/([^']+)';/g, `@import url("${config.devportalAPI}organizations/${orgId}/layout?pageType=styles&pageName=$1");`);
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("layout")) {
                pageType = "layout"
                if (file.name == "main.hbs") {
                    content = content.replace(/\/styles\//g, `${config.devportalAPI}organizations/${orgId}/layout?pageType=styles&pageName=`);
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("partials")) {
                pageType = "partials"
            } else if (file.name.endsWith(".md") && dir.endsWith("content")) {
                pageType = "markDown";
            } else if (file.name.endsWith(".hbs")) {
                pageType = "template";
            } else if (!file.name.endsWith(".svg")) {
                content = await fs.promises.readFile(filePath);
            }

            fileDetails.push({
                filePath: dir,
                pageName: file.name,
                pageContent: content,
                pageType: pageType
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
    updateOrgContent,
    getOrgContent,
    getImgContent
};
