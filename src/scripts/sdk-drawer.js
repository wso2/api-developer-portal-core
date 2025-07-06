// SDK Drawer JavaScript
// Handles SDK generation drawer functionality

// Initialize drawer event handlers
function initializeDrawerEventHandlers() {
    // Clear any existing event listeners to prevent duplicates
    const existingHandlers = document.querySelectorAll('.sdk-drawer-event-handler');
    existingHandlers.forEach(handler => handler.remove());
    
    // Handle SDK mode changes
    const sdkModeRadios = document.querySelectorAll('.sdk-mode-input');
    sdkModeRadios.forEach(radio => {
        // Remove any existing listeners
        radio.removeEventListener('change', handleModeChange);
        radio.removeEventListener('click', handleModeClick);
        
        // Add new listeners
        radio.addEventListener('change', handleModeChange);
        radio.addEventListener('click', handleModeClick);
    });

    // Handle programming language changes for both modes
    setupLanguageHandlers('programmingLanguage', 'default');
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

function handleModeChange(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('SDK Mode changed to:', e.target.value);
    console.log('Radio checked state:', e.target.checked);
    
    const aiSection = document.getElementById('aiDescriptionSection');
    const defaultModeFooter = document.getElementById('defaultModeFooter');
    const aiModeFooter = document.getElementById('aiModeFooter');
    
    // Get all language options
    const defaultLanguages = document.querySelectorAll('.language-option[data-mode="default"]');
    const aiLanguages = document.querySelectorAll('.language-option[data-mode="ai"]');
    
    if (e.target.value === 'ai') {
        // Show AI mode
        if (aiSection) aiSection.style.display = 'block';
        if (defaultModeFooter) defaultModeFooter.style.display = 'none';
        if (aiModeFooter) aiModeFooter.style.display = 'block';
        
        // Add AI mode class to language options for wider tiles
        const languageOptions = document.getElementById('languageOptions');
        if (languageOptions) {
            languageOptions.classList.add('ai-mode');
        }
        
        // Add AI mode class to AI description section for wider input
        if (aiSection) {
            aiSection.classList.add('ai-mode');
        }
        
        // Hide default languages, show AI languages
        defaultLanguages.forEach(lang => lang.style.display = 'none');
        aiLanguages.forEach(lang => lang.style.display = 'block');
        
        // Clear selection and select Android as default AI language
        const androidAIRadio = document.querySelector('input[name="programmingLanguageAI"][value="android"]');
        if (androidAIRadio) {
            androidAIRadio.checked = true;
            updateLanguageSelection('ai');
        }
        
        console.log('AI section shown, AI languages displayed');
    } else {
        // Show default mode
        if (aiSection) aiSection.style.display = 'none';
        if (defaultModeFooter) defaultModeFooter.style.display = 'block';
        if (aiModeFooter) aiModeFooter.style.display = 'none';
        
        // Remove AI mode class from language options
        const languageOptions = document.getElementById('languageOptions');
        if (languageOptions) {
            languageOptions.classList.remove('ai-mode');
        }
        
        // Remove AI mode class from AI description section
        if (aiSection) {
            aiSection.classList.remove('ai-mode');
        }
        
        // Show default languages, hide AI languages
        defaultLanguages.forEach(lang => lang.style.display = 'block');
        aiLanguages.forEach(lang => lang.style.display = 'none');
        
        // Clear AI selection and select first default language
        const firstDefaultRadio = document.querySelector('input[name="programmingLanguage"]');
        if (firstDefaultRadio) {
            firstDefaultRadio.checked = true;
            updateLanguageSelection('default');
        }
        
        console.log('AI section hidden, default languages displayed');
    }
    
    // Update mode selection visual feedback
    setTimeout(() => {
        updateModeSelection();
    }, 50);
    
    return false;
}

function handleModeClick(e) {
    e.stopPropagation();
}

function updateModeSelection() {
    const modeRadios = document.querySelectorAll('.sdk-mode-input');
    modeRadios.forEach(radio => {
        const formCheck = radio.closest('.form-check');
        if (formCheck) {
            if (radio.checked) {
                formCheck.classList.add('selected');
            } else {
                formCheck.classList.remove('selected');
            }
        }
    });
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
    
    // Update only the current mode's language options
    const currentModeOptions = document.querySelectorAll(`.language-option[data-mode="${mode}"]`);
    
    currentModeOptions.forEach(option => {
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
        
        // Initialize visual state
        updateModeSelection();
        updateLanguageSelection('default');
        
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
    // Reset to default mode
    const defaultModeRadio = document.getElementById('defaultMode');
    if (defaultModeRadio) {
        defaultModeRadio.checked = true;
    }
    
    // Reset to Android as default language
    const defaultLanguage = document.querySelector('input[name="programmingLanguage"][value="android"]');
    if (defaultLanguage) {
        defaultLanguage.checked = true;
    }
    
    // Clear AI description
    const aiDescription = document.getElementById('sdkDescription');
    if (aiDescription) {
        aiDescription.value = '';
    }
    
    // Hide AI section
    const aiSection = document.getElementById('aiDescriptionSection');
    if (aiSection) {
        aiSection.style.display = 'none';
    }
    
    // Show default mode footer
    const defaultModeFooter = document.getElementById('defaultModeFooter');
    const aiModeFooter = document.getElementById('aiModeFooter');
    if (defaultModeFooter) defaultModeFooter.style.display = 'block';
    if (aiModeFooter) aiModeFooter.style.display = 'none';
    
    // Show default languages, hide AI languages
    const defaultLanguages = document.querySelectorAll('.language-option[data-mode="default"]');
    const aiLanguages = document.querySelectorAll('.language-option[data-mode="ai"]');
    
    defaultLanguages.forEach(lang => lang.style.display = 'block');
    aiLanguages.forEach(lang => lang.style.display = 'none');
    
    // Remove AI mode classes
    const languageOptions = document.getElementById('languageOptions');
    if (languageOptions) {
        languageOptions.classList.remove('ai-mode');
    }
    if (aiSection) {
        aiSection.classList.remove('ai-mode');
    }
    
    // Update visual state
    updateModeSelection();
    updateLanguageSelection('default');
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
    const selectedModeRadio = document.querySelector('.sdk-mode-input:checked');
    const selectedMode = selectedModeRadio ? selectedModeRadio.value : 'default';
    const selectedLanguage = language || getSelectedLanguage();
    const descriptionElement = document.getElementById('sdkDescription');
    const description = descriptionElement ? descriptionElement.value : '';
    
    // Validate that description is provided when AI mode is selected
    if (selectedMode === 'ai' && (!description || description.trim() === '')) {
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
        mode: selectedMode,
        language: selectedLanguage,
        description: description.trim(),
        name: `${applicationName}-sdk`
    };
    
    // Get current URL path parts
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1];
    const applicationId = pathParts[pathParts.length - 1];
    const viewName = pathParts[3];
    
    // Close drawer
    closeSdkDrawer();
    
    // Log the configuration for debugging
    console.log('SDK Generation Configuration:', {
        mode: selectedMode,
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

function downloadSDK(language, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const checkedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    const selectedAPIs = Array.from(checkedCheckboxes).map(checkbox => ({
        id: checkbox.dataset.apiId,
        name: checkbox.dataset.apiName,
        version: checkbox.dataset.apiVersion
    }));
    
    // Get application name from template context or use default
    const applicationName = getApplicationName();
    
    const sdkConfiguration = {
        mode: 'default',
        language: language,
        description: '',
        name: `${applicationName}-sdk`
    };
    
    // Get current URL path parts
    const pathParts = window.location.pathname.split('/');
    const orgName = pathParts[1];
    const applicationId = pathParts[pathParts.length - 1];
    const viewName = pathParts[3];
    
    // Close drawer
    closeSdkDrawer();
    
    // Log the configuration for debugging
    console.log('SDK Download Configuration:', {
        mode: 'default',
        language: language,
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
            showSDKGenerationSuccess(data, 'default');
        } else {
            showSDKGenerationError(data.message || 'SDK download failed');
        }
    })
    .catch(error => {
        hideSDKGenerationLoading();
        console.error('Error downloading SDK:', error);
        showSDKGenerationError('An error occurred while downloading the SDK');
    });
}

function getSelectedLanguage() {
    const selectedModeRadio = document.querySelector('.sdk-mode-input:checked');
    const selectedMode = selectedModeRadio ? selectedModeRadio.value : 'default';
    const radioName = selectedMode === 'ai' ? 'programmingLanguageAI' : 'programmingLanguage';
    const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
    return selectedRadio ? selectedRadio.value : 'android';
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
    
    // Create or show loading overlay
    let loadingOverlay = document.getElementById('sdkLoadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'sdkLoadingOverlay';
        loadingOverlay.className = 'sdk-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="sdk-loading-content">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 mb-0">Generating SDK...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
    
    loadingOverlay.style.display = 'flex';
    document.body.classList.add('sdk-loading');
}

function hideSDKGenerationLoading() {
    console.log('SDK generation completed');
    
    const loadingOverlay = document.getElementById('sdkLoadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
    
    document.body.classList.remove('sdk-loading');
}

function showSDKGenerationSuccess(data, mode) {
    // Show success message and download links based on mode
    const modeText = mode === 'ai' ? 'AI-powered SDK with application code' : 'SDK';
    const message = `${modeText} generated successfully! Download will start automatically.`;
    
    alert(message);
    
    if (data.data && data.data.finalDownloadUrl) {
        window.location.href = data.data.finalDownloadUrl;
    }
}

function showSDKGenerationError(message) {
    alert('Error: ' + message);
}

// Make functions available globally
window.openSdkDrawer = openSdkDrawer;
window.closeSdkDrawer = closeSdkDrawer;
window.generateSDKFromDrawer = generateSDKFromDrawer;
window.downloadSDK = downloadSDK;
