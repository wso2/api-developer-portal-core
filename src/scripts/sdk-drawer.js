// SDK Drawer JavaScript
// Handles SDK generation drawer functionality

// Initialize drawer event handlers
function initializeDrawerEventHandlers() {
    // Clear any existing event listeners to prevent duplicates
    const existingHandlers = document.querySelectorAll('.sdk-drawer-event-handler');
    existingHandlers.forEach(handler => handler.remove());
    
    // Handle programming language changes for AI mode only
    setupLanguageHandlers('programmingLanguageAI', 'ai');
    
    // Prevent any form submissions within the drawer
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }
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

    // Populate selected APIs
    populateSelectedAPIs(checkedCheckboxes);
    
    // Show drawer
    const drawer = document.getElementById('sdkDrawer');
    if (drawer) {
        drawer.style.display = 'block';
        
        // Add body class to prevent scrolling
        document.body.classList.add('drawer-open');
        
        // Initialize event handlers
        initializeDrawerEventHandlers();
        
        // Initialize visual state for AI mode only
        updateLanguageSelection('ai');
        
        // Animate drawer in
        setTimeout(() => {
            drawer.classList.add('open');
        }, 10);
    }
}

function closeSdkDrawer() {
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

function resetDrawerState() {
    // Reset to Android as default AI language
    const defaultLanguage = document.querySelector('input[name="programmingLanguageAI"][value="android"]');
    if (defaultLanguage) {
        defaultLanguage.checked = true;
    }
    
    // Clear AI description
    const aiDescription = document.getElementById('sdkDescription');
    if (aiDescription) {
        aiDescription.value = '';
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
}

function populateSelectedAPIs(checkedCheckboxes) {
    const selectedApisList = document.getElementById('selectedApisList');
    if (selectedApisList) {
        selectedApisList.innerHTML = '';
        
        checkedCheckboxes.forEach(checkbox => {
            const apiItem = document.createElement('div');
            apiItem.className = 'selected-api-badge';
            apiItem.innerHTML = `
                <span class="api-name">${checkbox.dataset.apiName || 'Unknown API'}</span>
                <span class="api-version">${checkbox.dataset.apiVersion || 'v1.0'}</span>
            `;
            selectedApisList.appendChild(apiItem);
        });
    }
}

function generateSDKFromDrawer(language) {
    const checkedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    const selectedLanguage = language || getSelectedLanguage();
    const descriptionElement = document.getElementById('sdkDescription');
    const description = descriptionElement ? descriptionElement.value : '';
    
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
    const applicationName = getApplicationName();
    
    const sdkConfiguration = {
        mode: 'ai',
        language: selectedLanguage,
        description: description.trim(),
        name: `${applicationName}-sdk`
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
        hideSDKGenerationLoading();
        if (data.success) {
            showSDKGenerationSuccess(data, selectedMode);
        } else {
            showSDKGenerationError(data.message || 'SDK generation failed');
        }
    })
    .catch(error => {
        hideSDKGenerationLoading();
        console.error('Error generating SDK:', error);
        showSDKGenerationError('An error occurred while generating the SDK');
    });
}

function getApplicationName() {
    // Try to get application name from the page context
    const titleElement = document.querySelector('h1, .application-title, [data-application-name]');
    if (titleElement) {
        return titleElement.textContent.trim() || 'application';
    }
    
    // Fallback to extracting from URL or use default
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1] || 'application';
}

// Helper functions for SDK generation feedback
function showSDKGenerationLoading() {
    console.log('SDK generation started...');
    
    // Show progress bar in place of prompt input
    showProgressBarInPrompt();
}

function hideSDKGenerationLoading() {
    console.log('SDK generation completed');
    // Hide progress bar and restore prompt input
    hideProgressBarInPrompt();
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
    
    // Show error state in progress bar briefly
    showProgressError(message);
    
    // Hide progress bar and restore input after showing error
    setTimeout(() => {
        hideProgressBarInPrompt();
    }, 3000);
}

// Progress bar functions for in-place generation feedback
function showProgressBarInPrompt() {
    const aiSection = document.getElementById('aiDescriptionSection');
    const textarea = document.getElementById('sdkDescription');
    const generateButton = document.querySelector('.ai-generate-btn');
    
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
    const progressContainer = document.getElementById('sdkProgressContainer');
    const textarea = document.getElementById('sdkDescription');
    const generateButton = document.querySelector('.ai-generate-btn');
    
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
    const progressFill = document.getElementById('sdkProgressFill');
    const progressPercentage = document.getElementById('sdkProgressPercentage');
    const progressStatus = document.getElementById('sdkProgressStatus');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }
    
    if (progressStatus) {
        if (progress < 30) {
            progressStatus.textContent = 'Preparing SDK generation...';
        } else if (progress < 60) {
            progressStatus.textContent = 'Processing API specifications...';
        } else if (progress < 90) {
            progressStatus.textContent = 'Generating SDK files...';
        } else if (progress < 100) {
            progressStatus.textContent = 'Finalizing SDK package...';
        } else {
            progressStatus.textContent = 'SDK generated successfully!';
        }
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
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2; // Random increment between 2-10
        
        if (progress > 85) {
            progress = 85; // Stop at 85% until actual completion
            clearInterval(interval);
        }
        
        updateProgressBar(progress);
    }, 400);
    
    // Store interval reference for cleanup
    const progressContainer = document.getElementById('sdkProgressContainer');
    if (progressContainer) {
        progressContainer.dataset.intervalId = interval;
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

// Make functions available globally
window.openSdkDrawer = openSdkDrawer;
window.closeSdkDrawer = closeSdkDrawer;
window.generateSDKFromDrawer = generateSDKFromDrawer;
