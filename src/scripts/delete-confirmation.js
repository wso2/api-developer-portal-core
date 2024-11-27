function openDeleteModal(applicationId) {
  const modal = document.getElementById('deleteConfirmation');
  modal.dataset.applicationId = applicationId;
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

function deleteApplication() {
  console.log('Deleting application...');
  const modal = document.getElementById('deleteConfirmation');
  const applicationId = modal.dataset.applicationId;
  console.log(`Deleting application with ID: ${applicationId}`);

  // fetch(`/applications/${applicationId}`, { method: 'DELETE' })
  //   .then((response) => {
  //     if (response.ok) {
  //       console.log('Application deleted successfully.');
  //       document.getElementById(applicationId).remove();
  //     } else {
  //       console.error('Failed to delete application.');
  //     }
  //   })
  //   .catch((error) => console.error('Error deleting application:', error));
  window.location.href = document.referrer || '/applications';
}
