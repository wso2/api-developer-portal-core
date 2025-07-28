const { trackEventWithDefaults } = require('./telemetryHelper');

/**
 * Send telemetry for login trigger
 */
function trackLoginTrigger({ orgName, ipAddress, userAgent }) {
    trackEventWithDefaults({
        name: 'LoginTriggered',
        properties: {
            organization: orgName || 'unknown',
            ipAddress: ipAddress || 'unknown',
            userAgent: userAgent || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

module.exports = {
    trackLoginTrigger,
};
