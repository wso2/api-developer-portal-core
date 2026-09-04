/*
 * The design-token layer: src/styles/tokens.css, served at /technical-styles/tokens.css.
 *
 * Its whole reason for existing is that the console rewrites the theme's :root and
 * would erase anything we put there. These tests keep the two layers apart and keep
 * this one self-sufficient, so it still resolves under a stored theme that predates it.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { DEFAULT_CONTENT, TECHNICAL_STYLES, walk, rel, read } = require('./helpers/themeFiles');

const TOKENS = path.join(TECHNICAL_STYLES, 'tokens.css');
const THEME_MAIN = path.join(DEFAULT_CONTENT, 'styles', 'main.css');
const LAYOUT = path.join(DEFAULT_CONTENT, 'layout', 'main.hbs');

const tokensCss = () => read(TOKENS);

/** Every custom property a stylesheet defines, across all of its blocks. */
function definedIn(css) {
    return new Set([...css.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map((m) => m[1]));
}

/** Every custom property a stylesheet reads through var(). */
function referencedIn(css) {
    return new Set([...css.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
}

const themeSeeds = () => definedIn(read(THEME_MAIN).match(/:root\s*\{([\s\S]*?)\}/)[1]);

test('tokens.css exists and is served from /technical-styles/', () => {
    assert.ok(fs.existsSync(TOKENS), `missing ${rel(TOKENS)}`);
    // src/styles is mounted at /technical-styles - see app.js.
    assert.ok(tokensCss().includes(':root'), 'tokens.css defines no :root block');
});

test('the layout loads tokens.css before the theme stylesheet', () => {
    const layout = read(LAYOUT);
    const tokensAt = layout.indexOf('/technical-styles/tokens.css');
    const themeAt = layout.indexOf('/styles/main.css');
    assert.ok(tokensAt > -1, 'the layout does not link tokens.css');
    assert.ok(themeAt > -1, 'the layout does not link the theme stylesheet');
    assert.ok(
        tokensAt < themeAt,
        'tokens.css must load first so a customer\'s own stylesheet can still override it'
    );
});

test('every alias reading a theme seed carries a literal fallback', () => {
    // A stored theme can predate any seed. Without a fallback the property resolves
    // to nothing and the rule it feeds is dropped entirely.
    const seeds = themeSeeds();
    const naked = [];
    for (const m of tokensCss().matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:\s*var\(\s*(--[A-Za-z0-9_-]+)\s*([^)]*)\)/gm)) {
        const [, name, referenced, rest] = m;
        if (seeds.has(referenced) && !rest.trim().startsWith(',')) naked.push(`${name} -> var(${referenced})`);
    }
    assert.deepStrictEqual(naked, [], `alias without a fallback:\n  ${naked.join('\n  ')}`);
});

test('tokens.css does not redefine a token the theme already owns', () => {
    // Redefining a custom property in terms of itself is a cycle, which resolves to
    // nothing - and any seed we shadow here stops tracking the console's pickers.
    const collisions = [...definedIn(tokensCss())].filter((t) => themeSeeds().has(t));
    assert.deepStrictEqual(
        collisions, [],
        `tokens.css redefines a theme seed:\n  ${collisions.join('\n  ')}`
    );
});

test('every var() inside tokens.css resolves against itself or a theme seed', () => {
    const defined = definedIn(tokensCss());
    const seeds = themeSeeds();
    const unresolved = [...referencedIn(tokensCss())].filter((t) => !defined.has(t) && !seeds.has(t));
    assert.deepStrictEqual(unresolved, [], `tokens.css reads an undefined token:\n  ${unresolved.join('\n  ')}`);
});

test('color-mix is used in srgb, never oklch', () => {
    // oklch mixing is more recent than the srgb form and the difference is negligible
    // at these ratios; srgb widens the support floor for free.
    const oklch = [...tokensCss().matchAll(/color-mix\(\s*in\s+oklch/g)];
    assert.strictEqual(oklch.length, 0, 'use color-mix(in srgb, ...) instead of oklch');
});

test('every color-mix token has an @supports fallback, and the block comes last', () => {
    const css = tokensCss();
    const supportsAt = css.indexOf('@supports not (color: color-mix');
    assert.ok(supportsAt > -1, 'the @supports fallback block is missing');
    assert.strictEqual(
        css.indexOf(':root', supportsAt + 1) > -1 && css.slice(supportsAt).includes(':root'), true,
        'the @supports block must contain its own :root'
    );
    assert.ok(
        css.indexOf(':root {') < supportsAt,
        'the @supports block must come after the main :root, or it cannot win'
    );

    const main = css.slice(0, supportsAt);
    const fallback = css.slice(supportsAt);
    const mixed = [...main.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:[\s\S]*?(?=\n\s*--|\n\s*\})/gm)]
        .filter((m) => m[0].includes('color-mix('))
        .map((m) => m[1]);
    const covered = definedIn(fallback);
    const uncovered = mixed.filter((t) => !covered.has(t));
    assert.deepStrictEqual(
        uncovered, [],
        `these tokens use color-mix() but have no @supports fallback:\n  ${uncovered.join('\n  ')}`
    );
});

test('a stored layout does not deliver tokens.css - internal pages need the CSS route', () => {
    // Internal pages render inside the organization's own stored layout, which was
    // frozen at upload time and will never gain the <link> we just added. This pins
    // that gap so it is closed deliberately rather than assumed away: P6 delivers the
    // token layer to those pages through an @import at the top of each src/styles
    // sheet, which needs no template or layout change at all.
    //
    // When P6 lands, flip this to assert that every src/styles sheet imports tokens.css.
    const themed = read(path.join(__dirname, 'snapshots', 'org-themed', 'internal-applications.html'));
    const plain = read(path.join(__dirname, 'snapshots', 'org-plain', 'internal-applications.html'));

    assert.ok(plain.includes('/technical-styles/tokens.css'),
        'an organization with no stored layout should receive tokens.css from the disk layout');
    assert.ok(!themed.includes('/technical-styles/tokens.css'),
        'if a stored layout now carries tokens.css, the frozen-layout fixture is stale - regenerate it');

    const imported = walk(TECHNICAL_STYLES, '.css')
        .filter((f) => read(f).includes('@import "/technical-styles/tokens.css"'));
    assert.strictEqual(imported.length, 0, 'src/styles has started importing tokens.css - update this test for P6');
});

test('no new undefined token creeps into any stylesheet', () => {
    // A change-detector over the whole CSS tree. The pinned list is pre-existing and
    // out of scope for the theming work; anything beyond it is ours and is a bug.
    // Defined by stylesheets we do not ship: --bs-* by Bootstrap from the CDN,
    // --tw-* by the Tailwind-derived Swagger overrides in async-tryout.css.
    const EXTERNAL = /^--(bs|tw)-/;

    const KNOWN_UNDEFINED = [
        '--border-colour-primary',
        '--border-colour-secondary',
        '--card-color',
        '--dark-color',
        '--font-colour-primary',
        '--light-ash-color',
        '--light-bg-color',
        '--notselect-star-color',
        '--primary-color',
        '--primary-main-color-rgb',
        '--secondary-color',
        '--secondary-text-color',
    ];

    const sheets = [
        ...walk(path.join(DEFAULT_CONTENT, 'styles'), '.css'),
        ...walk(TECHNICAL_STYLES, '.css'),
    ];
    const defined = new Set();
    for (const f of sheets) for (const t of definedIn(read(f))) defined.add(t);

    const undefinedRefs = new Set();
    for (const f of sheets) {
        for (const t of referencedIn(read(f))) {
            if (!defined.has(t) && !EXTERNAL.test(t)) undefinedRefs.add(t);
        }
    }

    assert.deepStrictEqual(
        [...undefinedRefs].sort(), KNOWN_UNDEFINED,
        'the set of undefined custom properties changed - a new one is a bug in this work'
    );
});
