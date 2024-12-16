/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
async function generateApplicationKey(appId, keyType) {
    try {
        const response = await fetch(`/devportal/applications/${appId}/generate-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "grantTypesToBeSupported": [
                    "password",
                    "client_credentials"
                ],
                "keyType":  keyType,
                "keyManager": "Resident Key Manager",
                "callbackUrl": "http://sample.com/callback/url",
                "scopes": [
                    "am_application_scope",
                    "default"
                ],
                "validityTime": "3600",
                "additionalProperties": {}
            }),
        });

        const responseData = await response.json();
        openApiKeyModal(responseData.token.accessToken, "Generated API Key", "API Key");
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

async function removeApplicationKey(applicationId, keyMappingId) {
    try {
        const response = await fetch(`/applications/${applicationId}/oauth-keys/${keyMappingId}`, {
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

async function generateOauthKey(appId, keyMappingId) {
    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyMappingId}/generate-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "additionalProperties": {
                    "pkceSupportPlain": false
                },
                "consumerSecret": "",
                "revokeToken": null,
                "scopes": [
                ],
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