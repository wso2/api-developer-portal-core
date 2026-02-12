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
 * @fileoverview Telemetry helper utilities for tracking events with default properties.
 * This module provides a centralized way to track events with consistent default
 * metadata across multiple telemetry services (Application Insights and Moesif).
 */

const { telemetryClient } = require('./telemetryClient');
const moesif = require('../middlewares/moesif');
const config = require(process.cwd() + '/config.json');

/**
 * Default properties that are automatically added to all tracked events.
 * These properties provide consistent context and origin information for analytics.
 */
const DEFAULT_PROPERTIES = {
    context: 'devportal',
    origin: 'bijira',
};

/**
 * Tracks an event with default properties across multiple telemetry services.
 * This function serves as a central point for event tracking, automatically adding
 * default properties and sending events to both Application Insights and Moesif
 * analytics services. Telemetry tracking can be disabled via configuration.
 * 
 * @param {Object} event - The event object to track
 * @param {Object} req - Express request object containing user session and context
 */
function trackEventWithDefaults(event, req) {
    if (!config.telemetry) {
        return;
    }
    
    event.properties = {
        ...DEFAULT_PROPERTIES,
        ...(event.properties || {})
    };
    telemetryClient.trackEvent(event);
    moesif.trackEvent(event.name, event.properties, req);
}

/**
 * Module exports for telemetry helper functionality.
 * @namespace TelemetryHelper
 */
module.exports = {
    /**
     * Function to track events with default properties across multiple telemetry services.
     * @function
     * @see trackEventWithDefaults
     */
    trackEventWithDefaults,
};
