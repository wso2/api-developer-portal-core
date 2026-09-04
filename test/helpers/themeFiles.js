/*
 * Shared discovery helpers for the theme test suites.
 *
 * Everything here reads files that are already committed to this repository.
 * No test may read from a database or from anything derived from the dev data
 * dump - see the fixture policy in the theming plan.
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..', '..');
const DEFAULT_CONTENT = path.join(REPO_ROOT, 'src', 'defaultContent');
const TECHNICAL_STYLES = path.join(REPO_ROOT, 'src', 'styles');
const ACME_THEME = path.join(REPO_ROOT, 'artifacts', 'default', 'orgContent', 'ACME');

function walk(dir, ext) {
    if (!fs.existsSync(dir)) return [];
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full, ext));
        else if (!ext || entry.name.endsWith(ext)) out.push(full);
    }
    return out.sort();
}

const rel = (p) => path.relative(REPO_ROOT, p);
const read = (p) => fs.readFileSync(p, 'utf8');

module.exports = {
    REPO_ROOT,
    DEFAULT_CONTENT,
    TECHNICAL_STYLES,
    ACME_THEME,
    walk,
    rel,
    read,
    themeTemplates: () => walk(DEFAULT_CONTENT, '.hbs'),
    themeStyles: () => walk(path.join(DEFAULT_CONTENT, 'styles'), '.css'),
    themeImages: () => walk(path.join(DEFAULT_CONTENT, 'images')),
    acmeTemplates: () => walk(ACME_THEME, '.hbs'),
};
