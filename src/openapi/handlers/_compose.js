/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 */

/*
 * Tiny middleware-chain helper for OpenAPI operation handlers.
 *
 * The validator's operationHandlers resolver returns a single handler per
 * operation. Some operations need extra middleware (CSRF protection, billing
 * auth, request-origin verification) before the service function. Use
 * `compose(...)` to produce a single Express handler that runs each
 * middleware in order, short-circuiting on error.
 *
 * Example:
 *   const platformApiKeyService = require('../../services/platformApiKeyService');
 *   const { requireCsrfForMutatingApi } = require('../../middlewares/csrfProtection');
 *   exports.generatePlatformApiKey = compose(
 *       requireCsrfForMutatingApi,
 *       platformApiKeyService.generatePlatformApiKey
 *   );
 */

function compose(...fns) {
    const stack = fns.flat().filter(fn => typeof fn === 'function');
    return function composed(req, res, next) {
        let i = 0;
        const run = (err) => {
            if (err) return next(err);
            if (res.headersSent) return;
            const fn = stack[i++];
            if (!fn) return next();
            try {
                const ret = fn(req, res, run);
                if (ret && typeof ret.catch === 'function') ret.catch(run);
            } catch (e) {
                run(e);
            }
        };
        run();
    };
}

module.exports = { compose };
