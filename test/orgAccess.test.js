/*
 * Organization resolution for the /devportal admin routes and /registry writes.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkOrgAccess, getCallerOrgs, getChangedLockedFields } = require('../src/middlewares/orgAccess');

const ORG_A = {
    ORG_ID: 'aaaaaaaa-0000-0000-0000-00000000000a',
    ORG_NAME: 'orga',
    ORG_HANDLE: 'orga',
    ORGANIZATION_IDENTIFIER: 'choreo-org-a',
    ROLE_CLAIM_NAME: null,
    GROUPS_CLAIM_NAME: null,
    ORGANIZATION_CLAIM_NAME: null,
    ADMIN_ROLE: 'admin',
    SUBSCRIBER_ROLE: 'Internal/subscriber',
    SUPER_ADMIN_ROLE: null
};
const ORG_B = {
    ORG_ID: 'bbbbbbbb-0000-0000-0000-00000000000b',
    ORG_NAME: 'orgb',
    ORG_HANDLE: 'orgb',
    ORGANIZATION_IDENTIFIER: 'choreo-org-b'
};
const ORGS = [ORG_A, ORG_B];

const matchesRef = (org, ref) =>
    [org.ORG_ID, org.ORG_HANDLE, org.ORG_NAME, org.ORGANIZATION_IDENTIFIER].includes(ref);

// Mirrors adminDao.findOrganizationsByAnyRef.
const findOrgsByRef = async (ref) => ORGS.filter((org) => matchesRef(org, ref));

const sessionUser = (org, extra = {}) => ({ userOrg: org, authorizedOrgs: [org], ...extra });

const check = (req, options = {}) => checkOrgAccess({ req, findOrgsByRef, orgClaimName: 'organizationID', ...options });

test('session user resolves to their own organization', async () => {
    const decision = await check({ params: { orgId: ORG_A.ORG_ID }, user: sessionUser('choreo-org-a') });
    assert.equal(decision.allowed, true);
});

test('session user does not resolve to a different organization', async () => {
    const decision = await check({ params: { orgId: ORG_A.ORG_ID }, user: sessionUser('choreo-org-b') });
    assert.equal(decision.allowed, false);
    assert.equal(decision.status, 403);
});

test('user with several organizations resolves to any of them', async () => {
    const user = { userOrg: 'choreo-org-b', authorizedOrgs: ['choreo-org-a', 'choreo-org-b'] };
    assert.equal((await check({ params: { orgId: ORG_A.ORG_ID }, user })).allowed, true);
});

test('registry routes resolve the organization by handle', async () => {
    const other = await check({ params: { orgHandle: 'orga' }, user: sessionUser('choreo-org-b') });
    assert.equal(other.allowed, false);
    const own = await check({ params: { orgHandle: 'orgb' }, user: sessionUser('choreo-org-b') });
    assert.equal(own.allowed, true);
});

test('token claims are used when there is no session', async () => {
    const req = { params: { orgId: ORG_A.ORG_ID } };
    const other = await check(req, { tokenClaims: { organization: { uuid: 'choreo-org-b' } } });
    assert.equal(other.allowed, false);
    const own = await check(req, { tokenClaims: { organizationID: 'choreo-org-a' } });
    assert.equal(own.allowed, true);
});

test('user without an organization is not resolved', async () => {
    const decision = await check({ params: { orgId: ORG_A.ORG_ID }, user: {} });
    assert.equal(decision.allowed, false);
});

test('unknown organization reference is not resolved', async () => {
    const decision = await check({ params: { orgId: 'does-not-exist' }, user: sessionUser('choreo-org-b') });
    assert.equal(decision.allowed, false);
});

test('reference matching more than one organization must match all of the user organizations', async () => {
    const orgBWithSameName = { ...ORG_B, ORG_NAME: ORG_A.ORG_ID };
    const decision = await checkOrgAccess({
        req: { params: { orgId: ORG_A.ORG_ID }, user: sessionUser('choreo-org-b') },
        findOrgsByRef: async (ref) => [ORG_A, orgBWithSameName].filter((org) => matchesRef(org, ref))
    });
    assert.equal(decision.allowed, false);
});

test('routes without an organization in the path are not resolved', async () => {
    const decision = await check({ params: {}, user: sessionUser('choreo-org-b') });
    assert.equal(decision.allowed, true);
});

test('platform-level routes are not available to IdP sessions or tokens', async () => {
    const idpSuperAdmin = await check({ params: {}, user: sessionUser('choreo-org-b', { isSuperAdmin: true }) }, { platformOnly: true });
    assert.equal(idpSuperAdmin.allowed, false);
    const bearer = await check({ params: {} }, { platformOnly: true, tokenClaims: { organization: { uuid: 'choreo-org-b' } } });
    assert.equal(bearer.allowed, false);
});

test('platform-level routes are available to a configured super admin', async () => {
    const user = sessionUser('ACME', { isLocalAuth: true, isSuperAdmin: true });
    assert.equal((await check({ params: {}, user }, { platformOnly: true })).allowed, true);
});

test('organization update keeps core fields and accepts business details', async () => {
    const body = {
        orgName: 'orga', orgHandle: 'orga', organizationIdentifier: 'choreo-org-a',
        roleClaimName: '', groupsClaimName: '', organizationClaimName: '',
        adminRole: 'admin', subscriberRole: 'Internal/subscriber', superAdminRole: '',
        businessOwner: 'New Owner', businessOwnerEmail: 'owner@example.com'
    };
    const decision = await check({ params: { orgId: ORG_A.ORG_ID }, user: sessionUser('choreo-org-a'), body }, { lockOrgIdentity: true });
    assert.equal(decision.allowed, true);
});

test('organization update does not change core fields', async () => {
    const base = { orgName: 'orga', orgHandle: 'orga' };
    for (const change of [
        { organizationIdentifier: 'choreo-org-c' },
        { orgHandle: 'orga-renamed' },
        { orgName: 'orgb' },
        { adminRole: 'Internal/everyone' }
    ]) {
        const req = { params: { orgId: ORG_A.ORG_ID }, user: sessionUser('choreo-org-a'), body: { ...base, ...change } };
        const decision = await check(req, { lockOrgIdentity: true });
        assert.equal(decision.allowed, false, JSON.stringify(change));
    }
});

test('organization update requires the current handle', () => {
    assert.deepEqual(getChangedLockedFields({ businessOwner: 'x' }, ORG_A), ['orgHandle']);
});

test('user organizations ignore empty and non-string values', () => {
    const orgs = getCallerOrgs({ userOrg: '', authorizedOrgs: ['choreo-org-a', null, 7] });
    assert.deepEqual([...orgs], ['choreo-org-a']);
});
