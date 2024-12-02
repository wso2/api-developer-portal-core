document.addEventListener('DOMContentLoaded', function () {

    const uploadForm = document.getElementById('editForm');
    const editFileModal = new bootstrap.Modal(document.getElementById('editFileModal'));

    // Edit file functionality
    document.querySelectorAll('.edit-file').forEach(button => {
        console.log('Inside event listenr')
        button.addEventListener('click', function () {
            const fileId = this.getAttribute('data-file-id');
            document.getElementById('editFileId').value = fileId;
            editFileModal.show();
        });

    });

    uploadForm.addEventListener('submit', async (e) => {

        console.log('Inside submit')
        const zipFile = document.getElementById('editZipFile');
        const redirect = document.getElementById('redirect');
        e.preventDefault(); // Prevent default form submission
        if (!zipFile.files[0]) {
            alert('Please select a ZIP file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', zipFile.files[0]);
        formData.append('redirect', redirect.value);
        try {
            console.log('Inside update request')
            const response = await fetch('/devportal/organizations/{{orgID}}/layout', {
                method: 'PUT', // Specify PUT method
                body: formData,
                // Note: Do not set 'Content-Type' to 'multipart/form-data' manually.
                // The browser will set it including the correct boundary.
                credentials: 'same-origin' // Include cookies if needed
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Upload successful! Organization ID: ${result.orgId}, File Name: ${result.fileName}`);
                // Optionally, redirect or update the UI
                //window.location.href = `/${result.orgId}/configure`;
            } else {
                const error = await response.text();
                alert(`Upload failed: ${error}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An unexpected error occurred while uploading the file.');
        }

    });
});
