/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Utilities
 *
 * The legacy router defines /temp-arazzo-file inline. The handler is
 * extracted here verbatim so the new path can route to it without depending
 * on devportalRoute.js. CSRF guard mirrors the legacy route.
 */

const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const { requireCsrfForMutatingApi } = require('../../middlewares/csrfProtection');
const { compose } = require('./_compose');

async function createTempArazzoFileImpl(req, res, next) {
    const { content, filename } = req.body || {};
    if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'content is required' });
    }
    const safeName = (filename || 'workflow.arazzo.yaml')
        .replace(/[^a-zA-Z0-9._-]/g, '-')
        .replace(/\.\.+/g, '.')
        .substring(0, 120);
    try {
        const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'arazzo-'));
        const tmpPath = path.join(tmpDir, safeName);
        await fs.writeFile(tmpPath, content, 'utf8');
        res.json({ path: tmpPath });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createTempArazzoFile: compose(requireCsrfForMutatingApi, createTempArazzoFileImpl),
};
