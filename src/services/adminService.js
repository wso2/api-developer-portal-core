const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const util = require('../utils/util');
const fs = require('fs');
const path = require('path');
const { concatAST } = require('graphql');
const config = require('../config/config');

const createOrganization = async (req, res) => {

    const { orgName, businessOwner, businessOwnerContact, businessOwnerEmail} = req.body;

    try {
        if (!orgName || !businessOwner) {
            throw new CustomError(400, "Bad Request", "Missing or Invalid fields in the request payload");
        }

        const organization = await adminDao.createOrganization({
            orgName,
            businessOwner,
            businessOwnerContact,
            businessOwnerEmail
        });

        const orgCreationResponse = {
            orgId: organization.ORG_ID,
            orgName: organization.ORG_NAME,
            businessOwner: organization.BUSINESS_OWNER,
            businessOwnerContact: organization.BUSINESS_OWNER_CONTACT,
            businessOwnerEmail: organization.BUSINESS_OWNER_EMAIL
        };

        res.status(201).send(orgCreationResponse);
    } catch (error) {
        util.handleError(res, error);
    }

};

const updateOrganization = async (req, res) => {
    try {
        let orgId = req.params.orgId;
        const { orgName, businessOwner, businessOwnerContact, businessOwnerEmail } = req.body;

        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }

        if (!orgName || !businessOwner) {
            throw new CustomError("Missing or Invalid fields in the request payload");
        }

        // Create organization in the database
        const [updatedRowsCount, updatedOrg] = await adminDao.updateOrganization({
            orgId,
            orgName, 
            businessOwner, 
            businessOwnerContact, 
            businessOwnerEmail
        });

        res.status(200).json({
            orgId: updatedOrg[0].dataValues.ORG_ID,
            orgName: updatedOrg[0].dataValues.ORG_NAME,
            businessOwner: updatedOrg[0].dataValues.BUSINESS_OWNER,
            businessOwnerContact: updatedOrg[0].dataValues.BUSINESS_OWNER_CONTACT,
            businessOwnerEmail: updatedOrg[0].dataValues.BUSINESS_OWNER_EMAIL
        });

    } catch (error) {
        console.log(error);

        util.handleError(res, error);
    }
};
const deleteOrganization = async (req, res) => {
    try {
        let orgId = req.params.orgId;

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
        res.status(201).send({ "orgId": orgId, "fileName": req.file.originalname });

    } catch (error) {
        return util.handleError(res, error);
    }
};

const createContent = async (filePath, pageName, pageContent, pageType, orgId) => {
    let content;
    try {
        if (pageName != null && !pageName.startsWith('.')) {

            content = await adminDao.createOrgContent({
                pageType: pageType,
                pageName: pageName,
                pageContent: pageContent,
                filePath: filePath,
                orgId: orgId
            });

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
                let organizationContent = await getOrgContent(pageType, pageName, filePath);

                if (organizationContent) {
                    const orgContent = await adminDao.updateOrgContent({
                        pageType: pageType,
                        pageName: pageName,
                        pageContent: pageContent,
                        filePath: filePath,
                        orgId: orgId
                    });

                } else {
                    await createContent(filePath, pageName, pageContent, pageType, orgId);
                }
            }
        }
        res.status(201).send({ "orgId": orgId, "fileName": req.file.originalname });
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

async function readFilesInDirectory(directory, orgId, baseDir = '') {
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
            let content = await fs.promises.readFile(filePath);
            let strContent = await fs.promises.readFile(filePath, 'utf-8');
            let dir = baseDir.replace(/^[^/]+\/?/, '') || '/';
            let pageType;

            if (file.name.endsWith(".css")) {
                pageType = "styles"
                if (file.name == "main.css") {
                    strContent = strContent.replace(/@import\s*'\/styles\/([^']+)';/g, `@import url("${config.devportalAPI}organizations/${orgId}/layout?pageType=styles&pageName=$1");`);
                    content = Buffer.from(strContent, 'utf-8');
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("layout")) {
                pageType = "layout"
                if (file.name == "main.hbs") {
                    strContent = strContent.replace(/\/styles\//g, `${config.devportalAPI}organizations/${orgId}/layout?pageType=styles&pageName=`);
                    content = Buffer.from(strContent, 'utf-8');
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("partials")) {
                pageType = "partials"
            } else if (file.name.endsWith(".md") && dir.endsWith("content")) {
                pageType = "markDown";
            } else if (file.name.endsWith(".hbs")) {
                pageType = "template";
            } else {
                pageType = "image";
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
    updateOrganization,
    deleteOrganization,
    createOrgContent,
    updateOrgContent,
    getOrgContent,
};
