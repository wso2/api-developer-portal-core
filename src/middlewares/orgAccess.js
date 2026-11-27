/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
 * Organization resolution for the admin/REST API.
 *
 * Matches the organization named in the URL (:orgId or :orgHandle) with the
 * organizations of the signed-in user (session or bearer token). Platform clients
 * (API key, mTLS, config basic auth) are handled by enforceSecuirty().
 *
 * Kept free of config/DB requires so it can be unit tested without a server.
 */

const ORGANIZATION_CLAIM = 'orgClaimName';

/*
 * Core organization fields kept unchanged by PUT /organizations/:orgId from the
 * settings page. Body key -> DP_ORGANIZATION column.
 */
const LOCKED_ORG_FIELDS = {
    orgName: 'ORG_NAME',
    orgHandle: 'ORG_HANDLE',
    organizationIdentifier: 'ORGANIZATION_IDENTIFIER',
    roleClaimName: 'ROLE_CLAIM_NAME',
    groupsClaimName: 'GROUPS_CLAIM_NAME',
    organizationClaimName: 'ORGANIZATION_CLAIM_NAME',
    adminRole: 'ADMIN_ROLE',
    subscriberRole: 'SUBSCRIBER_ROLE',
    superAdminRole: 'SUPER_ADMIN_ROLE'
};

// The update DAO writes ORG_HANDLE = '' when orgHandle is missing, so it must be sent.
const REQUIRED_LOCKED_FIELDS = ['orgHandle'];

const normalize = (value) => (value === undefined || value === null ? '' : String(value).trim());

/**
 * Names of locked fields the request body would change on the given organization row.
 */
const getChangedLockedFields = (body, org) => {
    const payload = body || {};
    return Object.entries(LOCKED_ORG_FIELDS)
        .filter(([key, column]) => {
            if (payload[key] === undefined) {
                return REQUIRED_LOCKED_FIELDS.includes(key);
            }
            return normalize(payload[key]) !== normalize(org[column]);
        })
        .map(([key]) => key);
};

const addOrg = (set, value) => {
    if (typeof value === 'string' && value.trim() !== '') {
        set.add(value.trim());
    }
};

/**
 * The organization reference in the request path, or undefined when the route
 * is not organization scoped.
 */
const getTargetOrgRef = (req) => {
    const params = req.params || {};
    return params.orgId || params.orgHandle;
};

/**
 * Organization identifiers (matched against DP_ORGANIZATION.ORGANIZATION_IDENTIFIER)
 * of the signed-in user.
 *
 * @param {object|undefined} user          req.user from the session, if any
 * @param {object|undefined} tokenClaims   claims of the bearer token, when there is no session
 * @param {string|undefined} orgClaimName  name of the org claim in bearer tokens (config.orgIDClaim)
 */
const getCallerOrgs = (user, tokenClaims, orgClaimName) => {
    const orgs = new Set();
    if (user) {
        addOrg(orgs, user.userOrg);
        addOrg(orgs, user[ORGANIZATION_CLAIM]);
        if (Array.isArray(user.authorizedOrgs)) {
            user.authorizedOrgs.forEach((org) => addOrg(orgs, org));
        }
    } else if (tokenClaims) {
        addOrg(orgs, tokenClaims.organization?.uuid);
        if (orgClaimName) {
            addOrg(orgs, tokenClaims[orgClaimName]);
        }
        if (Array.isArray(tokenClaims.organizations)) {
            tokenClaims.organizations.forEach((org) => addOrg(orgs, typeof org === 'string' ? org : org?.uuid));
        }
    }
    return orgs;
};

/**
 * The organization the session is signed in to. Admin details on the session
 * (isAdmin) are for this organization.
 */
const getActiveOrg = (user) => {
    const org = user.userOrg || user[ORGANIZATION_CLAIM];
    return typeof org === 'string' ? org.trim() : '';
};

const isAdmin = (user) => Boolean(user.isAdmin || user.isSuperAdmin);

/**
 * Resolve the organization in the request path for the signed-in user.
 *
 * @param {object}   options
 * @param {object}   options.req
 * @param {object}   [options.tokenClaims]   decoded bearer token claims (no-session callers)
 * @param {string}   [options.orgClaimName]
 * @param {boolean}  [options.platformOnly]  route is reserved for platform callers
 * @param {boolean}  [options.adminOnly]     route is for administrators; a session user must be
 *                                           an admin of the organization they are signed in to
 * @param {boolean}  [options.lockOrgIdentity] reject body changes to LOCKED_ORG_FIELDS
 * @param {Function} options.findOrgsByRef   async (ref) => org rows matching the ref on any
 *                                           identifying column (ORG_ID, ORG_HANDLE, ORG_NAME,
 *                                           ORGANIZATION_IDENTIFIER)
 * @returns {Promise<{allowed: boolean, status?: number, reason?: string, targetOrgRef?: string}>}
 */
const checkOrgAccess = async ({ req, tokenClaims, orgClaimName, platformOnly, adminOnly, lockOrgIdentity, findOrgsByRef }) => {
    const user = req.user;

    if (platformOnly) {
        // Platform-level routes: available to a configured (local auth) super admin
        // session; other sessions and tokens go through platform clients.
        if (user && user.isLocalAuth && user.isSuperAdmin) {
            return { allowed: true };
        }
        return { allowed: false, status: 403, reason: 'platform-only route' };
    }

    const targetOrgRef = getTargetOrgRef(req);
    if (adminOnly && user && !isAdmin(user)) {
        return { allowed: false, status: 403, reason: 'admin role required', targetOrgRef };
    }
    if (!targetOrgRef) {
        return { allowed: true };
    }

    const callerOrgs = getCallerOrgs(user, tokenClaims, orgClaimName);
    if (callerOrgs.size === 0) {
        return { allowed: false, status: 403, reason: 'no user organization', targetOrgRef };
    }

    // Handlers look the value up by different columns, so every matching
    // organization must be one of the user's organizations.
    const orgs = await findOrgsByRef(targetOrgRef);
    if (!orgs || orgs.length === 0) {
        return { allowed: false, status: 403, reason: 'organization not found', targetOrgRef };
    }
    const ownsAll = orgs.every((org) => callerOrgs.has(org.ORGANIZATION_IDENTIFIER));
    if (!ownsAll) {
        return { allowed: false, status: 403, reason: 'organization does not match user', targetOrgRef };
    }
    if (adminOnly && user) {
        // The admin role is known for the signed-in organization only; the user
        // opens that organization's portal to manage it.
        const activeOrg = getActiveOrg(user);
        if (!activeOrg || !orgs.every((org) => org.ORGANIZATION_IDENTIFIER === activeOrg)) {
            return { allowed: false, status: 403, reason: 'not the signed-in organization', targetOrgRef };
        }
    }

    if (lockOrgIdentity) {
        // The update handler writes to the row whose ORG_ID is the path value.
        const org = orgs.find((row) => row.ORG_ID === targetOrgRef);
        if (!org) {
            return { allowed: false, status: 403, reason: 'organization not found', targetOrgRef };
        }
        const changed = getChangedLockedFields(req.body, org);
        if (changed.length > 0) {
            return {
                allowed: false,
                status: 403,
                reason: `core organization fields changed: ${changed.join(', ')}`,
                targetOrgRef
            };
        }
    }
    return { allowed: true, targetOrgRef };
};

module.exports = {
    LOCKED_ORG_FIELDS,
    checkOrgAccess,
    getCallerOrgs,
    getChangedLockedFields,
    getTargetOrgRef
};
