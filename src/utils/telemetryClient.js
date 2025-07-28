// process.env.APPLICATIONINSIGHTS_LOGGING_LEVEL = 'verbose';
const appInsights = require('applicationinsights');
const secret = require(process.cwd() + '/secret.json');

appInsights.setup(secret.azureInsightsKey);

const telemetryClient = appInsights.defaultClient;

module.exports = {
    telemetryClient
};
