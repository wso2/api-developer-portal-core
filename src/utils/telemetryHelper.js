const { telemetryClient } = require('./telemetryClient');

const DEFAULT_PROPERTIES = {
    context: 'devportal',
    origin: 'bijira',
};

function trackEventWithDefaults(event) {
    event.properties = {
        ...DEFAULT_PROPERTIES,
        ...(event.properties || {})
    };
    telemetryClient.trackEvent(event);
}

module.exports = {
    trackEventWithDefaults,
};
