/*
 * Proves the theme we ship survives our own upload endpoint.
 *
 * validateScripts() is what POST/PUT .../layout runs over every uploaded .hbs.
 * If a template we ship carries a <script> that is not on the allowlist, any
 * customer who downloads the default theme, tweaks it and re-uploads gets a 400.
 */
const test = require('node:test');
const assert = require('node:assert');

/* scriptValidation rather than util: util.js requires dao/admin, which reaches
   db/sequelize and `require(process.cwd() + '/config.json')` at import time. That file is
   gitignored, so requiring util here failed on a fresh checkout - which is what broke this
   suite on CI while it passed on any machine with a local config.json. The function is the
   same one util re-exports, so this still covers what the upload endpoint runs. */
const util = require('../src/utils/scriptValidation');
const { themeTemplates, acmeTemplates, rel, read } = require('./helpers/themeFiles');

function assertAccepted(files, label) {
    const rejected = [];
    for (const file of files) {
        try {
            util.validateScripts(read(file));
        } catch (err) {
            rejected.push(`${rel(file)}: ${err.description || err.message}`);
        }
    }
    assert.deepStrictEqual(rejected, [], `${label} rejected by validateScripts:\n  ${rejected.join('\n  ')}`);
}

test('validateScripts is exported and callable', () => {
    assert.strictEqual(typeof util.validateScripts, 'function');
});

test('every shipped theme template passes validateScripts', () => {
    const files = themeTemplates();
    assert.ok(files.length > 0, 'expected to find theme templates');
    assertAccepted(files, 'shipped theme templates');
});

test('the committed ACME theme still passes validateScripts', () => {
    const files = acmeTemplates();
    assert.ok(files.length > 0, 'expected to find the ACME fixture');
    assertAccepted(files, 'ACME fixture templates');
});

test('validateScripts still rejects a script that is not allowlisted', () => {
    assert.throws(
        () => util.validateScripts("<script src='https://evil.example.com/x.js'></script>"),
        (err) => err.statusCode === 400 && /not allowed/i.test(err.description),
        'validateScripts must reject unknown script sources - otherwise this suite proves nothing'
    );
});
