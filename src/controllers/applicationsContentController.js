const { renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config');
const cpToken = require(process.cwd() + '/cpToken');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

const filePrefix = config.pathToContent;
const certPath = path.join(process.cwd(), config.certificate.path);
const certPassword = config.certificate.password;
const controlPlaneUrl = config.controlPlaneUrl;
const token = cpToken.token;

const httpsAgent = new https.Agent({
    ca: fs.readFileSync(certPath),
    rejectUnauthorized: true,
});

// ***** Load Applications *****

const loadApplications = async (req, res) => {
    const orgName = req.params.orgName;
    let html, metaData, templateContent;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplications();
        templateContent = {
            applicationsMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
    }
    else {
        console.log('/' + orgName);
        metaData = await getAPIMApplications();
        templateContent = {
            applicationsMetadata: metaData,
            baseUrl: '/' + orgName
        }
    }
    html = renderTemplate('../pages/applications/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    res.send(html);
}

async function getMockApplications() {
    const mockApplicationsMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'applications.json');
    const mockApplicationsMetaData = JSON.parse(fs.readFileSync(mockApplicationsMetaDataPath, 'utf-8'));
    return mockApplicationsMetaData.list;
}

async function getAPIMApplications() {
    try {
        const response = await axios({
            method: 'GET',
            url: controlPlaneUrl + '/applications',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            httpsAgent
        });
        return response.data.list;
    } catch (error) {
        console.error('Error fetching applications:', error.message);
    }
}

// ***** Load Throttling Policies *****

const loadThrottlingPolicies = async (req, res) => {
    const orgName = req.params.orgName;
    let html, metaData, templateContent;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockThrottlingPolicies();
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
    }
    else {
        metaData = await getAPIMThrottlingPolicies();
        templateContent = {
            throttlingPoliciesMetadata: metaData,
            baseUrl: '/' + orgName
        }
    }
    html = renderTemplate('../pages/add-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    res.send(html);
}

async function getMockThrottlingPolicies() {
    const mockThrottlingPoliciesMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications', 'throttlingPolicies.json');
    const mockThrottlingPoliciesMetaData = JSON.parse(fs.readFileSync(mockThrottlingPoliciesMetaDataPath, 'utf-8'));
    return mockThrottlingPoliciesMetaData.list;
}

async function getAPIMThrottlingPolicies() {
    try {
        const response = await axios({
            method: 'GET',
            url: controlPlaneUrl + '/throttling-policies/application',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            httpsAgent
        });
        return response.data.list;
    } catch (error) {
        console.error('Error fetching throttling policies:', error.message);
    }
}

// ***** Load Application *****

const loadApplication = async (req, res) => {
    const orgName = req.params.orgName;
    const applicationId = req.params.applicationid;
    let html, templateContent, metaData;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplication();
        templateContent = {
            applicationMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
    } else {
        metaData = await getAPIMApplication(applicationId);
        templateContent = {
            applicationMetadata: metaData,
            baseUrl: '/' + orgName
        }
    }
    html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    res.send(html);
}

const loadApplicationForEdit = async (req, res) => {
    const orgName = req.params.orgName;
    const applicationId = req.params.applicationid;
    let html, templateContent, metaData;
    if (config.mode === constants.DEV_MODE) {
        metaData = await getMockApplication();
        throttlingMetaData = await getMockThrottlingPolicies();
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: constants.BASE_URL + config.port
        }
    } else {
        metaData = await getAPIMApplication(applicationId);
        throttlingMetaData = await getAPIMThrottlingPolicies();
        templateContent = {
            applicationMetadata: metaData,
            throttlingPoliciesMetadata: throttlingMetaData,
            baseUrl: '/' + orgName
        }
    }
    html = renderTemplate('../pages/edit-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    res.send(html);
}

async function getMockApplication() {
    const mockApplicationMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'DefaultApplication.json');
    const mockApplicationMetaData = JSON.parse(fs.readFileSync(mockApplicationMetaDataPath, 'utf-8'));
    return mockApplicationMetaData;
}

async function getAPIMApplication(applicationId) {
    try {
        const response = await axios({
            method: 'GET',
            url: controlPlaneUrl + '/applications/' + applicationId,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            httpsAgent
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching application:', error.message);
    }
}

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    try {
        const { name, throttlingPolicy, description } = req.body;
        const response = await axios.post(
            `${controlPlaneUrl}/applications`,
            {
                name,
                throttlingPolicy,
                description,
                tokenType: 'JWT',
                groups: [],
                attributes: {},
                subscriptionScopes: []
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                httpsAgent,
            }
        );
        res.status(200).json({ message: response.data.message });
    } catch (error) {
        console.error('Error saving application:', error.message);
        res.status(500).json({ error: 'Failed to save application' });
    }
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    try {
        const { name, throttlingPolicy, description } = req.body;
        const applicationId = req.params.applicationid;
        const response = await axios.put(
            `${controlPlaneUrl}/applications/${applicationId}`,
            {
                name,
                throttlingPolicy,
                description,
                tokenType: 'JWT',
                groups: [],
                attributes: {},
                subscriptionScopes: []
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                httpsAgent,
            }
        );
        res.status(200).json({ message: response.data.message });
    } catch (error) {
        console.error('Error updating application:', error.message);
        res.status(500).json({ error: 'Failed to update application' });
    }
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const response = await axios.delete(
            `${controlPlaneUrl}/applications/${applicationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                httpsAgent,
            }
        );
        res.status(200).json({ message: response.data.message });
    } catch (error) {
        console.error('Error deleting application:', error.message);
        res.status(500).json({ error: 'Failed to delete application' });
    }
}

// ***** Save Application *****

const resetThrottlingPolicy = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const { userName } = req.body;
        const response = await axios.post(
            `${controlPlaneUrl}/applications/${applicationId}/reset-throttle-policy`,
            {
                userName
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                httpsAgent,
            }
        );
        console.log('Throttling policy reset successfully.');
        res.status(200).json({ message: response.data.message });
    } catch (error) {
        console.error('Error reseting throttling policy:', error.message);
        res.status(500).json({ error: 'Failed to reset the throttling policy' });
    }
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationid;
        const environment = req.params.env;
        const { validityPeriod, additionalProperties } = req.body;

        const response = await axios.post(
            `${controlPlaneUrl}/applications/${applicationId}/api-keys/${environment}/generate`,
            {
                validityPeriod, additionalProperties
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                httpsAgent,
            }
        );
        console.log('API Key generated successfully.');
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error generating API Key:', error.message);
        res.status(500).json({ error: 'Failed to generate API key' });
    }
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