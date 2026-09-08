document.addEventListener('click', function (e) {
    const btn = e.target.closest('.subscription-plan-subscribe-btn');
    if (!btn) return;

    // Only handle buttons inside the subscription modal
    const modal = btn.closest('.modal');
    if (!modal) return;

    // Show loading state for the clicked button
    if (typeof window.showSubscribeButtonLoading === 'function') {
        try { window.showSubscribeButtonLoading(btn); } catch (e) { /* noop */ }
    }

    // Ensure modal is visible and focus first focusable element
    modal.style.display = 'flex';
    const focusEl = modal.querySelector('button, a, input, select, textarea');
    if (focusEl && typeof focusEl.focus === 'function') focusEl.focus();
});

// Close visible modal on Escape
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const modals = document.querySelectorAll('.modal.custom-modal');
    modals.forEach(m => {
        if (m.style.display && m.style.display !== 'none') {
            // find id and call closeModal if available
            if (typeof window.closeModal === 'function' && m.id) {
                try { window.closeModal(m.id); } catch (err) { m.style.display = 'none'; }
            } else {
                m.style.display = 'none';
            }
        }
    });
});

async function prepareSubscriptionModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const apiId = modalId.replace('planModal-', '');
    const orgID = modal.dataset.orgId || window.__subscriptionOrgID;
    let apiRefId = modal.dataset.apiRefid || '';
    if (!apiRefId) apiRefId = apiId;
    const rawTokenBased = modal.dataset.tokenBased;
    const tokenBased = (typeof rawTokenBased !== 'undefined' && String(rawTokenBased).toLowerCase() === 'true')
        || (typeof rawTokenBased !== 'undefined' && String(rawTokenBased).toLowerCase() === '1')
        || (modal.dataset.gatewayType && String(modal.dataset.gatewayType).toLowerCase().indexOf('api-platform') !== -1);

    const platformContainer = document.getElementById('platformContent-' + apiId);
    const plansBody = modal.querySelector('.subscription-plans-body');

    // Only clear the token area if it has no fresh content (i.e. left from a prior modal session)
    var tokenArea = document.getElementById('subscriptionTokenArea-' + apiId);
    if (tokenArea && !window.__preserveTokenArea) {
        tokenArea.innerHTML = '';
        tokenArea.style.display = 'none';
    }
    window.__preserveTokenArea = false;

    if (!tokenBased) {
        // ensure platform container hidden and app-based plans visible
        if (platformContainer) platformContainer.style.display = 'none';
        if (plansBody) plansBody.style.display = '';
        return;
    }

    if (!platformContainer) return;
    platformContainer.innerHTML = '';

    if (!orgID) {
        platformContainer.innerHTML = '<div class="alert alert-warning">Organization not available.</div>';
        platformContainer.style.display = 'block';
        if (plansBody) plansBody.style.display = 'none';
        return;
    }

    try {
        const resp = await fetch(`/devportal/organizations/${encodeURIComponent(orgID)}/api-platform-subscriptions?apiId=${encodeURIComponent(apiRefId)}`, { headers: { 'Content-Type': 'application/json' } });
        if (!resp.ok) throw new Error('Failed to fetch platform subscriptions');
        const data = await resp.json();

        // data may contain list (existing subscriptions) and subscriptionPlans
        const existing = data.list || data || [];
        const plans = data.subscriptionPlans || data.plans || [];

        // expose token meta and org id for other helpers
        window.__subscriptionOrgID = window.__subscriptionOrgID || orgID;

        /* Render existing subscriptions as the same label-left/value-right cards
           api-subscription-plans.hbs emits, using the builders in platform-subscription.js
           (both scripts are loaded together on the listing and landing pages). This runs
           on every open and after every mutation, so emitting the retired four-column
           table here made the panel snap back to the old design mid-flow. */
        if (existing && existing.length > 0) {
            const header = document.createElement('div');
            header.className = 'aov-section-header';
            header.innerHTML = '<h2 class="aov-section-title">Subscriptions</h2>';
            platformContainer.appendChild(header);

            const list = document.createElement('div');
            list.className = 'aov-sub-list mb-3';

            existing.forEach(sub => {
                // store masked token meta
                window.__tokenMeta = window.__tokenMeta || {};
                window.__tokenMeta[sub.subscriptionId] = { maskedToken: sub.maskedToken, subscriptionPlanName: sub.subscriptionPlanName, status: sub.status };

                const isActive = sub.status === 'ACTIVE';
                const card = document.createElement('div');
                card.className = 'aov-plan-card aov-sub-card';

                card.appendChild(buildSubRow('Plan', document.createTextNode(sub.subscriptionPlanName || '')));

                const pill = document.createElement('span');
                pill.className = 'sub-status-pill ' + (isActive ? 'sub-status-pill--active' : 'sub-status-pill--inactive');
                const dot = document.createElement('span');
                dot.className = 'sub-status-dot';
                pill.appendChild(dot);
                pill.appendChild(document.createTextNode(sub.status || ''));
                card.appendChild(buildSubRow('Status', pill));

                const tokenCode = document.createElement('code');
                tokenCode.className = 'masked-token';
                tokenCode.id = 'token-' + sub.subscriptionId;
                tokenCode.dataset.revealed = 'false';
                tokenCode.textContent = '****';

                const tokenRow = buildSubRow('Subscription token', tokenCode, 'aov-sub-row--token');
                const tokenValue = tokenRow.querySelector('.aov-sub-value');
                tokenValue.appendChild(buildSubIconBtn('bi-eye', 'Reveal token', sub.subscriptionId, function(id) {
                    toggleTokenVisibility(id);
                }));
                tokenValue.appendChild(buildSubIconBtn('bi-clipboard', 'Copy token', sub.subscriptionId, function(id) {
                    copySubscriptionToken(id);
                }));
                card.appendChild(tokenRow);

                const actions = document.createElement('div');
                actions.className = 'aov-sub-actions';

                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'dp-btn dp-btn--outline';
                toggleBtn.title = isActive ? 'Deactivate' : 'Activate';
                toggleBtn.innerHTML = isActive
                    ? '<i class="bi bi-pause-circle"></i> Deactivate'
                    : '<i class="bi bi-play-circle"></i> Activate';
                toggleBtn.dataset.orgId = orgID;
                toggleBtn.dataset.subscriptionId = sub.subscriptionId;
                toggleBtn.dataset.newStatus = isActive ? 'INACTIVE' : 'ACTIVE';
                if (window.isReadOnly) toggleBtn.disabled = true;
                toggleBtn.addEventListener('click', function() {
                    togglePlatformSubscriptionStatus(this.dataset.orgId, this.dataset.subscriptionId, this.dataset.newStatus);
                });
                actions.appendChild(toggleBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'dp-btn dp-btn--danger';
                deleteBtn.title = 'Delete';
                deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Unsubscribe';
                deleteBtn.dataset.orgId = orgID;
                deleteBtn.dataset.subscriptionId = sub.subscriptionId;
                if (window.isReadOnly) deleteBtn.disabled = true;
                deleteBtn.addEventListener('click', function() {
                    confirmDeletePlatformSubscription(this.dataset.orgId, this.dataset.subscriptionId);
                });
                actions.appendChild(deleteBtn);

                card.appendChild(actions);
                list.appendChild(card);
            });

            platformContainer.appendChild(list);
        }

        // Render subscription plans from CP if available
        if (plans && plans.length > 0) {
            const plansHeader = document.createElement('div');
            plansHeader.className = 'aov-section-header';
            plansHeader.innerHTML = '<h2 class="aov-section-title">Subscription Plans</h2>';
            platformContainer.appendChild(plansHeader);

            const row = document.createElement('div');
            row.className = 'row row-gap-4 justify-content-center';
            plans.forEach(plan => {
                const col = document.createElement('div');
                col.className = 'col-xl-3 col-lg-4 col-md-6 col-12';
                /* Same aov-plan-card the template renders for non-platform plans, so a
                   platform plan injected here is indistinguishable from one rendered
                   server-side. Previously this built the older card dev-card markup, which
                   is why the modal could show two different plan cards side by side. */
                const rawRate = plan.requestCount || plan.rate;
                const unlimited = rawRate === '' || rawRate === null || rawRate === undefined ||
                    String(rawRate) === '0' || String(rawRate) === '-1' ||
                    String(rawRate).toLowerCase() === 'unlimited';
                col.innerHTML = `
                    <div class="aov-plan-card subscription-card">
                        <div class="aov-plan-ribbon" aria-hidden="true">
                            <div class="aov-plan-ribbon-label api-ribbon-label">SUBSCRIBED</div>
                        </div>
                        <div class="aov-plan-body">
                            <div class="aov-plan-card-head">
                                <div class="aov-plan-name-row">
                                    <span class="aov-plan-icon" style="background: var(--surface-sunken); color: var(--primary);">
                                        <i class="bi bi-lightning-charge-fill"></i>
                                    </span>
                                    <span class="aov-plan-name">${escapeHtml(plan.displayName || plan.subscriptionPlanName || '')}</span>
                                </div>
                            </div>
                            <div class="plan-kpis">
                                <div class="plan-kpi-row">
                                    <div class="plan-kpi-label">Rate limit</div>
                                    <div class="plan-kpi-valueTop">
                                        ${unlimited
                                            ? '<span class="plan-kpi-amount" title="Unlimited">&infin;</span>'
                                            : `<span class="plan-kpi-amount">${escapeHtml(String(rawRate))}</span>`}
                                        <span class="plan-kpi-unit">req/min</span>
                                    </div>
                                    <div class="plan-kpi-labelSub"></div>
                                    <div class="plan-kpi-valueSub"><span class="plan-kpi-badge-placeholder">&nbsp;</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="position-relative">
                            <div class="message-overlay hidden"><div class="message-content"><i class="bi message-icon"></i><p class="message-text"></p></div><button type="button" class="close-message" aria-label="Close">&times;</button></div>
                        </div>
                    </div>
                `;
                const card = col.querySelector('.aov-plan-card');
                const btn = document.createElement('button');
                btn.className = 'common-btn-primary subscribe-btn w-100';
                btn.textContent = 'Subscribe';
                btn.dataset.orgId = orgID;
                btn.dataset.apiId = apiId;
                btn.dataset.policyName = plan.policyName || plan.subscriptionPlanName || '';
                btn.dataset.displayName = plan.displayName || plan.subscriptionPlanName || '';
                if (window.isReadOnly) {
                    btn.disabled = true;
                    btn.setAttribute('aria-disabled', 'true');
                    btn.classList.add('disabled');
                } else {
                    btn.addEventListener('click', function () { handlePlanSubscription(this); });
                }
                card.querySelector('.position-relative').appendChild(btn);

                row.appendChild(col);
            });
            platformContainer.appendChild(row);
            if (plansBody) plansBody.style.display = 'none';
        } else {
            // CP did not return plans — show the static plan cards from the template
            if (plansBody) plansBody.style.display = '';
        }

        // Store existing subscriptions for plan-change confirmation flow
        if (existing && existing.length > 0) {
            window.existingPlatformSubscriptions = existing.map(function(sub) {
                return { subscriptionId: sub.subscriptionId, subscriptionPlanName: sub.subscriptionPlanName, status: sub.status };
            });
        } else {
            window.existingPlatformSubscriptions = [];
        }

        // Reset all static plan buttons to default "Subscribe" state, then mark current plan
        if (plansBody) {
            var planBtns = plansBody.querySelectorAll('.subscription-plan-subscribe-btn');
            planBtns.forEach(function(btn) {
                btn.textContent = 'Subscribe';
                btn.classList.add('common-btn-primary');
                if (window.isReadOnly) {
                    btn.disabled = true;
                    btn.classList.add('disabled');
                    btn.removeAttribute('onclick');
                } else {
                    btn.disabled = false;
                    btn.classList.remove('disabled');
                    btn.setAttribute('onclick', 'handlePlanSubscription(this)');
                }
            });

            if (existing && existing.length > 0) {
                /* Any status: a deactivated subscription is still the plan this
                   application holds, and this gateway allows one per API. Filtering to
                   ACTIVE here offered "Subscribe" for a plan already subscribed, which
                   the landing card did too - see refreshLandingPageSubscriptions. */
                var subscribedPlanNames = existing
                    .map(function(s) { return (s.subscriptionPlanName || '').toLowerCase(); });

                planBtns.forEach(function(btn) {
                    var policyName = (btn.dataset.policyName || '').toLowerCase();
                    if (subscribedPlanNames.indexOf(policyName) !== -1) {
                        btn.textContent = 'Current Plan';
                        btn.disabled = true;
                        btn.classList.add('disabled');
                        btn.removeAttribute('onclick');
                    }
                });
            }
        }

        platformContainer.style.display = ((existing && existing.length > 0) || (plans && plans.length > 0)) ? 'block' : 'none';
    } catch (e) {
        platformContainer.innerHTML = '<div class="alert alert-danger">Could not load platform subscriptions.</div>';
        platformContainer.style.display = 'block';
        if (plansBody) plansBody.style.display = '';
    }
}

function escapeHtml(unsafe) {
    return String(unsafe).replace(/[&<>"'`]/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[m]; });
}
