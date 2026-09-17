/*
 * Renders the portal as it stands today and pins the output.
 *
 * Two synthetic organizations cover both resolution paths:
 *   org-plain   nothing stored - everything resolves from disk
 *   org-themed  a stored theme - its header, home and main.css win; the rest is ours
 *
 * Both fixtures are synthetic. Nothing here comes from the development database.
 */
const test = require('node:test');
const fs = require('fs');
const path = require('path');

const { renderThemablePage, renderInternalPage } = require('./helpers/render');
const { matchSnapshot } = require('./helpers/snapshot');
const ctx = require('./fixtures/contexts');

const THEMED = path.join(__dirname, 'fixtures', 'org-themed');
const storedPartials = {
    header: fs.readFileSync(path.join(THEMED, 'partials', 'header.hbs'), 'utf8'),
    home: fs.readFileSync(path.join(THEMED, 'partials', 'home.hbs'), 'utf8'),
};

const PAGES = [
    ['home', 'pages/home', ctx.home],
    ['apis', 'pages/apis', ctx.apis],
    ['api-landing', 'pages/api-landing', ctx.apiLanding],
    ['docs', 'pages/docs', ctx.docs],
    ['api-flows', 'pages/api-flows', ctx.apiFlows],
];

for (const [name, pagePath, build] of PAGES) {
    test(`snapshot: ${name} on an organization with nothing stored`, () => {
        const { html } = renderThemablePage(pagePath, build());
        matchSnapshot(`org-plain/${name}`, html);
    });

    test(`snapshot: ${name} on an organization with a stored theme`, () => {
        const { html } = renderThemablePage(pagePath, build(), {
            storedPartials,
            hasStoredMainCss: true,
        });
        matchSnapshot(`org-themed/${name}`, html);
    });
}

const INTERNAL = [
    ['applications', 'applications', { applicationsMetadata: [] }],
    /* The empty fixture above only ever exercises the empty state - the create button,
       the card grid and every .app-card inside it are all behind
       {{#if applicationsMetadata.length}} and were never rendered by a test. */
    ['applications-populated', 'applications', {
        applicationsMetadata: [
            { id: 'app-1', name: 'Mobile Client', description: 'Ships the public mobile app.', subscriptionCount: 2 },
            { id: 'app-2', name: 'internal-batch', description: '', subscriptionCount: 0 },
        ],
    }],
];

for (const [name, pageRelPath, extra] of INTERNAL) {
    test(`snapshot: internal ${name} under the disk layout`, () => {
        matchSnapshot(`org-plain/internal-${name}`, renderInternalPage(pageRelPath, { ...ctx.home(), ...extra }));
    });

    test(`snapshot: internal ${name} under a stored layout`, () => {
        // An organization that has ever published a theme renders internal pages
        // inside its own frozen copy of the layout. This snapshot is what proves
        // whether anything we add to the disk layout reaches them.
        const frozenLayout = fs.readFileSync(path.join(THEMED, 'layout', 'main.hbs'), 'utf8');
        matchSnapshot(
            `org-themed/internal-${name}`,
            renderInternalPage(pageRelPath, { ...ctx.home(), ...extra }, { storedLayout: frozenLayout })
        );
    });
}
