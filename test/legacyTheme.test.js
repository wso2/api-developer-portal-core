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
        // Delivered to internal pages in P6 by an @import at the top of each
        // src/styles sheet, which needs no template or layout change. Remove from
        // this list once that lands.
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
