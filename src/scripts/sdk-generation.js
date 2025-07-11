// SDK Generation Page JavaScript

let isGenerating = false; // Flag to prevent multiple simultaneous generations

document.addEventListener('DOMContentLoaded', function() {
    initializeSDKGeneration();
});

function initializeSDKGeneration() {
    setupAPICardSelection();
    setupGenerateButton();
    loadPreSelectedAPIs(); // Load APIs selected from the application page
    updateSelectedCount();
}

function loadPreSelectedAPIs() {
    const selectedAPIs = sessionStorage.getItem('selectedAPIs');
    if (selectedAPIs) {
        try {
            const apiList = JSON.parse(selectedAPIs);
            console.log('Pre-selected APIs loaded:', apiList);
            
            // Mark the corresponding checkboxes as selected
            apiList.forEach(api => {
                const checkbox = document.querySelector(`.api-checkbox[data-api-id="${api.id}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const card = checkbox.closest('.api-card');
                    updateCardSelection(card, true);
                }
            });
            
            // Clear the session storage after loading
            sessionStorage.removeItem('selectedAPIs');
            
            updateSelectedCount();
            updateGenerateButton();
        } catch (error) {
            console.error('Error loading pre-selected APIs:', error);
        }
    }
}

function setupAPICardSelection() {
    const apiCards = document.querySelectorAll('.api-card');
    const checkboxes = document.querySelectorAll('.api-checkbox');
    
    // Handle card click selection
    apiCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on checkbox
            if (e.target.type === 'checkbox') return;
            
            const checkbox = card.querySelector('.api-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                updateCardSelection(card, checkbox.checked);
                updateSelectedCount();
                updateGenerateButton();
            }
        });
    });
    
    // Handle checkbox change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const card = checkbox.closest('.api-card');
            updateCardSelection(card, checkbox.checked);
            updateSelectedCount();
            updateGenerateButton();
        });
    });
}

function updateCardSelection(card, isSelected) {
    if (isSelected) {
        card.classList.add('selected');
    } else {
        card.classList.remove('selected');
    }
}

function updateSelectedCount() {
    const selectedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    const countElement = document.getElementById('selectedCount');
    if (countElement) {
        countElement.textContent = selectedCheckboxes.length;
    }
}

function updateGenerateButton() {
    const selectedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    const generateBtn = document.getElementById('generateBtn');
    
    if (generateBtn) {
        generateBtn.disabled = selectedCheckboxes.length === 0;
    }
}

function selectAllAPIs() {
    const checkboxes = document.querySelectorAll('.api-checkbox');
    const cards = document.querySelectorAll('.api-card');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    
    cards.forEach(card => {
        card.classList.add('selected');
    });
    
    updateSelectedCount();
    updateGenerateButton();
}

function clearAllSelections() {
    const checkboxes = document.querySelectorAll('.api-checkbox');
    const cards = document.querySelectorAll('.api-card');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    
    updateSelectedCount();
    updateGenerateButton();
}

function setupGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSDK);
    }
}

async function generateSDK() {
    // Prevent multiple simultaneous generations
    if (isGenerating) {
        console.log('SDK generation already in progress, ignoring duplicate request');
        return;
    }
    
    const generateBtn = document.getElementById('generateBtn');
    const selectedCheckboxes = document.querySelectorAll('.api-checkbox:checked');
    
    if (selectedCheckboxes.length === 0) {
        showAlert('Please select at least one API to generate SDK.', 'warning');
        return;
    }
    
    // Set generating flag and show loading state
    isGenerating = true;
    setButtonLoading(generateBtn, true);
    
    try {
        // Collect selected API IDs
        const selectedAPIIds = Array.from(selectedCheckboxes).map(cb => cb.value);
        
        // Get SDK configuration
        const sdkLanguage = document.getElementById('sdkLanguage')?.value || 'javascript';
        const sdkName = document.getElementById('sdkName')?.value || 'generated-sdk';
        
        // Get URL parameters
        const pathParts = window.location.pathname.split('/');
        const orgName = pathParts[1];
        const viewName = pathParts[3];
        const applicationId = pathParts[5];
        
        // Prepare request data
        const requestData = {
            selectedAPIs: selectedAPIIds,
            sdkConfiguration: {
                language: sdkLanguage,
                name: sdkName
            }
        };
        
        console.log('Generating SDK with data:', requestData);
        
        // Make API request
        const response = await fetch(`/${orgName}/views/${viewName}/applications/${applicationId}/generate-sdk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('SDK generation successful:', result.data);
            showSuccessModal(result);
        } else {
            throw new Error(result.message || 'SDK generation failed');
        }
        
    } catch (error) {
        console.error('Error generating SDK:', error);
        showAlert('Error generating SDK: ' + error.message, 'error');
    } finally {
        // Reset generating flag and loading state
        isGenerating = false;
        setButtonLoading(generateBtn, false);
    }
}

function setButtonLoading(button, loading) {
    if (!button) return;
    
    const normalState = button.querySelector('.button-normal-state');
    const loadingState = button.querySelector('.button-loading-state');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        if (normalState) normalState.style.display = 'none';
        if (loadingState) loadingState.style.display = 'inline-flex';
    } else {
        button.classList.remove('loading');
        // Only update button state if not currently generating
        if (!isGenerating) {
            updateGenerateButton(); // This will set the correct disabled state
        }
        if (normalState) normalState.style.display = 'inline-flex';
        if (loadingState) loadingState.style.display = 'none';
    }
}

function showSuccessModal(result) {
    const modal = document.getElementById('successModal');
    const downloadInfo = document.getElementById('downloadInfo');
    const downloadLink = document.getElementById('downloadLink');
    
    // Use finalDownloadUrl if available, otherwise fall back to downloadUrl
    const downloadUrl = result.data?.finalDownloadUrl || result.data?.downloadUrl || result.downloadUrl;
    
    if (downloadUrl && downloadLink) {
        downloadLink.href = downloadUrl;
        if (downloadInfo) {
            downloadInfo.style.display = 'block';
        }
        
        // Update download link text based on content
        if (result.data?.applicationCodeGenerated) {
            downloadLink.innerHTML = '<i class="bi bi-download me-1"></i> Download SDK + Application Code';
        } else {
            downloadLink.innerHTML = '<i class="bi bi-download me-1"></i> Download SDK';
        }
    }
    
    // Show modal using Bootstrap
    if (window.bootstrap && modal) {
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    } else if (modal) {
        // Fallback if Bootstrap is not available
        modal.style.display = 'block';
        modal.classList.add('show');
    }
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <strong>${type === 'error' ? 'Error!' : type === 'warning' ? 'Warning!' : 'Info!'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the container
    const container = document.querySelector('.sdk-generation-container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

function goBack() {
    // Navigate back to the application page
    const pathParts = window.location.pathname.split('/');
    pathParts.pop(); // Remove 'sdk-generation'
    const applicationUrl = pathParts.join('/');
    window.location.href = applicationUrl;
}

// Export functions for global access
window.selectAllAPIs = selectAllAPIs;
window.clearAllSelections = clearAllSelections;
window.generateSDK = generateSDK;
window.goBack = goBack;
