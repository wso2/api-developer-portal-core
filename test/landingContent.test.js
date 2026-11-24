/*
 * API landing page HTML (`api-content.hbs`) is compiled by registerPartials and the
 * output goes through sanitizeLandingHTML. These tests pin what that keeps and drops,
 * using the same compile step.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const { registerHelpers } = require('../src/utils/handlebarsHelpers');
const { sanitizeLandingHTML } = require('../src/utils/sanitizer');

function render(source, context = {}) {
    const hbs = Handlebars.create();
    registerHelpers(hbs);
    return sanitizeLandingHTML(hbs.compile(source)(context));
}

// Tags, attributes and URLs that landing HTML must not keep.
const DISALLOWED = /<script|<iframe|<object|<embed|<form|<svg|\son[a-z]+\s*=|javascript:/i;

test('drops inline attributes on an image', () => {
    const out = render('<div class="x">Hello</div><img src=x onerror=alert(1)>');
    assert.doesNotMatch(out, DISALLOWED);
    assert.match(out, /<div class="x">Hello<\/div>/);
    assert.match(out, /<img src="x"/);
});

test('drops unsupported tags, attributes and URLs', async (t) => {
    const inputs = [
        '<script>alert(1)</script>',
        '<svg onload=alert(1)></svg>',
        '<svg><script>alert(1)</script></svg>',
        '<a href="javascript:alert(1)">x</a>',
        '<a href=" JaVaScRiPt:alert(1)">x</a>',
        '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
        '<object data="x.swf"></object>',
        '<embed src="x.swf">',
        '<form action="https://example.com"><input name="a"></form>',
        '<details open ontoggle=alert(1)>x</details>',
        '<body onload=alert(1)>',
        '<div onmouseover="alert(1)">x</div>',
        '<button onclick="alert(1)">x</button>',
        '<a href="data:text/html,<script>alert(1)</script>">x</a>',
        '<meta http-equiv="refresh" content="0;url=https://example.com">',
        '<base href="https://example.com/">',
        '<link rel="stylesheet" href="https://example.com/x.css">',
        '<style>body{display:none}</style>',
    ];
    for (const input of inputs) {
        await t.test(input, () => {
            assert.doesNotMatch(render(input), DISALLOWED);
        });
    }
});

test('cleans the compiled output, not the template source', () => {
    const out = render('<img src=x on{{!-- --}}error=alert(1)>');
    assert.doesNotMatch(out, DISALLOWED);
});

test('cleans attributes that come from template data', () => {
    const out = render('<img src=x {{{attr}}}>', { attr: 'onerror=alert(1)' });
    assert.doesNotMatch(out, DISALLOWED);
});

test('rewrites the console copy button to a data attribute', () => {
    const out = render(`<button type="button" class="copy-btn" title="Copy URL" onclick="copyToken(this, 'api_prod_url')">Copy</button>`);
    assert.equal(out, '<button type="button" class="copy-btn" title="Copy URL" data-copy-target="api_prod_url">Copy</button>');
});

test('only rewrites the exact copyToken call', () => {
    for (const value of [
        "copyToken(this, 'a'); alert(1)",
        "copyToken(this, 'a' + alert(1))",
        "copyToken(this, '</button><img src=x onerror=alert(1)>')",
        'alert(1)',
    ]) {
        const out = render(`<button onclick="${value.replace(/"/g, '&quot;')}">c</button>`);
        assert.equal(out, '<button>c</button>', value);
    }
});

test('keeps the layout and styling a landing page needs', () => {
    const source = '<section class="s" id="intro"><h2>Title</h2>'
        + '<div style="color:var(--text-muted)" data-kind="card" aria-label="card" role="note">'
        + '<a href="https://example.com" target="_blank">link</a>'
        + '<img src="https://example.com/a.png" alt="a"></div></section>';
    const out = render(source);
    assert.match(out, /<section class="s" id="intro">/);
    assert.match(out, /style="color:var\(--text-muted\)"/);
    assert.match(out, /data-kind="card"/);
    assert.match(out, /aria-label="card"/);
    assert.match(out, /role="note"/);
    assert.match(out, /rel="noopener noreferrer"/);
    assert.match(out, /<img src="https:\/\/example.com\/a.png" alt="a" \/>/);
});

test('keeps the default landing partials intact apart from their copy buttons', () => {
    // The console builds a theme's api-content.hbs from this template, so a stored
    // landing page looks like it. Sanitizing must not change what a user sees.
    const file = path.join(__dirname, '..', 'src', 'defaultContent', 'pages', 'api-landing', 'partials', 'api-default.hbs');
    const source = fs.readFileSync(file, 'utf8');
    const context = {
        apiMetadata: { apiInfo: { apiType: 'REST' } },
        resources: {
            serverDetails: { productionURL: 'https://prod.example.com', sandboxURL: 'https://sandbox.example.com' },
            endpoints: [{ path: '/pets', methods: [{ method: 'get', summary: 'List pets' }] }],
        },
        scopes: [{ key: 'read:pets' }],
    };
    const out = render(source, context);
    assert.doesNotMatch(out, DISALLOWED);
    assert.match(out, /data-copy-target="api_prod_url"/);
    assert.match(out, /data-copy-target="api_dev_url"/);
    assert.match(out, /id="token_api_prod_url"[^>]*>https:\/\/prod.example.com</);
    assert.match(out, /\/pets/);
    assert.match(out, /read:pets/);
});

test('returns an empty string for empty input', () => {
    assert.equal(sanitizeLandingHTML(''), '');
    assert.equal(sanitizeLandingHTML(null), '');
    assert.equal(sanitizeLandingHTML(undefined), '');
});

test('a function partial is inserted without being compiled again', () => {
    // apiContentController passes the sanitized HTML as `() => html`, so text that
    // looks like a Handlebars expression stays text.
    const hbs = Handlebars.create();
    const page = hbs.compile('<main>{{> api-content }}</main>');
    const html = sanitizeLandingHTML('<p>{{secret}}</p>');
    const out = page({ secret: 'leaked' }, { partials: { 'api-content': () => html } });
    assert.equal(out, '<main><p>{{secret}}</p></main>');
});

test('a per-render partial wins over the registered one', () => {
    const hbs = Handlebars.create();
    hbs.registerPartial('api-content', '<p>default</p>');
    const page = hbs.compile('{{> api-content }}');
    assert.equal(page({}), '<p>default</p>');
    assert.equal(page({}, { partials: { 'api-content': () => '<p>this api</p>' } }), '<p>this api</p>');
    // and it does not leak into the next render
    assert.equal(page({}), '<p>default</p>');
});
