const { Sequelize, Utils } = require('sequelize');
const sequelize = require('../db/sequelize')
const apiDao = require('../dao/apiMetadata');
const util = require('../utils/util');
const path = require('path');
const fs = require('fs').promises;
const unzipper = require('unzipper');
const APIDTO = require('../dto/apiDTO');


const createAPIMetadata = async (req, res) => {

    let apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    let orgId = req.params.orgId;
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const result = await sequelize.transaction(async t => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(orgId, apiMetadata, t);
            const apiID = createdAPI.dataValues.API_ID;

            if (apiMetadata.subscriptionPolicies) {
                let subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                await apiDao.createSubscriptionPolicy(subscriptionPolicies, apiID, orgId, t);
            }
            // store api definition file
            const storeAPIDefinition = await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t)
            apiMetadata.apiID = apiID;
            res.status(201).send(apiMetadata);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
};

const getAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;

    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        const result = await sequelize.transaction(async t => {
            const retrievedAPI = await apiDao.getAPIMetadata(orgID, apiID, t);
            // Create response object
            const apiCreationResponse = new APIDTO(retrievedAPI[0]);
            res.status(200).send(apiCreationResponse);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }

};

const getAllAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    if (!orgID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        const result = await sequelize.transaction(async t => {
            const retrievedAPIs = await apiDao.getAllAPIMetadata(orgID, t);
            // Create response object
            const apiCreationResponse = retrievedAPIs.map(api => new APIDTO(api));
            res.status(200).send(apiCreationResponse);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
};

const updateAPIMetadata = async (req, res) => {

    let apiMetadata = JSON.parse(req.body.apiMetadata);
    let apiDefinitionFile = req.file.buffer;
    let apiFileName = req.file.originalname;

    //TODO: Get orgId from the orgName
    let orgId = req.params.orgId;
    let apiID = req.params.apiId;
    try {
        // Validate input
        if (!apiMetadata.endPoints || !apiMetadata.apiInfo || !apiDefinitionFile) {
            throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
        }
        const result = await sequelize.transaction(async t => {
            // Create apimetadata record
            const updatedAPI = await apiDao.updateAPIMetadata(orgId, apiID, apiMetadata, t);
            if (apiMetadata.subscriptionPolicies) {
                let subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
                }
                const subscriptionPolicyResponse = await apiDao.updateSubscriptionPolicy(orgId, apiID, subscriptionPolicies, t);
            }
            // update api definition file
            const storeAPIDefinition = await apiDao.updateAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t)
            apiMetadata.apiID = apiID;
            res.status(200).send(apiMetadata);
        });
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
};
const deleteAPIMetadata = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    if (!orgID || !apiID) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    const result = await sequelize.transaction(async t => {
        try {
            const apiDeleteResponse = await apiDao.deleteAPIMetadata(orgID, apiID, t);
            if (apiDeleteResponse === 0) {
                throw new Sequelize.ValidationError("API not found");
            } else {
                res.status(200).send("Resouce Deleted Successfully");
            }
        } catch (error) {
            console.log(error)
            util.handleError(res, error);
        }
    })
};

const createAPITemplate = async (req, res) => {

    try {
        let apiID = req.params.apiId;
        let orgId = req.params.orgId;
        let imageMetadata = JSON.parse(req.body.imageMetadata);
        let extractPath = path.join('/tmp', req.params.orgId + '/' + req.params.apiId);
        await fs.mkdir(extractPath, { recursive: true });
        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split('.zip')[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, 'content');
        const imagesPath = path.join(extractPath, apiContentFileName, 'images');

        // Verify directories exist
        try {
            await fs.access(contentPath);
            await fs.access(imagesPath);
        } catch (err) {
            throw new Error(`Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}`);
        }

        //get api files
        let apiContent = await util.getAPIFileContent(contentPath);
        //get api images
        let apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);

        await sequelize.transaction(async t => {
            // Store image metadata
            await apiDao.storeAPIImageMetadata(imageMetadata, apiID, orgId, t);
            await apiDao.storeAPIFiles(apiContent, apiID, orgId, t);
        });
        await fs.rm(extractPath, { recursive: true, force: true });

        res.status(201).type('application/json').send({ message: 'API Template updated successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        util.handleError(res, error);
    }
}

const updateAPITemplate = async (req, res) => {

    try {
        let apiId = req.params.apiId;
        let orgId = req.params.orgId;
        let imageMetadata = JSON.parse(req.body.imageMetadata);
        let extractPath = path.join('/tmp', req.params.orgId + '/' + req.params.apiId);
        await fs.mkdir(extractPath, { recursive: true });
        console.log(`Extracting to: ${extractPath}`);
        const zipFilePath = req.file.path;
        await util.unzipFile(zipFilePath, extractPath);
        let apiContentFileName = req.file.originalname.split('.zip')[0];

        // Build complete paths
        const contentPath = path.join(extractPath, apiContentFileName, 'content');
        const imagesPath = path.join(extractPath, apiContentFileName, 'images');

        // Verify directories exist
        try {
            await fs.access(contentPath);
            await fs.access(imagesPath);
        } catch (err) {
            throw new Error(`Required directories not found after extraction. Content path: ${contentPath}, Images path: ${imagesPath}`);
        }

        //get api files
        let apiContent = await util.getAPIFileContent(contentPath);
        //get api images
        let apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);

        await sequelize.transaction(async t => {
            // Update image metadata
            await apiDao.updateAPIImageMetadata(imageMetadata, orgId, apiId, t);
            // Update API files
            await apiDao.updateOrCreateAPIFiles(apiContent, apiId, orgId, t);
        });
        await fs.rm(extractPath, { recursive: true, force: true });

        res.status(201).type('application/json').send({ message: 'API Files updated successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        util.handleError(res, error);
    }
}

const getAPIFile = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    let apiFileName = req.query.fileName;
    if (!orgID || !apiID || !apiFileName) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    let apiFileResponse = '';
    let apiFile;
    let contentType = '';
    try {
        const fileExtension = path.extname(apiFileName).toLowerCase();
        apiFileResponse = await apiDao.getAPIFile(apiFileName, orgID, apiID);
        console.log(apiFileResponse)
        if (fileExtension == '.html' || fileExtension == '.hbs' || fileExtension == '.md' ||
            fileExtension == '.json' || fileExtension == '.yaml' || fileExtension == '.yml' ||
            fileExtension == '.svg') {
            apiFile = apiFileResponse.API_FILE.toString('utf8');
            console.log(apiFile)
            if (fileExtension == '.json') {
                contentType = 'application/json';
            } else if (fileExtension == '.yaml' || fileExtension == '.yml') {
                contentType = 'application/yaml';
            } else {
                contentType = '"text/plain"';
            }
        } else {
            apiFile = apiFileResponse.API_FILE;
            if (fileExtension == '.svg') {
                contentType = 'image/svg+xml';
            } else if (fileExtension == '.jpg' || fileExtension == '.jpeg') {
                contentType = 'image/jpeg';
            } else if (fileExtension == '.png') {
                contentType = 'image/png';
            } else if (fileExtension == '.gif') {
                contentType = 'image/gif';
            } else {
                contentType = 'application/octet-stream';
            }
        }
        res.set({
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${apiFileName}"`,
            'Cache-Control': 'no-cache'
        });
        if (apiFileResponse) {
            // Send file content as text
            res.status(200).send(Buffer.isBuffer(apiFile) ? apiFile : Buffer.from(apiFile, 'binary'));
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
}

const deleteAPIFile = async (req, res) => {

    let orgID = req.params.orgId;
    let apiID = req.params.apiId;
    let apiFileName = req.query.fileName;
    let apiFileResponse = '';
    if (!orgID || !apiID || !apiFileName) {
        throw new Sequelize.ValidationError("Missing or Invalid fields in the request payload");
    }
    try {
        apiFileResponse = await apiDao.deleteAPIFile(apiFileName, orgID, apiID);
        if (apiFileResponse) {
            // Send file content as text
            res.status(204).send();
        } else {
            res.status(404).send("API File not found");
        }
    } catch (error) {
        console.log(error)
        util.handleError(res, error);
    }
}
module.exports = {
    createAPIMetadata,
    getAPIMetadata,
    getAllAPIMetadata,
    updateAPIMetadata,
    deleteAPIMetadata,
    createAPITemplate,
    updateAPITemplate,
    getAPIFile,
    deleteAPIFile
};
