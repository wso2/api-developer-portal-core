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

/* The button currently reading "Subscribing...". showSubscribeButtonLoading disables it
   and rewrites its label, and nothing here used to hand it back: a failed subscribe, or a
   plan switch whose delete step failed, left the card showing a dead "Subscribing..."
   until the page was reloaded. Every exit from the two flows below goes through
   clearPlatformSubscribeLoading now. */
let platformSubscribeLoadingBtn = null;

function setPlatformSubscribeLoading(btnElement) {
    platformSubscribeLoadingBtn = btnElement || null;
    if (btnElement && typeof showSubscribeButtonLoading === 'function') {
        showSubscribeButtonLoading(btnElement);
    }
}

function clearPlatformSubscribeLoading() {
    if (platformSubscribeLoadingBtn && typeof window.resetSubscribeButtonState === 'function') {
        window.resetSubscribeButtonState(platformSubscribeLoadingBtn);
    }
    platformSubscribeLoadingBtn = null;
}

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
            window.__platformSubscriptionChanged = true;
            window.existingPlatformSubscriptions = window.existingPlatformSubscriptions || [];
            window.existingPlatformSubscriptions.push({
                subscriptionId: responseData.subscriptionId,
                subscriptionPlanName: planName,
                status: 'ACTIVE'
            });
            const token = responseData.subscriptionToken;
            const modalId = 'planModal-' + apiId;
            const modalEl = document.getElementById(modalId);
            if (modalEl && modalEl.style.display && modalEl.style.display !== 'none') {
                try {
                    showSubscriptionTokenInModal(apiId, token, planName);
                } catch (e) {
                    await showSubscriptionTokenModal(token, planName);
                }
            } else {
                await showSubscriptionTokenModal(token, planName);
            }
            /* The token dialog has to be dismissed before anything can reload, so the
               card reaches the subscribed state the way a reload would render it: the
               ribbon, the tint and "View subscription" all hang off this one class. */
            const subscribedCard = platformSubscribeLoadingBtn
                && platformSubscribeLoadingBtn.closest('.aov-plan-card');
            if (subscribedCard) {
                subscribedCard.classList.add('aov-plan-card--subscribed');
            }
        } else {
            await showAlert(`Failed to subscribe: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error while subscribing: ${error.message}`, 'error');
    } finally {
        clearPlatformSubscribeLoading();
    }
}

async function handlePlanSubscription(btnElement) {
    const orgID = btnElement.dataset.orgId;
    const apiId = btnElement.dataset.apiId;
    const planName = btnElement.dataset.policyName;
    const displayName = btnElement.dataset.displayName;

    // If a modal exists for this API and the button is NOT inside it, open the modal.
    // If the button IS inside the modal, proceed directly to subscribe.
    const modalId = 'planModal-' + apiId;
    const modalEl = document.getElementById(modalId);
    if (modalEl && !btnElement.closest('#' + modalId)) {
        loadModal(modalId);
        return;
    }

    const existingSubs = window.existingPlatformSubscriptions || [];

    if (existingSubs.length === 0) {
        setPlatformSubscribeLoading(btnElement);
        await subscribePlatformGateway(orgID, apiId, planName);
        return;
    }

    const currentSub = existingSubs[0];
    const currentPlan = currentSub.subscriptionPlanName || 'current plan';

    if (typeof openWarningModal !== 'function') {
        await showAlert('Confirmation dialog is not available. Please refresh the page.', 'error');
        return;
    }
    window.__pendingPlanSwitchBtn = btnElement;
    openWarningModal(
        'SwitchPlatformSubscriptionPlan',
        orgID,
        apiId,
        planName,
        displayName,
        currentSub.subscriptionId,
        currentPlan
    );
}

async function togglePlatformSubscriptionStatus(orgID, subscriptionId, newStatus) {
    try {
        const response = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            window.__platformSubscriptionChanged = true;
            await showAlert(`Subscription ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully!`, 'success');
            refreshPlatformModalOrReload(orgID);
        } else {
            const responseData = await response.json();
            await showAlert(`Failed to update subscription: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error: ${error.message}`, 'error');
    }
}

function confirmDeletePlatformSubscription(orgID, subscriptionId) {
    if (typeof openWarningModal !== 'function') {
        showAlert('Confirmation dialog is not available. Please refresh the page.', 'error');
        return;
    }
    openWarningModal('DeletePlatformSubscription', orgID, subscriptionId, '', '', '', '');
}

async function executeDeletePlatformSubscription(orgID, subscriptionId) {
    try {
        const response = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.__platformSubscriptionChanged = true;
            await showAlert('Subscription deleted successfully!', 'success');
            refreshPlatformModalOrReload(orgID);
        } else {
            const responseData = await response.json().catch(() => ({}));
            await showAlert(`Failed to delete subscription: ${responseData.description || 'Unknown error'}`, 'error');
        }
    } catch (error) {
        await showAlert(`Error: ${error.message}`, 'error');
    }
}

async function runPendingPlatformPlanSwitch(orgID, apiId, planName, displayName, subscriptionId) {
    const btnElement = window.__pendingPlanSwitchBtn;
    window.__pendingPlanSwitchBtn = null;

    setPlatformSubscribeLoading(btnElement);

    try {
        const deleteResponse = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions/${encodeURIComponent(subscriptionId)}`, {
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
    } finally {
        clearPlatformSubscribeLoading();
    }
}

function refreshPlatformModalOrReload(orgID) {
    // If inside a visible modal, re-render its content instead of reloading the page
    var visibleModal = document.querySelector('.modal.custom-modal[style*="flex"]');
    if (visibleModal && visibleModal.id && typeof prepareSubscriptionModal === 'function') {
        prepareSubscriptionModal(visibleModal.id);
        return;
    }
    // On the landing page, refresh inline without full reload
    if (document.getElementById('subscriptionPlans')) {
        refreshLandingPageSubscriptions();
        return;
    }
    window.location.reload();
}

/* Builders for refreshLandingPageSubscriptions, kept beside it so the markup it produces
   stays visibly the same shape as api-subscription-plans.hbs. */
function buildSubRow(label, valueNode, extraClass) {
    var row = document.createElement('div');
    row.className = 'aov-sub-row' + (extraClass ? ' ' + extraClass : '');
    var labelEl = document.createElement('span');
    labelEl.className = 'aov-sub-label';
    labelEl.textContent = label;
    var valueEl = document.createElement('span');
    valueEl.className = 'aov-sub-value';
    valueEl.appendChild(valueNode);
    row.appendChild(labelEl);
    row.appendChild(valueEl);
    return row;
}

function buildSubIconBtn(icon, title, subscriptionId, handler) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dp-btn-icon';
    btn.title = title;
    btn.setAttribute('aria-label', title);
    btn.innerHTML = '<i class="bi ' + icon + '"></i>';
    btn.dataset.subscriptionId = subscriptionId;
    btn.addEventListener('click', function() { handler(this.dataset.subscriptionId); });
    return btn;
}

async function refreshLandingPageSubscriptions() {
    var planBtn = document.querySelector('#subscriptionPlans [data-api-id]');
    var orgID = window.__subscriptionOrgID || (planBtn && planBtn.dataset.orgId);
    if (!orgID) { window.location.reload(); return; }

    var apiId = planBtn ? planBtn.dataset.apiId : null;
    if (!apiId) { window.location.reload(); return; }

    try {
        var resp = await fetch('/devportal/organizations/' + encodeURIComponent(orgID) + '/api-platform-subscriptions?apiId=' + encodeURIComponent(apiId), { headers: { 'Content-Type': 'application/json' } });
        if (!resp.ok) { window.location.reload(); return; }
        var data = await resp.json();
        var existing = data.list || data || [];

        // Update window state
        window.existingPlatformSubscriptions = existing.map(function(s) {
            return { subscriptionId: s.subscriptionId, subscriptionPlanName: s.subscriptionPlanName, status: s.status };
        });
        window.__tokenMeta = window.__tokenMeta || {};
        existing.forEach(function(sub) {
            window.__tokenMeta[sub.subscriptionId] = { maskedToken: sub.maskedToken, subscriptionPlanName: sub.subscriptionPlanName, status: sub.status };
        });

        // Re-render existing subscriptions table
        var existingSection = document.querySelector('#subscriptionPlans .existing-subscriptions');
        if (existing.length > 0) {
            if (!existingSection) {
                existingSection = document.createElement('div');
                existingSection.className = 'existing-subscriptions mb-4';
                var plansHeader = document.querySelector('#subscriptionPlans .aov-section-header');
                if (plansHeader) {
                    plansHeader.parentNode.insertBefore(existingSection, plansHeader);
                } else {
                    document.querySelector('#subscriptionPlans .container-fluid').prepend(existingSection);
                }
            }
            /* Must emit exactly what api-subscription-plans.hbs renders. This runs after
               every mutation - activate/deactivate, unsubscribe, subscribe, plan switch -
               so any drift from the template shows up as the panel reverting to an older
               design the moment a button is pressed. It previously rebuilt the retired
               four-column table with Bootstrap badges and btn-outline-* buttons. */
            existingSection.innerHTML =
                '<div class="aov-section-header"><h2 class="aov-section-title">Subscriptions</h2></div>';

            var list = document.createElement('div');
            list.className = 'aov-sub-list';

            existing.forEach(function(sub) {
                var isActive = sub.status === 'ACTIVE';

                var card = document.createElement('div');
                card.className = 'aov-plan-card aov-sub-card';

                card.appendChild(buildSubRow('Plan', document.createTextNode(sub.subscriptionPlanName || '')));

                var pill = document.createElement('span');
                pill.className = 'sub-status-pill ' + (isActive ? 'sub-status-pill--active' : 'sub-status-pill--inactive');
                var dot = document.createElement('span');
                dot.className = 'sub-status-dot';
                pill.appendChild(dot);
                pill.appendChild(document.createTextNode(sub.status || ''));
                card.appendChild(buildSubRow('Status', pill));

                var code = document.createElement('code');
                code.className = 'masked-token';
                code.id = 'token-' + sub.subscriptionId;
                code.dataset.revealed = 'false';
                code.textContent = '****';

                var tokenRow = buildSubRow('Subscription token', code, 'aov-sub-row--token');
                var tokenValue = tokenRow.querySelector('.aov-sub-value');
                tokenValue.appendChild(buildSubIconBtn('bi-eye', 'Reveal token', sub.subscriptionId, function(id) {
                    toggleTokenVisibility(id);
                }));
                tokenValue.appendChild(buildSubIconBtn('bi-clipboard', 'Copy token', sub.subscriptionId, function(id) {
                    copySubscriptionToken(id);
                }));
                card.appendChild(tokenRow);

                var actions = document.createElement('div');
                actions.className = 'aov-sub-actions';

                var toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'dp-btn dp-btn--outline';
                toggleBtn.title = isActive ? 'Deactivate' : 'Activate';
                toggleBtn.innerHTML = isActive
                    ? '<i class="bi bi-pause-circle"></i> Deactivate'
                    : '<i class="bi bi-play-circle"></i> Activate';
                toggleBtn.dataset.orgId = orgID;
                toggleBtn.dataset.subscriptionId = sub.subscriptionId;
                toggleBtn.dataset.newStatus = isActive ? 'INACTIVE' : 'ACTIVE';
                toggleBtn.addEventListener('click', function() {
                    togglePlatformSubscriptionStatus(this.dataset.orgId, this.dataset.subscriptionId, this.dataset.newStatus);
                });
                actions.appendChild(toggleBtn);

                var deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'dp-btn dp-btn--danger';
                deleteBtn.title = 'Delete';
                deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Unsubscribe';
                deleteBtn.dataset.orgId = orgID;
                deleteBtn.dataset.subscriptionId = sub.subscriptionId;
                deleteBtn.addEventListener('click', function() {
                    confirmDeletePlatformSubscription(this.dataset.orgId, this.dataset.subscriptionId);
                });
                actions.appendChild(deleteBtn);

                card.appendChild(actions);
                list.appendChild(card);
            });

            existingSection.appendChild(list);
        } else if (existingSection) {
            existingSection.remove();
        }

        /* Any status, not only ACTIVE. This has to agree with what the server renders,
           and the isCurrentPlan helper marks a plan subscribed on the plan name alone -
           so a page load showed "View subscription" for a deactivated subscription while
           this refresh flipped the same card back to "Subscribe". The subscription still
           exists either way: it can be reactivated from the card above, and this gateway
           allows only one per API, so offering Subscribe here led to a switch-plan
           confirmation for the plan the user already holds. */
        var subscribedPlanNames = existing
            .map(function(s) { return (s.subscriptionPlanName || '').toLowerCase(); });

        var planCards = document.querySelectorAll('#subscriptionPlans .subscription-card');
        planCards.forEach(function(card) {
            var btn = card.querySelector('.subscription-plan-subscribe-btn, .subscribe-btn');
            if (!btn) return;
            var policyName = (btn.dataset.policyName || '').toLowerCase();
            /* One class carries the whole subscribed state of a plan card - the ribbon, the
               green tint, and which of the two controls is visible - so this only has to
               match what the server would render. Rewriting the button's label here, as this
               did before, would fight the template and could also strip the `disabled` that
               read-only mode puts on the same element. */
            card.classList.toggle('aov-plan-card--subscribed', subscribedPlanNames.indexOf(policyName) !== -1);
        });
    } catch (e) {
        window.location.reload();
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
        safeToken.className = 'dp-modal-value';

        overlay.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content dp-modal">
                    <div class="modal-header dp-modal-head">
                        <h2 class="modal-title dp-modal-title">Subscription created</h2>
                        <button type="button" class="dp-modal-close" id="closeTokenModal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                    </div>
                    <div class="modal-body dp-modal-body">
                        <p class="mb-3">Your subscription to the <strong id="planNameDisplay"></strong> plan is active.</p>
                        <p class="aov-sub-label mb-2">Subscription token</p>
                        <div class="d-flex align-items-center gap-2 mb-3" id="tokenContainer"></div>
                        <p class="dp-modal-note">
                            <i class="bi bi-exclamation-triangle-fill"></i>
                            <span>Copy this token now - send it as the <code class="dp-modal-code">Subscription-Key</code> header when calling the API.</span>
                        </p>
                    </div>
                    <div class="modal-footer dp-modal-footer">
                        <button type="button" class="dp-btn dp-btn--primary" id="doneTokenModal">Done</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector('#planNameDisplay').textContent = planName;

        const tokenContainer = overlay.querySelector('#tokenContainer');
        tokenContainer.appendChild(safeToken);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
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

        /* Done and the header close do the same thing, so they share one handler. */
        overlay.querySelectorAll('#closeTokenModal, #doneTokenModal').forEach((el) => el.addEventListener('click', () => {
            overlay.remove();
            if (window.__platformSubscriptionChanged) {
                window.__platformSubscriptionChanged = false;
                if (document.getElementById('subscriptionPlans')) {
                    refreshLandingPageSubscriptions();
                } else {
                    window.location.reload();
                }
            }
            resolve();
        }));
    });
}

function showSubscriptionTokenInModal(apiId, token, planName) {
    const area = document.getElementById('subscriptionTokenArea-' + apiId);
    if (!area) {
        return showSubscriptionTokenModal(token, planName);
    }

    area.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'dp-modal-value-wrap mb-3';

    const title = document.createElement('div');
    title.innerHTML = `<strong>Subscription Created</strong> — ${escapeHtml(planName)}`;

    const tokenBlock = document.createElement('div');
    tokenBlock.className = 'd-flex gap-2 align-items-center mt-2';
    const code = document.createElement('code');
    code.textContent = token;
    code.style.wordBreak = 'break-all';
    code.className = 'p-2 bg-white border rounded flex-grow-1';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(token).then(() => showAlert('Subscription token copied to clipboard!', 'success'))
            .catch(() => showAlert('Could not copy token', 'error'));
    });

    tokenBlock.appendChild(code);
    tokenBlock.appendChild(copyBtn);
    wrapper.appendChild(title);
    wrapper.appendChild(tokenBlock);

    const info = document.createElement('div');
    info.className = 'dp-modal-note mt-2';
    info.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Use this token as the <code>Subscription-Key</code> header when invoking the API.';
    wrapper.appendChild(info);

    area.appendChild(wrapper);
    area.style.display = 'block';

    // Refresh the subscriptions/plans below the token with updated data
    const modalEl = area.closest('.modal');
    if (modalEl && modalEl.id && typeof prepareSubscriptionModal === 'function') {
        window.__preserveTokenArea = true;
        prepareSubscriptionModal(modalEl.id);
    }
}

function escapeHtml(unsafe) {
    return String(unsafe).replace(/[&<>"'`]/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[m]; });
}
