/*
 * The theme's :root block is parsed and rewritten by the Bijira Console, whose
 * parser is line-based and lossy. These tests apply the console's OWN regexes to
 * the block we ship, so that anything the console would silently drop on a
 * customer's next save fails the build here instead.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { DEFAULT_CONTENT, read } = require('./helpers/themeFiles');

const MAIN_CSS = path.join(DEFAULT_CONTENT, 'styles', 'main.css');

// Verbatim from the console (OrgTheming.tsx). Do not "improve" these - the whole
// point is that they behave exactly as the console's do.
const CONSOLE_ROOT_BLOCK = /:root\s*\{([\s\S]*?)\}/;
const CONSOLE_DECLARATION = /^(--[a-zA-Z0-9-_]+)\s*:\s*(.+);$/;

// The four the console's colour pickers write directly.
const PICKER_SEEDS = [
    '--main-bg-color', '--primary-main-color', '--secondary-main-color', '--main-text-color',
];

// Read by src/scripts/common.js to recolour inline SVGs.
const JS_READ = [
    '--primary-main-color', '--primary-light-color', '--primary-lightest-color', '--secondary-main-color',
];

function rootBlock(css) {
    const m = css.match(CONSOLE_ROOT_BLOCK);
    assert.ok(m, ':root block not found');
    return m[1];
}

function parseLikeConsole(block) {
    const vars = {};
    for (const line of block.split('\n')) {
        const m = line.trim().match(CONSOLE_DECLARATION);
        if (m) vars[m[1]] = m[2];
    }
    return vars;
}

function checkTokenBlock(css, label) {
    const block = rootBlock(css);
    const recovered = parseLikeConsole(block);

    // The count check is the important one: it catches a multi-line value or a
    // trailing comment before it silently vanishes from a saved customer theme.
    const declared = (block.match(/--[a-zA-Z0-9-_]+\s*:/g) || []).length;
    assert.strictEqual(
        Object.keys(recovered).length, declared,
        `${label}: the console's parser recovers ${Object.keys(recovered).length} of ${declared} declarations. `
        + 'Every declaration must be on one line, end with ";", and carry no trailing comment.'
    );

    assert.ok(!block.includes('}'), `${label}: the :root block must not contain "}" - the console's regex is non-greedy`);

    for (const seed of PICKER_SEEDS) {
        assert.ok(seed in recovered, `${label}: missing console picker seed ${seed}`);
        assert.match(
            recovered[seed], /^#[0-9A-Fa-f]{6}$/,
            `${label}: ${seed} must be 6-digit hex - the console's isValidHex rejects anything else`
        );
    }

    for (const name of JS_READ) {
        assert.ok(name in recovered, `${label}: ${name} is read by common.js and must be defined`);
    }

    return recovered;
}

test(':root is the first block in main.css', () => {
    const css = read(MAIN_CSS);
    const firstRoot = css.indexOf(':root');
    const secondRoot = css.indexOf(':root', firstRoot + 1);
    assert.ok(firstRoot >= 0, 'no :root block found');
    assert.strictEqual(secondRoot, -1, 'main.css must contain exactly one :root - the console rewrites only the first');
});

test('the shipped :root survives the console\'s own parser intact', () => {
    const recovered = checkTokenBlock(read(MAIN_CSS), 'defaultContent/styles/main.css');
    assert.strictEqual(
        Object.keys(recovered).length, 20,
        `expected the established 20-token contract, got ${Object.keys(recovered).length}`
    );
});

test('--primary-gradient stays a literal gradient the console can round-trip', () => {
    const recovered = parseLikeConsole(rootBlock(read(MAIN_CSS)));
    assert.match(recovered['--primary-gradient'] || '', /^linear-gradient\(.+\)$/);
});

// The console ships its own copy of this file. The two must not drift. Skipped
// unless the console checkout is pointed at explicitly, so CI stays self-contained.
test('the console\'s copy of main.css matches ours', { skip: !process.env.CONSOLE_THEME_DIR }, () => {
    const consoleMain = path.join(process.env.CONSOLE_THEME_DIR, 'styles', 'main.css');
    assert.ok(fs.existsSync(consoleMain), `not found: ${consoleMain}`);

    const ours = read(MAIN_CSS);
    const theirs = fs.readFileSync(consoleMain, 'utf8');

    const oursTokens = parseLikeConsole(rootBlock(ours));
    const theirsTokens = checkTokenBlock(theirs, 'console default-org-theme/styles/main.css');
    assert.deepStrictEqual(
        Object.keys(theirsTokens).sort(), Object.keys(oursTokens).sort(),
        'the console copy defines a different set of tokens'
    );
    for (const [k, v] of Object.entries(oursTokens)) {
        assert.strictEqual(theirsTokens[k].trim(), v.trim(), `token ${k} differs between the two copies`);
    }

    const imports = (css) => (css.match(/@import\s+(?!url\()["'][^"']+["']\s*;/g) || []).map((s) => s.trim());
    assert.deepStrictEqual(
        imports(theirs), imports(ours),
        'the console copy has a different @import list - it re-emits this list on save, so a missing '
        + 'import is dropped permanently from the customer\'s theme'
    );
});
