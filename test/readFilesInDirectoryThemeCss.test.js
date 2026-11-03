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
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const constants = require('../src/utils/constants');

function loadUtil() {
    const utilPath = require.resolve('../src/utils/util');
    const scriptValidationPath = require.resolve('../src/utils/scriptValidation');
    const loggerPath = require.resolve('../src/config/logger');
    const daoPaths = new Set([
        require.resolve('../src/dao/admin'),
        require.resolve('../src/dao/apiMetadata')
    ]);
    const configPath = path.resolve(process.cwd(), 'config.json');
    const cachedModules = new Map([utilPath, scriptValidationPath].map(
        filename => [filename, require.cache[filename]]
    ));
    const originalLoad = Module._load;

    // Only isolate import-time configuration, logging and database access. The
    // file reader, CSS rewriting, constants and other dependencies remain real.
    Module._load = function (request, parent, isMain) {
        if (parent?.filename === utilPath || parent?.filename === scriptValidationPath) {
            if (path.isAbsolute(request) && path.resolve(request) === configPath) {
                return {};
            }
            const resolved = Module._resolveFilename(request, parent);
            if (resolved === loggerPath) {
                return { error() {}, info() {}, warn() {}, debug() {} };
            }
            if (parent.filename === utilPath && daoPaths.has(resolved)) {
                return {};
            }
        }
        return originalLoad.call(this, request, parent, isMain);
    };

    try {
        delete require.cache[utilPath];
        delete require.cache[scriptValidationPath];
        return require(utilPath);
    } finally {
        Module._load = originalLoad;
        for (const [filename, cached] of cachedModules) {
            if (cached) require.cache[filename] = cached;
            else delete require.cache[filename];
        }
    }
}

test('uploaded theme CSS preserves both logo URL quotes and unrelated image URLs', async () => {
    const { readFilesInDirectory } = loadUtil();
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'devportal-theme-css-'));

    try {
        await fs.writeFile(path.join(directory, 'main.css'), [
            ".single { background-image: url('/images/devportalLogo.svg'); color: red; }",
            '.double { background-image: url("/images/devportalLogo.png"); color: blue; }',
            ".other { background-image: url('/images/banner.png'); }"
        ].join('\n'));

        const files = await readFilesInDirectory(directory, 'test-org', 'https', 'example.com', 'default');
        assert.equal(files.length, 1);
        assert.equal(files[0].fileName, 'main.css');
        assert.equal(files[0].fileType, 'style');
        assert.ok(Buffer.isBuffer(files[0].fileContent));

        const css = files[0].fileContent.toString('utf8');
        const assetPath = `${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}test-org/views/default/layout?fileType=image&fileName=`;
        assert.ok(css.includes(`url('${assetPath}devportalLogo.svg'); color: red;`), css);
        assert.ok(css.includes(`url("${assetPath}devportalLogo.png"); color: blue;`), css);
        assert.ok(css.includes("url('/images/banner.png')"), css);
    } finally {
        await fs.rm(directory, { recursive: true, force: true });
    }
});
