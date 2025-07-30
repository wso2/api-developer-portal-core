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

/**
 * Client-side telemetry is handled through telemetry.js functions only.
 * This file is kept minimal as tracking is centralized in telemetry.js
 */

console.log('Client telemetry script loaded - tracking handled by telemetry.js');

function hasTelemetryConsent() {
    return typeof window.getTelemetryConsent === 'function' ? window.getTelemetryConsent() : false;
}

/**
 * Track a custom event with consent checking
 * @param {string} eventName - Name of the event
 * @param {Object} properties - Event properties
 */
function trackEvent(eventName, properties = {}) {
    if (!hasTelemetryConsent()) {
        console.log(`Telemetry consent not given - skipping ${eventName} tracking`);
        return;
    }
    
    // Add default properties
    const eventData = {
        name: eventName,
        properties: {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...properties
        }
    };
    
    // In a real implementation, this would send to your analytics service
    console.log('Telemetry Event:', eventData);
    
    // Example: Send to analytics service
    // fetch('/api/analytics/track', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(eventData)
    // });
}

/**
 * Track page view
 * @param {string} pageName - Name of the page
 * @param {Object} additionalProps - Additional properties
 */
function trackPageView(pageName, additionalProps = {}) {
    trackEvent('PageView', {
        pageName,
        ...additionalProps
    });
}

/**
 * Track button clicks
 * @param {string} buttonName - Name or ID of the button
 * @param {Object} additionalProps - Additional properties
 */
function trackButtonClick(buttonName, additionalProps = {}) {
    trackEvent('ButtonClick', {
        buttonName,
        ...additionalProps
    });
}

/**
 * Track form submissions
 * @param {string} formName - Name or ID of the form
 * @param {Object} additionalProps - Additional properties
 */
function trackFormSubmission(formName, additionalProps = {}) {
    trackEvent('FormSubmission', {
        formName,
        ...additionalProps
    });
}

/**
 * Track API interactions
 * @param {string} apiName - Name of the API
 * @param {string} action - Action performed (subscribe, unsubscribe, etc.)
 * @param {Object} additionalProps - Additional properties
 */
function trackAPIInteraction(apiName, action, additionalProps = {}) {
    trackEvent('APIInteraction', {
        apiName,
        action,
        ...additionalProps
    });
}

/**
 * Track search queries
 * @param {string} query - Search query
 * @param {number} resultCount - Number of results
 * @param {Object} additionalProps - Additional properties
 */
function trackSearch(query, resultCount = 0, additionalProps = {}) {
    trackEvent('Search', {
        query,
        resultCount,
        ...additionalProps
    });
}

/**
 * Track errors
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 * @param {Object} additionalProps - Additional properties
 */
function trackError(errorType, errorMessage, additionalProps = {}) {
    trackEvent('Error', {
        errorType,
        errorMessage,
        ...additionalProps
    });
}

// Auto-track page views when the script loads (if consent is given)
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure consent system is initialized
    setTimeout(() => {
        if (hasTelemetryConsent()) {
            trackPageView(document.title, {
                path: window.location.pathname
            });
        }
    }, 1000);
});

// Make functions available globally
window.devportalAnalytics = {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackAPIInteraction,
    trackSearch,
    trackError,
    hasTelemetryConsent
};

// For easier access, also expose individual functions
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackButtonClick = trackButtonClick;
window.trackFormSubmission = trackFormSubmission;
window.trackAPIInteraction = trackAPIInteraction;
window.trackSearch = trackSearch;
window.trackError = trackError;
