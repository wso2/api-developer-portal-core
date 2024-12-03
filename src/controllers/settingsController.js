/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable no-undef */
const { renderTemplate, renderGivenTemplate, loadLayoutFromAPI, validateIDP } = require('../utils/util');
const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const adminDao = require('../dao/admin');
const IdentityProviderDTO = require("../dto/identityProvider");
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminService = require('../services/adminService');

const loadSettingPage = async (req, res) => {

    //retrieve orgID from the user object
    const orgID = req.user[config.orgID_claim_name];
    let templateContent = {
        baseUrl: req.params.orgName,
        orgID: orgID
    }
    const completeTemplatePath = path.join('src', 'pages', 'configure', 'page.hbs');
    try {
        const retrievedIDP = await adminDao.getIdentityProvider(orgID);
        if (retrievedIDP.length > 0) {
            templateContent.idp = new IdentityProviderDTO(retrievedIDP[0]);
        } else {
            templateContent.create = true;
        }
        const layoutResponse = await loadLayoutFromAPI(orgID)
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        console.log('Loading content from API')
        //TODO: fetch view names from DB
        const views = [{
            'name': 'Default'
        }]
        if (views.length > 0) {
            templateContent.content = true;
            templateContent.views = views;
        }
        let html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        res.send(html);
    } catch (error) {
        console.error(`Error while loading content from DB: ${error}`);
        // loading main template from file since no org content uploaded
        const layoutPath = path.join('src', 'pages', 'layout', 'main.hbs');
        html = renderTemplate(completeTemplatePath, layoutPath, templateContent);
        res.send(html);
        console.error(`Error while loading setting page: ${error}`);
    }
}

const identityprovider = async (req, res) => {

    try {
        const rules = validateIDP();
        for (let validation of rules) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        //let orgName = req.body.orgName;
        let orgID = req.user[config.orgID_claim_name];
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'configure', 'page.hbs');
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

const createorganization = async (req, res) => {

    try {
        const completeTemplatePath = path.join('src', 'pages', 'createOrg', 'page.hbs');
        const layoutPath = path.join('src', 'pages', 'layout', 'main.hbs');
        const templateContent = {
            'orgID': req.user[config.orgID_claim_name],
        }
        //fetch all created organizations
        const organizations = await adminService.getAllOrganizations();
        if(organizations.length !== 0){
            console.log("Organizations retrieved");
            templateContent.organizations = organizations;
        }
        const html = await renderTemplate(completeTemplatePath, layoutPath, templateContent);
        res.send(html);
    } catch (error) {
        console.error(`Error while loading setting page: ${error}`);
    }

}

module.exports = {
    loadSettingPage,
    identityprovider,
    createorganization
};