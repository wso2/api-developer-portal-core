/*
 * Template contexts shaped like the ones the controllers actually build.
 *
 * Hand-authored from the controller source - no customer data. Identity is
 * deliberately synthetic: handle "testorg", a zero UUID.
 *
 * Note the key is orgID with a capital ID. Upstream spells it orgId; getting this
 * wrong renders an empty string rather than failing loudly.
 */
const ORG_ID = '00000000-0000-0000-0000-000000000000';
const BASE_URL = '/testorg/views/default';

const base = {
    baseUrl: BASE_URL,
    orgID: ORG_ID,
    orgName: 'testorg',
    devportalMode: 'DEFAULT',
    profile: null,
    isAuthenticated: false,
    isReadOnlyMode: false,
    showApiWorkflowsNav: false,
    showPlatformApiKeysNav: false,
    portalConfigs: {},
};

const profile = {
    firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com',
    imageURL: '/images/profile.svg', isAdmin: false, isSuperAdmin: false,
};

// An API with image data, so tags and labels are exposed.
const apiWithImage = {
    apiID: 'api-0001',
    apiHandle: 'orders-api',
    apiInfo: {
        apiName: 'Orders API', apiDescription: 'Create and track orders.',
        apiVersion: '1.0.0', apiType: 'REST', visibility: 'PUBLIC', apiCategory: 'Commerce',
        gatewayType: 'wso2/api-platform',
    },
    apiImageMetadata: { api_icon: '/images/apis.svg' },
    tags: ['orders', 'commerce'],
    subscriptionPolicies: [{ policyName: 'Gold', policyID: 'pol-1' }],
};

// An API with NO image data. apiDTO nests tags and labels inside the image
// conditional, so this shape exposes neither - a real production case.
const apiWithoutImage = {
    apiID: 'api-0002',
    apiHandle: 'shipping-api',
    apiInfo: {
        apiName: 'Shipping API', apiDescription: 'Rates and labels.',
        apiVersion: '2.1.0', apiType: 'GRAPHQL', visibility: 'PUBLIC',
        gatewayType: 'wso2/api-platform',
    },
};

// An API on a non-platform gateway. This shape reaches the {{else}} branch of the
// listing's subscribed-flag block, which is currently a live crash - see the todo
// test in render.test.js.
const apiOnForeignGateway = {
    apiID: 'api-0003',
    apiHandle: 'legacy-api',
    apiInfo: {
        apiName: 'Legacy API', apiDescription: 'Fronted by a third-party gateway.',
        apiVersion: '1.0.0', apiType: 'REST', visibility: 'PUBLIC',
        gatewayType: 'aws',
    },
};

module.exports = {
    ORG_ID,
    apiOnForeignGateway,
    BASE_URL,
    profile,
    apiWithImage,
    apiWithoutImage,

    home: (over = {}) => ({ ...base, ...over }),

    apis: (over = {}) => ({
        ...base,
        apiMetadata: [apiWithImage, apiWithoutImage],
        tags: ['orders', 'commerce'],
        applications: [],
        ...over,
    }),

    apiLanding: (over = {}) => ({
        ...base,
        apiMetadata: apiWithImage,
        applications: [],
        provider: 'WSO2',
        providerUrl: 'https://wso2.com',
        subscriptionPlans: [{ policyName: 'Gold', policyID: 'pol-1', requestCount: 1000, timeUnit: 'min' }],
        platformSubscriptions: [],
        schemaUrl: `${BASE_URL}/api/orders-api/docs/specification`,
        loadDefault: true,
        resources: [{ target: '/orders', verb: 'GET' }],
        scopes: [],
        isFederatedAPI: false,
        ...over,
    }),

    // An API on a third-party gateway with plans on offer. This is the shape that
    // actually reaches the subscription plan cards: the partial only renders them when
    // the API is neither token-based-subscription nor on the platform gateway.
    apiLandingWithPlans: (over = {}) => ({
        ...base,
        apiMetadata: { ...apiWithImage, apiInfo: { ...apiWithImage.apiInfo, gatewayType: 'aws' } },
        applications: [],
        provider: 'WSO2',
        providerUrl: 'https://wso2.com',
        subscriptionPlans: [
            { policyID: 'pol-1', displayName: 'Gold', description: 'High volume', requestCount: 1000, timeUnit: 'min' },
            { policyID: 'pol-2', displayName: 'Silver', requestCount: 100, timeUnit: 'min' },
        ],
        platformSubscriptions: [],
        schemaUrl: `${BASE_URL}/api/orders-api/docs/specification`,
        loadDefault: true,
        resources: [{ target: '/orders', verb: 'GET' }],
        scopes: [],
        isFederatedAPI: false,
        ...over,
    }),

    docs: (over = {}) => ({
        ...base,
        docTypes: { HOWTO: [{ docName: 'getting-started', docId: 'doc-1' }] },
        apiType: 'REST',
        ...over,
    }),
};
