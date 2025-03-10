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

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    document
        .getElementById('applicationForm')
        .addEventListener('submit', (event) => {
            validateForm();
            if (saveButton.disabled) {
                event.preventDefault();
            }
        });
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
        await showAlert(responseData.message || 'Application saved successfully!', 'success');
        applicationForm.reset();
        if (window.location.href.includes('/apis')) {
            window.location.reload();
        } else {
            window.location.href = document.referrer || '/applications';
        }
    } catch (error) {
        console.error('Error saving application:', error);
        await showAlert('Failed to save application.', 'error');
    }
});
