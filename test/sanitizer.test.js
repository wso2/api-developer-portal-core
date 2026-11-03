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

const test = require('node:test');
const assert = require('node:assert/strict');
const { sanitizeSVG, renderMarkdown } = require('../src/utils/sanitizer');

test('sanitizeSVG preserves shapes and same-document sprite references for strings and Buffers', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs><symbol id="icon"><path d="M0 0h24v24H0z" /></symbol></defs>
        <rect width="12" height="8" fill="#123456" />
        <circle cx="12" cy="12" r="4" />
        <use href="#icon" /><use xlink:href="#icon" />
    </svg>`;

    for (const input of [svg, Buffer.from(svg, 'utf8')]) {
        const result = sanitizeSVG(input);
        assert.match(result, /viewBox="0 0 24 24"/);
        assert.match(result, /<symbol\b[^>]*id="icon"/);
        assert.match(result, /<path\b[^>]*d="M0 0h24v24H0z"/);
        assert.match(result, /<rect\b[^>]*fill="#123456"/);
        assert.match(result, /<circle\b[^>]*r="4"/);
        assert.match(result, /<use\b[^>]*\shref="#icon"/);
        assert.match(result, /<use\b[^>]*\sxlink:href="#icon"/);
    }
});

test('sanitizeSVG removes scripts, event handlers and unsafe sprite references', () => {
    const result = sanitizeSVG(`<svg onload="alert('load')">
        <script>scriptPayload()</script>
        <circle r="4" onclick="alert('click')" />
        <use href="https://example.com/sprite.svg#icon" />
        <use xlink:href="//example.com/sprite.svg#icon" />
        <use href="/sprite.svg#icon" />
        <use href="javascript:alert(1)" />
        <use xlink:href="data:image/svg+xml,unsafe" />
    </svg>`);

    assert.match(result, /<circle\b[^>]*r="4"/);
    assert.doesNotMatch(result, /<script\b|scriptPayload|\son(?:load|click)=/i);
    assert.doesNotMatch(result, /\s(?:href|xlink:href)=/i);
    assert.doesNotMatch(result, /javascript:|data:image|example\.com|sprite\.svg/i);
});

test('renderMarkdown preserves formatting while removing scripting constructs', () => {
    const result = renderMarkdown(`# Guide

**Safe text** and [documentation](https://example.com/docs).

- First item

[Unsafe link](javascript:alert%281%29)

<script>markdownPayload()</script>
<img src="https://example.com/logo.png" alt="Logo" onerror="alert('error')">
<a href="https://example.com/new" target="_blank" onclick="alert('click')">New window</a>`);

    assert.match(result, /<h1>Guide<\/h1>/);
    assert.match(result, /<strong>Safe text<\/strong>/);
    assert.match(result, /<li>First item<\/li>/);
    assert.match(result, /href="https:\/\/example\.com\/docs"/);
    assert.match(result, /src="https:\/\/example\.com\/logo\.png"/);
    assert.match(result, /alt="Logo"/);
    assert.match(result, /rel="noopener noreferrer"/);
    assert.match(result, /Unsafe link/);
    assert.doesNotMatch(result, /<script\b|markdownPayload|javascript:|\son(?:error|click)=/i);
});
