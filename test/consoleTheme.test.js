/*
 * Keeps the Bijira Console's copy of the default theme in step with this repository.
 *
 * The console seeds its editor from that copy, so whatever it holds is what a customer
 * starts editing and what eventually lands in the database. Drift there means customers
 * inherit an older portal the moment they open the theming page.
 *
 * Skipped unless CONSOLE_THEME_DIR points at a console checkout, so CI stays
 * self-contained and needs no second repository.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { DEFAULT_CONTENT, TECHNICAL_STYLES, read } = require('./helpers/themeFiles');

const CONSOLE_DIR = process.env.CONSOLE_THEME_DIR;
const skip = !CONSOLE_DIR && 'set CONSOLE_THEME_DIR to a console default-org-theme directory';

// Mirrors the manifest in scripts/build-console-theme.js.
const SHIPPED = [
    'styles/main.css', 'styles/home.css', 'styles/api-content.css',
    'partials/header.hbs', 'pages/home/partials/home.hbs',
];
const PREVIEW = [
    'styles/header.css', 'styles/footer.css', 'styles/side-bar.css',
    'styles/api-listing.css', 'styles/doc.css', 'styles/default-api.css',
    'styles/default-home.css', 'partials/footer.hbs', 'partials/sidebar.hbs',
];

test('the console copy matches this repository', { skip }, () => {
    const drifted = [];
    for (const f of [...SHIPPED, ...PREVIEW]) {
        const theirs = path.join(CONSOLE_DIR, f);
        if (!fs.existsSync(theirs)) { drifted.push(`${f} (missing)`); continue; }
        if (read(theirs) !== read(path.join(DEFAULT_CONTENT, f))) drifted.push(f);
    }
    assert.deepStrictEqual(
        drifted, [],
        'run: node scripts/build-console-theme.js <console>/public/default-org-theme\n  '
        + drifted.join('\n  ')
    );
});

test('the console can serve every stylesheet main.css imports', { skip }, () => {
    // The preview iframe rewrites @import "/styles/x.css" to "/default-org-theme/styles/x.css"
    // but leaves /technical-styles/ alone, so both have to exist under the console's public/.
    const mainCss = read(path.join(CONSOLE_DIR, 'styles', 'main.css'));
    const missing = [...mainCss.matchAll(/@import\s+(?!url\()["']([^"']+)["']\s*;/g)]
        .map((m) => m[1])
        .filter((ref) => {
            if (ref.startsWith('/styles/')) return !fs.existsSync(path.join(CONSOLE_DIR, ref.slice(1)));
            if (ref.startsWith('/technical-styles/')) return !fs.existsSync(path.join(CONSOLE_DIR, '..', ref.slice(1)));
            return false;
        });
    assert.deepStrictEqual(missing, [], `the preview would silently lose:\n  ${missing.join('\n  ')}`);
});

test('the console ships the token layer at the path the imports use', { skip }, () => {
    for (const f of ['tokens.css', 'components.css']) {
        const theirs = path.join(CONSOLE_DIR, '..', 'technical-styles', f);
        assert.ok(fs.existsSync(theirs), `missing ${f} under the console's public/technical-styles/`);
        assert.strictEqual(
            read(theirs), read(path.join(TECHNICAL_STYLES, f)),
            `${f} has drifted from this repository`
        );
    }
});

test('the preview layout keeps the placeholders the console replaces', { skip }, () => {
    // OrgTheming.tsx swaps these exact strings, inner spacing included. Reformat one and
    // the preview renders the raw handlebars instead of the partial.
    const layout = read(path.join(CONSOLE_DIR, 'layout', 'main.hbs'));
    for (const placeholder of ['{{> header }}', '{{> sidebar }}', '{{> footer }}', '{{{ body }}}']) {
        assert.ok(layout.includes(placeholder), `the preview layout lost the exact string ${placeholder}`);
    }
});
