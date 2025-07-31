const { trackEventWithDefaults } = require('./telemetryHelper');

function checkTelemetryConsent(telemetry_consent, telemetry_consent_date) {
    if (telemetry_consent !== 'true' || !telemetry_consent_date) {
        return false;
    }
    
    const consentTime = new Date(telemetry_consent_date).getTime();
    const expiryTime = consentTime + (365 * 24 * 60 * 60 * 1000);
    
    if (Date.now() >= expiryTime) {
        return false;
    }    
    return true;
}

function trackLoginTrigger({ orgName, consent, consent_date }) {
    checkTelemetryConsent(consent, consent_date) && trackEventWithDefaults({
        name: 'LoginTriggered',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

function trackLogoutTrigger({ orgName, consent }) {
    checkTelemetryConsent(consent, consent_date) && trackEventWithDefaults({
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
