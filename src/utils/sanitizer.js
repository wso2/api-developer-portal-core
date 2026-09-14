/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Central HTML/SVG sanitization helpers.
 *
 * Markdown content (API landing pages, API documents, organization content) is
 * authored by API publishers and rendered into pages that are served to
 * anonymous visitors. `marked` passes raw HTML embedded in markdown straight
 * through, so every markdown -> HTML conversion MUST go through
 * `renderMarkdown()` (or `sanitizeHTML()`) before it reaches a template.
 */

const sanitizeHtml = require('sanitize-html');
const marked = require('marked');

// Tags that are either produced by markdown rendering or commonly used for
// formatting inside markdown. Anything not listed here is discarded.
const ALLOWED_TAGS = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr', 'div', 'span', 'blockquote', 'pre', 'code', 'kbd', 'samp', 'var',
    'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'mark', 'small', 'sub', 'sup',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    'a', 'img', 'figure', 'figcaption',
    'details', 'summary', 'abbr', 'time', 'cite', 'q'
];

// `script`, `iframe`, `object`, `embed`, `style`, `link`, `meta`, `base`, `form`,
// `input` and friends are intentionally absent from ALLOWED_TAGS. For these the
// tag *and* its text content are dropped rather than being unwrapped into text.
const NON_TEXT_TAGS = ['script', 'style', 'textarea', 'option', 'noscript', 'iframe', 'object', 'embed', 'template'];

const ALLOWED_ATTRIBUTES = {
    a: ['href', 'name', 'target', 'rel', 'title', 'id'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    // `id`/`class` are allowed for anchors and theming; no `style` (CSS can be
    // used for UI redressing) and no `on*` handlers (never allow-listed).
    '*': ['id', 'class', 'title', 'align', 'colspan', 'rowspan', 'start', 'reversed', 'datetime', 'open', 'dir', 'lang']
};

const ALLOWED_SCHEMES = ['http', 'https', 'mailto', 'tel'];

const MARKDOWN_SANITIZE_OPTIONS = {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    nonTextTags: NON_TEXT_TAGS,
    disallowedTagsMode: 'discard',
    allowedSchemes: ALLOWED_SCHEMES,
    allowedSchemesByTag: {
        // `data:` images are convenient for inline diagrams but `data:` on an
        // anchor is a navigation sink, so it is only permitted on <img>.
        img: ALLOWED_SCHEMES.concat(['data']),
        a: ALLOWED_SCHEMES
    },
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite', 'longdesc'],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
    transformTags: {
        // Anything opening a new window must not get a handle on the opener.
        a: (tagName, attribs) => {
            if (attribs.target) {
                attribs.rel = 'noopener noreferrer';
            }
            return { tagName, attribs };
        }
    }
};

// A same-document fragment reference such as `#icon`. Anything carrying a scheme,
// a path or whitespace is rejected, so `javascript:`, `data:` and cross-document
// references can never reach a rendered `<use>`.
const FRAGMENT_REFERENCE = /^#[A-Za-z0-9_][A-Za-z0-9_.:-]*$/;

function isFragmentReference(value) {

    return typeof value === 'string' && FRAGMENT_REFERENCE.test(value);
}

// SVG assets are served from the portal origin with `image/svg+xml`, which the
// browser treats as an active document when navigated to directly. Strip every
// scripting vector before such a file is handed to a client.
const SVG_SANITIZE_OPTIONS = {
    allowedTags: [
        'svg', 'g', 'defs', 'symbol', 'use', 'title', 'desc', 'metadata',
        'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
        'text', 'tspan', 'textPath',
        'linearGradient', 'radialGradient', 'stop', 'pattern', 'clipPath', 'mask',
        'marker', 'filter', 'feGaussianBlur', 'feOffset', 'feBlend', 'feColorMatrix',
        'feComposite', 'feFlood', 'feMerge', 'feMergeNode', 'feMorphology', 'feDropShadow'
    ],
    allowedAttributes: {
        '*': [
            'id', 'class', 'viewBox', 'xmlns', 'xmlns:xlink', 'version', 'width', 'height',
            'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'd', 'points',
            'fill', 'fill-rule', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-linecap',
            'stroke-linejoin', 'stroke-dasharray', 'stroke-opacity', 'opacity', 'transform',
            'gradientUnits', 'gradientTransform', 'offset', 'stop-color', 'stop-opacity',
            'patternUnits', 'clip-path', 'clip-rule', 'mask', 'filter', 'marker-end',
            'marker-start', 'marker-mid', 'preserveAspectRatio', 'text-anchor', 'font-size',
            'font-family', 'font-weight', 'dx', 'dy', 'dominant-baseline', 'opacity',
            'stdDeviation', 'result', 'in', 'in2', 'mode', 'type', 'values', 'opacity'
        ],
        // `<use href="#icon">` is the standard sprite pattern, so `use` keeps its
        // reference attributes. `transformTags` below narrows them to same-document
        // fragments, which rules out external documents and `javascript:` URIs.
        use: ['href', 'xlink:href']
    },
    // `script`, `foreignObject`, `animate`, `set`, `handler`, `a` (javascript: href)
    // and `style` are all absent from allowedTags above.
    nonTextTags: ['script', 'style', 'foreignObject', 'handler', 'animate', 'animateTransform', 'set'],
    disallowedTagsMode: 'discard',
    allowedSchemes: ['http', 'https'],
    allowedSchemesAppliedToAttributes: ['href', 'xlink:href', 'src'],
    transformTags: {
        use: (tagName, attribs) => {
            for (const attribute of ['href', 'xlink:href']) {
                if (!isFragmentReference(attribs[attribute])) {
                    delete attribs[attribute];
                }
            }
            return { tagName, attribs };
        }
    },
    parser: {
        lowerCaseTags: false,
        lowerCaseAttributeNames: false
    }
};

/**
 * Sanitize a fragment of HTML that originated from user/publisher supplied
 * markdown or template content.
 *
 * @param {string} html raw HTML
 * @returns {string} HTML with scripting vectors removed
 */
function sanitizeHTML(html) {

    if (html === null || html === undefined || html === '') {
        return html === 0 ? '0' : '';
    }
    return sanitizeHtml(String(html), MARKDOWN_SANITIZE_OPTIONS);
}

/**
 * Convert markdown to HTML and sanitize the result.
 *
 * This is the only markdown -> HTML entry point that should be used for content
 * that is rendered into a page.
 *
 * @param {string} markdownContent raw markdown
 * @param {object} [options] options forwarded to `marked.parse`
 * @returns {string} sanitized HTML
 */
function renderMarkdown(markdownContent, options) {

    if (!markdownContent) {
        return '';
    }
    const rawHTML = options ? marked.parse(String(markdownContent), options) : marked.parse(String(markdownContent));
    return sanitizeHTML(rawHTML);
}

/**
 * Strip scripting constructs from an SVG document so it can be served safely
 * from the portal origin.
 *
 * @param {string|Buffer} svgContent raw SVG
 * @returns {string} sanitized SVG markup
 */
function sanitizeSVG(svgContent) {

    if (!svgContent) {
        return '';
    }
    const text = Buffer.isBuffer(svgContent) ? svgContent.toString('utf8') : String(svgContent);
    return sanitizeHtml(text, SVG_SANITIZE_OPTIONS);
}

module.exports = {
    sanitizeHTML,
    renderMarkdown,
    sanitizeSVG
};
