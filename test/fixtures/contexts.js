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

    /* The cloud-gateway plan cards with every application state on one page, which is
       what the two card states have to be told apart by:

         appA holds THIS plan (Unlimited)      -> selectable, marked, "View subscription"
         appB holds ANOTHER plan of this API   -> disabled, "On Silver"
         appC holds nothing                    -> selectable, "Subscribe"

       subscribedPlanIds is the union across applications, so the Unlimited card shows its
       SUBSCRIBED ribbon because appA holds it - independently of which application is
       selected in the dropdown. Shapes copied from apiContentController: `subscribed` is
       API-level, `subscribedPolicyIds` says which plans, `subscriptionPolicy` is
       {policyId, policyName} of the first live one. */
    apiLandingMultiApp: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        apiMetadata: { ...apiWithImage, apiInfo: { ...apiWithImage.apiInfo, gatewayType: 'wso2/choreo-connect' } },
        provider: 'WSO2',
        providerUrl: 'https://wso2.com',
        subscriptionPlans: [
            { policyID: 'pol-1', policyName: 'Unlimited', displayName: 'Unlimited', requestCount: -1, timeUnit: 'min' },
            { policyID: 'pol-2', policyName: 'Silver', displayName: 'Silver', requestCount: 100, timeUnit: 'min' },
        ],
        applications: [
            {
                id: 'app-a', name: 'App A', subscribed: true,
                subscribedPolicyIds: ['pol-1'],
                subscriptionPolicy: { policyId: 'pol-1', policyName: 'Unlimited' },
            },
            {
                id: 'app-b', name: 'App B', subscribed: true,
                subscribedPolicyIds: ['pol-2'],
                subscriptionPolicy: { policyId: 'pol-2', policyName: 'Silver' },
            },
            { id: 'app-c', name: 'App C', subscribed: false, subscribedPolicyIds: [], subscriptionPolicy: null },
            /* A second free application, so the flow after one subscribe can be checked:
               subscribing App C to a plan must not stop App D subscribing to the same one. */
            { id: 'app-d', name: 'App D', subscribed: false, subscribedPolicyIds: [], subscriptionPolicy: null },
        ],
        subscribedPlanIds: ['pol-1', 'pol-2'],
        platformSubscriptions: [],
        schemaUrl: `${BASE_URL}/api/orders-api/docs/specification`,
        resources: [],
        scopes: [],
        ...over,
    }),

    /* An API landing page with the content a real API actually has - endpoints, resource
       rows and scopes. The plan fixtures above carry none of it, which is why a phone-width
       sweep over them came back clean while a real API page did not: the resource row is
       the widest fixed thing on the page. */
    apiLandingFullContent: (over = {}) => ({
        ...base,
        profile,
        isAuthenticated: true,
        apiMetadata: {
            ...apiWithImage,
            apiInfo: {
                ...apiWithImage.apiInfo,
                apiName: 'Reading List API',
                apiDescription: 'Create, track and share reading lists across devices, with per-user shelves and progress.',
                gatewayType: 'wso2/choreo-connect',
                tags: ['books', 'reading', 'catalogue', 'recommendations'],
            },
        },
        applications: [{ id: 'app-1', name: 'Test Application', subscribed: false, subscribedPolicyIds: [], subscriptionPolicy: null }],
        subscriptionPlans: [
            { policyID: 'pol-1', policyName: 'Unlimited', displayName: 'Unlimited', requestCount: -1, timeUnit: 'min' },
        ],
        subscribedPlanIds: [],
        platformSubscriptions: [],
        loadDefault: true,
        resources: {
            serverDetails: {
                productionURL: 'https://e1a2b3c4-5d6e-7f89-0a1b-2c3d4e5f6a7b-prod.e1-eu-north-azure.bijiraapis.dev/reading-list/v1.0',
                sandboxURL: 'https://e1a2b3c4-5d6e-7f89-0a1b-2c3d4e5f6a7b-dev.e1-eu-north-azure.bijiraapis.dev/reading-list/v1.0',
            },
            endpoints: [
                { path: '/reading-lists/{listId}/items/{itemId}', methods: [
                    { method: 'get', summary: 'Retrieve a single item from a reading list' },
                    { method: 'delete', summary: 'Remove an item from a reading list' }] },
                { path: '/reading-lists', methods: [{ method: 'post', summary: 'Create a reading list' }] },
            ],
        },
        scopes: [{ key: 'reading_list:read' }, { key: 'reading_list:write' }, { key: 'reading_list:admin' }],
        schemaUrl: `${BASE_URL}/api/reading-list-api/docs/specification`,
        ...over,
    }),

    /* docTypes is the APIDocDTO list the controller passes through - an array of
       { type, names }, where names are file names and `type` is one of the labels in
       constants.DOC_TYPES.DOCS. The earlier fixture used an object keyed by type, which
       Handlebars treats as a context rather than a list: {{#docTypes}} set the context
       once, {{#names}} found nothing, and the whole sidebar loop never ran. That is why
       the suite missed a 500 in it - the active-link expression on page.hbs is only
       reached once an API actually has a document. Both branches of the outer loop are
       represented, and currentDocType/currentDocName mark one link active. */
    docs: (over = {}) => ({
        ...base,
        docTypes: [
            { type: 'Specification' },
            { type: 'HowTo', names: ['getting-started.md', 'authentication.md'] },
        ],
        currentDocType: 'HowTo',
        currentDocName: 'getting-started',
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
