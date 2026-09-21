/*
 * Every Handlebars helper a shipped template calls must actually be registered.
 *
 * An unregistered helper - including any (subexpression) - throws "Missing helper"
 * at render time, which surfaces as HTTP 500 rather than a degraded page. This is
 * what keeps ported upstream markup from bringing in helpers we do not have.
 */
const test = require('node:test');
const assert = require('node:assert');
const Handlebars = require('handlebars');

const { registerHelpers } = require('../src/utils/handlebarsHelpers');
const { themeTemplates, rel, read } = require('./helpers/themeFiles');

// Built-ins Handlebars provides itself, plus block params that are never helpers.
const BUILT_IN = new Set([
    'if', 'unless', 'each', 'with', 'log', 'lookup', 'helperMissing', 'blockHelperMissing',
    'else', 'this',
]);

function registeredHelpers() {
    const hbs = Handlebars.create();
    registerHelpers(hbs);
    return new Set(Object.keys(hbs.helpers));
}

/**
 * Collects helper calls that Handlebars will actually try to resolve as helpers,
 * using its own parser rather than a regex over the source.
 *
 * Handlebars only throws "Missing helper" when a path is unambiguously a helper
 * invocation:
 *   - any (subexpression)
 *   - a mustache or block with params or a hash, e.g. {{eq a b}} / {{#in x values=y}}
 * A bare {{foo}} or {{#foo}} resolves as a context lookup instead and degrades
 * quietly, so neither is collected here.
 */
function helperCalls(source) {
    const found = new Set();
    const ast = Handlebars.parse(source);

    const isHelperInvocation = (node) =>
        node.path && node.path.type === 'PathExpression'
        && !node.path.data && node.path.parts.length === 1 && node.path.depth === 0
        && ((node.params && node.params.length > 0) || (node.hash && node.hash.pairs.length > 0));

    const visit = (node) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(visit); return; }

        if (node.type === 'SubExpression' && node.path && node.path.parts.length === 1) {
            found.add(node.path.parts[0]);
        } else if ((node.type === 'MustacheStatement' || node.type === 'BlockStatement') && isHelperInvocation(node)) {
            found.add(node.path.parts[0]);
        }

        for (const key of ['body', 'program', 'inverse', 'params', 'hash', 'pairs', 'value', 'path']) {
            if (node[key]) visit(node[key]);
        }
    };

    visit(ast.body);
    return found;
}

// The 32 app.js used to register inline, plus artifactTypesLabel for the home hero copy,
// countWhere for the type-aware listing counts, isUnlimitedRate for the plan card's rate
// limit and mcpServerConfig for the MCP config panel's JSON. Bump this deliberately when
// adding a helper - the count exists to catch one going missing in the extraction, not
// to forbid new ones.
test('the helper module registers every helper app.js used to register inline', () => {
    const helpers = registeredHelpers();
    const custom = [...helpers].filter((h) => !BUILT_IN.has(h));
    assert.strictEqual(custom.length, 36, `expected 36 custom helpers, got ${custom.length}: ${custom.sort().join(' ')}`);
});

test('every helper called by a shipped template is registered', () => {
    const helpers = registeredHelpers();
    const missing = [];
    for (const file of themeTemplates()) {
        for (const name of helperCalls(read(file))) {
            if (!helpers.has(name) && !BUILT_IN.has(name)) missing.push(`${rel(file)}: ${name}`);
        }
    }
    assert.deepStrictEqual(missing, [], `template calls an unregistered helper (this is an HTTP 500):\n  ${missing.join('\n  ')}`);
});

test('helpers core does not have stay out of the theme', () => {
    // Upstream's templates use these; each is coupled to a render layer this portal
    // does not have, so ported markup must be stripped of them rather than shimmed.
    const forbidden = ['basePath', 'pageHead', 'pageScripts', 'designMode'];
    const offenders = [];
    for (const file of themeTemplates()) {
        const source = read(file);
        for (const name of forbidden) {
            if (new RegExp(`\\{\\{[#/]?\\s*${name}\\b|\\(\\s*${name}\\b`).test(source)) {
                offenders.push(`${rel(file)}: ${name}`);
            }
        }
    }
    assert.deepStrictEqual(offenders, [], `unsupported helper reintroduced:\n  ${offenders.join('\n  ')}`);
});

/*
 * A helper also has to match the shape it is called in.
 *
 * Handlebars hands every helper an options object, but only a block invocation gets one
 * carrying fn/inverse. A helper that assumes the block form throws
 * "lastArg.inverse is not a function" the moment a template uses it as a (subexpression),
 * and a value-returning helper renders nothing useful when used as a block. Neither is
 * caught by "is it registered" above: `and` was registered and still 500'd the docs page
 * as soon as an API had a document to list.
 */
function helperCallSites(source) {
    const sites = [];
    const ast = Handlebars.parse(source);

    const named = (node) => (
        node.path && node.path.type === 'PathExpression'
        && !node.path.data && node.path.parts.length === 1 && node.path.depth === 0
            ? node.path.parts[0] : null);

    const visit = (node) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(visit); return; }

        const name = named(node);
        const hasArgs = (node.params && node.params.length > 0)
            || (node.hash && node.hash.pairs.length > 0);
        if (name) {
            if (node.type === 'SubExpression'
                || (node.type === 'MustacheStatement' && hasArgs)) {
                sites.push({ name, form: 'value', arity: node.params.length });
            } else if (node.type === 'BlockStatement' && hasArgs) {
                sites.push({ name, form: 'block', arity: node.params.length });
            }
        }

        for (const key of ['body', 'program', 'inverse', 'params', 'hash', 'pairs', 'value', 'path']) {
            if (node[key]) visit(node[key]);
        }
    };

    visit(ast.body);
    return sites;
}

function callSitesInTemplates() {
    const byKey = new Map();
    for (const file of themeTemplates()) {
        for (const site of helperCallSites(read(file))) {
            const key = `${site.name}:${site.form}:${site.arity}`;
            if (!byKey.has(key)) byKey.set(key, { ...site, file: rel(file) });
        }
    }
    return [...byKey.values()];
}

// A throw caused by our stand-in arguments tells us nothing; only this one does.
const isShapeError = (err) => /\.(fn|inverse) is not a function/.test(err.message);

test('a helper used as a (subexpression) does not assume the block form', () => {
    const hbs = Handlebars.create();
    registerHelpers(hbs);
    const offenders = [];

    for (const site of callSitesInTemplates()) {
        if (site.form !== 'value' || BUILT_IN.has(site.name)) continue;
        const fn = hbs.helpers[site.name];
        if (typeof fn !== 'function') continue;
        // The options a non-block invocation actually receives: no fn, no inverse.
        const args = Array.from({ length: site.arity }, () => 1);
        args.push({ name: site.name, hash: {}, data: {}, loc: {} });
        try {
            fn.apply({}, args);
        } catch (err) {
            if (isShapeError(err)) {
                offenders.push(`${site.file}: (${site.name} ...) - ${err.message}`);
            }
        }
    }

    assert.deepStrictEqual(offenders, [], `helper throws in value position (this is an HTTP 500):\n  ${offenders.join('\n  ')}`);
});

test('a helper used as a block renders the block rather than a value', () => {
    const hbs = Handlebars.create();
    registerHelpers(hbs);
    const MAIN = '<fn>';
    const ELSE = '<inverse>';
    const offenders = [];

    for (const site of callSitesInTemplates()) {
        if (site.form !== 'block' || BUILT_IN.has(site.name)) continue;
        const fn = hbs.helpers[site.name];
        if (typeof fn !== 'function') continue;
        const args = Array.from({ length: site.arity }, () => 1);
        args.push({
            name: site.name, hash: {}, data: {}, loc: {}, fn: () => MAIN, inverse: () => ELSE,
        });
        let out;
        try {
            out = fn.apply({}, args);
        } catch {
            continue; // our stand-in arguments, not a shape problem
        }
        if (out !== MAIN && out !== ELSE) {
            offenders.push(`${site.file}: {{#${site.name}}} ignored its block and returned ${JSON.stringify(out)}`);
        }
    }

    assert.deepStrictEqual(offenders, [], `helper used as a block does not render it:\n  ${offenders.join('\n  ')}`);
});
