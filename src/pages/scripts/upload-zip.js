document.addEventListener('DOMContentLoaded', function() {
    console.log('Inside upload listenr');
    const uploadArea = document.getElementById('uploadArea');
    const zipFile = document.getElementById('file');
    const fileName = document.getElementById('fileName');

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

    function updateFileName() {
        fileName.textContent = zipFile.files[0] ? `Selected file: ${zipFile.files[0].name}` : '';
    }
});