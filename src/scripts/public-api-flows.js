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

/**
 * Extract org and view names from the current URL
 * URL format: /orgName/views/viewName/api-flows
 */
function getOrgAndViewFromURL() {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    // Format: [orgName, views, viewName, api-flows]
    const orgName = pathParts[0];
    const viewName = pathParts[2];
    return { orgName, viewName };
}

/**
 * Open the agent prompt modal using data already on the page
 */
function openAgentPromptModal(handle, flowName) {
    console.log(apiFlowsData)
    const flow = apiFlowsData.find(f => f.handle === handle);
    if (!flow || !flow.agentPrompt) {
        showNotification('No prompt available for this workflow.', 'error');
        return;
    }
    showPromptModal(flowName, flow.agentPrompt);
}

/**
 * Show the prompt modal
 */
function showPromptModal(flowName, prompt) {
    const modal = document.getElementById('promptModal');
    document.getElementById('promptFlowName').textContent = flowName;
    document.getElementById('promptText').textContent = prompt;
    modal.classList.add('show');
    modal.style.display = 'flex';
}

/**
 * Close the prompt modal
 */
function closePromptModal() {
    const modal = document.getElementById('promptModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

/**
 * Copy prompt from modal
 */
async function copyPromptFromModal() {
    try {
        const promptText = document.getElementById('promptText').textContent;
        await navigator.clipboard.writeText(promptText);

        // Show feedback
        const feedback = document.getElementById('copyFeedback');
        feedback.style.display = 'inline';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    } catch (error) {
        console.error('Error copying prompt:', error);
        showNotification('Error copying prompt', 'error');
    }
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Close modal when clicking outside
 */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePromptModal();
            }
        });
    }
});
