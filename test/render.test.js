/*
 * Renders every themable page across the states production actually produces, and
 * asserts the selectors the browser scripts depend on are still in the output.
 *
 * These are the selectors whose loss is silent: nothing errors, the page just
 * stops working. No database - the render harness stubs the stored-file layer.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

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

test('an authenticated listing renders an API on a non-platform gateway', () => {
    // Was a live HTTP 500, fixed on two fronts and kept as a regression guard.
    //
    // This is the {{else}} branch taken when a user is authenticated, the API is not
    // token-based-subscription, and its gatewayType is not "wso2/api-platform". It
    // calls {{#if (some ... "subscribed")}} over the applications list.
    //
    // The path is correct as written: apiContentController sets metaData.applications
    // per API item (the list carrying the `subscribed` flag), which is what this reads.
    // The fault was in `some` itself. It is only ever called as a subexpression, and it
    // answered a non-array with `options.inverse(this)` - but a subexpression's options
    // object has no inverse, so any API reaching the template without that field threw
    // TypeError and took the whole listing down with it.
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
    // The button class this used to name is not one of them: with a listing context the
    // subscription modal's plan loop renders nothing at all, so neither the old
    // common-btn-primary nor a dp-btn replacement appears - swapping one for the other
    // just moved the assertion onto the create-app dialog's Save button, which the
    // subscribe flow never touches. What the flow does dereference is below.
    const html = renderAll('pages/apis', ctx.apis());
    for (const selector of ['message-overlay', 'id="query"', 'apiCard-']) {
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

test('the plan cards in the rail are stacked, not left on their three-up grid', () => {
    // The partial's cards carry col-lg-4 col-md-6 col-12 because it was written as a
    // full-width section. Inside the 22.5rem rail those columns still ask for a third
    // of their container, which is about 7rem a card. components.css overrides them,
    // and the two breakpoints have to agree or there is a band where the rail is narrow
    // but the cards have gone back to the grid.
    const html = renderAll('pages/api-landing', ctx.apiLandingWithPlans());
    assert.ok(html.includes('aov-body-sidebar'), 'expected the rail to render');
    assert.ok(/class="col-lg-4[^"]*"/.test(html), 'the partial still uses the three-up grid');

    const components = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'styles', 'components.css'), 'utf8'
    );
    assert.match(
        components, /\.aov-body-sidebar \.row > \[class\*="col-"\]/,
        'components.css must override the grid inside the rail'
    );

    // Compare the two breakpoints that have to agree, not every media query in the file.
    const widthOfBlockContaining = (needle) => {
        for (const m of components.matchAll(/@media \(max-width: (\d+)px\)\s*\{([\s\S]*?)\n\}/g)) {
            if (m[2].includes(needle)) return m[1];
        }
        return null;
    };
    const railAt = widthOfBlockContaining('.aov-body-sidebar { width: 100%');
    const gridAt = widthOfBlockContaining('.aov-body-sidebar .row > [class*="col-"]');

    assert.ok(railAt && gridAt, `expected both breakpoints, got rail=${railAt} grid=${gridAt}`);
    assert.strictEqual(
        gridAt, railAt,
        `the rail collapses at ${railAt}px but its grid override switches off at ${gridAt}px, `
        + 'leaving a band where the rail is narrow and the cards are back on the three-up grid'
    );
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

test('the application pages render one table idiom and no legacy button classes', () => {
    // Both pages were the last holders of .app-table (a tinted header band) and of
    // .common-btn-* (square, fill-on-hover). Everything else in the portal renders
    // .sub-table and .dp-btn, so a user moving between /subscriptions, /api-keys and
    // these two saw the same table drawn two different ways.
    //
    // One exception, by request: the Subscribe buttons in the plan cards and the plan
    // dialog keep common-btn-primary. That dialog is included by both pages, so the
    // sweep below skips any line carrying a subscribe-btn class.
    for (const [page, context] of [['application', ctx.application()], ['manage-keys', ctx.manageKeys()]]) {
        const html = renderInternalPage(page, context);
        assert.ok(html.includes('class="sub-table"'), `${page} should render the shared table`);
        assert.ok(!/class="app-table|class="app-th|class="app-td/.test(html), `${page} still renders app-table`);
        const legacyButtons = html.split('\n')
            .filter((line) => line.includes('common-btn') && !line.includes('subscribe-btn'));
        assert.deepStrictEqual(
            legacyButtons, [],
            `${page} still renders a common-btn button:\n  ${legacyButtons[0]?.trim()}`
        );
        assert.ok(!html.includes('class="btn-close"'), `${page} still renders a Bootstrap btn-close`);
    }
});

test('the application page sends plan changes to the API, not to a second dialog', () => {
    // The edit icon used to open its own plan dialog here, a parallel implementation of
    // the choice the API's own subscription section already makes - with the
    // one-app-one-plan rules and the switch-plan flow the dialog never had.
    const html = renderInternalPage('application', ctx.application());
    assert.ok(!html.includes("loadModal('planModal-"), 'the plan dialog should no longer be wired up here');
    assert.ok(html.includes('/api/orders-api#subscriptionPlans'), 'the proxy row should link to the API section');
    assert.ok(html.includes('/mcp/orders-mcp#subscriptionPlans'), 'the MCP row should link to the MCP section');
});

test('an application section with nothing in it renders an empty state, not an empty table', () => {
    // Both tables were gated on subAPIs - the same list for both - while their rows were
    // filtered by apiType. An application subscribed only to REST APIs therefore drew a
    // headers-only MCP table, and one subscribed only to MCP servers drew an empty proxy
    // table. Each is gated on its own count now.
    const empty = renderInternalPage('application', ctx.applicationEmpty());
    assert.ok(!empty.includes('class="sub-table"'), 'no table should render with nothing subscribed');
    for (const title of ['No API subscriptions', 'No MCP server subscriptions', 'No token-based subscriptions']) {
        assert.ok(empty.includes(title), `expected the ${title} empty state`);
    }

    // REST-only: the proxy table renders, the MCP section shows its empty state.
    const restOnly = renderInternalPage('application', ctx.application({
        subAPIs: [ctx.application().subAPIs[0]], otherAPICount: 1, mcpAPICount: 0,
    }));
    assert.ok(restOnly.includes('id="app-table-app-1"'), 'the proxy table should still render');
    assert.ok(!restOnly.includes('id="app-table-mcp-app-1"'), 'the MCP table should not render at all');
    assert.ok(restOnly.includes('No MCP server subscriptions'), 'the MCP section should show its empty state');
});

test('the revoke buttons across the portal share one danger style', () => {
    // .ak-btn-danger, .aov-sub-danger and .api-key-actions .api-key-revoke were three
    // aliases of the same declaration on three pages. .dp-btn--danger is the one copy.
    const manageKeys = renderInternalPage('manage-keys', ctx.manageKeys());
    assert.ok(manageKeys.includes('dp-btn dp-btn--danger api-key-revoke'), 'revoke should carry the shared danger style');
    const landing = renderAll('pages/api-landing', ctx.apiLandingWithPlans());
    assert.ok(!landing.includes('aov-sub-danger'), 'the landing page should no longer use the alias');
});

test('a deactivated token-based subscription keeps its plan card subscribed', () => {
    // Deactivating does not remove the subscription - it can be reactivated from the card
    // above, and the self-hosted gateway allows only one subscription per API. So the plan
    // card keeps pointing at it rather than offering Subscribe, which would open a
    // switch-plan confirmation for the plan the user already holds. The isCurrentPlan
    // helper matches on plan name with no status filter, and the two client-side refreshes
    // (refreshLandingPageSubscriptions, prepareSubscriptionModal) now agree with it.
    const html = renderAll('pages/api-landing', ctx.apiLandingPlatformInactiveSub());
    const goldCard = html.slice(html.indexOf('id="subscriptionCard-pol-1"'));
    const silverCard = goldCard.slice(goldCard.indexOf('id="subscriptionCard-pol-2"'));

    assert.ok(
        goldCard.slice(0, goldCard.indexOf('id="subscriptionCard-pol-2"')).includes('aov-plan-card--subscribed'),
        'the deactivated plan should still render as subscribed'
    );
    assert.ok(!silverCard.includes('aov-plan-card--subscribed'), 'the other plan should not');
    assert.ok(html.includes('View subscription'), 'expected the View subscription control to render');
});

test('no template has a collapsed line', () => {
    /* A guard for one specific accident. A class-rename pass over these partials used a
       regex for a whole markup block - `<div class="info-box">…</div>` with a non-greedy
       body - and in the key dialogs those boxes hold a title, a <p> AND a floated icon
       sibling, so the body ran past the box and swallowed the rest of the dialog, leaving
       the token field and the footer buttons inside a <span> on one 1,700-character line.
       It still compiled and its <div>s still balanced, so nothing else caught it; the
       line length is what gives it away. The longest legitimate line in these templates
       is about 370 characters. */
    const LIMIT = 600;
    const { walk, rel, read, REPO_ROOT, themeTemplates } = require('./helpers/themeFiles');
    const templates = [...themeTemplates(), ...walk(path.join(REPO_ROOT, 'src', 'pages'), '.hbs')];
    // Vector data does not count: an inline SVG path is legitimately over a thousand
    // characters, and create-api-flow.hbs carries one at exactly that length.
    const measure = (line) => line.replace(/\sd="[^"]*"/g, ' d=""').length;
    const offenders = [];
    for (const file of templates) {
        read(file).split('\n').forEach((line, i) => {
            if (measure(line) > LIMIT) offenders.push(`${rel(file)}:${i + 1} (${measure(line)} chars)`);
        });
    }
    assert.deepStrictEqual(
        offenders, [],
        'these lines are long enough to be a collapsed block rather than markup:\n  '
        + offenders.join('\n  ')
    );
});

test('the DTO fills subscriptionPolicies from either DAO path', () => {
    // The listing and the search reach APIDTO by different routes and name the same
    // aggregate differently: getAllAPIMetadata returns Sequelize instances whose include
    // is aliased DP_SUBSCRIPTION_POLICies, searchAPIMetadata is raw SQL aggregating
    // JSON_AGG(...) AS "DP_API_SUBSCRIPTION_POLICY".
    //
    // Reading only the first left every search result without subscriptionPolicies, and
    // apiContentController's signed-in enrichment loop then called .find on undefined -
    // an HTTP 500 on the whole listing for any user subscribed to a match. Logged-out
    // search was unaffected, which is what made it look intermittent.
    const APIDTO = require('../src/dto/apiDTO');
    const policy = { POLICY_ID: 'p1', POLICY_NAME: 'Gold', DISPLAY_NAME: 'Gold', DESCRIPTION: '', REQUEST_COUNT: 10 };
    const base = { API_ID: 'a1', API_HANDLE: 'a-1', API_NAME: 'A', API_TYPE: 'REST' };

    const viaListing = new APIDTO({ ...base, DP_SUBSCRIPTION_POLICies: [policy] });
    const viaSearch = new APIDTO({ ...base, DP_API_SUBSCRIPTION_POLICY: [policy] });

    for (const [label, dto] of [['listing', viaListing], ['search', viaSearch]]) {
        assert.ok(Array.isArray(dto.subscriptionPolicies), `${label} path left subscriptionPolicies unset`);
        assert.strictEqual(dto.subscriptionPolicies.length, 1, `${label} path lost the policy`);
        assert.strictEqual(dto.subscriptionPolicies[0].policyID, 'p1', `${label} path mapped the policy wrong`);
    }

    // And an API genuinely carrying no policies must not gain a bogus empty array from
    // the aggregate's '[]' default being mistaken for absence.
    assert.doesNotThrow(() => new APIDTO(base));
});
