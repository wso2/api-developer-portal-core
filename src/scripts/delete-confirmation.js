function openDeleteModal(param1, param2, param3, param4) {
    const modal = document.getElementById('deleteConfirmation');
    modal.dataset.param1 = param1;
    modal.dataset.param2 = param2;
    modal.dataset.param3 = param3;
    modal.dataset.param4 = param4;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

async function deleteApplication() {
    const modal = document.getElementById('deleteConfirmation');
    const applicationId = modal.dataset.param1;
    const messageOverlay = document.getElementById(`message-overlay-${applicationId}`);
    const trashButton = document.getElementById(`trash-btn-${applicationId}`);

    try {
        // Show loading state
        if (trashButton) {
            trashButton.innerHTML =
                '<span style="font-size: 0.875rem;"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Deleting...</span>';
            trashButton.disabled = true;
        }
        const response = await fetch(`/devportal/applications/${applicationId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // remove the application card from the UI
            const cardWrapper = document.getElementById(`app-card-${applicationId}`);
            if (cardWrapper) {
                const colElement = cardWrapper.closest('.col-12');
                if (colElement) {
                    colElement.remove();
                } else {
                    cardWrapper.remove();
                }
            }
        } else {
            if (messageOverlay && typeof window.showAppDeleteMessage === 'function') {
                window.showAppDeleteMessage(messageOverlay, 'Failed to delete application. Please try again.', 'error');
            }
            trashButton.disabled = false;
            trashButton.innerHTML = '<i class="bi bi-trash"></i>';
        }
    } catch (error) {
        if (messageOverlay && typeof window.showAppDeleteMessage === 'function') {
            window.showAppDeleteMessage(
                messageOverlay,
                'An error occurred while deleting the application. Please try again.',
                'error',
            );
        }
        trashButton.disabled = false;
        trashButton.innerHTML = '<i class="bi bi-trash"></i>';
    }
}

window.showAppDeleteMessage = function (overlay, message, type = 'success') {
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
