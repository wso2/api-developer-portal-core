async function generateApplicationKey(formId, appId, keyType, keyManager, clientName, subscriptions, orgID) {

    const form = document.getElementById(formId);
    const apiList = []
    const subList = JSON.parse(subscriptions);
    subList.forEach(subscription => {
        apiList.push({
            "apiName": subscription.apiInfo.apiName,
            "apiRefId": subscription.apiReferenceID,
            "policyID": subscription.policyID
        });
    });
    const formData = new FormData(form);
    const jsonObject = getFormData(formData, keyManager, clientName);
    const payload = JSON.stringify({
        "applicationName": clientName,
        "apis": apiList,
        "tokenType": "OAUTH",
        "tokenDetails": {
            "grantTypesToBeSupported": jsonObject.grantTypes,
            "keyType": keyType,
            "keyManager": keyManager,
            "callbackUrl": jsonObject.callbackURL,
            "scopes": [
                "default"
            ],
            "validityTime": 3600,
            "additionalProperties": jsonObject.additionalProperties
        }
    })
    console.log("Payload", payload);
    try {
        const response = await fetch(`/devportal/organizations/${orgID}/app-key-mapping`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Application keys generated successfully!', 'success');
            const consumerKey = responseData.consumerKey;
            const consumerSecret = responseData.consumerSecret;
            console.log(responseData);
            document.getElementById("consumerKey").value = consumerKey;
            document.getElementById("consumerSecret").value = consumerSecret
            //const url = new URL(window.location.origin + window.location.pathname);
            //window.location.href = url.toString();
        } else {
            console.error('Failed to generate keys:', responseData);
            await showAlert(`Failed to generate application keys. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred generating application keys: \n${error.message}`, 'error');
    }
}

async function cleanUp(applicationId, keyMappingId) {
    try {
        const response = await fetch(`/devportal/applications/${applicationId}/oauth-keys/${keyMappingId}/clean-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Application keys cleaned up successfully!', 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to clean up keys:', responseData);
            await showAlert(`Failed to clean up application keys. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred cleaning up application keys: \n${error.message}`, 'error');
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
            const propName = key.replace("additionalProperties.", "");
            // Handle multiple optional value selection
            if (jsonObject.additionalProperties[propName]) {
                if (Array.isArray(jsonObject.additionalProperties[propName])) {
                    jsonObject.additionalProperties[propName].push(value);
                } else {
                    jsonObject.additionalProperties[propName] = [jsonObject.additionalProperties[propName], value];
                }
            } else {
                if (propName === 'response_types') {
                    jsonObject.additionalProperties[propName] = [value];
                } else {
                    jsonObject.additionalProperties[propName] = value;
                }
            }
        } else {
            // Handle multiple checkbox values
            if (jsonObject[key]) {
                if (Array.isArray(jsonObject[key])) {
                    jsonObject[key].push(value);
                } else {
                    jsonObject[key] = [jsonObject[key], value];
                }
            } else {
                if (key === 'grantTypes') {
                    jsonObject[key] = [value];
                } else {
                    jsonObject[key] = value;
                }
            }
        }
    });

    return jsonObject;
};

async function updateApplicationKey(formId, appMap, keyType, keyManager, keyManagerId, clientName) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const jsonAppdata = JSON.parse(appMap);
    //TODO: Handle multiple CP applications
    const appId = jsonAppdata[0].appRefID;
    const jsonObject = getFormData(formData, keyManager, clientName);
    const payload = JSON.stringify({
        "supportedGrantTypes": jsonObject.grantTypes,
        "keyType": keyType,
        "keyManager": keyManager,
        "callbackUrl": jsonObject.callbackURL,
        "consumerKey": jsonObject.consumerKey,
        "consumerSecret": jsonObject.consumerSecret,
        "keyMappingId": keyManagerId,
        "additionalProperties": jsonObject.additionalProperties
    });
    console.log("Update payload ", payload);
    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyManagerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });

        const responseData = await response.json();
        console.log("Update response", responseData)
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


async function generateCurl(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const tokenURL = formData.get('tokenURL');
    const auth = btoa(`${formData.get('consumerKey')}:${formData.get('consumerSecret')}`);
    const curl = `curl -k -X POST ${tokenURL} -d "grant_type=password&username=Username&password=Password" -H "Authorization: Basic ${auth}"`;

    openApiKeyModal(curl, "CURL to Generate Access Token", "The following cURL command shows how to generate an access token using the Password Grant type.");
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