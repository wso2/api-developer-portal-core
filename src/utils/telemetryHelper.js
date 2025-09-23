const { telemetryClient } = require('./telemetryClient');
const config = require(process.cwd() + '/config.json');

const DEFAULT_PROPERTIES = {
    context: 'devportal',
    origin: 'bijira',
};

function trackEventWithDefaults(event, user = {}, orgId = null) {
  if (!config.telemetry) {
    return;
  }

  event.properties = {
    ...DEFAULT_PROPERTIES,
    ...(event.properties || {}),
  };

  // ---- Azure ----
  if (telemetryClient) {
    telemetryClient.trackEvent({
      name: event.name,
      properties: event.properties,
    });
  }

  // ---- Moesif ----
  if (moesifClient) {
    moesifClient.trackEvent?.(event); // if using SDK’s middleware
    // Or use Actions API (explicit):
    try {
      moesifClient.updateUser?.(user?.id, {
        email: user?.email,
        orgId,
      });
      if (orgId) {
        moesifClient.updateCompany?.(orgId, {});
      }
    } catch (err) {
      console.error('Moesif tracking error', err.message);
    }
  }
}

module.exports = {
  trackEventWithDefaults,
};
