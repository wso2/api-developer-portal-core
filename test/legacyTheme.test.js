/*
 * Does a theme uploaded against an older release still render?
 *
 * Two fixtures, both committed and both free of any development-database content:
 *   - artifacts/default/orgContent/ACME, a real theme already in this repository
 *   - test/fixtures/org-themed, synthetic, shaped like what the console produces
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const constants = require('../src/utils/constants');
const { renderThemablePage } = require('./helpers/render');
const { ACME_THEME, walk, rel } = require('./helpers/themeFiles');
const ctx = require('./fixtures/contexts');

/** Collects a stored theme's partials, keyed by bare filename, as the DAO would. */
function storedPartialsFrom(root) {
    const partials = {};
    for (const file of walk(root, '.hbs')) {
        const dir = path.basename(path.dirname(file));
        if (dir === 'partials') partials[path.basename(file, '.hbs')] = fs.readFileSync(file, 'utf8');
    }
    return partials;
}

test('the committed ACME theme is still present and readable', () => {
    assert.ok(fs.existsSync(ACME_THEME), `missing fixture: ${rel(ACME_THEME)}`);
    assert.ok(Object.keys(storedPartialsFrom(ACME_THEME)).length > 0, 'ACME exposes no partials');
});

test('every themable page renders with the ACME theme applied', () => {
    const stored = storedPartialsFrom(ACME_THEME);
    const pages = [
        ['pages/home', ctx.home], ['pages/apis', ctx.apis],
        ['pages/api-landing', ctx.apiLanding], ['pages/docs', ctx.docs],
    ];
    for (const [page, build] of pages) {
        assert.doesNotThrow(
            () => renderThemablePage(page, build(), { storedPartials: stored, hasStoredMainCss: true }),
            `${page} threw with the ACME theme applied`
        );
    }
});

test('ACME contributes only the partials the portal considers customizable', () => {
    const stored = storedPartialsFrom(ACME_THEME);
    const { honoured, ignored } = renderThemablePage('pages/home', ctx.home(), { storedPartials: stored });

    for (const name of honoured) assert.ok(constants.CUSTOMIZABLE_FILES.includes(name));
    for (const name of ignored) assert.ok(!constants.CUSTOMIZABLE_FILES.includes(name));
    assert.ok(ignored.length > 0, 'expected ACME to carry partials the portal ignores');
});

test('anything the disk layout gains but a stored layout lacks is tracked', () => {
    // Internal pages render inside the organization's stored layout, a snapshot frozen
    // at upload time. Anything added to the disk layout therefore never reaches them,
    // and has to arrive by another route.
    //
    // This is not a "must not diverge" rule - divergence is expected and deliberate.
    // It is a ledger: every divergence must be a known one with a delivery plan.
    const KNOWN_LAYOUT_ONLY = [
        // Both are delivered to internal pages by an @import at the top of every
        // technical sheet a template links, so a stored layout needs no change - see
        // 'every technical stylesheet a template links carries the component layer'
        // below. They stay on this ledger because they really are absent from a stored
        // layout; the import is how they arrive anyway.
        '/technical-styles/tokens.css',
        '/technical-styles/components.css',
        // Cosmetic, and needs no remedy: an organization with a stored layout keeps the
        // remote favicon URL baked into it. Listed so the divergence is acknowledged
        // rather than discovered.
        '/images/favicon.ico',
    ];

    const frozen = fs.readFileSync(path.join(__dirname, 'fixtures', 'org-themed', 'layout', 'main.hbs'), 'utf8');
    const disk = fs.readFileSync(path.join(__dirname, '..', 'src', 'defaultContent', 'layout', 'main.hbs'), 'utf8');

    // Undo the upload-time rewrite so the two are comparable: a stored layout carries
    // ".../layout?fileType=style&fileName=main.css" where the disk one has "/styles/main.css".
    const normalise = (href) => href.replace(/^.*fileType=style&fileName=(.+)$/, '/styles/$1');
    const hrefs = (src) => new Set(
        [...src.matchAll(/href=["']([^"']+)["']/g)].map((m) => normalise(m[1]))
    );
    const frozenHrefs = hrefs(frozen);
    const onlyOnDisk = [...hrefs(disk)].filter((h) => !frozenHrefs.has(h));

    assert.deepStrictEqual(
        onlyOnDisk.sort(), KNOWN_LAYOUT_ONLY.sort(),
        'the disk layout links something a stored layout does not have, and it is not on the ledger.\n'
        + 'Internal pages on every organization with a stored theme will not receive it.\n'
        + 'Either deliver it through an @import in src/styles/, or add it here with a plan.'
    );
});

test('every technical stylesheet a template links carries the component layer', () => {
    /* A stored layout links none of our stylesheets - only the organization's own
       main.css - so whatever sheet a page links is the only CSS that arrives. If that
       sheet does not bring components.css with it, every dp-btn, dp-modal, dp-note,
       sub-status-pill and dp-empty in the page is an undefined class. The Delete
       Application dialog's buttons and the LLM Instructions Publish button rendered
       unstyled on every themed organization for exactly this reason.

       Entry points are computed from the templates rather than listed, so a new page
       that links a new sheet is covered without touching this test. */
    const linked = new Set();
    for (const dir of ['pages', 'defaultContent']) {
        for (const file of walk(path.join(__dirname, '..', 'src', dir), '.hbs')) {
            for (const m of fs.readFileSync(file, 'utf8').matchAll(/technical-styles\/([a-z0-9-]+\.css)/g)) {
                linked.add(m[1]);
            }
        }
    }
    // tokens.css is the variable layer and imports nothing; components.css is the layer
    // itself, and would be importing itself.
    const entryPoints = [...linked]
        .filter((f) => !['tokens.css', 'components.css'].includes(f))
        .filter((f) => fs.existsSync(path.join(__dirname, '..', 'src', 'styles', f)))
        .sort();
    assert.ok(entryPoints.length > 10, `expected to find the technical sheets, got ${entryPoints.length}`);

    const missing = entryPoints.filter((name) => !fs
        .readFileSync(path.join(__dirname, '..', 'src', 'styles', name), 'utf8')
        .includes('@import "/technical-styles/components.css"'));
    assert.deepStrictEqual(
        missing, [],
        'these sheets can be the only CSS a themed organization loads, and none of them\n'
        + 'delivers the shared component vocabulary:\n  ' + missing.join('\n  ')
    );
});

// Header classes that header.css styles today AND a stored header markup uses.
// This is the contract that must survive a restyle: an organization serves its own
// stored header.hbs against OUR header.css, because header is customizable and
// header.css is not. Restyle these selectors; do not rename them.
const HEADER_CONTRACT = [
    'custom-navbar', 'navbar', 'navbar-brand', 'navbar-logo',
    'profile-dropdown-link', 'profile-icon', 'profile-link', 'profile-options',
];

test('header.css keeps styling every selector a stored header relies on', () => {
    const storedHeader = fs.readFileSync(
        path.join(__dirname, 'fixtures', 'org-themed', 'partials', 'header.hbs'), 'utf8'
    );
    const headerCss = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'defaultContent', 'styles', 'header.css'), 'utf8'
    );

    const used = new Set();
    for (const m of storedHeader.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach((c) => used.add(c));

    const stillUsed = HEADER_CONTRACT.filter((c) => used.has(c));
    assert.deepStrictEqual(
        stillUsed, HEADER_CONTRACT,
        'the stored-header fixture no longer uses part of the contract - regenerate it deliberately'
    );

    const unstyled = HEADER_CONTRACT.filter((c) => !new RegExp(`\\.${c}\\b`).test(headerCss));
    assert.deepStrictEqual(
        unstyled, [],
        'header.css stopped styling selectors that stored headers still use, so every organization '
        + 'with a stored header.hbs gets an unstyled navbar:\n  ' + unstyled.join('\n  ')
    );
});
