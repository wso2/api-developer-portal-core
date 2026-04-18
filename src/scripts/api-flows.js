/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// ─────────────────────────────────────────────
// Data Initialization
// ─────────────────────────────────────────────

let apiFlowsData = [];
let currentOrgID = '';
let currentViewName = '';
let csrfToken = '';
let arazoEditor = null;
let showSelectedOnly = false;

function initializeApiFlowsData() {
    try {
        const dataContainer = document.getElementById('apiFlowsDataContainer');
        if (dataContainer) {
            apiFlowsData = JSON.parse(dataContainer.textContent) || [];
        }
    } catch (e) {
        console.error('Failed to parse apiFlowsData:', e);
        apiFlowsData = [];
    }

    try {
        const contextContainer = document.getElementById('apiFlowsContextData');
        if (contextContainer) {
            const context = JSON.parse(contextContainer.textContent);
            currentOrgID = context.orgID || '';
            currentViewName = context.viewName || '';
            csrfToken = context.csrfToken || '';
        }
    } catch (e) {
        console.error('Failed to parse apiFlows context:', e);
    }
}

// ─────────────────────────────────────────────
// Handle Generation
// ─────────────────────────────────────────────

function generateHandle(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 100);
}

document.addEventListener('DOMContentLoaded', function () {
    // Parse data from non-executable containers
    initializeApiFlowsData();

    const listSection = document.getElementById('apiFlowList');
    const formSection = document.getElementById('apiFlowForm');
    const createBtn = document.getElementById('createApiFlowBtn');
    const createBtnEmpty = document.getElementById('createApiFlowBtnEmpty');

    function showForm() {
        listSection.style.display = 'none';
        formSection.style.display = 'block';
    }

    function showList() {
        listSection.style.display = 'block';
        formSection.style.display = 'none';
        resetApiFlowForm();
    }

    function handleCreateClick() {
        resetApiFlowForm();
        document.getElementById('apiFlowFormTitle').textContent = 'Create API Flow';
        document.getElementById('editingApiFlowId').value = '';
        updatePromptFromForm();
        showForm();
    }

    createBtn?.addEventListener('click', handleCreateClick);
    createBtnEmpty?.addEventListener('click', handleCreateClick);

    document.getElementById('cancelApiFlowBtn')?.addEventListener('click', showList);
    document.getElementById('cancelApiFlowBtn2')?.addEventListener('click', showList);

    // Re-generate prompt when description changes (debounced)
    let descDebounce;
    document.getElementById('apiFlowDescription')?.addEventListener('input', () => {
        clearTimeout(descDebounce);
        descDebounce = setTimeout(updatePromptFromForm, 600);
    });

    // Form action buttons
    document.getElementById('regeneratePromptBtn')?.addEventListener('click', regenerateAgentPrompt);
    document.getElementById('copyFieldPromptBtn')?.addEventListener('click', copyFieldPrompt);

    // Content type radio buttons
    document.querySelectorAll('.api-flow-content-type-radio').forEach(radio => {
        radio.addEventListener('change', onContentTypeChange);
    });

    // Agent visibility radios — toggle Agent Prompt tab indicator and banner
    document.querySelectorAll('input[name="apiFlowAgentVisibility"]').forEach(radio => {
        radio.addEventListener('change', () => syncAgentPromptTab(radio.value === 'HIDDEN' && radio.checked));
    });

    // "Change visibility" banner action — scroll to Agent Visibility control
    document.getElementById('changeVisibilityBtn')?.addEventListener('click', () => {
        const agentVisSection = document.getElementById('agentVisibilityVisible')?.closest('.mb-1');
        agentVisSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('agentVisibilityVisible')?.focus();
    });

    // Arazzo buttons
    document.getElementById('generateArazzoBtn')?.addEventListener('click', generateArazzoSpec);
    document.getElementById('uploadArazzoBtn')?.addEventListener('click', () => {
        document.getElementById('arazoFileInput')?.click();
    });
    document.getElementById('copyArazzoBtn')?.addEventListener('click', copyArazzoSpec);
    document.getElementById('arazoFileInput')?.addEventListener('change', loadArazzoFile);

    // Markdown buttons
    document.getElementById('generateMarkdownBtn')?.addEventListener('click', generateMarkdownDoc);
    document.getElementById('uploadMarkdownBtn')?.addEventListener('click', () => {
        document.getElementById('markdownFileInput')?.click();
    });
    document.getElementById('copyMarkdownBtn')?.addEventListener('click', copyMarkdown);
    document.getElementById('markdownFileInput')?.addEventListener('change', loadMarkdownFile);

    // Save buttons
    document.getElementById('saveApiFlowBtn')?.addEventListener('click', function() {
        saveApiFlow(currentOrgID, currentViewName, this.dataset.status);
    });
    document.getElementById('saveDraftBtn')?.addEventListener('click', function() {
        saveApiFlow(currentOrgID, currentViewName, this.dataset.status);
    });

    // Attach event listeners to action buttons programmatically
    document.querySelectorAll('.api-flow-view-prompt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const apiFlowId = btn.dataset.apiFlowId;
            openPromptModal(apiFlowId);
        });
    });

    document.querySelectorAll('.api-flow-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const apiFlowId = btn.dataset.apiFlowId;
            openEditApiFlow(apiFlowId);
        });
    });

    document.querySelectorAll('.api-flow-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const apiFlowId = btn.dataset.apiFlowId;
            openDeleteApiFlowModal(currentOrgID, currentViewName, apiFlowId);
        });
    });

    document.getElementById('copyPromptBtn')?.addEventListener('click', copyPrompt);
    document.getElementById('downloadPromptBtn')?.addEventListener('click', downloadPrompt);

    const runPromptBtn = document.getElementById('runPromptBtn');
    if (runPromptBtn) {
        runPromptBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            document.getElementById('configRunDropdownMenu').classList.toggle('show');
        });
    }
    document.getElementById('runInClaudeBtn')?.addEventListener('click', function() {
        const prompt = document.getElementById('agentPromptContent').textContent;
        window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank');
        document.getElementById('configRunDropdownMenu').classList.remove('show');
    });
    document.getElementById('runInChatGPTBtn')?.addEventListener('click', function() {
        const prompt = document.getElementById('agentPromptContent').textContent;
        window.open('https://chatgpt.com/?prompt=' + encodeURIComponent(prompt), '_blank');
        document.getElementById('configRunDropdownMenu').classList.remove('show');
    });
    document.addEventListener('click', function() {
        document.getElementById('configRunDropdownMenu')?.classList.remove('show');
    });

    initApiCardPicker();
    initCodeMirrorEditor();
    initSectionCollapse();

    // Show selected only toggle
    document.getElementById('showSelectedOnlyBtn')?.addEventListener('click', () => {
        showSelectedOnly = !showSelectedOnly;
        document.getElementById('showSelectedOnlyBtn')?.classList.toggle('af-show-selected-active', showSelectedOnly);
        renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
    });

    // Update section 1 summary when name/visibility changes
    document.getElementById('apiFlowName')?.addEventListener('input', updateSectionSummaries);
    document.querySelectorAll('input[name="apiFlowVisibility"]').forEach(r => r.addEventListener('change', updateSectionSummaries));
    document.querySelectorAll('input[name="apiFlowAgentVisibility"]').forEach(r => r.addEventListener('change', updateSectionSummaries));
    document.querySelectorAll('.api-flow-content-type-radio').forEach(r => r.addEventListener('change', updateSectionSummaries));
});

// ─────────────────────────────────────────────
// Form state helpers
// ─────────────────────────────────────────────

function resetApiFlowForm() {
    document.getElementById('editingApiFlowId').value = '';
    document.getElementById('apiFlowName').value = '';
    document.getElementById('apiFlowDescription').value = '';
    document.getElementById('arazoContent').value = '';
    document.getElementById('markdownContent').value = '';
    document.getElementById('agentPromptField').value = '';

    if (arazoEditor) arazoEditor.setValue('');

    const arazzoBtn = document.getElementById('contentTypeArazzo');
    if (arazzoBtn) arazzoBtn.checked = true;
    onContentTypeChange();

    const visibilityPublicBtn = document.getElementById('visibilityPublic');
    if (visibilityPublicBtn) visibilityPublicBtn.checked = true;
    const agentVisibilityVisibleBtn = document.getElementById('agentVisibilityVisible');
    if (agentVisibilityVisibleBtn) agentVisibilityVisibleBtn.checked = true;
    syncAgentPromptTab(false);

    showSelectedOnly = false;
    document.getElementById('showSelectedOnlyBtn')?.classList.remove('af-show-selected-active');
    setPickerSelection([]);
    setSaveButtonMode('create');
    updateSectionSummaries();
    expandAllSections();
}

function onContentTypeChange() {
    const selected = document.querySelector('input[name="apiFlowContentType"]:checked')?.value || 'ARAZZO';
    document.getElementById('arazoContentWrapper')?.classList.toggle('d-none', selected !== 'ARAZZO');
    document.getElementById('markdownContentWrapper')?.classList.toggle('d-none', selected !== 'MARKDOWN');
}

function syncAgentPromptTab(isHidden) {
    const tab = document.getElementById('tab-visual');
    const hiddenIcon = document.getElementById('tabVisualHiddenIcon');
    const banner = document.getElementById('agentHiddenBanner');
    if (!tab) return;

    if (isHidden) {
        hiddenIcon?.classList.remove('d-none');
        tab.title = 'Hidden from agents — agents won\'t use this prompt';
        if (banner) {
            banner.classList.remove('d-none', 'af-banner-fade-out');
            banner.classList.add('af-banner-fade-in');
        }
    } else {
        hiddenIcon?.classList.add('d-none');
        tab.title = '';
        if (banner && !banner.classList.contains('d-none')) {
            banner.classList.remove('af-banner-fade-in');
            banner.classList.add('af-banner-fade-out');
            setTimeout(() => {
                banner.classList.add('d-none');
                banner.classList.remove('af-banner-fade-out');
            }, 150);
        }
    }
}

function getSelectedAPIs() {
    return [...document.querySelectorAll('.api-flow-api-checkbox:checked')].map(cb => ({
        API_ID: cb.value,        apiId: cb.value,
        API_NAME: cb.dataset.apiName,       apiName: cb.dataset.apiName,
        API_HANDLE: cb.dataset.apiHandle,   apiHandle: cb.dataset.apiHandle,
        API_DESCRIPTION: cb.dataset.apiDescription, apiDescription: cb.dataset.apiDescription,
        API_TYPE: cb.dataset.apiType,       apiType: cb.dataset.apiType,
        PRODUCTION_URL: cb.dataset.productionUrl,   productionUrl: cb.dataset.productionUrl
    }));
}

// ─────────────────────────────────────────────
// API Card Picker
// ─────────────────────────────────────────────

function initApiCardPicker() {
    const searchEl = document.getElementById('apiCardSearch');
    if (!searchEl) return;

    searchEl.addEventListener('input', () => {
        renderApiCards(searchEl.value.trim());
    });

    renderApiCards('');
}

function renderApiCards(query) {
    const grid = document.getElementById('apiCardGrid');
    if (!grid) return;

    const checkboxes = [...document.querySelectorAll('.api-flow-api-checkbox')];
    const q = query.toLowerCase();
    const filtered = checkboxes.filter(cb => {
        if (showSelectedOnly && !cb.checked) return false;
        if (!q) return true;
        return (cb.dataset.apiName || '').toLowerCase().includes(q)
            || (cb.dataset.apiDescription || '').toLowerCase().includes(q)
            || (cb.dataset.apiType || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="text-muted small fst-italic mb-0">No matching APIs</p>';
        updateApiSelectedCount();
        return;
    }

    grid.innerHTML = filtered.map(cb => {
        const isSelected = cb.checked;
        const desc = sanitizeInput(cb.dataset.apiDescription || '');
        return `
            <div class="af-api-card${isSelected ? ' af-api-card--selected' : ''}"
                 data-api-id="${cb.value}" role="button" tabindex="0"
                 aria-pressed="${isSelected}" title="${desc}">
                <div class="af-api-card-check">
                    <i class="bi ${isSelected ? 'bi-check-circle-fill' : 'bi-circle'}"></i>
                </div>
                <div class="af-api-card-body">
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <span class="fw-semibold small">${sanitizeInput(cb.dataset.apiName)}</span>
                        <span class="api-flow-type-pill">${sanitizeInput(cb.dataset.apiType || '')}</span>
                    </div>
                    <p class="mb-0 af-api-card-desc">${desc}</p>
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.af-api-card').forEach(card => {
        function toggle() {
            const cb = document.querySelector(`.api-flow-api-checkbox[value="${card.dataset.apiId}"]`);
            if (!cb) return;
            cb.checked = !cb.checked;
            renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
            updatePromptFromForm();
        }
        card.addEventListener('click', toggle);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });

    updateApiSelectedCount();
    updateApiChips();
    updateSectionSummaries();
}

function updateApiSelectedCount() {
    const count = document.querySelectorAll('.api-flow-api-checkbox:checked').length;
    const el = document.getElementById('apiSelectedCount');
    if (!el) return;
    if (count === 0) {
        el.textContent = 'No APIs selected';
    } else {
        el.textContent = count === 1 ? '1 API selected' : `${count} APIs selected`;
    }
}

function setPickerSelection(apiIds) {
    document.querySelectorAll('.api-flow-api-checkbox').forEach(cb => {
        cb.checked = apiIds.includes(cb.value);
    });
    renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
}

// ─────────────────────────────────────────────
// Agent Prompt Generation (server-side)
// ─────────────────────────────────────────────

async function updatePromptFromForm() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || '';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();
    // Derive orgName and viewName from URL: /:orgName/views/:viewName/configure
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1] || '';
    const viewName = pathParts[3] || 'default';
    const editingId = document.getElementById('editingApiFlowId')?.value || '';
    const editingFlow = editingId ? (window.apiFlowsData || []).find(f => String(f.apiFlowId) === String(editingId)) : null;
    const handle = editingFlow?.handle || '';

    try {
        const response = await fetch(`/${orgName}/views/${viewName}/api-flows/generate-prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
            body: JSON.stringify({ name, description, apis, orgName, viewName, handle }),
            credentials: 'same-origin'
        });

        if (response.ok) {
            const data = await response.json();
            const promptField = document.getElementById('agentPromptField');
            if (promptField) promptField.value = data.agentPrompt || '';
        }
    } catch (error) {
        console.error('Error generating prompt:', error);
    }
}

function regenerateAgentPrompt() {
    updatePromptFromForm();
}

// ─────────────────────────────────────────────
// Save button state
// ─────────────────────────────────────────────

function setSaveButtonMode(mode, currentStatus) {
    const mainBtn = document.getElementById('saveApiFlowBtn');
    const badge = document.getElementById('editingFlowStatusBadge');
    if (!mainBtn) return;

    if (mode === 'edit') {
        mainBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Update Flow';
        if (badge && currentStatus) {
            badge.textContent = currentStatus;
            badge.className = `api-flow-status-badge api-flow-status-${currentStatus.toLowerCase()}`;
        }
    } else {
        mainBtn.innerHTML = '<i class="bi bi-send me-1"></i> Publish Flow';
        if (badge) badge.className = 'api-flow-status-badge d-none';
    }
}

// ─────────────────────────────────────────────
// Save (Create or Update)
// ─────────────────────────────────────────────

async function saveApiFlow(orgID, viewName, status) {
    // Sync CodeMirror editor to hidden textarea before reading values
    if (arazoEditor) {
        document.getElementById('arazoContent').value = arazoEditor.getValue();
    }

    const name = document.getElementById('apiFlowName').value.trim();
    const description = document.getElementById('apiFlowDescription').value.trim();
    const agentPrompt = document.getElementById('agentPromptField').value.trim();
    const contentType = document.querySelector('input[name="apiFlowContentType"]:checked')?.value || 'ARAZZO';
    const arazoContent = contentType === 'ARAZZO' ? document.getElementById('arazoContent').value.trim() : '';
    const markdownContent = contentType === 'MARKDOWN' ? document.getElementById('markdownContent').value.trim() : '';
    const apiFlowId = document.getElementById('editingApiFlowId').value;
    const selectedAPIs = getSelectedAPIs();
    const apiIds = selectedAPIs.map(a => a.apiId);

    // Validation
    const agentVisibility = document.querySelector('input[name="apiFlowAgentVisibility"]:checked')?.value || 'VISIBLE';
    let valid = true;
    const fieldsToValidate = [
        ['apiFlowName', name],
        ['apiFlowDescription', description],
    ];
    if (agentVisibility !== 'HIDDEN') fieldsToValidate.push(['agentPromptField', agentPrompt]);
    if (contentType === 'ARAZZO') fieldsToValidate.push(['arazoContent', arazoContent]);
    if (contentType === 'MARKDOWN') fieldsToValidate.push(['markdownContent', markdownContent]);
    fieldsToValidate.forEach(([id, val]) => {
        if (id === 'arazoContent' && arazoEditor) {
            const host = document.getElementById('arazoEditorHost');
            const feedback = document.getElementById('arazoContentInvalid');
            if (!val) {
                host?.classList.add('af-cm-invalid');
                if (feedback) feedback.style.display = 'block';
                valid = false;
            } else {
                host?.classList.remove('af-cm-invalid');
                if (feedback) feedback.style.display = 'none';
            }
        } else {
            const el = document.getElementById(id);
            if (!val) {
                el?.classList.add('is-invalid');
                valid = false;
            } else {
                el?.classList.remove('is-invalid');
            }
        }
    });
    if (!valid) return;

    const visibility = document.querySelector('input[name="apiFlowVisibility"]:checked')?.value || 'PUBLIC';
    const handle = generateHandle(name);
    const payload = { name, handle, description, agentPrompt, status, visibility, agentVisibility, contentType, arazoContent, markdownContent, apiIds };
    const isEdit = !!apiFlowId;
    const url = isEdit
        ? `/devportal/organizations/${orgID}/views/${viewName}/api-flows/${apiFlowId}`
        : `/devportal/organizations/${orgID}/views/${viewName}/api-flows`;
    const method = isEdit ? 'PUT' : 'POST';

    const groupBtns = document.querySelectorAll('#saveApiFlowGroup button');
    const mainBtn = document.getElementById('saveApiFlowBtn');
    groupBtns.forEach(b => b.disabled = true);
    mainBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Saving…';

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify(payload),
            credentials: 'same-origin'
        });

        if (response.ok) {
            window.location.href = window.location.pathname + '#apiflows';
            window.location.reload();
        } else {
            const err = await response.json().catch(() => ({ message: 'Save failed' }));
            showAlert(err.message || 'Save failed', 'error');
            groupBtns.forEach(b => b.disabled = false);
            setSaveButtonMode(isEdit ? 'edit' : 'create');
        }
    } catch (err) {
        showAlert(err.message || 'Network error', 'error');
        groupBtns.forEach(b => b.disabled = false);
        setSaveButtonMode(isEdit ? 'edit' : 'create');
    }
}

// ─────────────────────────────────────────────
// Delete
// ─────────────────────────────────────────────

function openDeleteApiFlowModal(orgID, viewName, apiFlowId) {
    const flow = (apiFlowsData || []).find(f => String(f.apiFlowId) === String(apiFlowId));
    const flowName = flow?.name || 'API Flow';

    document.getElementById('deleteApiFlowModalTitle').textContent = 'Delete API Flow';
    const messageEl = document.getElementById('deleteApiFlowModalMessage');
    messageEl.textContent = `Are you sure you want to delete "${flowName}"? This action cannot be undone.`;

    const confirmBtn = document.getElementById('deleteApiFlowConfirmBtn');
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = 'Confirm';
    confirmBtn.onclick = () => deleteApiFlow(orgID, viewName, apiFlowId);
    const modal = new bootstrap.Modal(document.getElementById('deleteApiFlowModal'));
    modal.show();
}

async function deleteApiFlow(orgID, viewName, apiFlowId) {
    const confirmBtn = document.getElementById('deleteApiFlowConfirmBtn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1 common-btn-danger" role="status" aria-hidden="true"></span> Deleting…';

    const response = await fetch(`/devportal/organizations/${orgID}/views/${viewName}/api-flows/${apiFlowId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': csrfToken
        },
        credentials: 'same-origin'
    });
    if (response.ok) {
        window.location.reload();
    } else {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Confirm';
        showAlert('Failed to delete API Flow', 'error');
    }
}

// ─────────────────────────────────────────────
// Edit — pre-fill form from existing data
// ─────────────────────────────────────────────

function openEditApiFlow(apiFlowId) {
    const data = (window.apiFlowsData || apiFlowsData || []).find(f => f.apiFlowId === apiFlowId);
    if (!data) return;
    resetApiFlowForm();
    document.getElementById('apiFlowFormTitle').textContent = 'Edit API Flow';
    document.getElementById('editingApiFlowId').value = apiFlowId;
    document.getElementById('apiFlowName').value = data.name || '';
    document.getElementById('apiFlowDescription').value = data.description || '';
    const arazoVal = data.arazoContent || '';
    document.getElementById('arazoContent').value = arazoVal;
    if (arazoEditor) arazoEditor.setValue(arazoVal);
    document.getElementById('markdownContent').value = data.markdownContent || '';
    document.getElementById('agentPromptField').value = data.agentPrompt || '';
    setSaveButtonMode('edit', data.status);

    const contentType = data.contentType || 'ARAZZO';
    const radioBtn = document.querySelector(`input[name="apiFlowContentType"][value="${contentType}"]`);
    if (radioBtn && !radioBtn.disabled) radioBtn.checked = true;
    onContentTypeChange();

    const visibilityRadio = document.querySelector(`input[name="apiFlowVisibility"][value="${data.visibility || 'PUBLIC'}"]`);
    if (visibilityRadio) visibilityRadio.checked = true;
    const agentVisibilityRadio = document.querySelector(`input[name="apiFlowAgentVisibility"][value="${data.agentVisibility || 'VISIBLE'}"]`);
    if (agentVisibilityRadio) agentVisibilityRadio.checked = true;
    syncAgentPromptTab(data.agentVisibility === 'HIDDEN');

    setPickerSelection((data.apis || []).map(a => a.apiId));

    const listSection = document.getElementById('apiFlowList');
    const formSection = document.getElementById('apiFlowForm');
    listSection.style.display = 'none';
    formSection.style.display = 'block';
}

// ─────────────────────────────────────────────
// Agent Prompt modal
// ─────────────────────────────────────────────


function openPromptModal(apiFlowId) {
    const data = (window.apiFlowsData || apiFlowsData || []).find(f => f.apiFlowId === apiFlowId);
    if (!data) return;
    document.getElementById('agentPromptFlowName').textContent = data.name;
    document.getElementById('agentPromptContent').textContent = data.agentPrompt || '';
    const copyIcon = document.getElementById('copyPromptBtn')?.querySelector('i');
    if (copyIcon) copyIcon.className = 'bi bi-clipboard';
    const modal = new bootstrap.Modal(document.getElementById('agentPromptModal'));
    modal.show();
}

function copyPrompt() {
    const content = document.getElementById('agentPromptContent').textContent;
    navigator.clipboard.writeText(content).then(() => {
        const btn = document.getElementById('copyPromptBtn');
        const icon = btn.querySelector('i');
        icon.className = 'bi bi-clipboard-check';
        setTimeout(() => { icon.className = 'bi bi-clipboard'; }, 2000);
    });
}

function downloadPrompt() {
    const content = document.getElementById('agentPromptContent').textContent;
    const name = document.getElementById('agentPromptFlowName').textContent || 'agent-prompt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name.toLowerCase().replace(/\s+/g, '-') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function copyFieldPrompt() {
    const content = document.getElementById('agentPromptField').value;
    navigator.clipboard.writeText(content).then(() => {
        showAlert('Agent prompt copied to clipboard', 'success');
    });
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(input)));
    return div.innerHTML;
}

// ─────────────────────────────────────────────
// Arazzo Spec Generation
// ─────────────────────────────────────────────

function slugify(text) {
    return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'flow';
}

function buildArazzoSpec(name, description, apis, orgHandle, viewName) {
    const slug = slugify(name);

    const sourceDescriptions = apis.map(api => {
        const handle = api.apiHandle || api.API_HANDLE || '';
        const path = orgHandle
            ? `/${orgHandle}/views/${viewName}/api/${handle}/docs/specification.json`
            : `/views/${viewName}/api/${handle}/docs/specification.json`;
        const url = `${window.location.origin}${path}`;
        return `  - name: ${handle || 'api-' + (apis.indexOf(api) + 1)}\n    url: '${url}'\n    type: openapi`;
    }).join('\n');

    return `arazzo: '1.0.0'
info:
  title: '${(name || 'My Flow').replace(/'/g, "''")}'
  version: 1.0.0
  description: '${(description || '').replace(/'/g, "''")}'

# Each entry below points to an OpenAPI spec. Read every spec before writing any step —
# the operations, parameters, and response shapes in those specs drive everything below.
${apis.length > 0 ? 'sourceDescriptions:\n' + sourceDescriptions : 'sourceDescriptions: []'}

workflows:
  - workflowId: ${slug}
    summary: '${(description || '').replace(/'/g, "''").slice(0, 80)}'
    description: >
      ${(description || '').replace(/'/g, "''")}

    # ── INPUTS ──────────────────────────────────────────────────────────────
    # Declare every value the caller must supply to start this workflow.
    # Derive the required fields from what the APIs actually need (read the specs).
    # Reference inputs anywhere below as:  $inputs.<fieldName>
    #
    # Structure:
    #   type: object
    #   required: [<field1>, <field2>, ...]   # list fields the caller must provide
    #   properties:
    #     <scalarField>:
    #       type: string | number | boolean
    #       description: '...'
    #     <objectField>:
    #       type: object
    #       properties:
    #         <subField>: { type: string }
    #     <arrayField>:
    #       type: array
    #       items: { type: string }
    # ────────────────────────────────────────────────────────────────────────
    inputs:
      type: object
      properties: {}

    # ── STEPS ───────────────────────────────────────────────────────────────
    # Read the specs, determine the correct execution order, then write one
    # step per API operation. Do not guess the order — derive it from data
    # dependencies (a step that needs output from another must come after it).
    #
    # Every step must include all of the following fields:
    #
    # stepId: (string)
    #   A unique camelCase identifier, e.g. discoverTreatment, bookSlot.
    #   Other steps reference this in onSuccess/onFailure and $steps.<stepId>.
    #
    # description: (string)
    #   One sentence: what this step does and why it belongs at this position.
    #
    # operationPath: (string)
    #   Points to a specific operation in one of the sourceDescriptions specs.
    #   Format:  '{$sourceDescriptions.<name>.url}#/paths/~1<encoded-path>/<method>'
    #   Encode each forward-slash in the path segment as ~1.
    #   Example: /treatments/discover (POST) → ~1treatments~1discover/post
    #
    # requestBody: (for POST / PUT / PATCH operations)
    #   contentType: application/json
    #   payload:
    #     <field>: $inputs.<inputField>              # value from workflow inputs
    #     <field>: $steps.<stepId>.outputs.<field>   # value from a prior step
    #
    # parameters: (for query / path / header params; use instead of or alongside requestBody)
    #   - name: <paramName>
    #     in: query   # or: path | header
    #     value: $inputs.<field>   # or $steps.<stepId>.outputs.<field>
    #
    # successCriteria: (list — ALL conditions must pass)
    #   - condition: $statusCode == 200
    #   # Add a domain check when a 200 can still mean no usable result:
    #   - condition: $response.body.<arrayField>.length > 0
    #     context: $response.body
    #     type: jsonpath
    #
    # outputs: (extract named fields — never write 'result: $response.body')
    #   <fieldName>: $response.body.<jsonPath>
    #   # Other steps read these as $steps.<stepId>.outputs.<fieldName>
    #   # Only extract fields that subsequent steps or the workflow outputs actually use.
    #
    # onSuccess: (what to do when all successCriteria pass)
    #   Intermediate step — go to the next step:
    #     - name: proceedTo<NextStepId>
    #       type: goto
    #       stepId: <nextStepId>
    #   Final step — end the workflow:
    #     - name: workflowComplete
    #       type: end
    #
    # onFailure: (handle every distinct failure mode — do not leave this empty)
    #   Transient server error → retry before giving up:
    #     - name: <label>
    #       type: retry
    #       retryAfter: 2        # seconds between attempts
    #       retryLimit: 3
    #       criteria:
    #         - condition: $statusCode >= 500
    #   Blocking client/business error → end with structured error output:
    #     - name: <label>
    #       type: end
    #       criteria:
    #         - condition: $statusCode >= 400
    #       outputs:
    #         error_code: '<SCREAMING_SNAKE_CASE_CODE>'
    #         error_message: '<human-readable explanation of what failed and what to do>'
    #   Non-fatal step (e.g. notification / audit at the end of the workflow):
    #     Use warning_* outputs instead of error_* so callers know the core
    #     booking / transaction that preceded this step is still confirmed:
    #     - name: <label>
    #       type: end
    #       criteria:
    #         - condition: $statusCode >= 400
    #       outputs:
    #         warning_code: '<SCREAMING_SNAKE_CASE_CODE>'
    #         warning_message: '<explanation — prior confirmed state is still valid>'
    # ────────────────────────────────────────────────────────────────────────
    steps: []

    # ── WORKFLOW-LEVEL OUTPUTS ───────────────────────────────────────────────
    # Expose the values callers need after the workflow completes.
    # Pull each field from whichever step produces it — not necessarily the last.
    # Include the most important identifiers, statuses, and user-facing values.
    # Format:  <outputName>: $steps.<stepId>.outputs.<fieldName>
    # ────────────────────────────────────────────────────────────────────────
    outputs: {}
`;
}

function generateArazzoSpec() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || '';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();
    const pathParts = window.location.pathname.split('/');
    const orgHandle = pathParts[1] || '';
    const viewName = pathParts[3] || 'default';

    const spec = buildArazzoSpec(name, description, apis, orgHandle, viewName);
    if (arazoEditor) {
        arazoEditor.setValue(spec);
    } else {
        const field = document.getElementById('arazoContent');
        if (field) field.value = spec;
    }
}

function loadArazzoFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const content = e.target.result;
        if (arazoEditor) {
            arazoEditor.setValue(content);
        } else {
            const field = document.getElementById('arazoContent');
            if (field) field.value = content;
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function loadMarkdownFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const field = document.getElementById('markdownContent');
        if (field) field.value = e.target.result;
    };
    reader.readAsText(file);
    event.target.value = '';
}

function copyArazzoSpec() {
    const content = arazoEditor ? arazoEditor.getValue() : (document.getElementById('arazoContent')?.value || '');
    navigator.clipboard.writeText(content).then(() => showAlert('Arazzo spec copied to clipboard', 'success'));
}

function copyMarkdown() {
    const content = document.getElementById('markdownContent')?.value || '';
    navigator.clipboard.writeText(content).then(() => showAlert('Markdown copied to clipboard', 'success'));
}

function generateMarkdownDoc() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || 'API Workflow';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();

    let markdownContent = `# ${name}\n\n`;
    if (description) {
        markdownContent += `${description}\n\n`;
    }

    if (apis.length > 0) {
        markdownContent += `## API Dependencies\n\n`;
        apis.forEach(api => {
            markdownContent += `- **${api.apiName}** (${api.apiType}): ${api.apiDescription || 'N/A'}\n`;
        });
        markdownContent += `\n`;
    }

    markdownContent += `## Workflow Steps\n\n`;
    markdownContent += `1. **Step Name**: Description of what this step does\n`;
    markdownContent += `2. **Another Step**: Details of subsequent steps\n\n`;
    markdownContent += `## Expected Outcomes\n\n`;
    markdownContent += `Describe what the successful execution of this workflow produces.\n`;

    const field = document.getElementById('markdownContent');
    if (field) field.value = markdownContent;
}

// ─────────────────────────────────────────────
// CodeMirror Editor
// ─────────────────────────────────────────────

function initCodeMirrorEditor() {
    const host = document.getElementById('arazoEditorHost');
    if (!host || !window.CodeMirror) return;

    arazoEditor = CodeMirror(host, {
        value: document.getElementById('arazoContent')?.value || '',
        mode: 'yaml',
        lineNumbers: true,
        tabSize: 2,
        indentWithTabs: false,
        lineWrapping: true,
        extraKeys: { 'Tab': cm => cm.execCommand('insertSoftTab') }
    });
    arazoEditor.setSize(null, '420px');
}

// ─────────────────────────────────────────────
// Section Collapse
// ─────────────────────────────────────────────

function initSectionCollapse() {
    document.querySelectorAll('[data-af-collapse]').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.af-section');
            const body = section?.querySelector('.af-section-body');
            const summary = section?.querySelector('.af-section-summary');
            const icon = btn.querySelector('i');
            if (!body) return;
            const isCollapsed = body.classList.contains('af-section-body--collapsed');
            body.classList.toggle('af-section-body--collapsed', !isCollapsed);
            if (summary) summary.classList.toggle('d-none', isCollapsed);
            if (icon) icon.className = isCollapsed ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
            // Refresh CodeMirror if it's in the newly expanded section
            if (isCollapsed && arazoEditor) arazoEditor.refresh();
        });
    });
}

function expandAllSections() {
    document.querySelectorAll('.af-section-body--collapsed').forEach(body => {
        body.classList.remove('af-section-body--collapsed');
    });
    document.querySelectorAll('.af-section-summary').forEach(s => s.classList.add('d-none'));
    document.querySelectorAll('[data-af-collapse] i').forEach(i => { i.className = 'bi bi-chevron-up'; });
}

// ─────────────────────────────────────────────
// Section Summaries
// ─────────────────────────────────────────────

function updateSectionSummaries() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || '';
    const vis = document.querySelector('input[name="apiFlowVisibility"]:checked')?.value || 'PUBLIC';
    const agentVis = document.querySelector('input[name="apiFlowAgentVisibility"]:checked')?.value || 'VISIBLE';
    const s1 = document.getElementById('af-summary-1');
    if (s1) {
        s1.textContent = name
            ? `${name} · ${vis.charAt(0) + vis.slice(1).toLowerCase()} · Agent ${agentVis.charAt(0) + agentVis.slice(1).toLowerCase()}`
            : 'Not configured';
    }

    const count = document.querySelectorAll('.api-flow-api-checkbox:checked').length;
    const s2 = document.getElementById('af-summary-2');
    if (s2) s2.textContent = `${count} API${count !== 1 ? 's' : ''} selected`;

    const ct = document.querySelector('input[name="apiFlowContentType"]:checked')?.value || 'ARAZZO';
    const s3 = document.getElementById('af-summary-3');
    if (s3) s3.textContent = ct === 'ARAZZO' ? 'Arazzo Spec' : 'Markdown';
}

// ─────────────────────────────────────────────
// Selected API Chips
// ─────────────────────────────────────────────

function updateApiChips() {
    const chips = document.getElementById('apiSelectedChips');
    if (!chips) return;
    const selected = [...document.querySelectorAll('.api-flow-api-checkbox:checked')];
    if (selected.length === 0) {
        chips.innerHTML = '<span class="text-muted small fst-italic">No APIs selected</span>';
    } else {
        chips.innerHTML = selected.map(cb =>
            `<span class="af-api-chip">${sanitizeInput(cb.dataset.apiName)}</span>`
        ).join('');
    }
}
