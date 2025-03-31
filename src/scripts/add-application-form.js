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
        await showAlert(responseData.message || 'Application saved successfully!', 'success');
        applicationForm.reset();
        console.log('document.referrer:', document.referrer);
        console.log('redirect fallback:', '/default/applications');

        if (window.location.href.includes('/apis')) {
            window.location.reload();
        } else {
            //window.location.href = document.referrer || 'applications';
            window.location.reload();
        }
    } catch (error) {
        console.error('Error saving application:', error);
        await showAlert('Failed to save application.', 'error');
    }
});
