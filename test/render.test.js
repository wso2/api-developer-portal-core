/*
 * Renders every themable page across the states production actually produces, and
 * asserts the selectors the browser scripts depend on are still in the output.
 *
 * These are the selectors whose loss is silent: nothing errors, the page just
 * stops working. No database - the render harness stubs the stored-file layer.
 */
const test = require('node:test');
const assert = require('node:assert');

const { renderThemablePage, renderInternalPage } = require('./helpers/render');
const ctx = require('./fixtures/contexts');

const MODES = ['DEFAULT', 'APISONLY', 'MCPSERVERSONLY'];

// src/scripts/common.js dereferences these unguarded at the top of its
// DOMContentLoaded handler. A layout missing any one throws and kills every later
// handler in the file, including window.showSubscribeButtonLoading.
const MANDATORY_LAYOUT_IDS = ['id="sidebar"', 'id="collapseBtn"', 'id="api-submenu"'];

function renderAll(pagePath, context, opts) {
    const { html } = renderThemablePage(pagePath, context, opts);
    return html;
}

test('every themable page renders in every devportal mode', () => {
    const pages = [
        ['pages/home', ctx.home],
        ['pages/apis', ctx.apis],
        ['pages/api-landing', ctx.apiLanding],
        ['pages/docs', ctx.docs],
    ];
    for (const mode of MODES) {
        for (const [page, build] of pages) {
            for (const isAuthenticated of [false, true]) {
                const context = build({
                    devportalMode: mode,
                    isAuthenticated,
                    profile: isAuthenticated ? ctx.profile : null,
                });
                assert.doesNotThrow(
                    () => renderAll(page, context),
                    `${page} threw for mode=${mode} authenticated=${isAuthenticated}`
                );
            }
        }
    }
});

test('both feature-flag states render - the flag gates three unrelated things', () => {
    // showApiWorkflowsNav gates the API Workflows nav item, the admin Settings nav
    // item, and the "Discover with AI" hero button. A single-state suite misses two.
    for (const showApiWorkflowsNav of [false, true]) {
        for (const showPlatformApiKeysNav of [false, true]) {
            const context = ctx.home({ showApiWorkflowsNav, showPlatformApiKeysNav, profile: { ...ctx.profile, isAdmin: true } });
            assert.doesNotThrow(() => renderAll('pages/home', context));
        }
    }
    const withFlag = renderAll('pages/home', ctx.home({ showApiWorkflowsNav: true }));
    const withoutFlag = renderAll('pages/home', ctx.home({ showApiWorkflowsNav: false }));
    assert.ok(withFlag.includes('discover-ai-btn'), 'the Discover with AI button should appear when the flag is on');
    assert.ok(!withoutFlag.includes('discover-ai-btn'), 'and should be absent when it is off');
});

test('an API with no image data still renders the listing', () => {
    // apiDTO nests tags and labels inside the DP_API_IMAGEDATA conditional, so this
    // shape reaches templates with neither field defined.
    const context = ctx.apis({ apiMetadata: [ctx.apiWithoutImage], tags: [] });
    assert.doesNotThrow(() => renderAll('pages/apis', context));
});

test('an authenticated listing renders an API on a non-platform gateway', { todo: 'live crash - see notes' }, () => {
    // KNOWN BUG, pre-existing and outside theming scope.
    //
    // api-listing.hbs:126 is the {{else}} branch taken when a user is authenticated,
    // the API is not token-based-subscription, and its gatewayType is not
    // "wso2/api-platform". It calls {{#if (some applications "subscribed")}}, but
    // inside {{#each apiMetadata}} the path `applications` resolves against the API
    // item, and apiDTO never sets that field - so `some` receives undefined.
    //
    // As a subexpression `some` gets a non-block options object, so its
    // `return options.inverse(this)` guard throws TypeError - HTTP 500 for the whole
    // listing. Marked todo so it is visible without failing the build; flip to a
    // normal test when the helper is guarded.
    const context = ctx.apis({
        apiMetadata: [ctx.apiOnForeignGateway],
        isAuthenticated: true,
        profile: ctx.profile,
    });
    assert.doesNotThrow(() => renderAll('pages/apis', context));
});

test('an empty API listing renders', () => {
    assert.doesNotThrow(() => renderAll('pages/apis', ctx.apis({ apiMetadata: [], tags: [] })));
});

test('every rendered page carries the ids common.js dereferences unguarded', () => {
    for (const [page, build] of [['pages/home', ctx.home], ['pages/apis', ctx.apis], ['pages/docs', ctx.docs]]) {
        const html = renderAll(page, build());
        for (const id of MANDATORY_LAYOUT_IDS) {
            assert.ok(html.includes(id), `${page} is missing ${id} - this silently breaks every later handler in common.js`);
        }
    }
});

test('the API listing keeps the selectors the subscribe flow drives', () => {
    const html = renderAll('pages/apis', ctx.apis());
    for (const selector of ['common-btn-primary', 'message-overlay', 'id="query"', 'apiCard-']) {
        assert.ok(html.includes(selector), `the API listing lost ${selector}`);
    }
});

test('a stored theme overrides only the seven customizable partials', () => {
    const stored = {
        header: '<header id="stored-header">stored</header>',
        home: '<div id="stored-home">stored</div>',
        // Not customizable: the disk version must win regardless.
        sidebar: '<nav id="stored-sidebar">stored</nav>',
        footer: '<footer id="stored-footer">stored</footer>',
    };
    const { html, honoured, ignored } = renderThemablePage('pages/home', ctx.home(), { storedPartials: stored });

    assert.deepStrictEqual(honoured.sort(), ['header', 'home']);
    assert.deepStrictEqual(ignored.sort(), ['footer', 'sidebar']);
    assert.ok(html.includes('id="stored-header"'), 'the stored header should win - header is customizable');
    assert.ok(html.includes('id="stored-home"'), 'the stored home should win - home is customizable');
    assert.ok(!html.includes('id="stored-sidebar"'), 'the stored sidebar must be ignored - sidebar is not customizable');
    assert.ok(html.includes('id="sidebar"'), 'and our disk sidebar must render instead');
});

test('every SVG-recolour container still holds an image', () => {
    // common.js guards the container but not its child:
    //     if (apisImage) { fetch(document.querySelector("#apisImage img").src) ... }
    // so a container kept without an <img> inside throws and kills every later handler
    // in that file. Either keep the container with an image, or remove it entirely.
    const html = renderAll('pages/home', ctx.home());
    for (const id of ['apisImage', 'applicationsImage', 'launchImage', 'heroImage']) {
        if (!html.includes(`id="${id}"`)) continue;   // removing it altogether is fine
        const after = html.slice(html.indexOf(`id="${id}"`));
        const block = after.slice(0, after.indexOf('</div>'));
        assert.ok(
            block.includes('<img'),
            `#${id} is present but holds no <img> - common.js dereferences that child unguarded`
        );
    }
});

test('the landing rail appears only when it has something to show', () => {
    // The two-column body puts subscription plans in a fixed-width rail. Gating that
    // rail on subscriptionPlans alone would be wrong: api-subscription-plans also
    // carries the existing-platform-subscriptions table and the
    // window.__subscriptionOrgID bootstrap that platform-subscription.js reads. So the
    // condition covers both, and an API with subscriptions but no offered plans still
    // renders its rail.
    const rail = (over) => renderAll('pages/api-landing', ctx.apiLanding(over)).includes('aov-body-sidebar');

    assert.ok(rail({}), 'an API with plans should show the rail');
    assert.ok(
        rail({ subscriptionPlans: [], platformSubscriptions: [{ subscriptionId: 's1' }] }),
        'an API with an existing subscription but no offered plans must still show the rail'
    );
    assert.ok(
        !rail({ subscriptionPlans: [], platformSubscriptions: [] }),
        'with neither, the rail should collapse rather than leave an empty column'
    );

    // And the cards themselves must survive the restructure. This shape - a third-party
    // gateway with plans on offer - is the only one that reaches them.
    const withCards = renderAll('pages/api-landing', ctx.apiLandingWithPlans());
    assert.ok(withCards.includes('id="subscriptionCard-pol-1"'), 'plan cards lost their JS-bound id');
    assert.ok(withCards.includes('aov-body-sidebar'), 'plan cards should render inside the rail');

    for (const page of ['pages/api-landing', 'pages/mcp-landing']) {
        assert.ok(
            renderAll(page, ctx.apiLanding()).includes('aov-body'),
            `${page} should use the two-column body`
        );
    }
});

test('internal pages render under both the disk layout and a stored one', () => {
    const context = { ...ctx.home(), applicationsMetadata: [] };
    assert.doesNotThrow(() => renderInternalPage('applications', context), 'applications failed under the disk layout');

    // An organization with a stored theme renders internal pages inside its own
    // frozen copy of the layout, which is why anything added to the disk layout
    // never reaches them.
    const frozenLayout = '<!DOCTYPE html><html><head><title>DevPortal</title></head><body>{{{ body }}}</body></html>';
    assert.doesNotThrow(
        () => renderInternalPage('applications', context, { storedLayout: frozenLayout }),
        'applications failed under a stored layout'
    );
});
