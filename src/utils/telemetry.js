const { trackEventWithDefaults } = require('./telemetryHelper');

/**
 * Send telemetry for login trigger
 */
function trackLoginTrigger({ orgName }) {
    trackEventWithDefaults({
        name: 'login',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for logout trigger
 */
function trackLogoutTrigger({ orgName }) {
    trackEventWithDefaults({
        name: 'logout',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for start to create an application
 */
function trackAppCreationStart({ orgId, appName }) {
    trackEventWithDefaults({
        name: 'application-create-start',
        properties: {
            orgId: orgId || 'unknown',
            appName: appName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for create an application
 */
function trackAppCreationEnd({ orgId, appName }) {
    trackEventWithDefaults({
        name: 'application-create-end',
        properties: {
            orgId: orgId || 'unknown',
            appName: appName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for delete an application
 */
function trackAppDeletion({ orgId, appId }) {
    trackEventWithDefaults({
        name: 'application-delete',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for generate credentials
 */
function trackGenerateCredentials({ orgId, appId }) {
    trackEventWithDefaults({
        name: 'generate-credentials',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for generate key
 */
function trackGenerateKey({ orgId, appId }) {
    trackEventWithDefaults({
        name: 'generate-key',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for subscribe to an API
 */
function trackSubscribeApi({ orgId, appId, apiId }) {
    trackEventWithDefaults({
        name: 'subscribe-api',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            apiId: apiId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for unsubscribe to an API
 */
function trackUnsubscribeApi({ orgId, appId, apiId }) {
    trackEventWithDefaults({
        name: 'unsubscribe-api',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            apiId: apiId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

module.exports = {
    trackLoginTrigger,
    trackLogoutTrigger,
    trackAppCreationStart,
    trackAppCreationEnd,
    trackAppDeletion,
    trackGenerateCredentials,
    trackGenerateKey,
    trackSubscribeApi,
    trackUnsubscribeApi
};
