// Validation of the form

document.addEventListener('DOMContentLoaded', () => {
    const applicationNameInput = document.getElementById('editApplicationName');
    const descriptionTextarea = document.getElementById(
        'editApplicationDescription'
    );
    const remainingCharactersSpan = document.getElementById(
        'editApplicationRemainingCharacters'
    );
    const nameError = document.getElementById('editApplicationNameError');
    const descriptionError = document.getElementById(
        'editApplicationDescriptionError'
    );
    const editButton = document.getElementById('editApplicationEditButton');
    const cancelButton = document.getElementById('editApplicationCancelButton');

    const MAX_CHARACTERS = 512;

    const validateForm = () => {
        let hasError = false;
        if (!applicationNameInput.value.trim()) {
            nameError.style.display = 'block';
            hasError = true;
        } else {
            nameError.style.display = 'none';
        }
        const remaining = MAX_CHARACTERS - descriptionTextarea.value.length;
        if (remaining < 0) {
            descriptionError.style.display = 'block';
            hasError = true;
        } else {
            descriptionError.style.display = 'none';
        }
        editButton.disabled = hasError;
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
        window.history.back();
    });
    document
        .getElementById('editApplicationForm')
        .addEventListener('submit', (event) => {
            validateForm();
            if (editButton.disabled) {
                event.preventDefault();
            }
        });
});

// Submittion of the form

const form = document.getElementById('editApplicationForm');
const applicationId = form.dataset.applicationId;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('editApplicationName').value;
    const throttlingPolicy = document.getElementById(
        'editApplicationThrottlingPolicy'
    ).value;
    const description = document.getElementById(
        'editApplicationDescription'
    ).value;
    try {
        const response = await fetch(`/devportal/applications/${applicationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                throttlingPolicy,
                description,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        await showAlert(
            responseData.message || 'Application updated successfully!',
            'success'
        );
        form.reset();
        window.location.href = document.referrer || '/applications';
    } catch (error) {
        console.error('Error saving application:', error);
        await showAlert('Failed to update application.', 'error');
    }
});
