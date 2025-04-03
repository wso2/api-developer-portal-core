//DOM References
const plusCard = document.getElementById('applicationCreateCard');
const formView = document.getElementById('applicationCreateForm');
const wrapper = document.getElementById('createApplicationCardWrapper');
const createButton = document.getElementById('createButton');
const remainingCharactersSpan = document.getElementById('remainingCharacters');
const nameError = document.getElementById('nameError');
const appErrror = document.getElementById('appError');
const descriptionError = document.getElementById('descriptionError');
const saveButton = document.getElementById('createAppButton');
const cancelButton = document.getElementById('cancelCreateButton');
const applicationForm = document.getElementById('applicationForm');
const nameInput = document.getElementById('applicationName');
const name = document.getElementById('applicationName').value;

let hasStartTyping = false;

function showApplicationForm() {
    if (formView) {
        formView.classList.remove('d-none');
        plusCard.classList.add('d-none')
    }
}

function toggleCreateCard() {
    if (wrapper && formView) {
        wrapper.classList.remove('d-none');
        formView.classList.remove('d-none');
        createButton.disabled = true;
        if (plusCard) {
            plusCard.classList.add('d-none');
        }
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function hideApplicationForm(el) {
    const hasApps = el.getAttribute('data-has-apps') === 'true';
    if (wrapper && formView) {
        formView.classList.add('d-none');
        hasStartTyping = false;
        if (hasApps) {
            createButton.disabled = false;
            wrapper.classList.add('d-none');
            plusCard.classList.add('d-none');
        } else{
            wrapper.classList.remove('d-none');
            plusCard.classList.remove('d-none');
        }

    }
}

// Function to show loading state on Create button
window.showCreateButtonLoading = function(button) {
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
window.resetButtonState = function(button) {
    if (button && button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
        cancelButton.disabled = false;
        appErrror.classList.add('d-none');
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

    cancelButton.addEventListener('click', () => {
        closeModal('createAppModal');
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
        applicationForm.reset();
        saveButton.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Created`;
        saveButton.disabled = true;
        cancelButton.disabled = true;
        nameInput.disabled = true;
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        appErrror.classList.remove('d-none');
        resetButtonState(saveButton);
        console.error('Error saving application:', error);
    }
});

