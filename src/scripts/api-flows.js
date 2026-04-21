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
let currentWorkflowPath = 'upload';
let currentContentType = 'ARAZZO';
let createPathFormat = 'arazzo'; // 'arazzo' | 'md'

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

    // Debounced prompt update on name/description change
    let promptDebounce;
    const debouncePromptUpdate = () => {
        clearTimeout(promptDebounce);
        promptDebounce = setTimeout(updatePromptFromForm, 600);
    };
    document.getElementById('apiFlowName')?.addEventListener('input', debouncePromptUpdate);
    document.getElementById('apiFlowDescription')?.addEventListener('input', debouncePromptUpdate);

    // Form action buttons
    document.getElementById('regeneratePromptBtn')?.addEventListener('click', regenerateAgentPrompt);
    document.getElementById('copyFieldPromptBtn')?.addEventListener('click', copyFieldPrompt);

    // Agent visibility radios
    document.querySelectorAll('input[name="apiFlowAgentVisibility"]').forEach(radio => {
        radio.addEventListener('change', () => {
            syncAgentPromptTab(radio.value === 'HIDDEN' && radio.checked);
            if (radio.value === 'VISIBLE' && radio.checked) {
                document.querySelectorAll('.api-flow-api-checkbox:checked').forEach(cb => {
                    if (cb.dataset.agentVisibility !== 'VISIBLE') cb.checked = false;
                });
            }
            renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
        });
    });

    document.getElementById('changeVisibilityBtn')?.addEventListener('click', () => {
        const agentVisSection = document.getElementById('agentVisibilityVisible')?.closest('.mb-1');
        agentVisSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('agentVisibilityVisible')?.focus();
    });

    // Arazzo editor buttons
    document.getElementById('generateArazzoBtn')?.addEventListener('click', generateArazzoSpec);
    document.getElementById('copyArazzoBtn')?.addEventListener('click', copyArazzoSpec);
    document.getElementById('copyMarkdownBtn')?.addEventListener('click', copyMarkdown);

    // Markdown word count
    document.getElementById('markdownContent')?.addEventListener('input', updateMarkdownWordCount);

    // Save buttons
    document.getElementById('saveApiFlowBtn')?.addEventListener('click', function() {
        saveApiFlow(currentOrgID, currentViewName, this.dataset.status);
    });
    document.getElementById('saveDraftBtn')?.addEventListener('click', function() {
        saveApiFlow(currentOrgID, currentViewName, this.dataset.status);
    });

    // List view action buttons
    document.querySelectorAll('.api-flow-view-prompt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openPromptModal(btn.dataset.apiFlowId);
        });
    });

    document.querySelectorAll('.api-flow-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openEditApiFlow(btn.dataset.apiFlowId);
        });
    });

    document.querySelectorAll('.api-flow-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openDeleteApiFlowModal(currentOrgID, currentViewName, btn.dataset.apiFlowId);
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

    // Show selected only toggle
    document.getElementById('showSelectedOnlyBtn')?.addEventListener('click', () => {
        showSelectedOnly = !showSelectedOnly;
        document.getElementById('showSelectedOnlyBtn')?.classList.toggle('af-show-selected-active', showSelectedOnly);
        renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
    });

    // Section summaries
    document.getElementById('apiFlowName')?.addEventListener('input', updateSectionSummaries);
    document.querySelectorAll('input[name="apiFlowVisibility"]').forEach(r => r.addEventListener('change', updateSectionSummaries));
    document.querySelectorAll('input[name="apiFlowAgentVisibility"]').forEach(r => r.addEventListener('change', updateSectionSummaries));

    initApiCardPicker();
    initCodeMirrorEditor();
    initSectionCollapse();
    initWorkflowPathChooser();
    initUploadZone();
    initCreateFormatToggle();
    initCreatePathButtons();
});

// ─────────────────────────────────────────────
// Workflow Path Chooser
// ─────────────────────────────────────────────

function initWorkflowPathChooser() {
    document.querySelectorAll('.af-path-card').forEach(card => {
        card.addEventListener('click', () => switchWorkflowPath(card.dataset.path));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchWorkflowPath(card.dataset.path); }
        });
    });
}

function switchWorkflowPath(path) {
    currentWorkflowPath = path;

    document.querySelectorAll('.af-path-card').forEach(card => {
        const isActive = card.dataset.path === path;
        card.classList.toggle('af-path-card--active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
    });

    const uploadContent = document.getElementById('uploadPathContent');
    const createContent = document.getElementById('createPathContent');
    uploadContent?.classList.toggle('d-none', path !== 'upload');
    createContent?.classList.toggle('d-none', path !== 'create');

    // In create path: honour the format toggle (createPathFormat owns currentContentType).
    // In upload path: show whichever editor matches the uploaded file type (or hide both).
    if (path === 'create') {
        switchCreateFormat(createPathFormat);
    } else {
        showUploadedContentEditor();
    }

    updateSectionSummaries();
}

// ─────────────────────────────────────────────
// Create Path Format Toggle (Arazzo / Markdown)
// ─────────────────────────────────────────────

function initCreateFormatToggle() {
    document.querySelectorAll('.af-create-format-btn').forEach(btn => {
        btn.addEventListener('click', () => switchCreateFormat(btn.dataset.format));
    });
}

function switchCreateFormat(format) {
    createPathFormat = format;
    currentContentType = format === 'markdown' ? 'MD' : 'ARAZZO';

    // Update toggle button active state
    document.querySelectorAll('.af-create-format-btn').forEach(btn => {
        btn.classList.toggle('af-create-format-btn--active', btn.dataset.format === format);
    });

    // Show/hide the right editor
    document.getElementById('apiFlowDefinitionWrapper')?.classList.toggle('d-none', format !== 'arazzo');
    document.getElementById('markdownContentWrapper')?.classList.toggle('d-none', format !== 'markdown');
    if (format === 'arazzo') setTimeout(() => arazoEditor?.refresh(), 50);

    // "Open in VS Code" only makes sense for Arazzo
    document.getElementById('openInVSCodeBtn')?.classList.toggle('d-none', format !== 'arazzo');

    // Update Generate Template button label
    const label = document.getElementById('generateTemplateBtnLabel');
    if (label) label.textContent = format === 'markdown' ? 'Generate Template' : 'Generate Template';

    updateSectionSummaries();
}

// ─────────────────────────────────────────────
// Upload Zone
// ─────────────────────────────────────────────

function initUploadZone() {
    const dropZone = document.getElementById('arazzoDropZone');
    const fileInput = document.getElementById('arazoFileInput');

    if (!dropZone) return;

    // Click to browse
    dropZone.addEventListener('click', () => fileInput?.click());
    document.getElementById('uploadBrowseBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput?.click();
    });
    dropZone.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput?.click(); }
    });

    // Drag events
    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        dropZone.classList.add('af-upload-zone--dragover');
    });
    dropZone.addEventListener('dragleave', e => {
        if (!dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('af-upload-zone--dragover');
        }
    });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('af-upload-zone--dragover');
        const file = e.dataTransfer?.files[0];
        if (file) processArazzoFile(file);
    });

    // File input change
    fileInput?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) processArazzoFile(file);
        e.target.value = '';
    });

    // Remove file
    document.getElementById('removeUploadBtn')?.addEventListener('click', clearUploadedFile);
}

function processArazzoFile(file) {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const validArazzo = ['.yaml', '.yml', '.json'];
    const validMd = ['.md'];

    if (!validArazzo.includes(ext) && !validMd.includes(ext)) {
        showAlert('Please upload a .yaml, .yml, .json, or .md file', 'error');
        return;
    }

    const isMarkdown = validMd.includes(ext);
    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;

        // Show file strip
        document.getElementById('uploadFileName').textContent = file.name;
        document.getElementById('uploadValidationPanel')?.classList.remove('d-none');
        document.getElementById('arazzoDropZone')?.classList.add('d-none');

        if (isMarkdown) {
            await handleMarkdownUpload(content);
        } else {
            await handleArazzoUpload(content);
        }

        updateSectionSummaries();
    };
    reader.readAsText(file);
}

async function handleArazzoUpload(content) {
    currentContentType = 'ARAZZO';

    // Load into CodeMirror
    if (arazoEditor) {
        arazoEditor.setValue(content);
    } else {
        const field = document.getElementById('apiFlowDefinition');
        if (field) field.value = content;
    }

    // Clear markdown
    document.getElementById('markdownContent').value = '';

    // Update type badge
    setUploadTypeBadge('arazzo');

    // Show/hide panels
    document.getElementById('sdValidationContainer')?.classList.remove('d-none');
    document.getElementById('mdSummaryPanel')?.classList.add('d-none');
    showUploadedContentEditor();

    await validateAndRenderSourceDescriptions(content);
}

async function handleMarkdownUpload(content) {
    currentContentType = 'MD';

    // Load into markdown textarea
    const mdField = document.getElementById('markdownContent');
    if (mdField) mdField.value = content;

    // Clear arazzo
    if (arazoEditor) arazoEditor.setValue('');
    const arazoField = document.getElementById('apiFlowDefinition');
    if (arazoField) arazoField.value = '';

    // Update type badge
    setUploadTypeBadge('markdown');

    // Show/hide panels
    document.getElementById('sdValidationContainer')?.classList.add('d-none');

    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const lineCount = content.split('\n').length;
    const mdSummary = document.getElementById('mdSummaryPanel');
    const mdSummaryText = document.getElementById('mdSummaryText');
    if (mdSummary && mdSummaryText) {
        mdSummaryText.textContent = `${wordCount.toLocaleString()} words · ${lineCount} lines`;
        mdSummary.classList.remove('d-none');
    }

    showUploadedContentEditor();
    updateMarkdownWordCount();
}

function setUploadTypeBadge(type) {
    const badge = document.getElementById('uploadTypeBadge');
    if (!badge) return;
    if (type === 'arazzo') {
        badge.textContent = 'Arazzo';
        badge.className = 'af-upload-type-badge af-upload-type-badge--arazzo';
    } else {
        badge.textContent = 'Markdown';
        badge.className = 'af-upload-type-badge af-upload-type-badge--md';
    }
}

function showUploadedContentEditor() {
    const arazoWrapper = document.getElementById('apiFlowDefinitionWrapper');
    const mdWrapper = document.getElementById('markdownContentWrapper');
    const hasArazzo = arazoEditor
        ? arazoEditor.getValue().trim().length > 0
        : (document.getElementById('apiFlowDefinition')?.value?.trim().length > 0);
    const hasMd = (document.getElementById('markdownContent')?.value?.trim().length > 0);

    if (currentContentType === 'MD' && hasMd) {
        arazoWrapper?.classList.add('d-none');
        mdWrapper?.classList.remove('d-none');
    } else if (currentContentType === 'ARAZZO' && hasArazzo) {
        mdWrapper?.classList.add('d-none');
        arazoWrapper?.classList.remove('d-none');
        setTimeout(() => arazoEditor?.refresh(), 50);
    } else {
        arazoWrapper?.classList.add('d-none');
        mdWrapper?.classList.add('d-none');
    }
}

function clearUploadedFile() {
    if (arazoEditor) arazoEditor.setValue('');
    const arazoField = document.getElementById('apiFlowDefinition');
    if (arazoField) arazoField.value = '';
    const mdField = document.getElementById('markdownContent');
    if (mdField) mdField.value = '';

    currentContentType = 'ARAZZO';

    document.getElementById('uploadValidationPanel')?.classList.add('d-none');
    document.getElementById('apiFlowDefinitionWrapper')?.classList.add('d-none');
    document.getElementById('markdownContentWrapper')?.classList.add('d-none');
    document.getElementById('arazzoDropZone')?.classList.remove('d-none');
    document.getElementById('sdValidationContainer')?.classList.add('d-none');
    document.getElementById('mdSummaryPanel')?.classList.add('d-none');
    if (document.getElementById('sdValidationItems')) document.getElementById('sdValidationItems').innerHTML = '';
    if (document.getElementById('sdValidationHint')) document.getElementById('sdValidationHint').textContent = '';
    updateSectionSummaries();
}

// ─────────────────────────────────────────────
// Source Description Validation
// ─────────────────────────────────────────────

async function validateAndRenderSourceDescriptions(specContent) {
    const hintEl = document.getElementById('sdValidationHint');
    const itemsEl = document.getElementById('sdValidationItems');
    if (!hintEl || !itemsEl) return;

    hintEl.textContent = '';
    itemsEl.innerHTML = '<div class="af-sd-item af-sd-item--loading"><span class="af-sd-checking-spinner"></span><span class="text-muted small">Validating source descriptions…</span></div>';

    let spec = null;
    try {
        spec = JSON.parse(specContent);
    } catch {
        if (window.jsyaml) {
            try { spec = window.jsyaml.load(specContent); } catch { /* invalid */ }
        }
    }

    if (!spec) {
        itemsEl.innerHTML = '<div class="af-sd-item"><span class="af-sd-status af-sd-status--invalid"><i class="bi bi-x-circle-fill me-1"></i>Parse error</span><span class="text-muted small ms-2">Could not parse file as Arazzo YAML/JSON</span></div>';
        return;
    }

    const sourceDeps = spec.sourceDescriptions;
    if (!Array.isArray(sourceDeps) || sourceDeps.length === 0) {
        itemsEl.innerHTML = '<div class="af-sd-item"><span class="text-muted small fst-italic">No source descriptions found in this spec</span></div>';
        hintEl.textContent = '(none)';
        return;
    }

    // Show loading state per item
    itemsEl.innerHTML = sourceDeps.map(sd => renderSdItem(sd.name, sd.url, sd.type, 'checking')).join('');

    // Validate all URLs in parallel
    const results = await Promise.all(sourceDeps.map(sd => checkSourceDescriptionUrl(sd)));

    // Render final results
    itemsEl.innerHTML = results.map(r => renderSdItem(r.name, r.url, r.type, r.status, r.statusCode)).join('');

    const validCount = results.filter(r => r.status === 'valid').length;
    const total = results.length;
    hintEl.textContent = `— ${validCount}/${total} valid`;
}

async function checkSourceDescriptionUrl(sd) {
    const result = { name: sd.name || 'unnamed', url: sd.url, type: sd.type, status: 'checking' };
    if (!sd.url) { result.status = 'missing'; return result; }
    try {
        const resp = await fetch(sd.url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: { 'Accept': 'application/json, application/yaml, text/yaml, */*' }
        });
        result.statusCode = resp.status;
        if (!resp.ok) {
            result.status = 'invalid';
            return result;
        }
        const text = await resp.text();
        result.status = isValidApiSpec(text) ? 'valid' : 'not-a-spec';
    } catch {
        result.status = 'unreachable';
    }
    return result;
}

function isValidApiSpec(text) {
    if (!text || !text.trim()) return false;
    // Try JSON first
    try {
        const obj = JSON.parse(text);
        return !!(obj && (obj.openapi || obj.swagger || obj.asyncapi || obj.arazzo));
    } catch { /* not JSON */ }
    // Try YAML
    if (window.jsyaml) {
        try {
            const obj = window.jsyaml.load(text);
            return !!(obj && (obj.openapi || obj.swagger || obj.asyncapi || obj.arazzo));
        } catch { /* not YAML */ }
    }
    // Last resort: raw text heuristic (avoids HTML pages slipping through)
    return /^\s*(openapi|swagger|asyncapi|arazzo)\s*:/im.test(text);
}

function renderSdItem(name, url, type, status, statusCode) {
    const statusMap = {
        checking:     { cls: 'af-sd-status--checking',     icon: 'bi-hourglass-split',         label: 'Checking…' },
        valid:        { cls: 'af-sd-status--valid',         icon: 'bi-check-circle-fill',       label: statusCode ? `${statusCode} · Valid spec` : 'Valid spec' },
        invalid:      { cls: 'af-sd-status--invalid',       icon: 'bi-x-circle-fill',           label: statusCode ? `${statusCode} Error` : 'Error' },
        'not-a-spec': { cls: 'af-sd-status--not-a-spec',    icon: 'bi-file-earmark-x',          label: 'Not an API spec' },
        unreachable:  { cls: 'af-sd-status--unreachable',   icon: 'bi-wifi-off',                label: 'Unreachable' },
        missing:      { cls: 'af-sd-status--invalid',       icon: 'bi-exclamation-circle-fill', label: 'No URL' },
    };
    const s = statusMap[status] || statusMap.checking;
    const typeBadge = type ? `<span class="api-flow-type-pill ms-1">${sanitizeInput(type)}</span>` : '';
    const urlText = url ? `<span class="af-sd-item-url">${sanitizeInput(url)}</span>` : '<span class="af-sd-item-url text-muted">No URL defined</span>';
    return `
        <div class="af-sd-item">
            <span class="af-sd-status ${s.cls}"><i class="bi ${s.icon} me-1"></i>${s.label}</span>
            <div class="af-sd-item-meta">
                <span class="af-sd-item-name">${sanitizeInput(name)}${typeBadge}</span>
                ${urlText}
            </div>
        </div>`;
}

// ─────────────────────────────────────────────
// Create Path Buttons
// ─────────────────────────────────────────────

function initCreatePathButtons() {
    document.getElementById('generateWithClaudeBtn')?.addEventListener('click', generateWithClaude);
    document.getElementById('openInVSCodeBtn')?.addEventListener('click', openInVSCode);
}

function generateWithClaude() {
    if (createPathFormat === 'markdown') {
        generateMarkdownWithClaude();
    } else {
        generateArazzoWithClaude();
    }
}

function generateArazzoWithClaude() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || 'API Workflow';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();

    const apiList = apis.length > 0
        ? apis.map(a => `- **${a.apiName}** (${a.apiType || 'REST'}): ${a.apiDescription || 'No description provided'}`).join('\n')
        : '*(No APIs selected)*';

    const pathParts = window.location.pathname.split('/');
    const orgHandle = pathParts[1] || '';
    const viewName = pathParts[3] || 'default';

    const sourceDescSnippet = apis.length > 0
        ? apis.map(a => {
            const url = `${window.location.origin}/${orgHandle}/views/${viewName}/api/${a.apiHandle}/docs/specification.json`;
            return `  - name: ${a.apiHandle || 'api'}\n    url: '${url}'\n    type: openapi`;
        }).join('\n')
        : '  # Add your API OpenAPI spec URLs here';

    const prompt = `Please write a complete Arazzo 1.0.0 workflow specification for the following use case:

**Workflow Name:** ${name}
**Description:** ${description}

**Available APIs:**
${apiList}

Generate a valid Arazzo 1.0.0 YAML spec that:
1. Uses the correct \`arazzo: '1.0.0'\` header
2. Includes \`sourceDescriptions\` pointing to the OpenAPI specs:
\`\`\`yaml
sourceDescriptions:
${sourceDescSnippet}
\`\`\`
3. Defines a \`workflows\` array with a single workflow containing well-structured \`steps\`
4. Each step must have: \`stepId\`, \`description\`, \`operationPath\`, \`successCriteria\`, \`outputs\`, \`onSuccess\`, \`onFailure\`
5. Includes proper \`inputs\` with required fields derived from the APIs
6. Includes \`outputs\` at the workflow level

Return ONLY the YAML, no prose explanation.`;

    window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank');
}

function generateMarkdownWithClaude() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || 'API Workflow';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();

    const apiList = apis.length > 0
        ? apis.map(a => `- **${a.apiName}** (${a.apiType || 'REST'}): ${a.apiDescription || 'No description provided'}`).join('\n')
        : '*(No APIs selected)*';

    const prompt = `Please write a natural-language workflow description in Markdown for the following use case:

**Workflow Name:** ${name}
**Description:** ${description}

**APIs involved:**
${apiList}

Write a clear, well-structured Markdown document that:
1. Opens with a brief summary of what the workflow does and why
2. Lists the APIs used with a one-line explanation of each
3. Describes every step in plain English — what API is called, what data is passed, what comes back, and why it's needed
4. Explains what a successful run produces
5. Covers error scenarios in a simple table: what can go wrong and what happens

Use Markdown formatting (headers, numbered lists, tables, bold for emphasis). Write for a developer who needs to understand the flow at a glance. Return ONLY the Markdown, no extra commentary.`;

    window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank');
}

async function openInVSCode() {
    if (createPathFormat === 'markdown') return; // button is hidden in markdown mode

    generateArazzoSpec();

    const content = arazoEditor ? arazoEditor.getValue() : (document.getElementById('apiFlowDefinition')?.value || '');
    if (!content.trim()) {
        showAlert('Generate a template first or select some APIs', 'warning');
        return;
    }

    const name = document.getElementById('apiFlowName')?.value?.trim() || 'workflow';
    const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.arazzo.yaml';

    const btn = document.getElementById('openInVSCodeBtn');
    const originalHtml = btn?.innerHTML;
    if (btn) btn.innerHTML = '<span class="af-sd-checking-spinner"></span> Opening…';

    try {
        const res = await fetch('/devportal/temp-arazzo-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
            body: JSON.stringify({ content, filename }),
            credentials: 'same-origin'
        });

        if (!res.ok) throw new Error('Server error');
        const { path: filePath } = await res.json();

        // Use vscode:// URI to open the file directly in VS Code
        const vscodeUri = `vscode://file/${filePath}`;
        const anchor = document.createElement('a');
        anchor.href = vscodeUri;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

    } catch {
        // Fallback: download the file
        const blob = new Blob([content], { type: 'application/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showAlert(`VS Code not detected — "${filename}" downloaded instead`, 'info');
    } finally {
        if (btn && originalHtml) btn.innerHTML = originalHtml;
    }
}

// ─────────────────────────────────────────────
// Form state helpers
// ─────────────────────────────────────────────

function resetApiFlowForm() {
    document.getElementById('editingApiFlowId').value = '';
    document.getElementById('apiFlowName').value = '';
    document.getElementById('apiFlowDescription').value = '';
    document.getElementById('apiFlowDefinition').value = '';
    document.getElementById('markdownContent').value = '';
    document.getElementById('agentPromptField').value = '';
    currentContentType = 'ARAZZO';
    createPathFormat = 'arazzo';

    if (arazoEditor) arazoEditor.setValue('');

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

    // Reset to upload path and arazzo create format
    clearUploadedFile();
    switchWorkflowPath('upload');
    switchCreateFormat('arazzo');
}

function syncAgentPromptTab(isHidden) {
    const hiddenIcon = document.getElementById('tabVisualHiddenIcon');
    const banner = document.getElementById('agentHiddenBanner');

    if (isHidden) {
        hiddenIcon?.classList.remove('d-none');
        if (banner) {
            banner.classList.remove('d-none', 'af-banner-fade-out');
            banner.classList.add('af-banner-fade-in');
        }
    } else {
        hiddenIcon?.classList.add('d-none');
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
    searchEl.addEventListener('input', () => renderApiCards(searchEl.value.trim()));
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

    const workflowVisibleToAgents = document.querySelector('input[name="apiFlowAgentVisibility"]:checked')?.value === 'VISIBLE';

    grid.innerHTML = filtered.map(cb => {
        const isSelected = cb.checked;
        const isAgentReady = cb.dataset.agentVisibility === 'VISIBLE';
        const isDisabled = workflowVisibleToAgents && !isAgentReady;
        const desc = sanitizeInput(cb.dataset.apiDescription || '');
        const agentBadge = isAgentReady
            ? `<span class="af-api-agent-badge af-api-agent-badge--ready" title="Agent ready"><i class="bi bi-robot"></i></span>`
            : `<span class="af-api-agent-badge af-api-agent-badge--not-ready" title="Not agent ready"><i class="bi bi-robot"></i></span>`;
        return `
            <div class="af-api-card${isSelected ? ' af-api-card--selected' : ''}${isDisabled ? ' af-api-card--disabled' : ''}"
                 data-api-id="${cb.value}" role="button" tabindex="${isDisabled ? -1 : 0}"
                 aria-pressed="${isSelected}" aria-disabled="${isDisabled}"
                 title="${isDisabled ? 'This API is not agent ready and cannot be selected for an agent-visible workflow' : desc}">
                <div class="af-api-card-check">
                    <i class="bi ${isSelected ? 'bi-check-circle-fill' : 'bi-circle'}"></i>
                </div>
                <div class="af-api-card-body">
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <span class="fw-semibold small">${sanitizeInput(cb.dataset.apiName)}</span>
                        <span class="api-flow-type-pill">${sanitizeInput(cb.dataset.apiType || '')}</span>
                        ${agentBadge}
                    </div>
                    <p class="mb-0 af-api-card-desc">${desc}</p>
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.af-api-card').forEach(card => {
        function toggle() {
            const cb = document.querySelector(`.api-flow-api-checkbox[value="${card.dataset.apiId}"]`);
            if (!cb || card.classList.contains('af-api-card--disabled')) return;
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
    el.textContent = count === 0 ? 'No APIs selected' : count === 1 ? '1 API selected' : `${count} APIs selected`;
}

function setPickerSelection(apiIds) {
    document.querySelectorAll('.api-flow-api-checkbox').forEach(cb => {
        cb.checked = apiIds.includes(cb.value);
    });
    renderApiCards(document.getElementById('apiCardSearch')?.value.trim() || '');
}

// ─────────────────────────────────────────────
// Agent Prompt Generation
// ─────────────────────────────────────────────

async function updatePromptFromForm() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || '';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1] || '';
    const viewName = pathParts[3] || 'default';
    const editingId = document.getElementById('editingApiFlowId')?.value || '';
    const editingFlow = editingId ? (window.apiFlowsData || []).find(f => String(f.apiFlowId) === String(editingId)) : null;
    const handle = editingFlow?.handle || generateHandle(name);

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
    if (arazoEditor) {
        document.getElementById('apiFlowDefinition').value = arazoEditor.getValue();
    }

    const name = document.getElementById('apiFlowName').value.trim();
    const description = document.getElementById('apiFlowDescription').value.trim();
    const agentPrompt = document.getElementById('agentPromptField').value.trim();
    const contentType = currentContentType || 'ARAZZO';
    const apiFlowDefinition = contentType === 'ARAZZO' ? document.getElementById('apiFlowDefinition').value.trim() : '';
    const markdownContent = contentType === 'MD' ? document.getElementById('markdownContent').value.trim() : '';
    const apiFlowId = document.getElementById('editingApiFlowId').value;
    const agentVisibility = document.querySelector('input[name="apiFlowAgentVisibility"]:checked')?.value || 'VISIBLE';
    let valid = true;
    const fieldsToValidate = [
        ['apiFlowName', name],
        ['apiFlowDescription', description],
    ];
    if (agentVisibility !== 'HIDDEN') fieldsToValidate.push(['agentPromptField', agentPrompt]);
    if (contentType === 'ARAZZO') fieldsToValidate.push(['apiFlowDefinition', apiFlowDefinition]);
    if (contentType === 'MD') fieldsToValidate.push(['markdownContent', markdownContent]);

    fieldsToValidate.forEach(([id, val]) => {
        if (id === 'apiFlowDefinition' && arazoEditor) {
            const host = document.getElementById('arazoEditorHost');
            const feedback = document.getElementById('apiFlowDefinitionInvalid');
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
    const payload = { name, handle, description, agentPrompt, status, visibility, agentVisibility, contentType, apiFlowDefinition, markdownContent };
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
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
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
        headers: { 'X-CSRF-Token': csrfToken },
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

    currentContentType = data.contentType || 'ARAZZO';
    createPathFormat = currentContentType === 'MD' ? 'markdown' : 'arazzo';

    const arazoVal = data.apiFlowDefinition || '';
    document.getElementById('apiFlowDefinition').value = arazoVal;
    if (arazoEditor) arazoEditor.setValue(arazoVal);

    const mdVal = data.markdownContent || '';
    document.getElementById('markdownContent').value = mdVal;
    updateMarkdownWordCount();

    document.getElementById('agentPromptField').value = data.agentPrompt || '';
    setSaveButtonMode('edit', data.status);

    const visibilityRadio = document.querySelector(`input[name="apiFlowVisibility"][value="${data.visibility || 'PUBLIC'}"]`);
    if (visibilityRadio) visibilityRadio.checked = true;
    const agentVisibilityRadio = document.querySelector(`input[name="apiFlowAgentVisibility"][value="${data.agentVisibility || 'VISIBLE'}"]`);
    if (agentVisibilityRadio) agentVisibilityRadio.checked = true;
    syncAgentPromptTab(data.agentVisibility === 'HIDDEN');

    setPickerSelection((data.apis || []).map(a => a.apiId));

    // In edit mode use "Create from Template" path so APIs + editor are visible,
    // but honour the stored content type when deciding which editor to show.
    switchWorkflowPath('create');
    switchCreateFormat(createPathFormat);

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
    if (copyIcon) copyIcon.className = 'bi bi-copy';
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
// Arazzo Spec Generation (from selected APIs)
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
        const apiName = api.apiName || api.API_NAME || '';
        const sdName = apiName || handle || 'api-' + (apis.indexOf(api) + 1);
        return `  - name: '${sdName.replace(/'/g, "''")}'\n    url: '${url}'\n    type: openapi`;
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
    inputs:
      type: object
      properties: {}

    # ── STEPS ───────────────────────────────────────────────────────────────
    # Read the specs, determine execution order, write one step per API operation.
    steps: []

    # ── WORKFLOW-LEVEL OUTPUTS ───────────────────────────────────────────────
    outputs: {}
`;
}

function generateArazzoSpec() {
    if (createPathFormat === 'markdown') {
        generateMarkdownTemplate();
        return;
    }

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
        const field = document.getElementById('apiFlowDefinition');
        if (field) field.value = spec;
    }

    document.getElementById('apiFlowDefinitionWrapper')?.classList.remove('d-none');
    setTimeout(() => arazoEditor?.refresh(), 50);
}

function generateMarkdownTemplate() {
    const name = document.getElementById('apiFlowName')?.value?.trim() || 'My Workflow';
    const description = document.getElementById('apiFlowDescription')?.value?.trim() || '';
    const apis = getSelectedAPIs();

    const apiSection = apis.length > 0
        ? apis.map(a => `- **${a.apiName}**${a.apiType ? ` (${a.apiType})` : ''}: ${a.apiDescription || 'No description'}`).join('\n')
        : '_No APIs selected yet — add them above._';

    const template = `# ${name}

${description || '_Add a description for this workflow._'}

## APIs Used

${apiSection}

## Trigger

_Describe what initiates this workflow — a user action, a scheduled event, a webhook, etc._

## Steps

1. **Step name** — Describe the first API call: what is sent, what is returned, and why it comes first.
2. **Step name** — Describe the next call. Reference outputs from the previous step where relevant.
3. **Step name** — Continue for each distinct operation in the workflow.

## Success Outcome

_Describe what a successful execution produces for the caller._

## Error Handling

| Scenario | Behaviour |
|---|---|
| _e.g. Authentication fails_ | _Return 401, abort workflow_ |
| _e.g. Resource not found_ | _Return 404 with error detail_ |
`;

    const mdField = document.getElementById('markdownContent');
    if (mdField) {
        mdField.value = template;
        updateMarkdownWordCount();
    }

    document.getElementById('markdownContentWrapper')?.classList.remove('d-none');
}

function copyArazzoSpec() {
    const content = arazoEditor ? arazoEditor.getValue() : (document.getElementById('apiFlowDefinition')?.value || '');
    navigator.clipboard.writeText(content).then(() => showAlert('Arazzo spec copied to clipboard', 'success'));
}

// ─────────────────────────────────────────────
// CodeMirror Editor
// ─────────────────────────────────────────────

function initCodeMirrorEditor() {
    const host = document.getElementById('arazoEditorHost');
    if (!host || !window.CodeMirror) return;

    arazoEditor = CodeMirror(host, {
        value: document.getElementById('apiFlowDefinition')?.value || '',
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

    const s2 = document.getElementById('af-summary-2');
    if (s2) {
        const hasArazzo = arazoEditor
            ? arazoEditor.getValue().trim().length > 0
            : (document.getElementById('apiFlowDefinition')?.value?.trim().length > 0);
        const hasMd = (document.getElementById('markdownContent')?.value?.trim().length > 0);
        const hasContent = currentContentType === 'MD' ? hasMd : hasArazzo;
        const fmtLabel = currentContentType === 'MD' ? 'Markdown' : 'Arazzo';
        const pathLabel = currentWorkflowPath === 'upload' ? 'Upload' : 'Template';
        s2.textContent = hasContent ? `${pathLabel} · ${fmtLabel} loaded` : pathLabel;
    }

    const agentPrompt = document.getElementById('agentPromptField')?.value?.trim();
    const s3 = document.getElementById('af-summary-3');
    if (s3) s3.textContent = agentPrompt ? 'Prompt ready' : 'Not generated';
}

// ─────────────────────────────────────────────
// Selected API Chips
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Markdown Helpers
// ─────────────────────────────────────────────

function copyMarkdown() {
    const content = document.getElementById('markdownContent')?.value || '';
    navigator.clipboard.writeText(content).then(() => showAlert('Copied to clipboard', 'success'));
}

function updateMarkdownWordCount() {
    const field = document.getElementById('markdownContent');
    const counter = document.getElementById('mdWordCount');
    if (!field || !counter) return;
    const words = field.value.trim().split(/\s+/).filter(Boolean).length;
    counter.textContent = words > 0 ? `${words.toLocaleString()} words` : '';
}

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
