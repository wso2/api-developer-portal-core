/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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
const adminService = require('../services/adminService');
const adminDao = require('../dao/admin');
const apiDao = require("../dao/apiMetadata");
const util = require('../utils/util');
const config = require(process.cwd() + '/config');
const controlPlaneUrl = config.controlPlane.url;
const constants = require('../utils/constants');
const { validationResult } = require('express-validator');
const { retrieveContentType } = require('../utils/util');
const sequelize = require("../db/sequelize");
const { CustomError } = require("../utils/errors/customErrors");
const subscriptionPolicyDTO = require("../dto/subscriptionPolicy");

const getOrganization = async (req, res) => {

    try {
        const organization = await getOrganizationDetails(req.params.orgId);
        res.status(200).json(organization);
    } catch (error) {
        util.handleError(res, error);
    }
};

const getOrganizationDetails = async (orgId) => {

    const organization = await adminDao.getOrganization(orgId);
    return {
        orgId: organization.ORG_ID,
        orgName: organization.ORG_NAME,
        businessOwner: organization.BUSINESS_OWNER,
        businessOwnerContact: organization.BUSINESS_OWNER_CONTACT,
        businessOwnerEmail: organization.BUSINESS_OWNER_EMAIL,
        orgHandle: organization.ORG_HANDLE,
        roleClaimName: organization.ROLE_CLAIM_NAME,
        groupsClaimName: organization.GROUPS_CLAIM_NAME,
        organizationClaimName: organization.ORGANIZATION_CLAIM_NAME,
        organizationIdentifier: organization.ORGANIZATION_IDENTIFIER,
        adminRole: organization.ADMIN_ROLE,
        superAdminRole: organization.SUPER_ADMIN_ROLE,
        subscriberRole: organization.SUBSCRIBER_ROLE,
        groupClaimName: organization.GROUP_CLAIM_NAME
    };
}

const getOrgContent = async (req, res) => {

    try {
        const rules = util.validateRequestParameters();
        for (let validation of rules) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(util.getErrors(errors));
        }
        if (req.query.fileType && req.query.fileName) {
            const asset = await adminService.getOrgContent(req.params.orgId, req.params.name, req.query.fileType, req.query.fileName, req.query.filePath);
            if (asset) {
                const contentType = asset ? retrieveContentType(asset.FILE_NAME, asset.FILE_TYPE) : "";
                res.set(constants.MIME_TYPES.CONYEMT_TYPE, contentType);
                return res.status(200).send(Buffer.isBuffer(asset.FILE_CONTENT) ? asset.FILE_CONTENT : constants.CHARSET_UTF8);
            }
        } else if (req.params.fileType) {
            const assets = await adminService.getOrgContent(req.params.orgId, req.params.name, req.params.fileType);
            const results = [];
            for (const asset of assets) {
                const resp = {
                    orgId: asset.ORG_ID,
                    fileName: asset.FILE_NAME,
                    fileContent: asset.FILE_CONTENT ? asset.FILE_CONTENT.toString(constants.CHARSET_UTF8) : null
                };
                results.push(resp);
            }
            return res.status(200).send(results);
        } else {
            res.status(400).send('Invalid request');
        }
    } catch (error) {
        console.error(`Error while fetching organization content:`, error);
        res.status(404).send(error.message);
    }
};

const createSubscriptionPolicyFromListByName = async (subscriptionPolicies, policyName) => {
    let createdPolicy;
    await sequelize.transaction(async (t) => {
        for (const policy of subscriptionPolicies) {
            if (policy.policyName === policyName) {
                const created = await apiDao.createSubscriptionPolicy(orgId, policy, t);
                if (!created) {
                    throw new CustomError(
                        500,
                        constants.ERROR_CODE[500],
                        `Failed to create policy: ${policy.policyName || "unknown"}`
                    );
                }
                createdPolicy = new subscriptionPolicyDTO(created);
                break;
            }
        }
    });
    return createdPolicy;
};

// ***** Get CP Subscription Policies for Organization *****

const getCPSubPolicies = async (req, orgIdentifier) => {
    const subPoliciesUrl = `${controlPlaneUrl}/throttling-policies/subscription?organizationId=${orgIdentifier}`
    const responseData = await invokeApiRequest(req, 'GET', subPoliciesUrl, null, null);
    if (!responseData?.list || !Array.isArray(responseData.list)) {
        throw new Error("Invalid subscription policies response format");
    }
    return responseData.list.map(item => ({
        policyName: item.name,
        displayName: item.displayName,
        billingPlan: item.tierPlan,
        description: item.description,
        type: item.quotaPolicyType,
        timeUnit: item.timeUnit,
        unitTime: item.unitTime,
        requestCount: item.requestCount,
        dataAmount: null,
        dataUnit: item.dataUnit,
        EventCount: null
    }));   
}

// ***** getSubscriptionPolicyByName Interceptor *****

const getSubPolicyByName = async (req, orgId, policyName) => {
    try {
        let subscriptionPolicy = await apiDao.getSubscriptionPolicyByName(orgId, policyName);
        if (!subscriptionPolicy) {
            // Since sub-policy cannot be found, check CP for the sub-policy
            const { ORGANIZATION_IDENTIFIER: orgIdentifier } = await adminDao.getOrganization(orgId);
            const cPSubPolicies = await getCPSubPolicies(req, orgIdentifier);
            if (!cPSubPolicies) {
                // Sub-policies not available in CP for the org
                return null;
            }
            const response = await createSubscriptionPolicyFromListByName(cPSubPolicies, policyName);
            if (!response) {
                // Matching sub-policy (name) was not found from CP to add
                return null;
            }
            // Again get sub-policy since matching Sub-policy was added from CP
            subscriptionPolicy = await apiDao.getSubscriptionPolicyByName(orgId, policyName);       
        } 
        return subscriptionPolicy;
    } catch (error) {
        console.error("Error occurred while getting Subscription Policy by name", error);
        util.handleError(res, error);
    }
}

module.exports = {
    getOrgContent,
    getOrganization,
    getOrganizationDetails,
    getSubPolicyByName
};
