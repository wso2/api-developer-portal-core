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

test('every technical stylesheet carries its own token import', () => {
    // Internal pages render inside the organization's stored layout - a snapshot frozen
    // at upload time that will never gain the tokens.css <link> from the disk layout.
    // So delivery cannot depend on the layout: each sheet imports the token layer
    // itself, and then resolves however it was reached.
    const sheets = walk(TECHNICAL_STYLES, '.css').filter((f) => !f.endsWith('tokens.css'));
    const missing = sheets
        .filter((f) => !read(f).includes('@import "/technical-styles/tokens.css"'))
        .map(rel);

    assert.ok(sheets.length > 0, 'expected to find technical stylesheets');
    assert.deepStrictEqual(
        missing, [],
        'these sheets would resolve to nothing on an internal page under a stored layout:\n  '
        + missing.join('\n  ')
    );

    // tokens.css must not import itself - that is a resolution cycle.
    assert.ok(
        !read(TOKENS).includes('@import "/technical-styles/tokens.css"'),
        'tokens.css imports itself'
    );
});

test('no new undefined token creeps in', () => {
    // Checked in the THEME context specifically: a themable page links tokens.css,
    // components.css and the theme's own stylesheets. It never loads
    // /technical-styles/main.css, so a token defined only there is still undefined at
    // runtime - which pooling both trees would hide.
    //
    // The pinned list is pre-existing and out of scope for the theming work. Anything
    // beyond it is ours and is a bug.
    const EXTERNAL = /^--(bs|tw)-/;   // Bootstrap from the CDN, Tailwind in the Swagger overrides

    const collect = (files) => {
        const defined = new Set();
        const used = new Set();
        for (const f of files) {
            const css = read(f);
            for (const t of definedIn(css)) defined.add(t);
            for (const t of referencedIn(css)) used.add(t);
        }
        return [...used].filter((t) => !defined.has(t) && !EXTERNAL.test(t)).sort();
    };

    const themeContext = [
        ...walk(path.join(DEFAULT_CONTENT, 'styles'), '.css'),
        TOKENS,
        path.join(TECHNICAL_STYLES, 'components.css'),
    ];

    assert.deepStrictEqual(
        collect(themeContext),
        ['--light-ash-color', '--primary-color', '--primary-main-color-rgb', '--white-text-color'],
        'the set of undefined custom properties on a themable page changed - a new one is a bug in this work'
    );

    // And the technical context: a sheet under /technical-styles/ resolves against
    // tokens.css plus the twenty legacy seeds the layout's main.css supplies - ours on
    // an unthemed organization, the customer's own copy otherwise, same names either way.
    const LEGACY_SEEDS = [
        '--main-bg-color', '--secondary-bg-color', '--primary-main-color', '--primary-dark-color',
        '--primary-light-color', '--primary-lightest-color', '--secondary-main-color',
        '--secondary-light-color', '--main-text-color', '--light-text-color', '--dark-text-color',
        '--success-color', '--danger-color', '--warning-color', '--white-color', '--Black-color',
        '--subscribed-color', '--primary-gradient', '--font-family-sans', '--font-family-mono',
    ];
    const technical = collect(walk(TECHNICAL_STYLES, '.css')).filter((t) => !LEGACY_SEEDS.includes(t));

    assert.deepStrictEqual(
        technical,
        [
            '--border-colour-primary', '--border-colour-secondary', '--card-color', '--dark-color',
            '--font-colour-primary', '--light-bg-color', '--notselect-star-color', '--primary-color',
            '--primary-main-color-rgb', '--secondary-color', '--secondary-text-color',
        ],
        'the set of undefined custom properties on an internal page changed - a new one is a bug in this work'
    );
});
