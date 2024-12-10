/* eslint-disable no-undef */
const { renderTemplate, renderGivenTemplate, loadLayoutFromAPI, invokeApiRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const adminDao = require('../dao/admin');
const filePrefix = config.pathToContent;
const controlPlaneUrl = config.controlPlane.url;

const orgIDValue = async (orgName) => {
    const organization = await adminDao.getOrganization(orgName);
    return organization.ORG_ID;
}

const templateResponseValue = async (pageName) => {
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', pageName, 'page.hbs');
    return fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
}

// ***** Load Applications *****

const loadApplications = async (req, res) => {
    let html, metaData, templateContent;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplications();
        templateContent = {
            applicationsMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/applications/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    }
    else {
        const orgName = req.params.orgName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMApplications(req);
        templateContent = {
            applicationsMetadata: metaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('applications');
        const layoutResponse = await loadLayoutFromAPI(orgID);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }
    res.send(html);
}

async function getMockApplications() {
    const mockApplicationsMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'applications.json');
    const mockApplicationsMetaData = JSON.parse(fs.readFileSync(mockApplicationsMetaDataPath, 'utf-8'));
    return mockApplicationsMetaData.list;
}

async function getAPIMApplications(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/applications', null, null);
    return responseData.list;
}

// ***** Load Throttling Policies *****

const loadThrottlingPolicies = async (req, res) => {
    let html, metaData, templateContent;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockThrottlingPolicies();
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/add-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    }
    else {
        const orgName = req.params.orgName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMThrottlingPolicies(req);
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('add-application');
        const layoutResponse = await loadLayoutFromAPI(orgID);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }

    res.send(html);
}

async function getMockThrottlingPolicies() {
    const mockThrottlingPoliciesMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'throttlingPolicies.json');
    const mockThrottlingPoliciesMetaData = JSON.parse(fs.readFileSync(mockThrottlingPoliciesMetaDataPath, 'utf-8'));
    return mockThrottlingPoliciesMetaData.list;
}

async function getAPIMThrottlingPolicies(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/throttling-policies/application', null, null);
    return responseData.list;
}

// ***** Load Application *****

const loadApplication = async (req, res) => {
    const applicationId = req.params.applicationid;
    let html, templateContent, metaData, kMmetaData;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplication();
        kMmetaData = await getMockKeyManagers();
        templateContent = {
            applicationMetadata: metaData,
            keyManagersMetadata: kMmetaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        const orgName = req.params.orgName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMApplication(req, applicationId);
        kMmetaData = await getAPIMKeyManagers(req);
        templateContent = {
            applicationMetadata: metaData,
            keyManagersMetadata: kMmetaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('application');
        const layoutResponse = await loadLayoutFromAPI(orgID);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    }

    res.send(html);
}

const loadApplicationForEdit = async (req, res) => {

    const applicationId = req.params.applicationid;
    let html, templateContent, metaData, throttlingMetaData;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplication();
        throttlingMetaData = await getMockThrottlingPolicies();
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/edit-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        const orgName = req.params.orgName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMApplication(req, applicationId);
        throttlingMetaData = await getAPIMThrottlingPolicies(req);
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: '/' + orgName
        }
        const templateResponse = await templateResponseValue('edit-application');
        const layoutResponse = await loadLayoutFromAPI(orgID);
        html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);

    }
    res.send(html);
}

async function getMockApplication() {
    const mockApplicationMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'DefaultApplication.json');
    const mockApplicationMetaData = JSON.parse(fs.readFileSync(mockApplicationMetaDataPath, 'utf-8'));
    return mockApplicationMetaData;
}

async function getMockKeyManagers() {
    const mockKeyManagersMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'AllKeyManagers.json');
    const mockKeyManagersMetaData = JSON.parse(fs.readFileSync(mockKeyManagersMetaDataPath, 'utf-8'));
    return mockKeyManagersMetaData.list;
}

async function getAPIMApplication(req, applicationId) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/applications/' + applicationId, null, null);
    return responseData;
}

async function getAPIMKeyManagers(req) {
    const responseData = await invokeApiRequest(req, 'GET', controlPlaneUrl + '/key-managers', null, null);
    return responseData.list;
}

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    const { name, throttlingPolicy, description } = req.body;
    const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications`, {
        'Content-Type': 'application/json'
    }, {
        name,
        throttlingPolicy,
        description,
        tokenType: 'JWT',
        groups: [],
        attributes: {},
        subscriptionScopes: []
    });
    res.status(200).json({ message: responseData.message });
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    const { name, throttlingPolicy, description } = req.body;
    const applicationId = req.params.applicationid;
    const responseData = await invokeApiRequest(req, 'PUT', `${controlPlaneUrl}/applications/${applicationId}`, {
        'Content-Type': 'application/json',
    }, {
        name,
        throttlingPolicy,
        description,
        tokenType: 'JWT',
        groups: [],
        attributes: {},
        subscriptionScopes: []
    });
    res.status(200).json({ message: responseData.message });
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    const applicationId = req.params.applicationid;
    const responseData = await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${applicationId}`, null, null);
    res.status(200).json({ message: responseData.message });
}

// ***** Save Application *****

const resetThrottlingPolicy = async (req, res) => {
    const applicationId = req.params.applicationid;
    const { userName } = req.body;
    const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/reset-throttle-policy`, {
        'Content-Type': 'application/json'
    }, {
        userName
    });
    res.status(200).json({ message: responseData.message });
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    const applicationId = req.params.applicationid;
    const environment = req.params.env;
    const { validityPeriod, additionalProperties } = req.body;
    const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/api-keys/${environment}/generate`, {
        'Content-Type': 'application/json'
    }, {
        validityPeriod, additionalProperties
    });
    res.status(200).json(responseData);
};

module.exports = {
    loadApplications,
    loadThrottlingPolicies,
    loadApplication,
    loadApplicationForEdit,
    saveApplication,
    updateApplication,
    deleteApplication,
    resetThrottlingPolicy,
    generateAPIKeys
};