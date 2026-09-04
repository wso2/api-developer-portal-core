#!/usr/bin/env node
/*
 * Syncs the Bijira Console's copy of the default theme from this repository.
 *
 *   node scripts/build-console-theme.js <path-to>/public/default-org-theme
 *
 * WHY THE CONSOLE HAS A COPY AT ALL
 * ---------------------------------
 * The console builds a theme zip in the browser from editor state. When an
 * organization has never themed its portal, the editor is seeded from these files -
 * so this copy is what a customer starts editing, and what eventually lands in
 * DP_ORGANIZATION_ASSETS. If it drifts from what this repository ships, customers
 * inherit an older portal the moment they touch the theming page.
 *
 * WHAT IS SYNCED, AND WHAT IS NOT
 * -------------------------------
 * SHIPPED   the five files the console actually uploads. These reach customers, so
 *           they must match this repository exactly.
 * PREVIEW   not uploaded, but the console renders them in its preview iframe. Kept in
 *           step so the preview looks like the real portal. The iframe rewrites
 *           @import "/styles/x.css" to "/default-org-theme/styles/x.css", so every
 *           import in main.css needs a counterpart here or the preview silently
 *           loses it - which is why the stylesheet list below is longer than it looks.
 * SKIPPED   console-only scaffolding this script must never touch, above all
 *           layout/main.hbs: the console string-replaces the exact placeholders
 *           "{{> header }}", "{{> sidebar }}", "{{> footer }}" and "{{{ body }}}",
 *           inner spacing included, and our layout has a different shape.
 */
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '..', 'src', 'defaultContent');
const TECHNICAL = path.join(__dirname, '..', 'src', 'styles');

const SHIPPED = [
    'styles/main.css',
    'styles/home.css',
    'styles/api-content.css',
    'partials/header.hbs',
    'pages/home/partials/home.hbs',
];

const PREVIEW = [
    'styles/header.css',
    'styles/footer.css',
    'styles/side-bar.css',
    'styles/api-listing.css',
    'styles/doc.css',
    'styles/default-api.css',
    'styles/default-home.css',
    'partials/footer.hbs',
    'partials/sidebar.hbs',
];

/** Served at /technical-styles/ by the portal; the console needs them at the same path. */
const TECHNICAL_FILES = ['tokens.css', 'components.css'];

function copy(from, to) {
    const next = fs.readFileSync(from);
    if (fs.existsSync(to) && fs.readFileSync(to).equals(next)) return false;
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, next);
    return true;
}

function main() {
    const target = process.argv[2];
    if (!target) {
        console.error('usage: node scripts/build-console-theme.js <path-to>/public/default-org-theme');
        process.exit(1);
    }
    if (!fs.existsSync(target)) {
        console.error(`not found: ${target}`);
        process.exit(1);
    }

    let changed = 0;
    for (const [label, files] of [['shipped', SHIPPED], ['preview', PREVIEW]]) {
        for (const f of files) {
            if (copy(path.join(SOURCE, f), path.join(target, f))) {
                console.log(`  ${label}  ${f}`);
                changed += 1;
            }
        }
    }

    // The imports resolve against the console's own origin, so these sit in public/
    // rather than inside the theme directory.
    const publicDir = path.join(target, '..', 'technical-styles');
    for (const f of TECHNICAL_FILES) {
        if (copy(path.join(TECHNICAL, f), path.join(publicDir, f))) {
            console.log(`  tokens   technical-styles/${f}`);
            changed += 1;
        }
    }

    // Every @import in the synced main.css must have a counterpart, or the preview
    // requests a path the console cannot serve.
    const mainCss = fs.readFileSync(path.join(target, 'styles', 'main.css'), 'utf8');
    const missing = [...mainCss.matchAll(/@import\s+(?!url\()["']([^"']+)["']\s*;/g)]
        .map((m) => m[1])
        .filter((ref) => {
            if (ref.startsWith('/styles/')) return !fs.existsSync(path.join(target, ref.slice(1)));
            if (ref.startsWith('/technical-styles/')) return !fs.existsSync(path.join(target, '..', ref.slice(1)));
            return false;
        });

    if (missing.length) {
        console.error(`\n  main.css imports files the console cannot serve:\n    ${missing.join('\n    ')}`);
        process.exit(1);
    }

    console.log(changed ? `\n  ${changed} file(s) updated` : '\n  already in sync');
}

main();
