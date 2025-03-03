function openDeleteModal(param1, param2, param3) {
  const modal = document.getElementById('deleteConfirmation');
  modal.dataset.param1 = param1;
  modal.dataset.param2 = param2;
  modal.dataset.param3 = param3;
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

async function deleteApplication() {
  const modal = document.getElementById('deleteConfirmation');
  const applicationId = modal.dataset.param1;
  try {
    const response = await fetch(`/devportal/applications/${applicationId}`, { method: 'DELETE' });
    if (response.ok) {
      console.log('Application deleted successfully.');
      await showAlert('Application deleted successfully!', 'success');
    } else {
      console.error('Failed to delete application.');
      await showAlert('Failed to delete application. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    await showAlert('An error occurred while deleting the application. Please try again.', 'error');
  }
  window.location.reload(true);
}