const { renderTemplate, renderTemplateFromAPI, renderGivenTemplate, loadLayoutFromAPI, validateIDP } = require('../utils/util');
const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const adminDao = require('../dao/admin');
const IdentityProviderDTO = require("../dto/identityProvider");
const constants = require('../utils/constants');

const loadSettingPage = async (req, res) => {

    let templateContent = {
        baseUrl: req.params.orgName,
    }
    const orgName = req.params.orgName;
    const organization = await adminDao.getOrganization(orgName);
    const orgID = organization.ORG_ID;
    const retrievedIDP = await adminDao.getIdentityProvider(orgID);
    if (retrievedIDP.length > 0) {
        templateContent.idp = new IdentityProviderDTO(retrievedIDP[0]);
    } else {
        templateContent.create = true;
    }
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'configure', 'configureDevportal.hbs');
    const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8); 
    const layoutResponse = await loadLayoutFromAPI(orgID)
    let html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
    res.send(html);
}

const storePortalSettings = async (req, res) => {

    try {
        const rules = validateIDP();
        for (let validation of rules) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        let orgName = req.body.orgName;
        let organization = await adminDao.getOrganization(orgName);
        let orgID = organization.ORG_ID;
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'configure', 'configureDevportal.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        const layoutResponse = await loadLayoutFromAPI(orgID)
        if (!errors.isEmpty()) {
            console.log("Validation errors: ", errors.array());
            let html = await renderGivenTemplate(templateResponse, layoutResponse, {
                create: true,
                errors: errors.array(),
                data: req.body // Pre-fill form with previous inputs
            });
            res.send(html);
        } else {
            console.log(req.body);
            const idpCreateResponse = await adminDao.createIdentityProvider(orgID, req.body);
            if (idpCreateResponse.dataValues) {
                console.log("IDP stored");
            }
            let html = await renderGivenTemplate(templateResponse, layoutResponse, {
                baseUrl: req.params.orgName,
                idp: new IdentityProviderDTO(idpCreateResponse.dataValues)
            });
            res.send(html);
        }
    } catch (error) {
        console.error(`Error while storing IDP settings: ${error}`);
        res.send("Error while storing IDP settings");
    }
}


module.exports = {
    loadSettingPage,
    storePortalSettings
};