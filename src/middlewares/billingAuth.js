/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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

const logger = require('../config/logger');

/**
 * Middleware to ensure user is authenticated for billing endpoints
 * This is a simpler check specifically for billing that works with session-based auth
 */
function ensureBillingAuth(req, res, next) {
    // Check if user is authenticated via session
    if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        logger.debug('Billing auth check passed', { 
            userEmail: req.user.email,
            hasAccessToken: !!req.user.accessToken
        });
        return next();
    }
    
    logger.warn('Billing auth check failed - user not authenticated', {
        path: req.path,
        hasUser: !!req.user,
        isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false
    });
    
    return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Please log in to access billing information'
    });
}

module.exports = {
    ensureBillingAuth
};
