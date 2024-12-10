const { renderTemplate, renderGivenTemplate, loadLayoutFromAPI, invokeApiRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const constants = require('../utils/constants');
const path = require('path');
const fs = require('fs');
const adminDao = require('../dao/admin');
const util = require('../utils/util');
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
        metaData = await getAPIMApplications();
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

async function getAPIMApplications() {
    const responseData = await invokeApiRequest('GET', controlPlaneUrl + '/applications', null, null);
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
        metaData = await getAPIMThrottlingPolicies();
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

async function getAPIMThrottlingPolicies() {
    const responseData = await invokeApiRequest('GET', controlPlaneUrl + '/throttling-policies/application', null, null);
    return responseData.list;
}

// ***** Load Application *****

const loadApplication = async (req, res) => {
    try {
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
            metaData = await getAPIMApplication(applicationId);
            const allApis = await getAllAPIs();
            const subApis = await getSubscribedApis(applicationId);
            const subApiMap = new Map();
            subApis.list.forEach(subApi => subApiMap.set(subApi.apiId, { policy: subApi.throttlingPolicy, id: subApi.subscriptionId }));
            const apiList = [];

            allApis.list.forEach(api => {
                let subscriptionPolicies = [];
                let subscribedPolicy;

                if (subApiMap.has(api.id)) {
                    subscribedPolicy = subApiMap.get(api.id)
                } else {
                    api.throttlingPolicies.forEach(policy => {
                        subscriptionPolicies.push(policy);
                    });
                }

                apiList.push({
                    name: api.name,
                    id: api.id,
                    isSubAvailable: api.isSubscriptionAvailable,
                    subscriptionPolicies: subscriptionPolicies,
                    subscribedPolicy: subscribedPolicy
                });

            });

            kMmetaData = await getAPIMKeyManagers();
            templateContent = {
                applicationMetadata: metaData,
                keyManagersMetadata: kMmetaData,
                baseUrl: '/' + orgName,
                apis: apiList
            }
            const templateResponse = await templateResponseValue('application');
            const layoutResponse = await loadLayoutFromAPI(orgID);
            html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        }

        res.send(html);
    } catch (error) {
        console.error("Error occurred while loading application", error);
        util.handleError(res, error);
    }
}


async function getAllAPIs() {
    try {
        return await util.invokeApiRequest('GET', `${controlPlaneUrl}/apis`);
    } catch (error) {
        console.error("Error occurred while loading APIs", error);
        throw error;
    }
}

const getSubscribedApis = async (appId) => {
    try {
        return await util.invokeApiRequest('GET', `${controlPlaneUrl}/subscriptions?applicationId=${appId}`);
    } catch (error) {
        console.error("Error occurred while loading subscriptions", error);
        throw error;
    }
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
        html = renderTemplate('../pages/edit-application/page.hbs', filePrefix + 'layout/main.hbs', templateContent, true);
    } else {
        const orgName = req.params.orgName;
        const orgID = await orgIDValue(orgName);
        metaData = await getAPIMApplication(applicationId);
        throttlingMetaData = await getAPIMThrottlingPolicies();
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

async function getAPIMApplication(applicationId) {
    const responseData = await invokeApiRequest('GET', controlPlaneUrl + '/applications/' + applicationId, null, null);
    return responseData;
}

async function getAPIMKeyManagers() {
    const responseData = await invokeApiRequest('GET', controlPlaneUrl + '/key-managers', null, null);
    return responseData.list;
}

module.exports = {
    loadApplications,
    loadThrottlingPolicies,
    loadApplication,
    loadApplicationForEdit
};