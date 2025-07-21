/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
/* eslint-disable no-undef */

function openSdkDrawer() {
    const checkedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    if (checkedCheckboxes.length < 1) {
        alert('Please select at least 1 API to generate SDK');
        return;
    }

    window.sdkGenerationActive = false;
    
    storeOriginalChipHTML();
    
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.style.display = 'block';
        
        document.body.classList.add('drawer-open');
        
        resetDrawerState();
        
        initializeDrawerEventHandlers();
        
        setTimeout(() => {
            drawer.classList.add('open');
        }, 10);
    }
}

function initializeDrawerEventHandlers() {
    
    setupLanguageHandlers('programmingLanguageAI');
    
    const generateBtn = document.querySelector('#aiGenerateBtn');
    if (generateBtn) {
        generateBtn.removeEventListener('click', handleGenerateClick); 
        generateBtn.addEventListener('click', handleGenerateClick);
    }
    
    const descriptionTextArea = document.getElementById('sdkDescription');
    if (descriptionTextArea) {
        descriptionTextArea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
        descriptionTextArea.addEventListener('keyup', function() {
            autoResizeTextarea(this);
        });
        autoResizeTextarea(descriptionTextArea);
    }

    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        document.addEventListener('keydown', handleEscapeKey);
        
        drawer.addEventListener('click', handleDrawerBackdropClick);
    }
}

function setupSuggestionListeners() {    
    const suggestionElements = document.querySelectorAll('.suggestion-chip .suggestion-text, .suggestion-chip .suggestion-icon, .suggestion-chip .suggestion-play-button');
    
    suggestionElements.forEach((element, index) => {
        element.removeEventListener('click', handleSuggestionClick);
        element.addEventListener('click', handleSuggestionClick);
    });

    const closeButtons = document.querySelectorAll('.suggestion-chip .btn-close');
    
    closeButtons.forEach((button, index) => {
        button.removeEventListener('click', handleSuggestionClose);
        button.addEventListener('click', handleSuggestionClose);
    });
}

function handleSuggestionClick(event) {
    const chip = event.target.closest('.suggestion-chip');
    if (!chip) {
        console.error('Could not find suggestion chip parent');
        return;
    }
    
    if (window.currentTypingAnimation) {
        return;
    }
    
    const promptText = chip.dataset.prompt;

    if (!promptText) {
        console.error('No prompt text found in data-prompt attribute');
        return;
    }
    
    const descriptionTextarea = document.getElementById('sdkDescription');
    if (descriptionTextarea) {
        hideChipAndStartTyping(chip, descriptionTextarea, promptText);
    } else {
        console.error('Could not find sdkDescription textarea');
    }
}

function handleSuggestionClose(event) {
    event.stopPropagation();

    const chip = event.target.closest('.suggestion-chip');
    if (chip) {
        chip.style.display = 'none';
        chip.classList.add('manually-closed');
    }
}

function handleGenerateClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Generate button clicked via event listener');
    generateSDKFromDrawerInternal();
    return false;
}

function setupLanguageHandlers(radioName) {
    const radios = document.querySelectorAll(`input[name="${radioName}"]`);
    radios.forEach(radio => {
        radio.removeEventListener('change', handleLanguageChange);
        radio.removeEventListener('click', handleLanguageClick);
        
        radio.addEventListener('change', handleLanguageChange);
        radio.addEventListener('click', handleLanguageClick);
    });
}

function handleLanguageChange(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Language changed to:`, e.target.value);
    updateLanguageSelection();

    return false;
}

function handleLanguageClick(e) {
    e.stopPropagation();
}

function updateLanguageSelection() {
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const languageOptions = document.querySelectorAll('.language-option');

    languageOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        
        if (radio && radio.checked) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function closeSdkDrawer() {
    if (isSDKGenerationInProgress()) {
        showSdkCancelConfirmModal();
        return; 
    }
    
    proceedWithDrawerClosure();
}

function proceedWithDrawerClosure() {
    stopProgressAnimation();
    
    if (window.currentTypingAnimation) {
        cancelTypingAnimation();
    }
    
    if (window.currentSDKEventSource) {
        window.currentSDKEventSource.close();
        window.currentSDKEventSource = null;
    }
    
    document.removeEventListener('keydown', handleEscapeKey);
    
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.classList.remove('open');
        
        document.body.classList.remove('drawer-open');
        
        setTimeout(() => {
            drawer.style.display = 'none';
            
            resetDrawerState();
        }, 300);
    }
}

function storeOriginalChipHTML() {
    if (!window.originalChipHTML) {
        const chipContainer = document.querySelector('.prompt-suggestions-container');
        if (chipContainer) {
            window.originalChipHTML = chipContainer.innerHTML;
        }
    }
}

function restoreOriginalChips() {
    if (window.originalChipHTML) {
        const chipContainer = document.querySelector('.prompt-suggestions-container');
        if (chipContainer) {
            chipContainer.innerHTML = window.originalChipHTML;
            setTimeout(() => {
                setupSuggestionListeners();
            }, 50);
            return true;
        }
    }
    return false;
}

function resetChipStates() {
    const allChips = document.querySelectorAll('.suggestion-chip');
    
    allChips.forEach((chip) => {
        chip.style.display = 'inline-flex';
        chip.classList.remove('typing-in-progress', 'manually-closed');
    });
    
    enableSuggestionChips();
}

function restoreHiddenSuggestionChips() {
    if (window.currentTypingAnimation) {
        cancelTypingAnimation();
    }
    
    const restoredFromOriginal = restoreOriginalChips();
    
    if (!restoredFromOriginal) {
        resetChipStates();
    }
    
    enableSuggestionChips();
}

function resetDrawerState() {
    window.sdkGenerationActive = false;
    window.currentSDKJobId = null;
    
    if (window.currentTypingAnimation) {
        window.currentTypingAnimation.active = false;
        window.currentTypingAnimation = null;
    }
    
    const defaultLanguage = document.querySelector('input[name="programmingLanguageAI"][value="java"]');
    if (defaultLanguage) {
        defaultLanguage.checked = true;
    }
    
    const description = document.getElementById('sdkDescription');
    if (description) {
        description.value = '';
        description.classList.remove('typing');
        description.style.height = 'auto';
    }
    
    const descriptionSection = document.getElementById('aiDescriptionSection');
    if (descriptionSection) {
        descriptionSection.style.display = 'block';
    }

    const footer = document.getElementById('aiModeFooter');
    if (footer) footer.style.display = 'block';

    const languages = document.querySelectorAll('.language-option');
    languages.forEach(lang => lang.style.display = 'block');

    updateLanguageSelection();

    restoreHiddenSuggestionChips();
    
    showSuggestionChips();
    
    setTimeout(() => {
        setupSuggestionListeners();
    }, 100);
}


function getSelectedLanguage() {
    const selectedRadio = document.querySelector('input[name="programmingLanguageAI"]:checked');
    return selectedRadio ? selectedRadio.value : 'java'; // Default to java
}

function generateSDKFromDrawerInternal(language) {
    console.log('generateSDKFromDrawerInternal called');
    
    const checkedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    const selectedLanguage = language || getSelectedLanguage();
    const descriptionElement = document.getElementById('sdkDescription');
    const description = descriptionElement ? descriptionElement.value : '';
    
    console.log('Validation checks:', {
        checkedCheckboxes: checkedCheckboxes.length,
        selectedLanguage: selectedLanguage,
        description: description
    });
    
    if (checkedCheckboxes.length < 1) {
        alert('Please select at least 1 API for SDK generation.');
        return;
    }
    
    if (!description || description.trim() === '') {
        alert('Please provide a description for AI-generated SDK requirements.');
        return;
    }
    
    const selectedAPIs = Array.from(checkedCheckboxes).map(checkbox => ({
        id: checkbox.dataset.apiId,
        name: checkbox.dataset.apiName,
        version: checkbox.dataset.apiVersion
    }));
    
    const sdkConfiguration = {
        language: selectedLanguage,
        description: description.trim()
    };
    
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1];
    const applicationId = pathParts[pathParts.length - 1];
    const viewName = pathParts[3];
    
    console.log('SDK Generation Configuration:', {
        language: selectedLanguage,
        description: description.trim(),
        selectedAPIs: selectedAPIs.length
    });
    
    showSDKGenerationLoading();
    
    fetch(`/${orgName}/views/${viewName}/applications/${applicationId}/generate-sdk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selectedAPIs: selectedAPIs.map(api => api.id),
            sdkConfiguration: sdkConfiguration
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data.jobId) {
            window.currentSDKJobId = data.data.jobId;
            startSDKProgressStream(data.data.jobId, data.data.sseEndpoint);
        } else {
            hideSDKGenerationLoading();
            showSDKGenerationError(data.message || 'SDK generation failed');
        }
    })
    .catch(error => {
        hideSDKGenerationLoading();
        console.error('Error generating SDK:', error);
        showSDKGenerationError('An error occurred while generating the SDK');
    });
}

function startSDKProgressStream(jobId, sseEndpoint) {
    const eventSource = new EventSource(sseEndpoint);

    eventSource.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('SSE Progress Update:', data);

            if (data.type === 'progress') {
                stopProgressAnimation();
                
                updateProgressBar(data.progress);
                updateProgressStatus(data.currentStep, data.message);

                if (data.status === 'completed') {
                    eventSource.close();
                    handleSDKGenerationComplete(data);
                } else if (data.status === 'failed') {
                    eventSource.close();
                    hideSDKGenerationLoading();
                    showSDKGenerationError(data.message || data.error || 'SDK generation failed');
                }
            } else if (data.type === 'ping') {
                console.log('SSE Keep alive ping received');
            } else if (data.type === 'error') {
                eventSource.close();
                hideSDKGenerationLoading();
                showSDKGenerationError(data.message || 'SDK generation failed');
            }
        } catch (error) {
            console.error('Error parsing SDK progress event:', error);
        }
    };

    eventSource.onerror = function(error) {
        console.error('SSE error:', error);
        eventSource.close();
        
        hideSDKGenerationLoading();
        showSDKGenerationError('Connection lost. Please try again.');
    };
    
    // Store reference for cleanup
    window.currentSDKEventSource = eventSource;
}

// Enhanced progress update functions
function updateProgressStatus(currentStep, message) {
    const progressStatus = document.getElementById('sdkProgressStatus');
    const progressTitle = document.querySelector('.sdk-progress-title');
    
    if (progressTitle) {
        progressTitle.textContent = currentStep;
    }
    
    if (progressStatus) {
        progressStatus.textContent = message;
    }
}

function handleSDKGenerationComplete(data) {
    updateProgressBar(100);
    updateProgressStatus('Completed!', 'SDK generation completed successfully');
    
    window.currentSDKJobId = null;
    
    if (data.resultData && data.resultData.finalDownloadUrl) {
        setTimeout(() => {
            triggerAutoDownload(data.resultData.finalDownloadUrl);
        }, 1000);
    }
    
    showSDKGenerationSuccess();
}

function hideSuggestionChips() {
    const suggestionContainer = document.querySelector('.prompt-input-area');
    if (suggestionContainer) {
        suggestionContainer.style.display = 'none';
        console.log('Suggestion chips hidden');
    }
}

function showSuggestionChips() {
    const suggestionContainer = document.querySelector('.prompt-input-area');
    if (suggestionContainer) {
        suggestionContainer.style.display = 'block';
        console.log('Suggestion chips shown');
    }
}

function showSDKGenerationLoading() {
    console.log('SDK generation started...');
    
    window.sdkGenerationActive = true;
    
    hideSuggestionChips();
    
    showProgressBarInPrompt();
}

function hideSDKGenerationLoading() {
    console.log('SDK generation completed');
    
    window.sdkGenerationActive = false;
    
    hideProgressBarInPrompt();
    
    showSuggestionChips();
}

function showSDKGenerationSuccess() {
    console.log('SDK generation completed successfully - showing success state');
    
    window.sdkGenerationActive = false;
    
    // Update progress bar to show success state
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer) {
        // Add success styling
        progressContainer.classList.add('success');
        
        // Update the progress bar to green success color
        const progressFill = document.getElementById('sdkProgressFill');
        if (progressFill) {
            progressFill.style.backgroundColor = '#10b981'; // Green success color
        }
        
        // Update title and status for success
        updateProgressStatus('Success!', 'SDK generation completed successfully');
    }
    
    // After 10 seconds, reset the drawer to initial state
    setTimeout(() => {
        resetDrawerToInitialState();
    }, 10000);
}

function showSDKGenerationError(message) {
    console.error('SDK Generation Error:', message);
    
    window.currentSDKJobId = null;
    
    showErrorNotification(message);
    
    showProgressError(message);
    
    setTimeout(() => {
        hideProgressBarInPrompt();
        showSuggestionChips();
    }, 3000);
}

// Progress bar functions for in-place generation feedback
function showProgressBarInPrompt() {
    const aiSection = document.getElementById('sdkDescriptionSection');
    const textarea = document.getElementById('sdkDescription');
    const generateButton = document.querySelector('#aiGenerateBtn');
    
    if (aiSection && textarea) {
        // Hide the textarea and generate button
        textarea.style.display = 'none';
        if (generateButton) {
            generateButton.style.display = 'none';
        }
        
        // Create progress bar container
        const progressContainer = document.createElement('div');
        progressContainer.id = 'sdkProgressContainer';
        progressContainer.className = 'sdk-progress-container';
        progressContainer.innerHTML = `
            <div class="sdk-progress-header">
                <span class="sdk-progress-title">Generating SDK...</span>
                <span class="sdk-progress-percentage" id="sdkProgressPercentage">0%</span>
            </div>
            <div class="sdk-progress-bar-wrapper">
                <div class="sdk-progress-bar" id="sdkProgressBar">
                    <div class="sdk-progress-fill" id="sdkProgressFill"></div>
                </div>
            </div>
            <div class="sdk-progress-status" id="sdkProgressStatus">
                Preparing SDK generation...
            </div>
        `;
        
        // Insert progress container after the label
        const label = aiSection.querySelector('label[for="sdkDescription"]');
        if (label) {
            label.insertAdjacentElement('afterend', progressContainer);
        } else {
            aiSection.insertBefore(progressContainer, textarea);
        }
        
        // Start progress animation
        startProgressAnimation();
    }
}

function hideProgressBarInPrompt() {
    stopProgressAnimation();
    
    const progressContainer = document.getElementById('sdkProgressContainer');
    const textarea = document.getElementById('sdkDescription');
    const generateButton = document.querySelector('#aiGenerateBtn');
    
    if (progressContainer) {
        progressContainer.remove();
    }
    
    if (textarea) {
        textarea.style.display = 'block';
    }
    
    if (generateButton) {
        generateButton.style.display = 'flex';
    }
}

function updateProgressBar(progress) {
    const boundedProgress = Math.max(0, Math.min(100, progress));
    
    const progressFill = document.getElementById('sdkProgressFill');
    const progressPercentage = document.getElementById('sdkProgressPercentage');
    
    if (progressFill) {
        const currentWidth = parseFloat(progressFill.style.width) || 0;
        if (boundedProgress > currentWidth || boundedProgress === 0 || boundedProgress === 100) {
            progressFill.style.width = `${boundedProgress}%`;
            console.log(`Progress bar updated to: ${boundedProgress}%`);
        } else {
            console.log(`Skipping backwards progress update: ${boundedProgress}% (current: ${currentWidth}%)`);
        }
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.round(boundedProgress)}%`;
    }
}

function showProgressError(message) {
    const progressContainer = document.getElementById('sdkProgressContainer');
    const progressStatus = document.getElementById('sdkProgressStatus');
    const progressTitle = document.querySelector('.sdk-progress-title');
    
    if (progressContainer) {
        progressContainer.classList.add('error');
    }
    
    if (progressTitle) {
        progressTitle.textContent = 'Generation Failed';
    }
    
    if (progressStatus) {
        progressStatus.textContent = message;
        progressStatus.style.color = '#dc3545';
    }
}

function startProgressAnimation() {
    stopProgressAnimation();
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2; // Random increment between 2-10
        
        if (progress > 20) {
            progress = 20; // Stop at 20% until actual completion
            clearInterval(interval);
        }
        
        updateProgressBar(progress);
    }, 1000);
    
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer) {
        progressContainer.dataset.intervalId = interval;
    }
    
    window.currentProgressInterval = interval;
}

function stopProgressAnimation() {
    if (window.currentProgressInterval) {
        clearInterval(window.currentProgressInterval);
        window.currentProgressInterval = null;
    }
    
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer && progressContainer.dataset.intervalId) {
        clearInterval(parseInt(progressContainer.dataset.intervalId));
        delete progressContainer.dataset.intervalId;
    }
}

function triggerAutoDownload(downloadUrl) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ''; 
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Auto-download triggered for:', downloadUrl);
}

// Error Notification System
function showErrorNotification(message, title = 'SDK Generation Error') {
    // Remove any existing error notifications
    const existingNotifications = document.querySelectorAll('.sdk-error-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification container
    const notification = document.createElement('div');
    notification.className = 'sdk-error-notification alert alert-danger';
    
    notification.innerHTML = `
        <div class="d-flex align-items-start">
            <div class="flex-shrink-0 me-3">
                <i class="bi bi-exclamation-triangle-fill text-danger"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold mb-1">${title}</div>
                <div class="error-message">${message}</div>
            </div>
            <button type="button" class="btn-close ms-2" onclick="closeErrorNotification(this)" aria-label="Close"></button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        closeErrorNotification(notification);
    }, 8000);
}

function showSuccessNotification(message, title = 'Success') {
    const existingNotifications = document.querySelectorAll('.sdk-success-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'sdk-success-notification alert alert-success';
    
    notification.innerHTML = `
        <div class="d-flex align-items-start">
            <div class="flex-shrink-0 me-3">
                <i class="bi bi-check-circle-fill text-success"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold mb-1">${title}</div>
                <div class="success-message">${message}</div>
            </div>
            <button type="button" class="btn-close ms-2" onclick="closeSuccessNotification(this)" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        closeSuccessNotification(notification);
    }, 5000);
}

function showWarningNotification(message, title = 'Warning') {
    const existingNotifications = document.querySelectorAll('.sdk-warning-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'sdk-warning-notification alert alert-warning';
    
    notification.innerHTML = `
        <div class="d-flex align-items-start">
            <div class="flex-shrink-0 me-3">
                <i class="bi bi-exclamation-triangle-fill text-warning"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold mb-1">${title}</div>
                <div class="warning-message">${message}</div>
            </div>
            <button type="button" class="btn-close ms-2" onclick="closeWarningNotification(this)" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        closeWarningNotification(notification);
    }, 6000);
}

function closeErrorNotification(element) {
    const notification = element.closest ? element.closest('.sdk-error-notification') : element;
    if (notification) {
        notification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function closeSuccessNotification(element) {
    const notification = element.closest ? element.closest('.sdk-success-notification') : element;
    if (notification) {
        notification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function closeWarningNotification(element) {
    const notification = element.closest ? element.closest('.sdk-warning-notification') : element;
    if (notification) {
        notification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function isSDKGenerationInProgress() {
    // Check global flag
    if (window.sdkGenerationActive === true) {
        return true;
    }
    
    const progressContainer = document.getElementById('sdkProgressContainer');
    
    const hasActiveSSE = window.currentSDKEventSource && window.currentSDKEventSource.readyState === EventSource.OPEN;
    
    const hasProgressAnimation = window.currentProgressInterval !== null && window.currentProgressInterval !== undefined;
    
    return !!(progressContainer || hasActiveSSE || hasProgressAnimation);
}

function cancelSDKGeneration() {
    console.log('Cancelling SDK generation...');
    
    window.sdkGenerationActive = false;
    
    if (window.currentSDKEventSource) {
        window.currentSDKEventSource.close();
        window.currentSDKEventSource = null;
        console.log('SSE connection closed');
    }
    
    stopProgressAnimation();
    
    hideSDKGenerationLoading();
    
    if (window.currentSDKJobId) {
        const orgName = window.location.pathname.split('/')[1];
        const viewName = window.location.pathname.split('/')[3];
        const applicationId = window.location.pathname.split('/')[5];
        const cancelUrl = `/${orgName}/views/${viewName}/applications/${applicationId}/sdk/cancel/${window.currentSDKJobId}`;
        
        fetch(cancelUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('SDK job cancelled on server:', data.message);
            } else {
                console.error('Failed to cancel SDK job on server:', data.error);
            }
        })
        .catch(error => {
            console.error('Error sending cancellation request:', error);
        });
        
        window.currentSDKJobId = null;
    }
    
    showWarningNotification('SDK generation has been cancelled.', 'Generation Cancelled');
    
    console.log('SDK generation cancelled successfully');
}

function showSdkCancelConfirmModal() {
    const modal = document.getElementById('sdkCancelConfirmModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        document.addEventListener('keydown', handleModalEscapeKey);
        
        modal.addEventListener('click', handleModalBackdropClick);
    }
}

function closeSdkCancelConfirmModal() {
    const modal = document.getElementById('sdkCancelConfirmModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleModalEscapeKey);
        modal.removeEventListener('click', handleModalBackdropClick);
    }
}

function confirmSdkCancellation() {
    closeSdkCancelConfirmModal();
    
    cancelSDKGeneration();
    
    proceedWithDrawerClosure();
}

function handleModalEscapeKey(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('sdkCancelConfirmModal');
        if (modal && modal.style.display === 'flex') {
            event.preventDefault();
            closeSdkCancelConfirmModal();
        }
    }
}

function handleModalBackdropClick(event) {
    // Only close if clicking on the modal backdrop (not on modal content)
    if (event.target.id === 'sdkCancelConfirmModal') {
        event.preventDefault();
        closeSdkCancelConfirmModal();
    }
}

function autoResizeTextarea(textArea) {
    if (textArea) {
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    }
}

// Make functions available globally
window.openSdkDrawer = openSdkDrawer;
window.closeSdkDrawer = closeSdkDrawer;

// Make modal functions globally available
window.showSdkCancelConfirmModal = showSdkCancelConfirmModal;
window.closeSdkCancelConfirmModal = closeSdkCancelConfirmModal;
window.confirmSdkCancellation = confirmSdkCancellation;
window.handleModalEscapeKey = handleModalEscapeKey;
window.handleModalBackdropClick = handleModalBackdropClick;

// Make notification functions globally available
window.showErrorNotification = showErrorNotification;
window.showSuccessNotification = showSuccessNotification;
window.showWarningNotification = showWarningNotification;
window.closeErrorNotification = closeErrorNotification;
window.closeSuccessNotification = closeSuccessNotification;
window.closeWarningNotification = closeWarningNotification;

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        const drawer = document.getElementById('sdkDrawer');
        if (drawer && drawer.classList.contains('open')) {
            event.preventDefault();
            closeSdkDrawer();
        }
    }
}

function handleDrawerBackdropClick(event) {
    if (event.target.id === 'sdkDrawer') {
        event.preventDefault();
        closeSdkDrawer();
    }
}

// Typing Animation Functions
function hideChipAndStartTyping(chip, textarea, text) {
    disableSuggestionChips();
    chip.style.display = 'none';
    
    if (!window.currentTypingAnimation) {
        window.currentTypingAnimation = {};
    }
    window.currentTypingAnimation.hiddenChip = chip;
    
    startTypingAnimation(textarea, text);
}

function disableSuggestionChips() {
    const allChips = document.querySelectorAll('.suggestion-chip');
    allChips.forEach(chip => {
        chip.classList.add('typing-in-progress');
    });
}

function enableSuggestionChips() {
    const allChips = document.querySelectorAll('.suggestion-chip');
    allChips.forEach(chip => {
        chip.classList.remove('typing-in-progress');
    });
}

function startTypingAnimation(textarea, text) {
    let existingHiddenChip = null;
    if (window.currentTypingAnimation && window.currentTypingAnimation.hiddenChip) {
        existingHiddenChip = window.currentTypingAnimation.hiddenChip;
    }
    
    if (window.currentTypingAnimation) {
        window.currentTypingAnimation.active = false;
        if (window.currentTypingAnimation.textarea) {
            window.currentTypingAnimation.textarea.classList.remove('typing');
        }
    }
    
    textarea.value = '';
    textarea.focus();
    
    textarea.classList.add('typing');
    
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character
    
    // Store animation state for cancellation
    window.currentTypingAnimation = {
        active: true,
        textarea: textarea,
        targetText: text,
        hiddenChip: existingHiddenChip
    };
    
    function typeNextCharacter() {
        // Check if animation was cancelled
        if (!window.currentTypingAnimation || !window.currentTypingAnimation.active) {
            return;
        }
        
        if (currentIndex < text.length) {

            textarea.value += text.charAt(currentIndex);
            currentIndex++;
            
            autoResizeTextarea(textarea);
            
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            
            setTimeout(typeNextCharacter, typingSpeed);
        } else {
            finishTypingAnimation(textarea, text);
        }
    }
    
    setTimeout(typeNextCharacter, 100);
}

function cancelTypingAnimation() {
    if (window.currentTypingAnimation) {
        window.currentTypingAnimation.active = false;
        
        // Remove typing class
        if (window.currentTypingAnimation.textarea) {
            window.currentTypingAnimation.textarea.classList.remove('typing');
        }
        
        // Restore the hidden chip if it exists
        if (window.currentTypingAnimation.hiddenChip) {
            const chip = window.currentTypingAnimation.hiddenChip;
            chip.style.display = 'inline-flex'; // Show the chip again
        }
        
        window.currentTypingAnimation = null;
        
        // Re-enable suggestion chips
        enableSuggestionChips();
        
        console.log('Typing animation cancelled');
    }
}

function finishTypingAnimation(textarea, text) {
    // Remove typing class
    textarea.classList.remove('typing');
    
    // Clear animation state
    window.currentTypingAnimation = null;
    
    // Re-enable suggestion chips
    enableSuggestionChips();
    
    // Trigger final change event
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log('Typing animation completed:', text);
}

function resetDrawerToInitialState() {
    console.log('Resetting drawer to initial state after successful SDK generation');
    
    hideProgressBarInPrompt();
    
    window.sdkGenerationActive = false;
    window.currentSDKJobId = null;
    
    if (window.currentTypingAnimation) {
        window.currentTypingAnimation.active = false;
        window.currentTypingAnimation = null;
    }
    
    const description = document.getElementById('sdkDescription');
    if (description) {
        description.value = '';
        description.classList.remove('typing');
        description.style.height = 'auto';
    }
    
    const defaultLanguage = document.querySelector('input[name="programmingLanguageAI"][value="java"]');
    if (defaultLanguage) {
        defaultLanguage.checked = true;
    }
    updateLanguageSelection();
    
    restoreHiddenSuggestionChips();
    
    showSuggestionChips();
    
    setTimeout(() => {
        setupSuggestionListeners();
    }, 100);
    
    console.log('Drawer reset to initial state completed');
}