/*
 * Structural invariants on how the shipped theme references its own assets.
 *
 * These encode constraints that are invisible at render time on a developer's
 * machine but break for organizations that have a stored theme in the database.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
    DEFAULT_CONTENT, themeTemplates, themeStyles, themeImages, rel, read,
} = require('./helpers/themeFiles');

const LAYOUT = path.join(DEFAULT_CONTENT, 'layout', 'main.hbs');

test('no template reintroduces {{basePath}}', () => {
    // Core mounts at the root. A {{basePath}}-prefixed asset URL is not matched by
    // the upload-time rewrite, and a {{basePath}} script src is not on the allowlist.
    const offenders = themeTemplates()
        .filter((f) => read(f).includes('{{basePath}}'))
        .map(rel);
    assert.deepStrictEqual(offenders, [], `{{basePath}} is not supported in this portal:\n  ${offenders.join('\n  ')}`);
});

test('layout/main.hbs links no /styles/* stylesheet other than main.css', () => {
    // For an organization with a stored theme the layout's "/styles/" occurrences are
    // rewritten to a database asset lookup. /styles/main.css is the theming mechanism
    // itself and always resolves. Any OTHER /styles/ link would miss for an org whose
    // stored theme lacks that file - and the asset endpoint never responds on a miss,
    // so the request hangs rather than 404s. New stylesheets go in /technical-styles/.
    const links = [...read(LAYOUT).matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map((m) => m[1]);
    const offenders = links.filter(
        (href) => href.includes('/styles/')
            && !href.includes('/technical-styles/')
            && href !== '/styles/main.css'
    );
    assert.deepStrictEqual(
        offenders, [],
        `layout/main.hbs must not link /styles/* beyond main.css - use /technical-styles/:\n  ${offenders.join('\n  ')}`
    );
});

test('every @import in the theme uses the absolute /styles/<name>.css form', () => {
    // The upload-time rewrite matches this literal shape only. A relative import
    // would survive upload unrewritten and 404 for a themed organization.
    const bad = [];
    for (const file of themeStyles()) {
        for (const m of read(file).matchAll(/@import\s+(?!url\()["']([^"']+)["']\s*;/g)) {
            // Two legitimate forms: a sibling theme stylesheet, and the token layer,
            // which every sheet imports so it resolves however it was reached.
            const ok = /^\/styles\/[A-Za-z0-9._-]+\.css$/.test(m[1])
                || m[1] === '/technical-styles/tokens.css';
            if (!ok) bad.push(`${rel(file)}: ${m[1]}`);
        }
    }
    assert.deepStrictEqual(bad, [], `non-absolute @import found:\n  ${bad.join('\n  ')}`);
});

test('every @import target exists on disk', () => {
    const missing = [];
    for (const file of themeStyles()) {
        for (const m of read(file).matchAll(/@import\s+(?!url\()["']\/styles\/([^"']+)["']\s*;/g)) {
            const target = path.join(DEFAULT_CONTENT, 'styles', m[1]);
            if (!fs.existsSync(target)) missing.push(`${rel(file)} -> /styles/${m[1]}`);
        }
    }
    assert.deepStrictEqual(missing, [], `@import points at a file that does not exist:\n  ${missing.join('\n  ')}`);
});

test('every local /images/ reference in the theme exists on disk', () => {
    // Image references inside partials are rewritten into database asset lookups at
    // upload time. A reference to a file we do not ship becomes a miss - and a miss
    // on that endpoint hangs.
    const missing = [];
    const files = [...themeTemplates(), ...themeStyles()];
    for (const file of files) {
        for (const m of read(file).matchAll(/["'(]\/images\/([A-Za-z0-9._-]+)/g)) {
            const target = path.join(DEFAULT_CONTENT, 'images', m[1]);
            if (!fs.existsSync(target)) missing.push(`${rel(file)} -> /images/${m[1]}`);
        }
    }
    assert.deepStrictEqual(missing, [], `reference to a missing image:\n  ${missing.join('\n  ')}`);
});

test('shipped image filenames are safe for the upload-time URL rewrite', () => {
    // At upload time an image reference becomes a query string:
    //     /images/x.svg  ->  ...layout?fileType=image&fileName=x.svg
    // so a filename containing & (or ? or #) silently truncates fileName, the lookup
    // misses, and a miss on that endpoint does not 404 - it hangs.
    const unsafe = themeImages()
        .map((f) => path.basename(f))
        .filter((name) => /[&?#=]/.test(name));
    assert.deepStrictEqual(
        unsafe, [],
        `image filename would break the rewritten asset URL:\n  ${unsafe.join('\n  ')}`
    );
});
