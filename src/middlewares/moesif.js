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
 * @fileoverview Moesif analytics middleware and utilities for API usage tracking.
 * This module provides middleware for automatically tracking API requests and a utility
 * function for tracking custom events in the developer portal.
 */

const moesif = require('moesif-nodejs');
const config = require(process.cwd() + '/config.json');

/**
 * The origin identifier for events tracked from this application.
 * Used to identify the source of analytics events in Moesif dashboard.
 * @constant {string}
 */
const EVENT_ORIGIN = 'bijira';

/**
 * The context identifier indicating this is from the developer portal.
 * Helps categorize events by application component in analytics.
 * @constant {string}
 */
const EVENT_CONTEXT = 'devportal';

/**
 * Email suffix used to identify WSO2 internal users.
 * Used to flag internal vs external user activity in analytics.
 * @constant {string}
 */
const WSO2_EMAIL_SUFFIX = '@wso2.com';

/**
 * Default URI used when request object is not available.
 * Fallback value for event tracking when no request context exists.
 * @constant {string}
 */
const DEFAULT_URI = 'https://devportal.bijira.dev';

/**
 * Moesif middleware instance configured with the application ID from config.
 * This middleware automatically tracks HTTP requests and responses for analytics.
 * @type {Function}
 */
const middleware = config.moesifAppId ? moesif({
    applicationId: config.moesifAppId,
}) : null;

/**
 * Tracks a custom event or action in Moesif analytics.
 * This function sends custom events with user context and metadata to Moesif
 * for analytics and monitoring purposes.
 * 
 * @param {string} name - The name/identifier of the action or event being tracked
 * @param {Object} [properties={}] - Additional properties/metadata to include with the event
 * @param {Object} [req] - Express request object to extract user and request information
 * 
 * @example
 * // Track a simple event
 * trackEvent('api_key_generated', { apiId: '123' }, req);
 */
function trackEvent(name, properties, req) {
    if (!middleware) {
        return;
    }
    const email = req?.session?.passport?.user?.email || '';
    middleware.sendAction({
        actionName: name,
        userId: '',
        companyId: '',
        metadata: {
            origin: EVENT_ORIGIN,
            context: EVENT_CONTEXT,
            isWSO2User: !!email.endsWith(WSO2_EMAIL_SUFFIX),
            ...properties,
        },
        request: {
            time: new Date(),
            uri: req ? req.originalUrl || req.url : DEFAULT_URI,
        },
    });
}

/**
 * Module exports for Moesif analytics functionality.
 * @namespace
 */
module.exports = {
    /**
     * Moesif middleware for automatic HTTP request/response tracking.
     * Use this middleware in Express routes to automatically track API usage.
     * @type {Function}
     * @example
     * const { moesifMiddleware } = require('./middlewares/moesif');
     * app.use(moesifMiddleware);
     */
    moesifMiddleware: middleware,
    
    /**
     * Function to track custom events and actions.
     * @type {Function}
     * @see trackEvent
     */
    trackEvent,
};