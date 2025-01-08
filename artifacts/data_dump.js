const adminDao = require('../src/dao/admin');
const util = require('../src/utils/util');
const { Sequelize } = require("sequelize");
const sequelize = require("../src/db/sequelize");
const apiDao = require("../src/dao/apiMetadata");
const constants = require('../src/utils/constants');
const fs = require('fs');

async function createOrgContent(orgId, path) {
    try {
        console.log('Creating org content for orgId: ', orgId);
        const files = await util.readFilesInDirectory(path, orgId, "http", "localhost:3000");
        for (const { filePath, fileName, fileContent, fileType } of files) {
            await createContent(filePath, fileName, fileContent, fileType, orgId);
        }
    } catch (error) {
        console.log(`${constants.ERROR_MESSAGE.ORG_CONTENT_CREATE_ERROR}, ${error}`);
    }
}

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

async function createDefaultOrg() {

    try {
        const orgData = {
            "orgName": "ACME",
            "businessOwner": "",
            "businessOwnerContact": "",
            "businessOwnerEmail": "",
            "devPortalURLIdentifier": "ACME", //customize URL for the devportal.  
            "roleClaimName": "roles",
            "groupsClaimName": "groups",
            "organizationClaimName": "organizationID",
            "organizationIdentifier": "ACME",
            "adminRole": "admin",
            "subscriberRole": "subscriber",
            "superAdminRole": "superAdmin"
        };
        const organization = await adminDao.createOrganization(orgData);
        if (organization) {
            return organization.ORG_ID;
        }
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.ORG_CREATE_ERROR}, ${error}`);
    }
}

async function createAPIMetadata(mockAPIDataPath, orgId, apiDefinitionPath, apiFileName) {

    try {
        // Read api metadata
        let apiMetadata = JSON.parse(fs.readFileSync(mockAPIDataPath, constants.CHARSET_UTF8));
        let apiDefinitionFile, apiName, apiID = "";
        if (fs.existsSync(apiDefinitionPath)) {
            apiDefinitionFile = await fs.readFileSync(apiDefinitionPath, constants.CHARSET_UTF8);
        }
        await sequelize.transaction(async (t) => {
            // Create apimetadata record
            const createdAPI = await apiDao.createAPIMetadata(orgId, apiMetadata, t);
            apiID = createdAPI.dataValues.API_ID;
            apiName = createdAPI.dataValues.API_NAME;
            if (apiMetadata.subscriptionPolicies) {
                const subscriptionPolicies = apiMetadata.subscriptionPolicies;
                if (!Array.isArray(subscriptionPolicies)) {
                    throw new Sequelize.ValidationError(
                        "Missing or Invalid fields in the request payload"
                    );
                }
                await apiDao.createSubscriptionPolicy(subscriptionPolicies, apiID, orgId, t);
            }
            // store api definition file
            await apiDao.storeAPIFile(apiDefinitionFile, apiFileName, apiID, orgId, t);
            apiMetadata.apiID = apiID;
        });
        console.log(`API metadata created for api: ${apiName}`);
        return apiID;
    } catch (error) {
        console.log(error);
        console.error(`${constants.ERROR_MESSAGE.API_CREATE_ERROR}, ${error}`);
    }
}

async function createAPIContent(apiId, orgId, imageName, apiName) {

    try {
        let imageMetadata = {
            "api-icon": imageName
        }
        const contentPath = "./artifacts/default/apiContent/" + apiName + "/content";
        const imagesPath =  "./artifacts/default/apiContent/" + apiName + "/images";

       
        //get api files
        let apiContent = await util.getAPIFileContent(contentPath);
        //get api images
        const apiImages = await util.getAPIImages(imagesPath);
        apiContent.push(...apiImages);

        await sequelize.transaction(async (t) => {
            //check whether api belongs to given org
            let apiMetadata = await apiDao.getAPIMetadata(orgId, apiId, t);
            if (apiMetadata) {
                // Store image metadata
                await apiDao.storeAPIImageMetadata(imageMetadata, apiId, t);
                await apiDao.storeAPIFiles(apiContent, apiId, t);
            } else {
                throw new Sequelize.ValidationError(constants.ERROR_MESSAGE.API_NOT_IN_ORG);
            }
        });
        console.log(`API content created for api: ${apiName}`);
    } catch (error) {
        console.error(`${constants.ERROR_MESSAGE.API_CONTENT_CREATE_ERROR}, ${error}`);
    }
}

(async () => {
    const orgID = await createDefaultOrg();
    await createOrgContent(orgID, './artifacts/default/orgContent');

    let apiID = await createAPIMetadata('./artifacts/default/apiContent/AccommodationAPI/apiMetadata.json', orgID, './artifacts/default/apiContent/AccommodationAPI/apiDefinition.json', 'apiDefinition.json');
    await createAPIContent(apiID, orgID, 'accommodation.jpeg', 'AccommodationAPI');

    apiID = await createAPIMetadata('./artifacts/default/apiContent/CountriesAPI/apiMetadata.json', orgID, './artifacts/default/apiContent/CountriesAPI/apiDefinition.graphql', 'apiDefinition.json');
    await createAPIContent(apiID, orgID, 'countries.jpeg', 'CountriesAPI');

    apiID = await createAPIMetadata('./artifacts/default/apiContent/LeisureActivitiesAPI/apiMetadata.json', orgID, './artifacts/default/apiContent/LeisureActivitiesAPI/apiDefinition.xml', 'apiDefinition.xml');
    await createAPIContent(apiID, orgID, 'leisure.jpeg', 'LeisureActivitiesAPI');

    apiID = await createAPIMetadata('./artifacts/default/apiContent/NavigationAPI/apiMetadata.json', orgID, './artifacts/default/apiContent/NavigationAPI/apiDefinition.json', 'apiDefinition.json');
    await createAPIContent(apiID, orgID, 'navigation.jpeg', 'NavigationAPI');

})();