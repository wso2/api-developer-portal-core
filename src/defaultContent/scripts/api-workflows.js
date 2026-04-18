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

let apiFlowsData = [];

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
}

function getOrgAndViewFromURL() {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const orgName = pathParts[0];
    const viewName = pathParts[2];
    return { orgName, viewName };
}

function openAgentPromptModal(handle, flowName) {
    const flow = apiFlowsData.find(f => f.handle === handle);
    if (!flow || !flow.agentPrompt) {
        showNotification('No prompt available for this workflow.', 'error');
        return;
    }
    showPromptModal(flowName, flow.agentPrompt);
}

function showPromptModal(flowName, prompt) {
    const modal = document.getElementById('promptModal');
    document.getElementById('promptFlowName').textContent = flowName;
    document.getElementById('promptText').textContent = prompt;
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closePromptModal() {
    const modal = document.getElementById('promptModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.getElementById('runDropdownMenu').classList.remove('show');
}

async function copyPromptFromModal() {
    try {
        const promptText = document.getElementById('promptText').textContent;
        await navigator.clipboard.writeText(promptText);
        const btn = document.getElementById('btnCopyPrompt');
        const icon = btn.querySelector('i');
        icon.className = 'bi bi-clipboard-check';
        setTimeout(() => { icon.className = 'bi bi-clipboard'; }, 2000);
    } catch (error) {
        showNotification('Error copying prompt', 'error');
    }
}

function downloadPrompt() {
    const promptText = document.getElementById('promptText').textContent;
    const flowName = document.getElementById('promptFlowName').textContent || 'agent-prompt';
    const blob = new Blob([promptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = flowName.toLowerCase().replace(/\s+/g, '-') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function toggleRunDropdown(event) {
    event.stopPropagation();
    document.getElementById('runDropdownMenu').classList.toggle('show');
}

function runInClaude() {
    const prompt = document.getElementById('promptText').textContent;
    window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank');
    document.getElementById('runDropdownMenu').classList.remove('show');
}

function runInChatGPT() {
    const prompt = document.getElementById('promptText').textContent;
    window.open('https://chatgpt.com/?prompt=' + encodeURIComponent(prompt), '_blank');
    document.getElementById('runDropdownMenu').classList.remove('show');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const content = document.createElement('div');
    content.className = 'notification-content';

    const icon = document.createElement('i');
    icon.className = `bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}`;

    const text = document.createElement('span');
    text.textContent = message;

    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    document.body.appendChild(notification);

    setTimeout(() => { notification.classList.add('show'); }, 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => { notification.remove(); }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApiFlowsData();

    const promptModalClose = document.getElementById('promptModalClose');
    if (promptModalClose) promptModalClose.addEventListener('click', closePromptModal);

    const btnCopyPrompt = document.getElementById('btnCopyPrompt');
    if (btnCopyPrompt) btnCopyPrompt.addEventListener('click', copyPromptFromModal);

    const btnDownloadPrompt = document.getElementById('btnDownloadPrompt');
    if (btnDownloadPrompt) btnDownloadPrompt.addEventListener('click', downloadPrompt);

    const btnRunPrompt = document.getElementById('btnRunPrompt');
    if (btnRunPrompt) btnRunPrompt.addEventListener('click', toggleRunDropdown);

    const btnRunClaude = document.getElementById('btnRunClaude');
    if (btnRunClaude) btnRunClaude.addEventListener('click', runInClaude);

    const btnRunChatGPT = document.getElementById('btnRunChatGPT');
    if (btnRunChatGPT) btnRunChatGPT.addEventListener('click', runInChatGPT);

    const modal = document.getElementById('promptModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closePromptModal();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        const menu = document.getElementById('runDropdownMenu');
        if (menu) menu.classList.remove('show');
    });
});
