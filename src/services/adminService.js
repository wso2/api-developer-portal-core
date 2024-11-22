/* eslint-disable no-undef */
const { CustomError } = require('../utils/errors/customErrors');
const adminDao = require('../dao/admin');
const util = require('../utils/util');
const fs = require('fs');
const path = require('path');
const IdentityProviderDTO = require("../dto/identityProvider");
const constants = require('../utils/constants');

const createOrganization = async (req, res) => {

    const { orgName, businessOwner, businessOwnerContact, businessOwnerEmail } = req.body;
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
        console.error(`${constants.ERROR_MESSAGE.ORG_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const updateOrganization = async (req, res) => {

    try {
        const orgId = req.params.orgId;
        const { orgName, businessOwner, businessOwnerContact, businessOwnerEmail } = req.body;
        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }
        if (!orgName || !businessOwner) {
            throw new CustomError("Missing or Invalid fields in the request payload");
        }
        const [, updatedOrg] = await adminDao.updateOrganization({
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
        console.error(`${constants.ERROR_MESSAGE.ORG_UPDATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const deleteOrganization = async (req, res) => {

    try {
        const orgId = req.params.orgId;
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
        console.error(`${constants.ERROR_MESSAGE.ORG_DELETE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const createIdentityProvider = async (req, res) => {

    try {
        const idpData = req.body;
        const orgId = req.params.orgId;
        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }
        if (!idpData.name || !idpData.issuer || !idpData.authorizationURL || !idpData.tokenURL ||
            !idpData.clientId || !idpData.callbackURL || !idpData.scope || !idpData.logoutURL || !idpData.logoutRedirectURI) {
            throw new CustomError(400, "Bad Request", "Missing required parameters'");
        }
        const idpResponse = await adminDao.createIdentityProvider(orgId, idpData);
        res.status(201).send(new IdentityProviderDTO(idpResponse.dataValues));
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.IDP_CREATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const updateIdentityProvider = async (req, res) => {

    try {
        const orgId = req.params.orgId;
        const idpData = req.body;
        if (!idpData.name || !idpData.issuer || !idpData.authorizationURL || !idpData.tokenURL ||
            !idpData.clientId || !idpData.callbackURL || !idpData.scope || !idpData.logoutURL || !idpData.logoutRedirectURI) {
            throw new CustomError(400, "Bad Request", "Missing or Invalid fields in the request payload");
        }
        if (!orgId) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
        }
        const [updatedRows, updatedIDP] = await adminDao.updateIdentityProvider(orgId, idpData);
        if (!updatedRows) {
            throw new Sequelize.EmptyResultError("No record found to update");
        }
        res.status(200).send(new IdentityProviderDTO(updatedIDP[0].dataValues));
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.IDP_UPDATE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const getIdentityProvider = async (req, res) => {

    const orgID = req.params.orgId;
    if (!orgID) {
        throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
    }
    try {
        const retrievedIDP = await adminDao.getIdentityProvider(orgID);
        // Create response object
        if (retrievedIDP.length > 0) {
            res.status(200).send(new IdentityProviderDTO(retrievedIDP[0]));
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.IDP_NOT_FOUND}, ${error}`);
        util.handleError(res, error);
    }
}

const deleteIdentityProvider = async (req, res) => {

    const orgID = req.params.orgId;
    if (!orgID) {
        throw new CustomError(400, "Bad Request", "Missing required parameter: 'orgId'");
    }
    try {
        const idpDeleteResponse = await adminDao.deleteIdentityProvider(orgID);
        if (idpDeleteResponse === 0) {
            throw new Sequelize.EmptyResultError("Resource not found to delete");
        } else {
            res.status(200).send("Resouce Deleted Successfully");
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.IDP_DELETE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

const createOrgContent = async (req, res) => {

    const orgId = req.params.orgId;
    const zipPath = req.file.path;
    const extractPath = path.join(process.cwd(), '..', '.tmp', orgId);
    await util.unzipFile(zipPath, extractPath);
    try {
        const files = await readFilesInDirectory(extractPath, orgId);
        for (const { filePath, fileName, fileContent, fileType } of files) {
            await createContent(filePath, fileName, fileContent, fileType, orgId);
        }
        res.status(201).send({ "orgId": orgId, "fileName": req.file.originalname });
        fs.rmSync(extractPath, { recursive: true, force: true });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.ORG_CONTENT_CREATE_ERROR}, ${error}`);
        fs.rmSync(extractPath, { recursive: true, force: true });
        return util.handleError(res, error);
    }
};

const createContent = async (filePath, fileName, fileContent, fileType, orgId) => {

    let content;
    // eslint-disable-next-line no-useless-catch
    try {
        if (fileName != null && !fileName.startsWith('.')) {
            content = await adminDao.createOrgContent({
                fileType: fileType,
                fileName: fileName,
                fileContent: fileContent,
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

    const orgId = req.params.orgId;
    const zipPath = req.file.path;
    const extractPath = path.join(process.cwd(), '..', '.tmp', orgId);
    await util.unzipFile(zipPath, extractPath);
    const files = await readFilesInDirectory(extractPath, orgId);
    try {
        for (const { filePath, fileName, fileContent, fileType } of files) {
            if (fileName != null && !fileName.startsWith('.')) {
                const organizationContent = await getOrgContent(orgId, fileType, fileName, filePath);
                if (organizationContent) {
                    await adminDao.updateOrgContent({
                        fileType: fileType,
                        fileName: fileName,
                        fileContent: fileContent,
                        filePath: filePath,
                        orgId: orgId
                    });
                } else {
                    console.log("Update Content not exists, hense creating new content");
                    await createContent(filePath, fileName, fileContent, fileType, orgId);
                }
            }
        }
        fs.rmSync(extractPath, { recursive: true, force: true });
        res.status(201).send({ "orgId": orgId, "fileName": req.file.originalname });
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.ORG_CONTENT_UPDATE_ERROR}, ${error}`);
        fs.rmSync(extractPath, { recursive: true, force: true });
        util.handleError(res, error);
    }
};

const getOrgContent = async (orgId, fileType, fileName, filePath) => {

    return await adminDao.getOrgContent({
        orgId: orgId,
        fileType: fileType,
        fileName: fileName,
        filePath: filePath
    });
};

const deleteOrgContent = async (req, res) => {

    try {
        const fileName = req.query.fileName;
        if (!req.query.fileName) {
            throw new CustomError(400, "Bad Request", "Missing required parameter: 'fileName'");
        }
        const deletedRowsCount = await adminDao.deleteOrgContent(req.params.orgId, fileName);
        if (deletedRowsCount > 0) {
            res.status(204).send();
        } else {
            throw new CustomError(404, "Records Not Found", 'Organization not found');
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.ORG_CONTENT_DELETE_ERROR}, ${error}`);
        util.handleError(res, error);
    }
};

async function readFilesInDirectory(directory, orgId, baseDir = '') {

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
            let strContent = await fs.promises.readFile(filePath, constants.CHARSET_UTF8);
            let dir = baseDir.replace(/^[^/]+\/?/, '') || '/';
            let fileType;
            if (file.name.endsWith(".css")) {
                fileType = "style"
                if (file.name === "main.css") {
                    strContent = strContent.replace(/@import\s*'\/styles\/([^']+)';/g,
                        `@import url("${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgId}/layout?fileType=style&fileName=$1");`);
                    content = Buffer.from(strContent, constants.CHARSET_UTF8);
                }
            } else if (file.name.endsWith(".hbs") && dir.endsWith("layout")) {
                fileType = "layout"
                if (file.name === "main.hbs") {
                    strContent = strContent.replace(/\/styles\//g, `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgId}/layout?fileType=style&fileName=`);
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

module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    createOrgContent,
    updateOrgContent,
    getOrgContent,
    deleteOrgContent,
    createIdentityProvider,
    updateIdentityProvider,
    getIdentityProvider,
    deleteIdentityProvider
};
