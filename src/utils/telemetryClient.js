import appInsights from 'applicationinsights';

const secret = require(process.cwd() + '/secret.json');
const azureInsightsKey = secret.azureInsightsKey;

appInsights.setup(azureInsightsKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .start();

const telemetryClient = appInsights.defaultClient;

telemetryClient.addTelemetryProcessor((envelope) => {
    if (!envelope.data) return;
    if (!envelope.data.baseData) return;

    if (!envelope.data.baseData.properties) {
        envelope.data.baseData.properties = {};
    }

    envelope.data.baseData.properties.context = 'devportal';
    envelope.data.baseData.properties.origin = 'bijira';
});

export { telemetryClient };
