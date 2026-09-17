/*
 * Which tokens survive a round trip through the Bijira Console.
 *
 * Three console paths REPLACE the token map rather than merging into it:
 *   Save         rebuilds main.css from only the declarations its line parser recovered
 *   Reset        replaces the editor state with a fixed 21-key literal
 *   AI theming   builds a hardcoded 18-key object, then runs the 7 derived overrides
 *
 * So a token we add to the theme's :root is not ours to keep. This suite pins
 * exactly which tokens survive, so that any new one is a deliberate decision rather
 * than something a customer silently loses the next time they touch the console.
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('path');

const { DEFAULT_CONTENT, read } = require('./helpers/themeFiles');

const MAIN_CSS = path.join(DEFAULT_CONTENT, 'styles', 'main.css');
const CONSOLE_DECLARATION = /^(--[a-zA-Z0-9-_]+)\s*:\s*(.+);$/;

// choreo-console: src/pages/OrgTheming/OrgTheming.tsx - defaultThemeVariables (Reset writes this set)
const CONSOLE_RESET_SET = [
    '--main-bg-color', '--secondary-bg-color',
    '--primary-main-color', '--primary-light-color', '--primary-dark-color', '--primary-lightest-color',
    '--secondary-main-color', '--secondary-light-color',
    '--main-text-color', '--light-text-color', '--dark-text-color',
    '--primary-gradient',
    '--success-color', '--danger-color', '--warning-color',
    '--white-color', '--Black-color', '--subscribed-color',
    '--font-family-sans', '--font-family-serif', '--font-family-mono',
];

// choreo-console: OrgTheming.tsx - mapResultToThemeVariables (AI theming writes this set)
const CONSOLE_AI_SET = [
    '--main-bg-color', '--secondary-bg-color',
    '--primary-main-color', '--primary-dark-color', '--primary-light-color',
    '--secondary-main-color', '--secondary-light-color',
    '--dark-text-color', '--main-text-color', '--light-text-color',
    '--primary-gradient', '--font-family-sans',
    '--success-color', '--danger-color', '--warning-color',
    '--white-color', '--Black-color', '--subscribed-color',
];

// choreo-console: deriveThemeVariables.ts - always recomputed from the four seeds
const CONSOLE_DERIVED_SET = [
    '--secondary-bg-color', '--light-text-color', '--dark-text-color',
    '--primary-light-color', '--primary-dark-color', '--primary-lightest-color',
    '--secondary-light-color',
];

function shippedTokens() {
    const block = read(MAIN_CSS).match(/:root\s*\{([\s\S]*?)\}/)[1];
    const names = [];
    for (const line of block.split('\n')) {
        const m = line.trim().match(CONSOLE_DECLARATION);
        if (m) names.push(m[1]);
    }
    return names;
}

test('every shipped token survives a console Reset', () => {
    const survives = new Set([...CONSOLE_RESET_SET, ...CONSOLE_DERIVED_SET]);
    const lost = shippedTokens().filter((t) => !survives.has(t));
    assert.deepStrictEqual(
        lost, [],
        'these tokens would be erased the moment a customer presses "Reset to Default":\n  '
        + lost.join('\n  ')
        + '\nDesign-system tokens belong in src/styles/tokens.css, which the console never touches.'
    );
});

test('the tokens AI theming drops are exactly the known set', () => {
    // A change-detector, not an aspiration: AI theming replaces the map with its own
    // 18 keys plus the 7 derived ones, so anything else is dropped. Today that is
    // --font-family-mono, which default-api.css consumes in two places.
    const survives = new Set([...CONSOLE_AI_SET, ...CONSOLE_DERIVED_SET]);
    const lost = shippedTokens().filter((t) => !survives.has(t));
    assert.deepStrictEqual(
        lost, ['--font-family-mono'],
        'the set of tokens lost to AI theming changed - confirm this is intended'
    );
});

test('design-system tokens are not smuggled into the theme :root', () => {
    // The new vocabulary lives in /technical-styles/tokens.css precisely because the
    // console cannot round-trip it. This fails the build if one migrates back.
    const legacy = new Set([...CONSOLE_RESET_SET, ...CONSOLE_DERIVED_SET]);
    const strangers = shippedTokens().filter((t) => !legacy.has(t));
    assert.deepStrictEqual(
        strangers, [],
        'unexpected token in the theme :root - put it in src/styles/tokens.css instead:\n  ' + strangers.join('\n  ')
    );
});
