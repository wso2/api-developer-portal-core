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
function trackAppCreationStart({ orgId, appId }) {
    trackEventWithDefaults({
        name: 'application-create-start',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Send telemetry for create an application
 */
function trackAppCreationEnd({ orgId, appId }) {
    trackEventWithDefaults({
        name: 'application-create-end',
        properties: {
            orgId: orgId || 'unknown',
            appId: appId || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

module.exports = {
    trackLoginTrigger,
    trackLogoutTrigger,
    trackAppCreationStart,
    trackAppCreationEnd
};
