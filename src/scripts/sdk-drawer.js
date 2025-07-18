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

// Initialize drawer event handlers
function initializeDrawerEventHandlers() {
    // Clear any existing event listeners to prevent duplicates
    const existingHandlers = document.querySelectorAll('.sdk-drawer-event-handler');
    existingHandlers.forEach(handler => handler.remove());
    
    // Handle programming language changes for AI mode only
    setupLanguageHandlers('programmingLanguageAI', 'ai');
    
    // Add direct event listener to the generate button
    const generateBtn = document.querySelector('#aiGenerateBtn');
    if (generateBtn) {
        generateBtn.removeEventListener('click', handleGenerateClick); 
        generateBtn.addEventListener('click', handleGenerateClick);
    }
    
    // Prevent any form submissions within the drawer
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        // Add click outside listener
        drawer.addEventListener('click', handleDrawerBackdropClick);
    }
}

function setupSuggestionListeners() {    
    // Add click listeners to all suggestion chips for applying the prompt
    const suggestionElements = document.querySelectorAll('.suggestion-chip .suggestion-text, .suggestion-chip .suggestion-icon, .suggestion-chip .suggestion-play-button');
    
    suggestionElements.forEach((element, index) => {
        // Remove existing listeners to prevent duplicates
        element.removeEventListener('click', handleSuggestionClick);
        
        // Add new listener
        element.addEventListener('click', handleSuggestionClick);
    });

    // Add click listeners to all close buttons for dismissing the chip
    const closeButtons = document.querySelectorAll('.suggestion-chip .btn-close');
    
    closeButtons.forEach((button, index) => {
        // Remove existing listeners to prevent duplicates
        button.removeEventListener('click', handleSuggestionClose);
        
        // Add new listener
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
        // Immediately hide the clicked chip and start typing animation
        hideChipAndStartTyping(chip, descriptionTextarea, promptText);
    } else {
        console.error('Could not find sdkDescription textarea');
    }
}

function handleSuggestionClose(event) {
    event.stopPropagation();

    const chip = event.target.closest('.suggestion-chip');
    if (chip) {
        // Hide the chip instead of removing it from DOM
        chip.style.display = 'none';
        // Add a class to track that it was manually closed
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

function setupLanguageHandlers(radioName, mode) {
    const radios = document.querySelectorAll(`input[name="${radioName}"]`);
    radios.forEach(radio => {
        // Remove existing listeners to prevent duplicates
        radio.removeEventListener('change', handleLanguageChange);
        radio.removeEventListener('click', handleLanguageClick);
        
        // Add new listeners
        radio.addEventListener('change', function(e) {
            handleLanguageChange(e, mode);
        });
        radio.addEventListener('click', handleLanguageClick);
    });
}

function handleLanguageChange(e, mode) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`${mode} mode language changed to:`, e.target.value);
    updateLanguageSelection(mode);
    
    return false;
}

function handleLanguageClick(e) {
    e.stopPropagation();
}

function updateLanguageSelection(mode) {
    // Remove selection from all language options first
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Update AI mode language options only
    const aiModeOptions = document.querySelectorAll('.language-option[data-mode="ai"]');
    
    aiModeOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        
        if (radio && radio.checked) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Open SDK drawer
function openSdkDrawer() {
    const checkedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    if (checkedCheckboxes.length < 2) {
        alert('Please select at least 2 APIs to generate SDK');
        return;
    }

    // Reset SDK generation state
    window.sdkGenerationActive = false;
    
    // Store original chip HTML when drawer first opens (for restoration)
    storeOriginalChipHTML();
    
    // Show drawer
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.style.display = 'block';
        
        // Add body class to prevent scrolling
        document.body.classList.add('drawer-open');
        
        // Reset drawer to initial state
        resetDrawerState();
        
        // Initialize event handlers
        initializeDrawerEventHandlers();
        
        // Animate drawer in
        setTimeout(() => {
            drawer.classList.add('open');
        }, 10);
    }
}

function closeSdkDrawer() {
    // Check if SDK generation is in progress
    if (isSDKGenerationInProgress()) {
        // Show custom confirmation modal instead of browser confirm
        showSdkCancelConfirmModal();
        return; 
    }
    
    // Proceed with normal closure
    proceedWithDrawerClosure();
}

function proceedWithDrawerClosure() {
    // Stop any running progress animation
    stopProgressAnimation();
    
    // Cancel any ongoing typing animation
    if (window.currentTypingAnimation) {
        cancelTypingAnimation();
    }
    
    if (window.currentSDKEventSource) {
        window.currentSDKEventSource.close();
        window.currentSDKEventSource = null;
    }
    
    // Clean up event listeners
    document.removeEventListener('keydown', handleEscapeKey);
    
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.classList.remove('open');
        
        // Remove body class
        document.body.classList.remove('drawer-open');
        
        // Hide drawer after animation
        setTimeout(() => {
            drawer.style.display = 'none';
            
            // Reset drawer state
            resetDrawerState();
        }, 300);
    }
}

// Chip State Management Functions
function storeOriginalChipHTML() {
    // Only store if not already stored (to preserve original state)
    if (!window.originalChipHTML) {
        const chipContainer = document.querySelector('.prompt-suggestions-container');
        if (chipContainer) {
            window.originalChipHTML = chipContainer.innerHTML;
        }
    }
}

function restoreOriginalChips() {
    // Restore chips from stored HTML if available
    if (window.originalChipHTML) {
        const chipContainer = document.querySelector('.prompt-suggestions-container');
        if (chipContainer) {
            chipContainer.innerHTML = window.originalChipHTML;
            // Re-setup event listeners for the restored chips
            setTimeout(() => {
                setupSuggestionListeners();
            }, 50);
            return true;
        }
    }
    return false;
}

function resetChipStates() {
    // Reset all chip states without restoring HTML
    const allChips = document.querySelectorAll('.suggestion-chip');
    
    allChips.forEach((chip) => {
        // Show all chips
        chip.style.display = 'inline-flex';
        
        // Remove all state classes
        chip.classList.remove('typing-in-progress', 'manually-closed');
    });
    
    // Enable all chips
    enableSuggestionChips();
}

function restoreHiddenSuggestionChips() {
    // Cancel any ongoing typing animation
    if (window.currentTypingAnimation) {
        cancelTypingAnimation();
    }
    
    // Try to restore from original HTML first (handles completely removed chips)
    const restoredFromOriginal = restoreOriginalChips();
    
    if (!restoredFromOriginal) {
        // If no original HTML stored, just reset states of existing chips
        resetChipStates();
    }
    
    // Always ensure chips are enabled after restoration
    enableSuggestionChips();
}

function resetDrawerState() {
    // Reset SDK generation state
    window.sdkGenerationActive = false;
    window.currentSDKJobId = null;
    
    // Clear any typing animation state
    if (window.currentTypingAnimation) {
        window.currentTypingAnimation.active = false;
        window.currentTypingAnimation = null;
    }
    
    // Reset to Java as default AI language (matches HTML default)
    const defaultLanguage = document.querySelector('input[name="programmingLanguageAI"][value="java"]');
    if (defaultLanguage) {
        defaultLanguage.checked = true;
    }
    
    // Clear AI description
    const aiDescription = document.getElementById('sdkDescription');
    if (aiDescription) {
        aiDescription.value = '';
        aiDescription.classList.remove('typing');
    }
    
    // Show AI section (always visible now)
    const aiSection = document.getElementById('aiDescriptionSection');
    if (aiSection) {
        aiSection.style.display = 'block';
        aiSection.classList.add('ai-mode');
    }
    
    // Show AI mode footer only
    const aiModeFooter = document.getElementById('aiModeFooter');
    if (aiModeFooter) aiModeFooter.style.display = 'block';
    
    // Show AI languages only
    const aiLanguages = document.querySelectorAll('.language-option[data-mode="ai"]');
    aiLanguages.forEach(lang => lang.style.display = 'block');
    
    // Add AI mode class to language options
    const languageOptions = document.getElementById('languageOptions');
    if (languageOptions) {
        languageOptions.classList.add('ai-mode');
    }
    
    // Update visual state
    updateLanguageSelection('ai');

    // Restore hidden suggestion chips (this will restore ALL chips)
    restoreHiddenSuggestionChips();
    
    // Show suggestion chips when drawer is reset
    showSuggestionChips();
    
    // Re-setup suggestion listeners after restoration
    setTimeout(() => {
        setupSuggestionListeners();
    }, 100);
}

// Debug function to check button state
window.debugGenerateButton = function() {
    const btn = document.querySelector('#aiGenerateBtn');
    console.log('Button element:', btn);
    console.log('Button onclick:', btn ? btn.onclick : 'not found');
    console.log('Button event listeners:', btn ? getEventListeners(btn) : 'not found');
    console.log('Button disabled:', btn ? btn.disabled : 'not found');
    console.log('Button style display:', btn ? getComputedStyle(btn).display : 'not found');
};

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
    
    // Validate that at least 2 APIs are selected
    if (checkedCheckboxes.length < 2) {
        alert('Please select at least 2 APIs for SDK generation.');
        return;
    }
    
    // Validate that description is provided for AI mode
    if (!description || description.trim() === '') {
        alert('Please provide a description for AI-generated SDK requirements.');
        return;
    }
    
    const selectedAPIs = Array.from(checkedCheckboxes).map(checkbox => ({
        id: checkbox.dataset.apiId,
        name: checkbox.dataset.apiName,
        version: checkbox.dataset.apiVersion
    }));
    
    // Get application name from template context or use default
    //const applicationName = getApplicationName();
    
    const sdkConfiguration = {
        mode: 'ai',
        language: selectedLanguage,
        description: description.trim()
        // name: `${applicationName}-sdk`
    };
    
    // Get current URL path parts
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1];
    const applicationId = pathParts[pathParts.length - 1];
    const viewName = pathParts[3];
    
    // Don't close drawer - show progress in place
    
    // Log the configuration for debugging
    console.log('SDK Generation Configuration:', {
        mode: 'ai',
        language: selectedLanguage,
        description: description.trim(),
        selectedAPIs: selectedAPIs.length
    });
    
    // Show loading state
    showSDKGenerationLoading();
    
    // Call the SDK generation API
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
            // Store job ID for potential cancellation
            window.currentSDKJobId = data.data.jobId;
            // Start SSE connection for real-time updates
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
                // Stop any fake progress animation when we receive real progress
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
                // Keep alive message - no action needed
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
        
        // Show error message
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
    // Complete the progress bar
    updateProgressBar(100);
    updateProgressStatus('Completed!', 'SDK generated successfully');
    
    // Clear job ID since generation is complete
    window.currentSDKJobId = null;
    
    // Auto-download the file
    if (data.resultData && data.resultData.finalDownloadUrl) {
        setTimeout(() => {
            triggerAutoDownload(data.resultData.finalDownloadUrl);
            // Hide progress bar after download starts
            setTimeout(() => {
                hideSDKGenerationLoading();
            }, 500);
        }, 1000);
    } else {
        setTimeout(() => {
            hideSDKGenerationLoading();
        }, 1500);
    }
}

function startSDKStatusPolling(jobId) {
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1];
    const applicationId = pathParts[pathParts.length - 1];
    const viewName = pathParts[3];
    
    const pollInterval = setInterval(() => {
        fetch(`/${orgName}/views/${viewName}/applications/${applicationId}/sdk-status/${jobId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateProgressBar(data.progress);
                    updateProgressStatus(data.currentStep, data.message);
                    
                    if (data.status === 'completed') {
                        clearInterval(pollInterval);
                        handleSDKGenerationComplete(data);
                    } else if (data.status === 'failed') {
                        clearInterval(pollInterval);
                        hideSDKGenerationLoading();
                        showSDKGenerationError(data.message || 'SDK generation failed');
                    }
                }
            })
            .catch(error => {
                console.error('Error polling SDK status:', error);
                clearInterval(pollInterval);
                hideSDKGenerationLoading();
                showSDKGenerationError('Error checking SDK status');
            });
    }, 1000); // Poll every second
    
    // Stop polling after 10 minutes
    setTimeout(() => {
        clearInterval(pollInterval);
    }, 10 * 60 * 1000);
}


// function getApplicationName() {
//     // Try to get application name from the page context
//     const titleElement = document.querySelector('h1, .application-title, [data-application-name], .app-overview-title');
//     if (titleElement) {
//         return titleElement.textContent.trim() || 'application';
//     }
    
//     // Fallback to extracting from URL or use default
//     const pathParts = window.location.pathname.split('/');
//     return pathParts[pathParts.length - 1] || 'application';
// }

// Functions to handle suggestion chips visibility
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

// Helper functions for SDK generation feedback
function showSDKGenerationLoading() {
    console.log('SDK generation started...');
    
    // Mark SDK generation as active
    window.sdkGenerationActive = true;
    
    // Hide suggestion chips during generation
    hideSuggestionChips();
    
    // Show progress bar in place of prompt input
    showProgressBarInPrompt();
}

function hideSDKGenerationLoading() {
    console.log('SDK generation completed');
    
    // Mark SDK generation as inactive
    window.sdkGenerationActive = false;
    
    // Hide progress bar and restore prompt input
    hideProgressBarInPrompt();
    
    // Show suggestion chips after SDK generation
    showSuggestionChips();
}

function showSDKGenerationSuccess(data, mode) {
    // Complete the progress bar
    updateProgressBar(100);
    
    // Auto-download the file
    if (data.data && data.data.finalDownloadUrl) {
        setTimeout(() => {
            triggerAutoDownload(data.data.finalDownloadUrl);
            // Hide progress bar and restore input after download starts
            setTimeout(() => {
                hideProgressBarInPrompt();
            }, 500);
        }, 1000); // Small delay to show 100% completion
    } else {
        // Hide progress bar if no download URL
        setTimeout(() => {
            hideProgressBarInPrompt();
        }, 1500);
    }
}

function showSDKGenerationError(message) {
    console.error('SDK Generation Error:', message);
    
    // Clear job ID since generation failed
    window.currentSDKJobId = null;
    
    // Show error notification popup
    showErrorNotification(message);
    
    // Show error state in progress bar briefly
    showProgressError(message);
    
    // Hide progress bar and restore input after showing error
    setTimeout(() => {
        hideProgressBarInPrompt();
        // Show suggestion chips after error
        showSuggestionChips();
    }, 3000);
}

// Progress bar functions for in-place generation feedback
function showProgressBarInPrompt() {
    const aiSection = document.getElementById('aiDescriptionSection');
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
    // Stop any running progress animation
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
    // Ensure we have a valid progress value
    const boundedProgress = Math.max(0, Math.min(100, progress));
    
    const progressFill = document.getElementById('sdkProgressFill');
    const progressPercentage = document.getElementById('sdkProgressPercentage');
    
    if (progressFill) {
        // Only update if progress is moving forward (real progress) or it's a reset/completion
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
    // Stop any existing animation first
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
    
    // Store interval reference for cleanup
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer) {
        progressContainer.dataset.intervalId = interval;
    }
    
    // Also store globally for easy cleanup
    window.currentProgressInterval = interval;
}

function stopProgressAnimation() {
    // Clear the global interval if it exists
    if (window.currentProgressInterval) {
        clearInterval(window.currentProgressInterval);
        window.currentProgressInterval = null;
    }
    
    // Also check for interval stored in the progress container
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer && progressContainer.dataset.intervalId) {
        clearInterval(parseInt(progressContainer.dataset.intervalId));
        delete progressContainer.dataset.intervalId;
    }
}

function triggerAutoDownload(downloadUrl) {
    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ''; // Let the browser determine the filename
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Auto-download triggered for:', downloadUrl);
}

// Download button progress functions
function showDownloadProgress(buttonElement) {
    if (!buttonElement) return;
    
    // Find the closest download button (in case event.target is an icon)
    const downloadBtn = buttonElement.closest('.language-download-btn') || buttonElement;
    
    if (downloadBtn) {
        // Store original content
        downloadBtn.dataset.originalContent = downloadBtn.innerHTML;
        
        // Replace button content with progress
        downloadBtn.innerHTML = `
            <div class="download-progress">
                <div class="download-progress-spinner"></div>
                <span class="download-progress-text">Generating...</span>
            </div>
        `;
        
        downloadBtn.disabled = true;
        downloadBtn.classList.add('downloading');
    }
}

function handleDownloadSuccess(data, buttonElement) {
    const downloadBtn = buttonElement.closest('.language-download-btn') || buttonElement;
    
    if (downloadBtn) {
        // Show success state
        downloadBtn.innerHTML = `
            <div class="download-progress">
                <i class="bi bi-check-circle-fill text-success"></i>
                <span class="download-progress-text">Complete!</span>
            </div>
        `;
        
        // Auto-download the file
        if (data.data && data.data.finalDownloadUrl) {
            setTimeout(() => {
                triggerAutoDownload(data.data.finalDownloadUrl);
                
                // Restore button after download starts
                setTimeout(() => {
                    restoreDownloadButton(downloadBtn);
                }, 1000);
            }, 800);
        } else {
            // Restore button if no download URL
            setTimeout(() => {
                restoreDownloadButton(downloadBtn);
            }, 2000);
        }
    }
}

function handleDownloadError(message, buttonElement) {
    const downloadBtn = buttonElement.closest('.language-download-btn') || buttonElement;
    
    if (downloadBtn) {
        // Show error state
        downloadBtn.innerHTML = `
            <div class="download-progress">
                <i class="bi bi-exclamation-circle-fill text-danger"></i>
                <span class="download-progress-text">Failed</span>
            </div>
        `;
        
        // Restore button after showing error
        setTimeout(() => {
            restoreDownloadButton(downloadBtn);
        }, 3000);
    }
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
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.sdk-success-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification container
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeSuccessNotification(notification);
    }, 5000);
}

function showWarningNotification(message, title = 'Warning') {
    // Remove any existing warning notifications
    const existingNotifications = document.querySelectorAll('.sdk-warning-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification container
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-hide after 6 seconds
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

// SDK Generation State Management
function isSDKGenerationInProgress() {
    // Check global flag
    if (window.sdkGenerationActive === true) {
        return true;
    }
    
    // Check if progress container exists (indicates generation is active)
    const progressContainer = document.getElementById('sdkProgressContainer');
    
    // Check if SSE connection is active
    const hasActiveSSE = window.currentSDKEventSource && window.currentSDKEventSource.readyState === EventSource.OPEN;
    
    // Check if progress animation is running
    const hasProgressAnimation = window.currentProgressInterval !== null && window.currentProgressInterval !== undefined;
    
    return !!(progressContainer || hasActiveSSE || hasProgressAnimation);
}

function cancelSDKGeneration() {
    console.log('Cancelling SDK generation...');
    
    // Mark SDK generation as inactive
    window.sdkGenerationActive = false;
    
    // Close SSE connection
    if (window.currentSDKEventSource) {
        window.currentSDKEventSource.close();
        window.currentSDKEventSource = null;
        console.log('SSE connection closed');
    }
    
    // Stop progress animation
    stopProgressAnimation();
    
    // Hide progress UI
    hideSDKGenerationLoading();
    
    // Send cancellation request to backend if we have a job ID
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
        
        // Clear the job ID
        window.currentSDKJobId = null;
    }
    
    // Show cancellation notification
    showWarningNotification('SDK generation has been cancelled.', 'Generation Cancelled');
    
    console.log('SDK generation cancelled successfully');
}

// SDK Cancel Confirmation Modal Functions
function showSdkCancelConfirmModal() {
    const modal = document.getElementById('sdkCancelConfirmModal');
    if (modal) {
        modal.style.display = 'flex';
        // Add body class to prevent scrolling behind modal
        document.body.classList.add('modal-open');
        
        // Add escape key listener for modal
        document.addEventListener('keydown', handleModalEscapeKey);
        
        // Add click outside listener
        modal.addEventListener('click', handleModalBackdropClick);
    }
}

function closeSdkCancelConfirmModal() {
    const modal = document.getElementById('sdkCancelConfirmModal');
    if (modal) {
        modal.style.display = 'none';
        // Remove body class to restore scrolling
        document.body.classList.remove('modal-open');
        
        // Remove event listeners
        document.removeEventListener('keydown', handleModalEscapeKey);
        modal.removeEventListener('click', handleModalBackdropClick);
    }
}

function confirmSdkCancellation() {
    // Close the confirmation modal first
    closeSdkCancelConfirmModal();
    
    // Cancel the SDK generation
    cancelSDKGeneration();
    
    // Proceed with closing the drawer
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

// Debug function for testing the modal
window.testSdkCancelModal = function() {
    console.log('Testing SDK cancel confirmation modal...');
    showSdkCancelConfirmModal();
};

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
    // Only close if clicking on the drawer backdrop (not on drawer content)
    if (event.target.id === 'sdkDrawer') {
        event.preventDefault();
        closeSdkDrawer();
    }
}

// Typing Animation Functions
function hideChipAndStartTyping(chip, textarea, text) {
    // Disable all other suggestion chips during typing
    disableSuggestionChips();
    
    // Immediately hide the clicked chip
    chip.style.display = 'none';
    
    // Store the chip reference for restoring when needed
    if (!window.currentTypingAnimation) {
        window.currentTypingAnimation = {};
    }
    window.currentTypingAnimation.hiddenChip = chip;
    
    // Start typing animation
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
    // Store existing hidden chip reference before cancelling
    let existingHiddenChip = null;
    if (window.currentTypingAnimation && window.currentTypingAnimation.hiddenChip) {
        existingHiddenChip = window.currentTypingAnimation.hiddenChip;
    }
    
    // Cancel any existing typing animation
    if (window.currentTypingAnimation) {
        // Don't restore the chip when cancelling for a new animation
        window.currentTypingAnimation.active = false;
        if (window.currentTypingAnimation.textarea) {
            window.currentTypingAnimation.textarea.classList.remove('typing');
        }
    }
    
    // Clear textarea and focus it
    textarea.value = '';
    textarea.focus();
    
    // Add typing class for cursor effect (if supported)
    textarea.classList.add('typing');
    
    let currentIndex = 0;
    const typingSpeed = 60; // milliseconds per character
    
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
            // Add next character
            textarea.value += text.charAt(currentIndex);
            currentIndex++;
            
            // Trigger input event for any listeners
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Schedule next character
            setTimeout(typeNextCharacter, typingSpeed);
        } else {
            // Typing completed
            finishTypingAnimation(textarea, text);
        }
    }
    
    // Start typing after a short delay
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
    
    // Keep the hidden chip hidden (don't restore it after typing completes)
    // The chip will only be restored when drawer is reset/closed
    
    // Clear animation state
    window.currentTypingAnimation = null;
    
    // Re-enable suggestion chips
    enableSuggestionChips();
    
    // Trigger final change event
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log('Typing animation completed:', text);
}