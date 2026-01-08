const BillingEngineKey = require('../models/billingEngineKey');
const { decrypt } = require('../utils/cryptoUtil');

/**
 * Fetches and decrypts Stripe keys for a given orgId.
 * @param {string} orgId - The organization ID
 * @returns {Promise<{secretKey: string, publishableKey: string, webhookSecret: string}>}
 */
async function getDecryptedStripeKeysForOrg(orgId) {
  if (!orgId) throw new Error('orgId is required to fetch Stripe keys');
  const record = await BillingEngineKey.findOne({
    where: {
      ORG_ID: orgId,
      BILLING_ENGINE: 'STRIPE',
    },
  });
  if (!record) throw new Error('Stripe keys not found for this org');
  return {
    secretKey: decrypt(record.SECRET_KEY_ENC),
    publishableKey: decrypt(record.PUBLISHABLE_KEY_ENC),
    webhookSecret: decrypt(record.WEBHOOK_SECRET_ENC),
  };
}

module.exports = { getDecryptedStripeKeysForOrg };