const { renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config');
const cpToken = require(process.cwd() + '/cpToken');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

const filePrefix = config.pathToContent;
const controlPlaneUrl = config.controlPlaneUrl;
const token = cpToken.token;

// Create an HTTPS agent that bypasses certificate verification
// Will remove in production
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
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
    let html;
    if (config.mode === constants.DEV_MODE) {
        let metaData = await getMockApplication()
        let templateContent = {
            applicationMetadata: metaData,
            baseUrl: constants.BASE_URL + config.port
        }
        html = renderTemplate('../pages/application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        // let organization = await adminDao.getOrganization(orgName);
        // let metaData = await loadAPIMetaDataListFromAPI(organization.ORG_ID, orgName);
        // let templateContent = {
        //     apiMetadata: metaData,
        //     baseUrl: '/' + orgName
        // }
        // html = await renderTemplateFromAPI(templateContent, orgName, "pages/apis");
    }
    res.send(html);
}

async function getMockApplication() {
    const mockApplicationMetaDataPath = path.join(process.cwd(), filePrefix + '../mock/Applications/DefaultApplication', 'DefaultApplication.json');
    const mockApplicationMetaData = JSON.parse(fs.readFileSync(mockApplicationMetaDataPath, 'utf-8'));
    return mockApplicationMetaData;
}

module.exports = {
    loadApplications,
    loadThrottlingPolicies,
    loadApplication
};