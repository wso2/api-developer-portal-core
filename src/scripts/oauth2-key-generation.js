async function generateApplicationKey(formId, appId, keyType, keyManager, clientName) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const jsonObject = getFormData(formData, keyManager, clientName);

    try {
        const response = await fetch(`/devportal/applications/${appId}/generate-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "grantTypesToBeSupported": jsonObject.grantTypes,
                "keyType": keyType,
                "keyManager": keyManager,
                "callbackUrl": jsonObject.callbackURL,
                "scopes": [
                    "default"
                ],
                "validityTime": 3600,
                "additionalProperties": jsonObject.additionalProperties
            }),
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Application keys generated successfully!', 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to generate keys:', responseData);
            await showAlert(`Failed to generate application keys. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred generating application keys: \n${error.message}`, 'error');
    }
}

function getFormData(formData, keyManager, clientName) {
    let jsonObject = {
        additionalProperties: {},
    };

    if (keyManager !== 'Resident Key Manager') {
        additionalProperties = {
            "client_id": formData.get('consumerKey'),
            "client_name": clientName,
            "redirect_uris": [formData.get('callbackURL')],
            "grant_types": formData.getAll('grantTypes')
        }
        jsonObject.additionalProperties = additionalProperties;
    }

    formData.forEach((value, key) => {
        if (key.startsWith("additionalProperties.")) {
            // If the key is part of additionalProperties, add it to that object
            const propName = key.replace("additionalProperties.", ""); // Remove the prefix
            jsonObject.additionalProperties[propName] = value;
          } else {
            // Handle multiple checkbox values
            if (jsonObject[key]) {
                if (Array.isArray(jsonObject[key])) {
                    jsonObject[key].push(value);
                } else {
                    jsonObject[key] = [jsonObject[key], value];
                }
            } else {
                jsonObject[key] = value;
            }
        }
    });

    return jsonObject;
};

async function updateApplicationKey(formId, appId, keyType, keyManager, keyManagerId, clientName) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const jsonObject = getFormData(formData, keyManager, clientName);

    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyManagerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "supportedGrantTypes": jsonObject.grantTypes,
                "keyType": keyType,
                "keyManager": keyManager,
                "callbackUrl": jsonObject.callbackURL,
                "consumerKey": jsonObject.consumerKey,
                "consumerSecret": null,
                "keyMappingId": keyManagerId,
                "additionalProperties": jsonObject.additionalProperties
            }),
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Application keys generated successfully!', 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to generate keys:', responseData);
            await showAlert(`Failed to generate application keys. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred generating application keys: \n${error.message}`, 'error');
    }
}

async function removeApplicationKey() {
    const modal = document.getElementById('deleteConfirmation');
    const applicationId = modal.dataset.applicationId;
    const keyMappingId = modal.dataset.mappingId;

    try {
        const response = await fetch(`/devportal/applications/${applicationId}/oauth-keys/${keyMappingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Application keys removed successfully!', 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to removed keys:', responseData);
            await showAlert(`Failed to removed application keys. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred removing application keys: \n${error.message}`, 'error');
    }
}

async function generateOauthKey(formId, appId, keyMappingId, keyManager, clientName) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const jsonObject = getFormData(formData, keyManager, clientName);

    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyMappingId}/generate-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "additionalProperties": jsonObject.additionalProperties,
                "consumerSecret": jsonObject.consumerSecret,
                "revokeToken": null,
                "scopes": [],
                "validityPeriod": 3600
            }),
        });

        const responseData = await response.json();
        openApiKeyModal(responseData.accessToken, "Generated OAuth Token", "OAuth Token");
        if (response.ok) {
            await showAlert('OAuth keys generated successfully!', 'success');
        } else {
            console.error('Failed to generate OAuth keys:', responseData);
            await showAlert(`Failed to generate OAuth keys. Please try again.\n${responseData.description}`, 'error');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred while generating OAuth keys: \n${error.message}`, 'error');
    }

}