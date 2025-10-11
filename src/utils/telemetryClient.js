// process.env.APPLICATIONINSIGHTS_LOGGING_LEVEL = 'verbose';
const appInsights = require('applicationinsights');
const moesif = require('moesif-nodejs');
const secret = require(process.cwd() + '/secret.json');

let telemetryClient = null;
let moesifClient = null;

// ---------------- Azure Init ----------------
if (secret.azureInsightsConnectionString) {
  appInsights.setup(secret.azureInsightsConnectionString).start();
  telemetryClient = appInsights.defaultClient;
}

// ---------------- Moesif Init ----------------
if (secret.moesifApplicationId) {
  moesifClient = moesif({
    applicationId: secret.moesifApplicationId,
    maskContent: (event) => {
      if (event?.request?.headers?.authorization) {
        event.request.headers.authorization = '***';
      }
      return event;
    },
    getMetadata: () => ({
      origin: 'devportal',
      context: 'backend',
      env: process.env.NODE_ENV,
      version: process.env.npm_package_version,
    }),
  });
}

module.exports = {
  telemetryClient,
  moesifClient,
};
