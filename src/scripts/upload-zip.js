document.addEventListener('DOMContentLoaded', function () {

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(input));
        return div.innerHTML;
    }
    //upload new organization content
    const uploadArea = document.getElementById('uploadArea');
    const zipFile = document.getElementById('file');
    const fileName = document.getElementById('fileName');
    const orgContent = document.getElementById('uploadOrgContent');

    if (uploadArea) {
        uploadArea.addEventListener('click', () => zipFile.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#007bff';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#ccc';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#ccc';
            if (e.dataTransfer.files.length) {
                zipFile.files = e.dataTransfer.files;
                updateFileName();
            }
        });
        zipFile.addEventListener('change', updateFileName);
        //upload organization content
        orgContent.addEventListener('submit', async (e) => {
            e.preventDefault();
            let orgID = document.getElementById('orgId').value;
            orgID = sanitizeInput(orgID);
            const zipFile = document.getElementById('file');
            const formData = new FormData();
            formData.append('file', zipFile.files[0]);
            const response = await fetch(`/devportal/organizations/${orgID}/layout`, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin' // Include cookies if needed
            });
            if (response.ok) {
                window.location.href = 'configure';
            } else {
                alert("Uploading organization content failed");
            }
        });

        function updateFileName() {
            fileName.textContent = zipFile.files[0] ? `Selected file: ${zipFile.files[0].name}` : '';
        }
    }

    //update organization content
    const updateZip = document.getElementById('editForm');
    // eslint-disable-next-line no-undef
    const editFileModal = new bootstrap.Modal(document.getElementById('editFileModal'));

    // Edit file functionality
    document.querySelectorAll('.edit-file').forEach(button => {
        button.addEventListener('click', function () {
            const fileId = this.getAttribute('data-file-id');
            document.getElementById('editFileId').value = fileId;
            editFileModal.show();
        });

    });
    updateZip.addEventListener('submit', async (e) => {

        const zipFile = document.getElementById('editZipFile');
        let orgID = document.getElementById('orgId').value;
        orgID = sanitizeInput(orgID);
        e.preventDefault(); // Prevent default form submission
        if (!zipFile.files[0]) {
            alert('Please select a ZIP file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', zipFile.files[0]);
        //formData.append('redirect', redirect.value);
        try {
            const response = await fetch(`/devportal/organizations/${orgID}/layout`, {
                method: 'PUT', // Specify PUT method
                body: formData,
                // Note: Do not set 'Content-Type' to 'multipart/form-data' manually.
                // The browser will set it including the correct boundary.
                credentials: 'same-origin' // Include cookies if needed
            });
            if (response.ok) {
                const result = await response.json();
                alert(`Upload successful! Organization ID: ${result.orgId}, File Name: ${result.fileName}`);
                window.location.href = 'configure';
            } else {
                const error = await response.text();
                alert(`Upload failed: ${error}`);
            }
        } catch (error) {
            alert('An unexpected error occurred while uploading the file.', error);
        }
    });
    //create IDP
    const createIDP = document.getElementById('createIDP');
    if (createIDP) {
        createIDP.addEventListener('submit', async (e) => {
            e.preventDefault();
            let orgID = document.getElementById('orgId').value;
            orgID = sanitizeInput(orgID);
            const formData = new FormData(createIDP);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = sanitizeInput(value);;
            });
            data['scope'] = 'openid';
            const response = await fetch(`/devportal/organizations/${orgID}/identityProvider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = 'configure';
            } else {
                alert(`Field validation failed`);
            }
        });
    }
    //update IDP
    const editIDPButton = document.getElementById('idpEdit');
    if (editIDPButton) {
        editIDPButton.addEventListener('click', function () {
            const details = this.closest('.organization').querySelector('.organization-details');
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Edit';
            } else {
                details.style.display = 'block';
                this.textContent = 'Close';
            }
        });
        const editIDP = document.getElementById('editIDP');
        const orgID = document.getElementById('orgId').value;
        editIDP.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(editIDP);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = sanitizeInput(value);;
            });
            data['scope'] = 'openid';
            const response = await fetch(`/devportal/organizations/${orgID}/identityProvider`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = 'configure';
            } else {
                alert(`Field validation failed`);
            }
        });
        //delete idp
        const idpDelete = document.getElementById('idp-delete');
        idpDelete.addEventListener('submit', async (e) => {
            e.preventDefault();
            let orgID = document.getElementById('orgId').value;
            orgID = sanitizeInput(orgID);
            const response = await fetch(`/devportal/organizations/${orgID}/identityProvider`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.href = 'configure';
            } else {
                alert(`Field validation failed`);
            }
        });
    }
});
