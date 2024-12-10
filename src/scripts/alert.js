function showAlert(message, type) {
    return new Promise((resolve) => {
        const modalElement = document.getElementById('alertModal');
        const modalMessage = modalElement.querySelector('.modal-message');
        const modalBody = modalElement.querySelector('.modal-body');

        modalMessage.textContent = message;

        modalBody.classList.remove('success', 'error');
        modalBody.classList.add(type);

        const bootstrapModal = new bootstrap.Modal(modalElement, { backdrop: false });
        bootstrapModal.show();

        setTimeout(() => {
            modalElement.classList.add('fade-out');
            setTimeout(() => {
                bootstrapModal.hide();
                modalElement.classList.remove('fade-out');
                resolve(); 
            }, 500); 
        }, 2300); 
    });
}
