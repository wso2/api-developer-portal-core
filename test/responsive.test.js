/*
 * Invariants that keep the layout usable at every screen size.
 *
 * These are static checks on the stylesheets, not rendered-layout checks - a real layout
 * assertion needs a browser. Each one encodes a bug that actually shipped, so the shape of
 * the mistake is what gets caught rather than its symptom.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { walk, rel, read } = require('./helpers/themeFiles');

const SHEETS = [
    ...walk(path.join(__dirname, '..', 'src', 'styles'), '.css'),
    ...walk(path.join(__dirname, '..', 'src', 'defaultContent', 'styles'), '.css'),
];

/** Every rule inside a media query, as [selector, declarations]. */
function rulesInMediaQueries(css) {
    const out = [];
    for (const m of css.matchAll(/@media[^{]*\{/g)) {
        let i = m.index + m[0].length;
        let depth = 1;
        while (i < css.length && depth > 0) {
            if (css[i] === '{') depth += 1;
            else if (css[i] === '}') depth -= 1;
            i += 1;
        }
        const body = css.slice(m.index + m[0].length, i);
        for (const r of body.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
            out.push([r[1].trim(), r[2]]);
        }
    }
    return out;
}

test('a media query that flips a row to a column resets the cross-axis alignment', () => {
    /* align-items means opposite things in the two directions. In a row, `flex-start`
       aligns children to the top - which is what the desktop rule wants. In a column it is
       a cross-axis rule meaning "size each child to its own content instead of the
       container", so a child with wide content takes its max-content width and hangs out
       of the container.

       That is how the API overview lost its right-hand side on every phone and tablet:
       .aov-body flipped to a column at 1024px and kept the row's flex-start, so
       .aov-body-main grew to 912px inside a 313px parent and the ancestor clipped it. An
       API with no endpoints has a narrow max-content and looked perfectly fine, which is
       why it survived review. Three more selectors had the same shape. */
    const offenders = [];
    for (const file of SHEETS) {
        const css = read(file);
        for (const [sel, decls] of rulesInMediaQueries(css)) {
            if (!/flex-direction:\s*column/.test(decls)) continue;
            if (/align-items/.test(decls)) continue;
            const base = css.match(new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^{}]*)\\}'));
            const stale = base && base[1].match(/align-items:\s*(flex-start|flex-end|center|baseline)/);
            if (stale) offenders.push(`${rel(file)}: "${sel}" becomes a column but its base rule keeps align-items: ${stale[1]}`);
        }
    }
    assert.deepStrictEqual(
        offenders, [],
        'these rules change direction without restating the alignment:\n  ' + offenders.join('\n  ')
    );
});

test('the page shell can shrink to the space it is given', () => {
    /* .content-area is a flex item carrying both `margin-left: 7.625rem` and `width: 100%`,
       which together ask for more than the row has. A flex item's automatic minimum size is
       its min-content, so it stopped shrinking early and hung past the right edge of the
       window - +107px at 900px wide and still +52px at 1440px. */
    const components = read(path.join(__dirname, '..', 'src', 'styles', 'components.css'));
    assert.match(
        components, /\.content-area\s*\{[^}]*min-width:\s*0/,
        'components.css must let .content-area shrink below its min-content, or the right '
        + 'edge of every page is clipped. It belongs in components.css rather than beside '
        + 'the rule in the themable main.css, which a stored theme replaces with its own copy.'
    );
});

test('no grid track demands more width than a small phone has', () => {
    /* `minmax(22.5rem, 1fr)` keeps a 360px track inside a 289px column and the card
       overflows. min() lets the track collapse when the container is narrower than the
       ideal. */
    const offenders = [];
    for (const file of SHEETS) {
        // Comments first: the rules below are described in prose that names the very
        // pattern being searched for, and matching that is a false positive.
        const css = read(file).replace(/\/\*[\s\S]*?\*\//g, '');
        for (const m of css.matchAll(/minmax\(\s*([\d.]+)rem\s*,/g)) {
            if (Number(m[1]) >= 20) offenders.push(`${rel(file)}: minmax(${m[1]}rem, ...) - wrap it in min(${m[1]}rem, 100%)`);
        }
    }
    assert.deepStrictEqual(
        offenders, [],
        'these grid tracks cannot fit a narrow container:\n  ' + offenders.join('\n  ')
    );
});
