//DOM References
const createModal = document.getElementById('app-create-modal');
const createModalClose = document.getElementById('app-create-close');
const createButton = document.getElementById('createButton');
const createButtonEmpty = document.getElementById('createButtonEmpty');
const remainingCharactersSpan = document.getElementById('remainingCharacters');
const nameError = document.getElementById('nameError');
const descriptionError = document.getElementById('descriptionError');
const saveButton = document.getElementById('createAppButton');
const cancelButton = document.getElementById('cancelCreateButton');
const applicationForm = document.getElementById('applicationForm');
const nameInput = document.getElementById('applicationName');
/* Dropped: `const name = document.getElementById('applicationName').value;`. It read the
   field at parse time, so it was always the empty string, and nothing used it - the submit
   handler reads the value again when it fires. It was also the one unguarded dereference
   left at module scope, which would have taken the whole script down on any page that
   loads it without a create form. */

let hasStartTyping = false;

/* The form is a dialog now, not a card expanded in the grid.

   The old showApplicationForm / toggleCreateCard / hideApplicationForm are gone. They
   existed only as onclick targets in applications-listing.hbs, which now binds through
   addEventListener instead. Dropping showApplicationForm also removes a real hazard: this
   file and subscription.js both declared a top-level function of that name, and both are
   loaded together on the apis, api-landing and mcp pages, where whichever parsed last
   silently won. subscription.js's is the one those pages mean. */

function openCreateModal() {
    if (!createModal) return;
    // Always open on a clean form: the dialog persists in the DOM between opens.
    if (applicationForm) applicationForm.reset();
    hasStartTyping = false;
    if (nameError) nameError.classList.add('d-none');
    if (descriptionError) descriptionError.style.display = 'none';
    if (remainingCharactersSpan) remainingCharactersSpan.textContent = '256';
    if (saveButton) saveButton.disabled = true;
    createModal.classList.add('show');
    document.body.classList.add('app-modal-open');
    // After the class lands, or focus() runs against a display:none subtree.
    setTimeout(() => nameInput?.focus(), 60);
}

function closeCreateModal() {
    if (!createModal) return;
    createModal.classList.remove('show');
    document.body.classList.remove('app-modal-open');
}


// Function to show loading state on Create button
window.showCreateButtonLoading = function (button) {
    if (button) {
        // Store original text
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = 'Creating...';
        button.disabled = true;
        cancelButton.disabled = true;
        nameInput.disabled = true;
    }
};

// Function to restore Create button state
window.resetButtonState = function (button) {
    if (button && button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
        cancelButton.disabled = false;
        nameInput.disabled = false;
    }
};

// Validation of the form
document.addEventListener('DOMContentLoaded', () => {
    const applicationNameInput = document.getElementById('applicationName');
    const descriptionTextarea = document.getElementById('applicationDescription');
    const MAX_CHARACTERS = 256;

    applicationNameInput.addEventListener('input', () => {
        hasStartTyping = true;
        validateForm();
    });

    const validateForm = () => {
        let hasError = false;

        if (!applicationNameInput.value.trim()) {
            if (hasStartTyping) {
                nameError.classList.remove('d-none');
            }
            hasError = true;
        } else {
            nameError.classList.add('d-none');
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

        if (saveButton) {
            saveButton.disabled = hasError;
        }
    };

    descriptionTextarea.addEventListener('input', () => {
        const remaining = Math.max(
            0,
            MAX_CHARACTERS - descriptionTextarea.value.length
        );
        remainingCharactersSpan.textContent = remaining;
        validateForm();
    });

    /* Was `closeModal('createAppModal')`, which threw: closeModal is defined in
       subscription.js, and the applications page does not load it. It also pointed at the
       shared create-app partial's dialog rather than this page's own form.
       No longer gated on the header create button existing either - that button is absent
       on an empty portal, where the dialog opens from the empty state, and the gate left
       Cancel dead there. */
    cancelButton?.addEventListener('click', closeCreateModal);
    createModalClose?.addEventListener('click', closeCreateModal);
    createButton?.addEventListener('click', openCreateModal);
    createButtonEmpty?.addEventListener('click', openCreateModal);

    // Click the backdrop, not the dialog, to dismiss.
    createModal?.addEventListener('click', (event) => {
        if (event.target === createModal) closeCreateModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && createModal?.classList.contains('show')) {
            closeCreateModal();
        }
    });

    document
        .getElementById('applicationForm')
        .addEventListener('submit', (event) => {
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
applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('applicationName').value;
    const description = document.getElementById(
        'applicationDescription'
    ).value;

    showCreateButtonLoading(saveButton);

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
        if (messageOverlay && typeof window.showAppMessage === 'function') {
            window.showAppMessage(
                messageOverlay,
                responseData.message || 'Application created successfully!',
                'success',
            );
        }
        saveButton.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Created`;
        window.location.reload();
    } catch (error) {
        resetButtonState(saveButton);
        console.error('Error saving application:', error);
        const messageOverlay = document.getElementById('message-overlay');
        if (messageOverlay && typeof window.showAppMessage === 'function') {
            window.showAppMessage(messageOverlay, 'Failed to create application.', 'error');
        }
    }
});

window.showAppMessage = function (overlay, message, type = 'success') {
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
        return overlay;
    }
    return null;
};
