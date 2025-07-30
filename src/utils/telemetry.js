const { trackEventWithDefaults } = require('./telemetryHelper');

function checkTelemetryConsent() {
    try {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return false;
        }
        
        const consent = localStorage.getItem('telemetry_consent');
        const consentDate = localStorage.getItem('telemetry_consent_date');
        
        if (consent !== 'true' || !consentDate) {
            return false;
        }
        
        const consentTime = new Date(consentDate).getTime();
        const expiryTime = consentTime + (365 * 24 * 60 * 60 * 1000);
        
        if (Date.now() >= expiryTime) {
            localStorage.removeItem('telemetry_consent');
            localStorage.removeItem('telemetry_consent_date');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking telemetry consent:', error);
        return false;
    }
}

function trackLoginTrigger({ orgName }) {
    if (!checkTelemetryConsent()) {
        console.log('Telemetry consent not given - skipping login tracking');
        return;
    }
    
    trackEventWithDefaults({
        name: 'LoginTriggered',
        properties: {
            organization: orgName || 'unknown',
            timestamp: new Date().toISOString()
        }
    });
}

function trackLogoutTrigger({ orgName }) {
    if (!checkTelemetryConsent()) {
        console.log('Telemetry consent not given - skipping logout tracking');
        return;
    }
    
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
