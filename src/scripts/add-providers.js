/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


document.addEventListener('DOMContentLoaded', function () {

    const createProviderBtn = document.getElementById('createProviderBtn');
    const viewProviders = document.getElementById('providerDetails');
    const addProviders = document.getElementById('addProvider');
    const cancelProviderBtn = document.getElementById('cancelProviderBtn');

    createProviderBtn.addEventListener('click', function () {
        viewProviders.style.display = 'none';
        addProviders.style.display = 'block';
    });

    cancelProviderBtn.addEventListener('click', function () {
        viewProviders.style.display = 'block';
        addProviders.style.display = 'none';
    });
});

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

async function addProviders(orgID) {

    const formData = new FormData(document.getElementById("createProviderForm"));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = sanitizeInput(value);
    });
    const response = await fetch(`/devportal/organizations/${orgID}/provider`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        window.location.href = 'configure';
    } else {
        showAlert(`Field validation failed`, `error`);
    }

    // Clear the form
    document.getElementById('providerId').value = '';
    document.getElementById('providerUrl').value = '';
}

async function editProvider(orgID, formID) {

    const editProvider = document.getElementById(formID);
    const formData = new FormData(editProvider);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = sanitizeInput(value);
    });
    const response = await fetch(`/devportal/organizations/${orgID}/provider`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
       window.location.href = 'configure';
    } else {
        showAlert(`Field validation failed`, `error`);
    }

}

async function deleteProvider(orgID, name, property) {

        const response = await fetch(`/devportal/organizations/${orgID}/provider/?name=${name}&property${property}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            window.location.href = 'configure';
        } else {
            showAlert(`Field validation failed`, `error`);
        }
}

