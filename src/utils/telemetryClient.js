// process.env.APPLICATIONINSIGHTS_LOGGING_LEVEL = 'verbose';
const appInsights = require('applicationinsights');

const config = require('../config/config');

let telemetryClient = null;

if (config.telemetry && config.azureInsightsConnectionString) {
    appInsights.setup(config.azureInsightsConnectionString);
    telemetryClient = appInsights.defaultClient;
} else {
    // Provide a no-op client when telemetry is disabled
    telemetryClient = {
        trackEvent: () => {},
        trackException: () => {},
        trackTrace: () => {},
        trackMetric: () => {},
        trackRequest: () => {},
        trackDependency: () => {},
        flush: () => {}
    };
}

module.exports = {
    telemetryClient
};
