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

  cancelButton.addEventListener('click', () => {
    window.history.back(); 
  });

  document
    .getElementById('createApplicationForm')
    .addEventListener('submit', (event) => {
      validateForm();
      if (saveButton.disabled) {
        event.preventDefault();
      }
    });
});
