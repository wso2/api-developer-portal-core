/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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

const CONSENT_KEY = 'telemetry_consent';
const CONSENT_DATE_KEY = 'telemetry_consent_date';
const CONSENT_EXPIRY_DAYS = 365;

function shouldShowBanner() {
    try {
        const consent = localStorage.getItem(CONSENT_KEY);
        const consentDate = localStorage.getItem(CONSENT_DATE_KEY);
        
        if (consent === null || (consent !== 'true' && consent !== 'false') || !consentDate) {
            return true;
        }
        
        const consentTime = new Date(consentDate).getTime();
        const expiryTime = consentTime + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        
        if (Date.now() >= expiryTime) {
            localStorage.removeItem(CONSENT_KEY);
            localStorage.removeItem(CONSENT_DATE_KEY);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking consent:', error);
        return true;
    }
}

function storeConsent(consent) {
    try {
        localStorage.setItem(CONSENT_KEY, consent.toString());
        localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
        
        console.log('Consent stored:', consent, 'at', new Date().toISOString());
        return true;
    } catch (error) {
        console.error('Error storing consent:', error);
        return false;
    }
}

function showConsentBanner() {
    const banner = document.getElementById('telemetryConsentBanner');
    if (banner) {
        banner.style.display = 'block';
        document.body.classList.add('consent-banner-visible');
    }
}

function hideConsentBanner() {
    const banner = document.getElementById('telemetryConsentBanner');
    if (banner) {
        banner.style.display = 'none';
        document.body.classList.remove('consent-banner-visible');
    }
}

function handleTelemetryConsent(consent) {
    const success = storeConsent(consent);
    
    if (success) {
        hideConsentBanner();
        console.log(consent ? 'Analytics enabled' : 'Analytics disabled');
    } else {
        console.error('Failed to save consent preference');
    }
}

function showConsentDetails() {
    const modal = new bootstrap.Modal(document.getElementById('consentDetailsModal'));
    modal.show();
}

function initializeConsentBanner() {
    console.log('Initializing consent banner...');
    
    // Show banner if needed
    if (shouldShowBanner()) {
        console.log('Showing consent banner');
        setTimeout(showConsentBanner, 500);
    } else {
        console.log('Valid consent found, banner will not be shown');
    }
}

function resetTelemetryConsent() {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_DATE_KEY);
    console.log('Consent reset, showing banner immediately');
    showConsentBanner();
}

document.addEventListener('DOMContentLoaded', initializeConsentBanner);

window.handleTelemetryConsent = handleTelemetryConsent;
window.showConsentDetails = showConsentDetails;
window.resetTelemetryConsent = resetTelemetryConsent;
