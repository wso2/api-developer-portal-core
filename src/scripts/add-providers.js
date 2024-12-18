/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
    console.log(`/devportal/organizations/${orgID}/provider`);
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

        console.log(`/devportal/organizations/${orgID}/provider/?name=${name}&property${property}`);
        const response = await fetch(`/devportal/organizations/${orgID}/provider/?name=${name}&property${property}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            window.location.href = 'configure';
        } else {
            showAlert(`Field validation failed`, `error`);
        }
}

