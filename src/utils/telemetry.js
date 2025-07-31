const { trackEventWithDefaults } = require('./telemetryHelper');

function trackLoginTrigger({ orgName, consent }) {
    consent && trackEventWithDefaults({
        name: 'LoginTriggered',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

function trackLogoutTrigger({ orgName, consent }) {
    consent && trackEventWithDefaults({
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
