/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

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

    initApiCardPicker();
});

// ─────────────────────────────────────────────
// Form state helpers
// ─────────────────────────────────────────────

function resetApiFlowForm() {
    document.getElementById('editingApiFlowId').value = '';
    document.getElementById('apiFlowName').value = '';
    document.getElementById('apiFlowDescription').value = '';
    document.getElementById('arazoContent').value = '';
    document.getElementById('llmsTxtContent').value = '';
    document.getElementById('agentPromptField').value = '';

    const arazzoBtn = document.getElementById('contentTypeArazzo');
    if (arazzoBtn) arazzoBtn.checked = true;
    onContentTypeChange(); // resets d-none classes

    setPickerSelection([]);
    setSaveButtonMode('create');
}

function onContentTypeChange() {
    const selected = document.querySelector('input[name="apiFlowContentType"]:checked')?.value || 'ARAZZO';
    document.getElementById('arazoContentWrapper')?.classList.toggle('d-none', selected !== 'ARAZZO');
    document.getElementById('llmsTxtContentWrapper')?.classList.toggle('d-none', selected !== 'LLMS_TXT');
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
        return `
            <div class="af-api-card${isSelected ? ' af-api-card--selected' : ''}"
                 data-api-id="${cb.value}" role="button" tabindex="0"
                 aria-pressed="${isSelected}">
                <div class="af-api-card-check">
                    <i class="bi ${isSelected ? 'bi-check-circle-fill' : 'bi-circle'}"></i>
                </div>
                <div class="af-api-card-body">
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <span class="fw-semibold small">${sanitizeInput(cb.dataset.apiName)}</span>
                        <span class="api-flow-type-pill">${sanitizeInput(cb.dataset.apiType || '')}</span>
                    </div>
                    <p class="text-muted mb-0 af-api-card-desc">${sanitizeInput(cb.dataset.apiDescription || '')}</p>
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
// Agent Prompt Generation (client-side mirror)
// ─────────────────────────────────────────────

function buildAgentPrompt(name, description, apis, orgHandle, viewName = 'default') {
    if (!name && !description) return '';

    const apiSections = apis.map((api, i) => {
        const handle = api.apiHandle || api.API_HANDLE || '';
        const specPath = orgHandle
            ? `/${orgHandle}/views/${viewName}/api/${handle}/docs/specification.json`
            : `/views/${viewName}/api/${handle}/docs/specification.json`;
        return `### ${i + 1}. ${api.apiName || api.API_NAME}
- **Type**: ${api.apiType || api.API_TYPE || 'REST'}
- **Base URL**: ${api.productionUrl || api.PRODUCTION_URL || '(not set)'}
- **Description**: ${api.apiDescription || api.API_DESCRIPTION || '(no description)'}
- **Specification**: ${specPath}`;
    }).join('\n\n');

    const apiListForConstraints = apis.map(a => `"${a.apiName || a.API_NAME}"`).join(', ');

    const apiCapabilities = apis.map(api => {
        const name = api.apiName || api.API_NAME;
        const type = api.apiType || api.API_TYPE || 'REST';
        const baseUrl = api.productionUrl || api.PRODUCTION_URL || '(not set)';
        const desc = api.apiDescription || api.API_DESCRIPTION || '(no description)';
        return `- **${name}** (${type}): ${desc}\n  Base URL: ${baseUrl}`;
    }).join('\n');

    const section1 = `You are an API orchestration agent executing the "${name}" flow.

## Objective
${description}

## Available APIs
${apiSections || '_(No APIs assigned to this flow yet)_'}

## Execution Instructions
1. Read the specification of each API listed above before calling any endpoint.
2. Execute API operations in the sequence required to fulfill the objective.
3. Extract outputs from each step's response and pass them as inputs to subsequent steps.
4. Validate each HTTP response (expect 2xx) before proceeding to the next step.
5. If a step returns an error, log the step ID, status code, and response body, then stop execution.
6. On successful completion, return a structured summary of all executed steps, their inputs, and outputs.

## Constraints
- Only call APIs listed in the **Available APIs** section above: ${apiListForConstraints || 'none assigned'}.
- Always include required authentication headers as specified in each API's security scheme.
- Do not retry a failed request more than 3 times before reporting a failure.
- Never expose raw credentials or tokens in the final output summary.
- Treat all 4xx responses as non-retryable errors unless the API specification explicitly states otherwise.`;

    const section2 = `You are a software development agent helping a developer build an application
that implements the "${name}" workflow.

## Use Case Overview
${description}

## Available APIs & Capabilities
${apiCapabilities || '_(No APIs assigned to this flow yet)_'}

## Architecture Guidance
- Structure the application as a service layer that wraps each API's operations.
- Expose a single orchestration function that runs the full "${name}" workflow.
- Handle async/await patterns for all HTTP calls; do not mix callbacks and promises.
- Use environment variables for all base URLs and credentials — never hardcode them.

## Code Scaffolding
- For each API, create a dedicated client module (e.g., \`apiClient.js\`).
- Each client module should expose typed functions matching the operations used in this flow.
- The orchestration layer calls client modules in order and passes outputs between steps.
- Suggested HTTP client: fetch (Node ≥18), axios, or the SDK provided by the API vendor.

## Authentication & Security
- Load credentials from environment variables at startup and fail fast if missing.
- Pass auth tokens in headers (Authorization: Bearer <token>) as specified in each API's security scheme.
- Do not log credentials, tokens, or sensitive response fields.
- For OAuth APIs, implement token refresh logic before the orchestration starts.
- Scope access: request only the permissions required for the operations in this flow.`;

    return `${'━'.repeat(48)}
SECTION 1 — API Execution Agent
${'━'.repeat(48)}

${section1}

${'━'.repeat(48)}
SECTION 2 — App Builder Agent
${'━'.repeat(48)}

${section2}`;
}

function updatePromptFromForm() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || '';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();
    // Derive orgHandle and viewName from URL: /:orgName/views/:viewName/configure
    const pathParts = window.location.pathname.split('/');
    const orgHandle = pathParts[1] || '';
    const viewName = pathParts[3] || 'default';
    const prompt = buildAgentPrompt(name, description, apis, orgHandle, viewName);
    const promptField = document.getElementById('agentPromptField');
    if (promptField) promptField.value = prompt;
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
    const name = document.getElementById('apiFlowName').value.trim();
    const description = document.getElementById('apiFlowDescription').value.trim();
    const agentPrompt = document.getElementById('agentPromptField').value.trim();
    const contentType = document.querySelector('input[name="apiFlowContentType"]:checked')?.value || 'ARAZZO';
    const arazoContent = contentType === 'ARAZZO' ? document.getElementById('arazoContent').value.trim() : '';
    const llmsTxtContent = contentType === 'LLMS_TXT' ? document.getElementById('llmsTxtContent').value.trim() : '';
    const apiFlowId = document.getElementById('editingApiFlowId').value;
    const selectedAPIs = getSelectedAPIs();
    const apiIds = selectedAPIs.map(a => a.apiId);

    // Validation
    let valid = true;
    const fieldsToValidate = [
        ['apiFlowName', name],
        ['apiFlowDescription', description],
        ['agentPromptField', agentPrompt]
    ];
    if (contentType === 'ARAZZO') fieldsToValidate.push(['arazoContent', arazoContent]);
    fieldsToValidate.forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (!val) {
            el.classList.add('is-invalid');
            valid = false;
        } else {
            el.classList.remove('is-invalid');
        }
    });
    if (!valid) return;

    const handle = generateHandle(name);
    const payload = { name, handle, description, agentPrompt, status, contentType, arazoContent, llmsTxtContent, apiIds };
    const isEdit = !!apiFlowId;
    const url = isEdit
        ? `/devportal/organizations/${orgID}/views/${viewName}/api-flows/${apiFlowId}`
        : `/devportal/organizations/${orgID}/views/${viewName}/api-flows`;
    const method = isEdit ? 'PUT' : 'POST';

    const groupBtns = document.querySelectorAll('#saveApiFlowGroup button');
    const mainBtn = document.getElementById('saveApiFlowBtn');
    groupBtns.forEach(b => b.disabled = true);
    mainBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Saving…';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
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
}

// ─────────────────────────────────────────────
// Delete
// ─────────────────────────────────────────────

async function deleteApiFlow(orgID, viewName, apiFlowId) {
    const response = await fetch(`/devportal/organizations/${orgID}/views/${viewName}/api-flows/${apiFlowId}`, {
        method: 'DELETE',
        credentials: 'same-origin'
    });
    if (response.ok) {
        window.location.reload();
    } else {
        showAlert('Failed to delete API Flow', 'error');
    }
}

// ─────────────────────────────────────────────
// Edit — pre-fill form from existing data
// ─────────────────────────────────────────────

function openEditApiFlow(apiFlowId) {
    const data = (window.apiFlowsData || []).find(f => f.apiFlowId === apiFlowId);
    if (!data) return;
    resetApiFlowForm();
    document.getElementById('apiFlowFormTitle').textContent = 'Edit API Flow';
    document.getElementById('editingApiFlowId').value = apiFlowId;
    document.getElementById('apiFlowName').value = data.name || '';
    document.getElementById('apiFlowDescription').value = data.description || '';
    document.getElementById('arazoContent').value = data.arazoContent || '';
    document.getElementById('llmsTxtContent').value = data.llmsTxtContent || '';
    document.getElementById('agentPromptField').value = data.agentPrompt || '';
    setSaveButtonMode('edit', data.status);

    const contentType = data.contentType || 'ARAZZO';
    const radioBtn = document.querySelector(`input[name="apiFlowContentType"][value="${contentType}"]`);
    if (radioBtn && !radioBtn.disabled) radioBtn.checked = true;
    onContentTypeChange();

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
    const data = (window.apiFlowsData || []).find(f => f.apiFlowId === apiFlowId);
    if (!data) return;
    document.getElementById('agentPromptFlowName').textContent = data.name;
    document.getElementById('agentPromptContent').textContent = data.agentPrompt || '';
    document.getElementById('copyPromptBtn').innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy';
    const modal = new bootstrap.Modal(document.getElementById('agentPromptModal'));
    modal.show();
}

function copyAgentPrompt() {
    const content = document.getElementById('agentPromptContent').textContent;
    navigator.clipboard.writeText(content).then(() => {
        const btn = document.getElementById('copyPromptBtn');
        btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy';
        }, 2000);
    });
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

    const steps = apis.length > 0
        ? apis.map((api, i) => {
            const handle = api.apiHandle || api.API_HANDLE || `api-${i + 1}`;
            return `      - stepId: step-${i + 1}\n        description: 'TODO — call ${api.apiName || api.API_NAME || handle}'\n        operationPath: '{$sourceDescriptions.${handle}.url}#/paths/~1your-endpoint/get'\n        successCriteria:\n          - condition: $statusCode == 200\n        outputs:\n          result: $response.body`;
        }).join('\n')
        : `      - stepId: step-1\n        description: 'TODO — describe this step'\n        operationPath: '{$sourceDescriptions.api.url}#/paths/~1your-endpoint/get'\n        successCriteria:\n          - condition: $statusCode == 200`;

    return `arazzo: '1.0.0'
info:
  title: '${(name || 'My Flow').replace(/'/g, "''")}'
  version: 1.0.0
  description: '${(description || '').replace(/'/g, "''")}'
${apis.length > 0 ? 'sourceDescriptions:\n' + sourceDescriptions : 'sourceDescriptions: []'}
workflows:
  - workflowId: ${slug}
    summary: '${(description || '').replace(/'/g, "''").slice(0, 80)}'
    inputs:
      type: object
      properties: {}
    steps:
${steps}
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
    const field = document.getElementById('arazoContent');
    if (field) field.value = spec;
}

function loadArazzoFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const field = document.getElementById('arazoContent');
        if (field) field.value = e.target.result;
    };
    reader.readAsText(file);
    event.target.value = '';
}

function loadLlmsTxtFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const field = document.getElementById('llmsTxtContent');
        if (field) field.value = e.target.result;
    };
    reader.readAsText(file);
    event.target.value = '';
}

function copyArazzoSpec() {
    const content = document.getElementById('arazoContent')?.value || '';
    navigator.clipboard.writeText(content).then(() => showAlert('Arazzo spec copied to clipboard', 'success'));
}

function copyLlmsTxt() {
    const content = document.getElementById('llmsTxtContent')?.value || '';
    navigator.clipboard.writeText(content).then(() => showAlert('llms.txt copied to clipboard', 'success'));
}
