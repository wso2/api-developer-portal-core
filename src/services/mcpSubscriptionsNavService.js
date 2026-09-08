/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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

/*
 * Whether the sidebar's MCP accordion should carry a Subscriptions item.
 *
 * The API accordion offers Subscriptions unconditionally; the MCP one never did, even
 * though /mcp/<handle>/subscriptions has existed since the MCP overview grew its own
 * Subscribe button. This decides when to close that gap.
 *
 * The test is "this MCP has a subscription plan associated", which is also what keeps the
 * item away from deployments that do not sell subscriptions at all: no plans, no item. It
 * is deliberately not a deployment-type flag - there is no such flag to read, and a
 * per-artifact test degrades correctly either way.
 *
 * Two shapes reach this, so both are handled: the overview page passes an APIDTO, whose
 * plans sit on `subscriptionPolicies`; the documentation pages pass the raw Sequelize row
 * from apiDao.getAPIMetadata, whose include is aliased DP_SUBSCRIPTION_POLICies (and
 * DP_API_SUBSCRIPTION_POLICY on the raw-SQL path). apiDTO.js reads the same pair for the
 * same reason.
 */
const constants = require('../utils/constants');

/** API_TYPE across the DTO shape, the raw row, and a plain templateContent field. */
function resolveApiType(source) {
    const row = source?.dataValues || source || {};
    return source?.apiInfo?.apiType || source?.apiType || row.API_TYPE || null;
}

function resolveSubscriptionPlans(source) {
    const row = source?.dataValues || source || {};
    return source?.subscriptionPolicies
        || source?.subscriptionPolicyDetails
        || row.DP_SUBSCRIPTION_POLICies
        || row.DP_API_SUBSCRIPTION_POLICY
        || null;
}

/**
 * @param {object} source APIDTO, a getAPIMetadata row, or anything carrying both an API
 *                        type and its subscription policies.
 * @returns {boolean} true only for an MCP server that has at least one plan.
 */
function shouldShowMcpSubscriptionsNav(source) {
    if (!source) return false;
    if (resolveApiType(source) !== constants.API_TYPE.MCP) return false;
    const plans = resolveSubscriptionPlans(source);
    return Array.isArray(plans) && plans.length > 0;
}

module.exports = {
    shouldShowMcpSubscriptionsNav,
};
