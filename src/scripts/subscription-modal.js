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
        const plans = data.subscriptionPlans || data.subscriptionPlans || data.plans || [];

        // expose token meta and org id for other helpers
        window.__subscriptionOrgID = window.__subscriptionOrgID || orgID;

        // Render existing subscriptions table
        if (existing && existing.length > 0) {
            const table = document.createElement('table');
            table.className = 'table mb-3';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Subscription Token</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            const tbody = table.querySelector('tbody');
            existing.forEach(sub => {
                // store masked token meta
                window.__tokenMeta = window.__tokenMeta || {};
                window.__tokenMeta[sub.subscriptionId] = { maskedToken: sub.maskedToken, subscriptionPlanName: sub.subscriptionPlanName, status: sub.status };

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${escapeHtml(sub.subscriptionPlanName || '')}</td>
                    <td><span class="badge ${sub.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}">${escapeHtml(sub.status || '')}</span></td>
                    <td>
                        <div class="token-display">
                            <code class="masked-token" id="token-${sub.subscriptionId}" data-revealed="false">****</code>
                            <button class="btn btn-sm btn-outline-secondary" onclick="toggleTokenVisibility('${sub.subscriptionId}')" title="Reveal token"><i class="bi bi-eye"></i></button>
                            <button class="btn btn-sm btn-outline-secondary" onclick="copySubscriptionToken('${sub.subscriptionId}')" title="Copy token"><i class="bi bi-clipboard"></i></button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" ${window.isReadOnly ? 'disabled' : ''} onclick="togglePlatformSubscriptionStatus('${orgID}', '${sub.subscriptionId}', '${sub.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}')">${sub.status === 'ACTIVE' ? '<i class="bi bi-pause-circle"></i>' : '<i class="bi bi-play-circle"></i>'}</button>
                        <button class="btn btn-sm btn-outline-danger" ${window.isReadOnly ? 'disabled' : ''} onclick="confirmDeletePlatformSubscription('${orgID}', '${sub.subscriptionId}')"><i class="bi bi-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            platformContainer.appendChild(table);
        }

        // Render subscription plans from CP if available
        if (plans && plans.length > 0) {
            const header = document.createElement('div');
            header.className = 'container-header mb-3';
            header.textContent = 'Subscription Plans';
            platformContainer.appendChild(header);

            const row = document.createElement('div');
            row.className = 'row row-gap-4 justify-content-center';
            plans.forEach(plan => {
                const col = document.createElement('div');
                col.className = 'col-xl-3 col-lg-4 col-md-6 col-12';
                col.innerHTML = `
                    <div class="card dev-card subscription-card">
                        <div class="card-body align-items-center text-center p-0">
                            <span class="subscription-plans-card-title">${escapeHtml(plan.displayName || plan.subscriptionPlanName || '')}</span>
                            <h1 class="subscription-plans-request-count">${escapeHtml(String(plan.requestCount || plan.rate || ''))}</h1>
                            <p class="subscription-plans-card-subtitle pt-0">requests per minute</p>
                        </div>
                        <div class="position-relative">
                            <div class="message-overlay hidden"><div class="message-content"><i class="bi message-icon"></i><p class="message-text"></p></div><button type="button" class="close-message" aria-label="Close">&times;</button></div>
                        </div>
                    </div>
                `;
                const card = col.querySelector('.card');
                const btn = document.createElement('button');
                btn.className = 'common-btn-primary subscribe-btn w-100';
                btn.textContent = 'Subscribe';
                btn.dataset.orgId = orgID;
                btn.dataset.apiId = apiId;
                btn.dataset.policyName = plan.policyName || plan.subscriptionPlanName || '';
                btn.dataset.displayName = plan.displayName || plan.subscriptionPlanName || '';
                btn.addEventListener('click', function () { handlePlanSubscription(this); });
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
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.classList.add('common-btn-primary');
                btn.setAttribute('onclick', 'handlePlanSubscription(this)');
            });

            if (existing && existing.length > 0) {
                var activePlanNames = existing
                    .filter(function(s) { return s.status === 'ACTIVE'; })
                    .map(function(s) { return (s.subscriptionPlanName || '').toLowerCase(); });

                planBtns.forEach(function(btn) {
                    var policyName = (btn.dataset.policyName || '').toLowerCase();
                    if (activePlanNames.indexOf(policyName) !== -1) {
                        btn.textContent = 'Current Plan';
                        btn.disabled = true;
                        btn.classList.add('disabled');
                        btn.removeAttribute('onclick');
                    }
                });
            }
        }

        platformContainer.style.display = (existing && existing.length > 0) ? 'block' : 'none';
    } catch (e) {
        platformContainer.innerHTML = '<div class="alert alert-danger">Could not load platform subscriptions.</div>';
        platformContainer.style.display = 'block';
        if (plansBody) plansBody.style.display = 'none';
    }
}

function escapeHtml(unsafe) {
    return String(unsafe).replace(/[&<>"'`]/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[m]; });
}
