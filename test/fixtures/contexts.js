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

    /* The application detail page. Two subscriptions on purpose - one REST, one MCP -
       because each of its three sections is gated on its own count, and the counts are
       what the controller sends: otherAPICount for the proxy table, mcpAPICount for the
       MCP one. Passing subAPIs alone is what used to draw a headers-only table. */
    application: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        applicationMetadata: {
            id: 'app-1',
            name: 'Test Application',
            description: 'An application for the render tests.',
            appMap: [{ appRefID: 'ref-1' }],
        },
        subAPIs: [
            {
                apiID: 'api-1', name: 'Orders API', version: 'v1.0', apiType: 'REST',
                apiHandle: 'orders-api', subID: 'sub-1', refID: 'ref-api-1',
                policyName: 'Gold', security: ['api_key'], subscriptionPolicyDetails: [],
            },
            {
                apiID: 'api-2', name: 'Orders MCP', version: 'v1.0', apiType: 'MCP',
                apiHandle: 'orders-mcp', subID: 'sub-2', refID: 'ref-api-2',
                policyName: 'Silver', security: [], subscriptionPolicyDetails: [],
            },
        ],
        otherAPICount: 1,
        mcpAPICount: 1,
        platformSubscriptions: [
            {
                id: 'psub-1', apiName: 'Local Gateway API', apiVersion: 'v1.0',
                apiHandle: 'local-gateway', planName: 'Bronze', status: 'ACTIVE',
                maskedToken: 'sk_***', subscriptionId: 'psub-1',
            },
        ],
        nonSubAPIs: [],
        features: { sdkGeneration: false },
        ...over,
    }),

    /* The same page with nothing subscribed, which is the case the empty states cover. */
    applicationEmpty: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        applicationMetadata: { id: 'app-1', name: 'Test Application', appMap: [{ appRefID: 'ref-1' }] },
        subAPIs: [],
        otherAPICount: 0,
        mcpAPICount: 0,
        platformSubscriptions: [],
        nonSubAPIs: [],
        features: { sdkGeneration: false },
        ...over,
    }),

    /* Manage Keys. keyManagersMetadata has to carry one of the three names the partial
       matches on, or the whole OAuth2 branch renders its "unavailable" note instead. */
    manageKeys: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        applicationMetadata: { id: 'app-1', name: 'Test Application', appMap: [{ appRefID: 'ref-1' }] },
        /* The controller hangs the keys off each key manager (keyManager.productionKeys),
           and the partial reads them from there with {{#let "keys" productionKeys}} inside
           {{#each keyManagersMetadata}} - a root-level productionKeys never resolves in
           that scope, and the panel falls through to its "not generated yet" branch. */
        keyManagersMetadata: [{
            id: 'km-1', name: 'Resident Key Manager', enabled: true,
            productionKeys: { consumerKey: 'ck-prod', consumerSecret: 'cs-prod', appRefId: 'ref-1', keyMappingId: 'km-map-1' },
            sandboxKeys: {},
            /* The controller builds this per key manager too, and the four key dialogs
               (view, modify, token, instructions) iterate it from that scope - so without
               it the page renders with none of them in the DOM and View / Modify /
               Generate / Instructions all point at a missing id. */
            applicationKeys: [
                { keyType: 'PRODUCTION', keys: { consumerKey: 'ck-prod', consumerSecret: 'cs-prod', appRefId: 'ref-1', keyMappingId: 'km-map-1' } },
                { keyType: 'SANDBOX', keys: {} },
            ],
        }],
        productionKeys: { consumerKey: 'ck-prod', consumerSecret: 'cs-prod', appRefId: 'ref-1', keyMappingId: 'km-map-1' },
        sandboxKeys: {},
        subscriptionScopes: [],
        subAPIsForApplicationKeys: [
            {
                apiID: 'api-1', name: 'Orders API', version: 'v1.0', apiType: 'REST',
                apiHandle: 'orders-api', subID: 'sub-1', refID: 'ref-api-1', policyName: 'Gold',
                security: ['api_key'], scopes: [], subscriptionPolicyDetails: [],
                apiKeys: { production: { name: 'test-key', key: [{ id: 'key-1' }], scopes: [] }, sandbox: {} },
            },
        ],
        platformSubscriptionsForApplicationKeys: [],
        noSubPlatformAPIsForApplicationKeys: [],
        apiKeyEnabledAPICount: 1,
        isApiKey: true,
        otherAPICount: 1,
        mcpAPICount: 0,
        platformSubscriptions: [],
        noSubPlatformAPIs: [],
        features: { sdkGeneration: false },
        ...over,
    }),

    /* The self-hosted (wso2/api-platform) gateway with token-based subscriptions, holding
       one DEACTIVATED subscription. This is the case where the plan card has to keep
       offering "View subscription": the subscription still exists and can be reactivated,
       and this gateway allows only one per API. */
    apiLandingPlatformInactiveSub: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        apiMetadata: {
            ...apiWithImage,
            apiInfo: {
                ...apiWithImage.apiInfo,
                gatewayType: 'wso2/api-platform',
                tokenBasedSubscriptionEnabled: true,
            },
        },
        applications: [],
        subscriptionPlans: [
            { policyID: 'pol-1', policyName: 'Gold', displayName: 'Gold', requestCount: 1000, timeUnit: 'min' },
            { policyID: 'pol-2', policyName: 'Silver', displayName: 'Silver', requestCount: 100, timeUnit: 'min' },
        ],
        platformSubscriptions: [{
            subscriptionId: 'psub-1', subscriptionPlanName: 'Gold',
            status: 'INACTIVE', maskedToken: 'sk_***',
        }],
        schemaUrl: `${BASE_URL}/api/orders-api/docs/specification`,
        resources: [],
        scopes: [],
        ...over,
    }),

    docs: (over = {}) => ({
        ...base,
        docTypes: { HOWTO: [{ docName: 'getting-started', docId: 'doc-1' }] },
        apiType: 'REST',
        ...over,
    }),

    /* The workflow gallery. Two entries on purpose: one public and agent-visible, one
       private and agent-hidden, so the card footer's three branches - public badge,
       private badge, and the AI Ready badge being withheld - are all rendered. */
    apiFlows: (over = {}) => ({
        ...base,
        profile: { ...profile, isAdmin: true },
        showApiWorkflowsNav: true,
        apiFlows: [
            {
                handle: 'order-to-cash',
                name: 'Order to Cash',
                description: 'Places an order and settles payment.',
                visibility: 'PUBLIC',
                agentVisibility: 'VISIBLE',
                sourcesPreview: [{ name: 'Orders API' }, { name: 'Payments API' }],
                sourcesMoreCount: 2,
            },
            {
                handle: 'internal-recon',
                name: 'Internal Reconciliation',
                description: 'Nightly ledger reconciliation.',
                visibility: 'PRIVATE',
                agentVisibility: 'HIDDEN',
                sourcesPreview: [],
            },
        ],
        ...over,
    }),
};
