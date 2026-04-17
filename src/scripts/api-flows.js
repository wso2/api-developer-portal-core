/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// ─────────────────────────────────────────────
// Data Initialization
// ─────────────────────────────────────────────

let apiFlowsData = [];
let currentOrgID = '';
let currentViewName = '';
let csrfToken = '';

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

    // Arazzo buttons
    document.getElementById('generateArazzoBtn')?.addEventListener('click', generateArazzoSpec);
    document.getElementById('uploadArazzoBtn')?.addEventListener('click', () => {
        document.getElementById('arazoFileInput')?.click();
    });
    document.getElementById('copyArazzoBtn')?.addEventListener('click', copyArazzoSpec);
    document.getElementById('arazoFileInput')?.addEventListener('change', loadArazzoFile);

    // llms.txt buttons
    document.getElementById('uploadLlmsTxtBtn')?.addEventListener('click', () => {
        document.getElementById('llmsTxtFileInput')?.click();
    });
    document.getElementById('copyLlmsTxtBtn')?.addEventListener('click', copyLlmsTxt);
    document.getElementById('llmsTxtFileInput')?.addEventListener('change', loadLlmsTxtFile);

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

    // Attach listener to prompt modal copy button
    document.getElementById('copyPromptBtn')?.addEventListener('click', copyPrompt);

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
                    <p class="mb-0 af-api-card-desc">${sanitizeInput(cb.dataset.apiDescription || '')}</p>
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
    const data = (window.apiFlowsData || apiFlowsData || []).find(f => f.apiFlowId === apiFlowId);
    if (!data) return;
    document.getElementById('agentPromptFlowName').textContent = data.name;
    document.getElementById('agentPromptContent').textContent = data.agentPrompt || '';
    document.getElementById('copyPromptBtn').innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy';
    const modal = new bootstrap.Modal(document.getElementById('agentPromptModal'));
    modal.show();
}

function copyPrompt() {
    const content = document.getElementById('agentPromptContent').textContent;
    navigator.clipboard.writeText(content).then(() => {
        const btn = document.getElementById('copyPromptBtn');
        btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Copied!';
        setTimeout(() => { btn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy'; }, 2000);
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
