function showApplicationForm() {
    const appCard = document.getElementById('applicationCreateCard');
    const formView = document.getElementById('applicationCreateForm');

    if (formView) {
        formView.classList.remove('d-none');
        appCard.classList.add('d-none')
    }
}
function toggleCreateCard() {
    const wrapper = document.getElementById('createApplicationCardWrapper');
    const form = document.getElementById('applicationCreateForm');
    const plusCard = document.getElementById('applicationCreateCard');

    if (wrapper && form) {
        wrapper.classList.remove('d-none');

        form.classList.remove('d-none');

        if (plusCard) {
            plusCard.classList.add('d-none');
        }

        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function hideApplicationForm(el) {
    const hasApps = el.getAttribute('data-has-apps') === 'true';
    const plusCard = document.getElementById('applicationCreateCard');
    const formView = document.getElementById('applicationCreateForm');
    const wrapper = document.getElementById('createApplicationCardWrapper');

    if (wrapper && formView) {
        formView.classList.add('d-none');
        if (hasApps) {
            wrapper.classList.add('d-none');
            plusCard.classList.add('d-none');
        } else{
            wrapper.classList.remove('d-none');
            plusCard.classList.remove('d-none');
        }

    }
}

// Validation of the form

document.addEventListener('DOMContentLoaded', () => {
    const applicationNameInput = document.getElementById('applicationName');
    const descriptionTextarea = document.getElementById('applicationDescription');
    const remainingCharactersSpan = document.getElementById(
        'remainingCharacters'
    );
    const nameError = document.getElementById('nameError');
    const descriptionError = document.getElementById('descriptionError');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    const MAX_CHARACTERS = 256;

    const validateForm = () => {
        let hasError = false;

        if (!applicationNameInput.value.trim()) {
            nameError.style.visibility = 'visible';
            hasError = true;
        } else {
            nameError.style.visibility = 'hidden';
        }

        const remaining = descriptionTextarea
            ? MAX_CHARACTERS - descriptionTextarea.value.length
            : MAX_CHARACTERS;
        if (descriptionTextarea && remaining < 0) {
            descriptionError.style.display = 'block';
            hasError = true;
        } else {
            descriptionError.style.display = 'none';
        }

        saveButton.disabled = hasError;
    };

    descriptionTextarea.addEventListener('input', () => {
        const remaining = Math.max(
            0,
            MAX_CHARACTERS - descriptionTextarea.value.length
        );
        remainingCharactersSpan.textContent = remaining;
        validateForm();
    });

    applicationNameInput.addEventListener('input', validateForm);

    cancelButton.addEventListener('click', () => {
        closeModal('createAppModal');
    });

    document
        .getElementById('applicationForm')
        .addEventListener('submit', (event) => {
            validateForm();
            if (saveButton.disabled) {
                event.preventDefault();
            }
        });

    // Initialize the character count and form validation on page load
    const remaining = Math.max(
        0,
        MAX_CHARACTERS - descriptionTextarea.value.length
    );
    remainingCharactersSpan.textContent = remaining;
    validateForm();
});

// Submittion of the form

const applicationForm = document.getElementById('applicationForm');

applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('applicationName').value;
    const description = document.getElementById(
        'applicationDescription'
    ).value;

    try {
        const response = await fetch('/devportal/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                description,
                type: 'WEB',
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const messageOverlay = document.getElementById('message-overlay');
        if (messageOverlay && typeof window.showApiMessage === 'function') {
            window.showApiMessage(
                messageOverlay,
                responseData.message || 'Application created successfully!',
                'success'
            );
        }
        applicationForm.reset();
        window.location.reload();
    } catch (error) {
        console.error('Error saving application:', error);
        const messageOverlay = document.getElementById('message-overlay');
        if (messageOverlay && typeof window.showApiMessage === 'function') {
            window.showAppMessage(
                messageOverlay,
                'Failed to save application.',
                'error'
            );
        }
    }
});

window.showAppMessage = function(overlay, message, type = 'success') {
    if (overlay) {
        // Clear any existing auto-hide timers
        if (overlay.hideTimer) {
            clearTimeout(overlay.hideTimer);
            overlay.hideTimer = null;
        }

        // Set message - keeping it simple and concise
        const messageText = overlay.querySelector('.message-text');
        if (messageText) messageText.textContent = message;

        // Set type (success/error)
        overlay.classList.remove('success', 'error');
        overlay.classList.add(type);

        // Update icon - ensure proper class structure for alignment
        const icon = overlay.querySelector('.message-icon');
        if (icon) {
            icon.className = 'bi message-icon ' + type;
            icon.classList.add(type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill');
        }

        // Show the overlay (remove hidden class if it exists)
        overlay.classList.remove('hidden');

        // Auto-hide after the designated time
        overlay.hideTimer = setTimeout(() => {
            overlay.classList.add('hidden');
        }, 5000);

        return overlay;
    }
    return null;
};
