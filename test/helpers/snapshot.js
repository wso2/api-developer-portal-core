/*
 * Golden snapshots: the "before" photo P0 exists to take.
 *
 * Every later phase either leaves these byte-identical or produces a diff that a
 * human has to agree with. Regenerate deliberately with UPDATE_SNAPSHOTS=1 and read
 * the diff before committing it.
 */
const fs = require('fs');
const path = require('path');
const assert = require('node:assert');

const DIR = path.join(__dirname, '..', 'snapshots');

function matchSnapshot(name, actual) {
    const file = path.join(DIR, `${name}.html`);
    if (process.env.UPDATE_SNAPSHOTS === '1' || !fs.existsSync(file)) {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, actual);
        return;
    }
    const expected = fs.readFileSync(file, 'utf8');
    assert.strictEqual(
        actual, expected,
        `snapshot ${name} changed.\n`
        + 'If the change is intended, review the diff and re-run with UPDATE_SNAPSHOTS=1.'
    );
}

module.exports = { matchSnapshot, SNAPSHOT_DIR: DIR };
