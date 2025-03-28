function showApplicationForm(cardEl) {
    const defaultView = cardEl.querySelector('.create-project-content');
    const formView = cardEl.querySelector('.application-create-card');
  
    if (defaultView && formView) {
      defaultView.classList.add('d-none');
      formView.classList.remove('d-none');
    }
  }
  
function hideApplicationForm(el) {
  const cardEl = el.closest('.create-project-card');
  const defaultView = cardEl.querySelector('.create-project-content');
  const formView = cardEl.querySelector('.application-create-card');

  if (defaultView && formView) {
    defaultView.classList.remove('d-none');
    formView.classList.add('d-none');
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
