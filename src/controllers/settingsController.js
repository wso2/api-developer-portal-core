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
const { renderGivenTemplate, loadLayoutFromAPI } = require('../utils/util');
const fs = require('fs');
const path = require('path');
const adminDao = require('../dao/admin');
const IdentityProviderDTO = require("../dto/identityProvider");
const config = require(process.cwd() + '/config.json');
const constants = require('../utils/constants');
const adminService = require('../services/adminService');

const loadSettingPage = async (req, res) => {

    let orgID;
    const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'configure', 'page.hbs');
    const layoutPath = path.join(require.main.filename, '..', 'pages', 'layout', 'main.hbs');
    //retrieve orgID from the user object
    if (req.user) {
        orgID = req.user[constants.ORG_ID];
    }

    let templateContent = {
        baseUrl: req.params.orgName,
        orgID: orgID
    }
    try {
        const retrievedIDP = await adminDao.getIdentityProvider(orgID);
        if (retrievedIDP.length > 0) {
            templateContent.idp = new IdentityProviderDTO(retrievedIDP[0]);
        } else {
            templateContent.create = true;
        }
        let layoutResponse = await loadLayoutFromAPI(orgID)
        if (layoutResponse === "") {
            layoutResponse = fs.readFileSync(layoutPath, constants.CHARSET_UTF8);
        }
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        //TODO: fetch view names from DB
        const file = await adminService.getOrgContent(orgID, 'layout', 'main.hbs', 'layout');
        let views;
        if (file !== null) {
            views = [{
                'name': 'Default'
            }]
        }
        if (views.length > 0) {
            templateContent.content = true;
            templateContent.views = views;
        }
        let html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        res.send(html);
    } catch (error) {
        console.error(`Error while loading content from DB: ${error}`);
    }
}

const createOrganization = async (req, res) => {

    try {
        const templateContent = {
            'orgID': req.user[constants.ORG_ID],
            'profile': req.user
        }
        //fetch all created organizations
        const organizations = await adminService.getAllOrganizations();
        if (organizations.length !== 0) {
            templateContent.organizations = organizations;
        }
        const completeTemplatePath = path.join(require.main.filename, '..', 'pages', 'portal', 'page.hbs');
        const layoutPath = path.join(require.main.filename, '..', 'pages', 'layout', 'main.hbs');
        const templateResponse = fs.readFileSync(completeTemplatePath, constants.CHARSET_UTF8);
        const layoutResponse = fs.readFileSync(layoutPath, constants.CHARSET_UTF8);
        const html = await renderGivenTemplate(templateResponse, layoutResponse, templateContent);
        res.send(html);
    } catch (error) {
        console.error(`Error while loading setting page: ${error}`);
    }
}

module.exports = {
    loadSettingPage,
    createorganization: createOrganization
};