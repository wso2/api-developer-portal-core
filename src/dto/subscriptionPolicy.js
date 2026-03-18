
/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
class SubscriptionPolicy {
    constructor(subscriptionPolicy) {
        this.policyID = subscriptionPolicy.POLICY_ID;
        this.policyName = subscriptionPolicy.POLICY_NAME;
        this.displayName = subscriptionPolicy.DISPLAY_NAME;
        this.billingPlan = subscriptionPolicy.BILLING_PLAN;
        this.description = subscriptionPolicy.DESCRIPTION;
        this.requestCount = subscriptionPolicy.REQUEST_COUNT;
        this.orgID = subscriptionPolicy.ORG_ID;
        
        // Pricing fields
        this.pricingModel = subscriptionPolicy.PRICING_MODEL;
        this.currency = subscriptionPolicy.CURRENCY;
        this.billingPeriod = subscriptionPolicy.BILLING_PERIOD;
        this.flatAmount = subscriptionPolicy.FLAT_AMOUNT;
        this.unitAmount = subscriptionPolicy.UNIT_AMOUNT;
       
        // - pricingMetadataArray: the raw array (if present)
        // - pricingMetadata: the primary entry (first) for backward compatibility
        const rawMeta = subscriptionPolicy.PRICING_METADATA;
        if (Array.isArray(rawMeta)) {
            this.pricingMetadataArray = rawMeta;
            const primary = rawMeta[0] || {};
            this.pricingMetadata = primary;
            // convenience flat properties for older templates/code that expect them
            if (primary && primary.external) {
                this.pricingMetadata.externalPriceId = primary.external.priceId ?? null;
                this.pricingMetadata.externalProductId = primary.external.productId ?? null;
            }
        } else {
            this.pricingMetadataArray = rawMeta ? [rawMeta] : null;
            this.pricingMetadata = rawMeta || null;
            if (rawMeta && rawMeta.external) {
                this.pricingMetadata.externalPriceId = rawMeta.external.priceId ?? null;
                this.pricingMetadata.externalProductId = rawMeta.external.productId ?? null;
            }
        }
    }
}

module.exports = SubscriptionPolicy;