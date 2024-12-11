/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(input));
        return div.innerHTML;
    }
    const createOrg = document.getElementById('createOrg');
    createOrg.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createOrg);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = sanitizeInput(value);
        });
        data['scope'] = 'openid';
        const response = await fetch('/devportal/organizations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.href = '/portal/';
        } else {
            showAlert(`Field validation failed`, `error`);
        }
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const details = this.closest('.organization').querySelector('.organization-details');
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Edit';
            } else {
                details.style.display = 'block';
                this.textContent = 'Close';
            }
        });
    });
    const editOrgs = document.querySelectorAll('.editOrg');
    const deleteForms = document.querySelectorAll('.delete-org');
    deleteForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let orgID = form.querySelector('#orgId').value;
            orgID = sanitizeInput(orgID);
            const response = await fetch(`/devportal/organizations/${orgID}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.href = '/portal/';
            } else {
                showAlert(`Field validation failed`, `error`);
            }
        });
    });
    editOrgs.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = sanitizeInput(value);
            });
            //const orgID = form.querySelector('#orgId').value;
            const orgID = data['orgId'];
            const response = await fetch(`/devportal/organizations/${orgID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = '/portal/';
            } else {
                showAlert(`Field validation failed`, `error`);
            }
        });
    });
});