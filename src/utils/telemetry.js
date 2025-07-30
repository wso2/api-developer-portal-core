const { trackEventWithDefaults } = require('./telemetryHelper');

/**
 * Send telemetry for login trigger
 */
function trackLoginTrigger({ orgName }) {
    trackEventWithDefaults({
        name: 'LoginTriggered',
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
        name: 'LogoutTriggered',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

module.exports = {
    trackLoginTrigger,
    trackLogoutTrigger
};
