/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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

async function subscribePlatformGateway(orgID, apiId, planName, applicationId) {
    try {
        const body = { apiId, subscriptionPlanName: planName };
        if (applicationId) {
            body.applicationId = applicationId;
        }

        const response = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const responseData = await response.json();

        if (response.ok) {
            await showSubscriptionTokenModal(responseData.subscriptionToken, planName);
            window.location.reload();
        } else {
            await showAlert(`Failed to subscribe: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error while subscribing: ${error.message}`, 'error');
    }
}

async function handlePlanSubscription(btnElement) {
    const orgID = btnElement.dataset.orgId;
    const apiId = btnElement.dataset.apiId;
    const planName = btnElement.dataset.policyName;
    const displayName = btnElement.dataset.displayName;
    const existingSubs = window.existingPlatformSubscriptions || [];

    if (existingSubs.length === 0) {
        showSubscribeButtonLoading(btnElement);
        await subscribePlatformGateway(orgID, apiId, planName);
        return;
    }

    const currentSub = existingSubs[0];
    const currentPlan = currentSub.subscriptionPlanName || 'current plan';
    if (!confirm(`You are currently subscribed to the "${currentPlan}" plan. Switching to "${displayName}" will delete your existing subscription and generate a new token. Do you want to proceed?`)) {
        return;
    }

    showSubscribeButtonLoading(btnElement);
    try {
        const deleteResponse = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(currentSub.subscriptionId)}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json().catch(() => ({}));
            await showAlert(`Failed to remove existing subscription: ${errorData.description || 'Unknown error'}`, 'error');
            return;
        }

        await subscribePlatformGateway(orgID, apiId, planName);
    } catch (error) {
        await showAlert(`Error during plan change: ${error.message}`, 'error');
    }
}

async function togglePlatformSubscriptionStatus(orgID, subscriptionId, newStatus) {
    try {
        const response = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            await showAlert(`Subscription ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully!`, 'success');
            window.location.reload();
        } else {
            const responseData = await response.json();
            await showAlert(`Failed to update subscription: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error: ${error.message}`, 'error');
    }
}

async function confirmDeletePlatformSubscription(orgID, subscriptionId) {
    if (!confirm('Are you sure you want to delete this subscription? The subscription token will be immediately invalidated and any API calls using it will fail.')) {
        return;
    }
    try {
        const response = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            await showAlert('Subscription deleted successfully!', 'success');
            window.location.reload();
        } else {
            const responseData = await response.json();
            await showAlert(`Failed to delete subscription: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error: ${error.message}`, 'error');
    }
}

function copySubscriptionToken(subscriptionId) {
    (async function() {
        try {
            const token = await fetchPlatformTokenIfNeeded(subscriptionId);
            if (!token) return;
            navigator.clipboard.writeText(token).then(() => {
                showAlert('Subscription token copied to clipboard!', 'success');
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = token;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showAlert('Subscription token copied to clipboard!', 'success');
            });
        } catch (e) {
            // noop
        }
    })();
}

function toggleTokenVisibility(subscriptionId) {
    (async function() {
        const tokenEl = document.getElementById('token-' + subscriptionId);
        if (!tokenEl) return;
        if (tokenEl.dataset.revealed === 'true') {
            // hide and show masked value from token meta if available
            const meta = (window.__tokenMeta || {})[subscriptionId];
            tokenEl.textContent = meta && meta.maskedToken ? meta.maskedToken : '****';
            tokenEl.dataset.revealed = 'false';
            return;
        }

        try {
            const fullToken = await fetchPlatformTokenIfNeeded(subscriptionId);
            if (!fullToken) return;
            tokenEl.textContent = fullToken;
            tokenEl.dataset.revealed = 'true';
        } catch (e) {
            // noop
        }
    })();
}

const _platformTokenCache = {};

async function fetchPlatformTokenIfNeeded(subscriptionId) {
    if (_platformTokenCache[subscriptionId]) return _platformTokenCache[subscriptionId];
    const existing = (window.__tokenMap || {})[subscriptionId];
    if (existing && typeof existing === 'string' && !existing.startsWith('****')) {
        _platformTokenCache[subscriptionId] = existing;
        return existing;
    }
    const orgID = window.__subscriptionOrgID;
    if (!orgID) return null;
    try {
        const resp = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, { headers: { 'Content-Type': 'application/json' } });
        if (!resp.ok) return null;
        const data = await resp.json();
        const token = data.subscriptionToken;
        if (!token) return null;
        _platformTokenCache[subscriptionId] = token;
        window.__tokenMap = window.__tokenMap || {};
        window.__tokenMap[subscriptionId] = token;
        return token;
    } catch (e) {
        return null;
    }
}

function showSubscriptionTokenModal(token, planName) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal custom-modal';
        overlay.style.display = 'flex';

        const safeplanName = document.createElement('span');
        safeplanName.textContent = planName;

        const safeToken = document.createElement('code');
        safeToken.textContent = token;
        safeToken.className = 'flex-grow-1 p-2 bg-light border rounded';
        safeToken.style.wordBreak = 'break-all';

        overlay.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content custom-modal-content">
                    <div class="custom-modal-header">
                        <h2 class="custom-modal-title m-0">Subscription Created</h2>
                        <button type="button" class="btn-close" id="closeTokenModal"></button>
                    </div>
                    <div class="custom-modal-body">
                        <p>Your subscription to the <strong id="planNameDisplay"></strong> plan has been created successfully.</p>
                        <p class="mb-2"><strong>Subscription Token:</strong></p>
                        <div class="d-flex align-items-center gap-2 mb-3" id="tokenContainer"></div>
                        <div class="alert alert-warning mb-0">
                            <i class="bi bi-exclamation-triangle"></i>
                            Use this token as the <code>Subscription-Key</code> header when invoking the API.
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector('#planNameDisplay').textContent = planName;

        const tokenContainer = overlay.querySelector('#tokenContainer');
        tokenContainer.appendChild(safeToken);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-sm btn-outline-secondary';
        copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        copyBtn.addEventListener('click', () => {
            // copy raw token string directly (token is available in this scope)
            navigator.clipboard.writeText(token).then(() => {
                showAlert('Subscription token copied to clipboard!', 'success');
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = token;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showAlert('Subscription token copied to clipboard!', 'success');
            });
        });
        tokenContainer.appendChild(copyBtn);

        overlay.querySelector('#closeTokenModal').addEventListener('click', () => {
            overlay.remove();
            resolve();
        });
    });
}
