/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
    
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
});

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

async function createOrg() {

    const formData = new FormData(document.getElementById("createOrg"));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = sanitizeInput(value);
    });
    const response = await fetch(`/devportal/organizations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        window.location.href = '/portal/';
    } else {
        showAlert(`Field validation failed`, `error`);
    }
}

async function editOrg(orgID, formID) {

    const formData = new FormData(document.getElementById(formID));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = sanitizeInput(value);
    });
    const response = await fetch(`/devportal/organizations/${orgID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        window.location.href = '/portal/';
    } else {
        showAlert(`Field validation failed`, `error`);
    }
}

async function deleteOrg(orgID) {

    const response = await fetch(`/devportal/organizations/${orgID}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        window.location.href = '/portal/';
    } else {
        showAlert(`Field validation failed`, `error`);
    }
}