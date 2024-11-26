function showAlert(title, message, type) {
    const modalElement = document.getElementById('alertModal');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalBody = modalElement.querySelector('.modal-body');
    const modalHeader = modalElement.querySelector('.modal-header');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    modalHeader.classList.remove('success', 'error');

    modalHeader.classList.add(type);

    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}
