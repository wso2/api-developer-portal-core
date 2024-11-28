function openDeleteModal(applicationId) {
  const modal = document.getElementById('deleteConfirmation');
  modal.dataset.applicationId = applicationId;
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

function deleteApplication(baseUrl) {
  const modal = document.getElementById('deleteConfirmation');
  const applicationId = modal.dataset.applicationId;
  fetch(`/applications/${applicationId}`, { method: 'DELETE' })
    .then((response) => {
      if (response.ok) {
        console.log('Application deleted successfully.');
      } else {
        console.error('Failed to delete application.');
      }
    })
    .catch((error) => console.error('Error deleting application:', error));
    window.location.reload(true);
}
