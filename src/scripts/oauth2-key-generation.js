async function generateApplicationKey(formId, appId, keyType, keyManager, clientName, subscriptions, orgID, consumerKeyID, consumerSecretID) {


    const form = document.getElementById(formId);
    const apiList = []
    const subList = JSON.parse(subscriptions);
    subList.forEach(subscription => {
        apiList.push({
            "apiName": subscription.name,
            "apiRefId": subscription.refID,
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
            console.log("Keys", responseData);
            document.getElementById(consumerKeyID).value = consumerKey;
            document.getElementById(consumerSecretID).value = consumerSecret
            const consumerKeyElement = document.getElementById("consumerKeys_" + keyManager);
            consumerKeyElement.style.display = "block";
            const KMURLs = document.getElementById("KMURl_" + keyManager);
            KMURLs.style.display = "block";
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
    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyManagerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
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
    const keyMappingId = modal.dataset.param2;


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




async function generateCurl(keyManager, tokenURL) {
   
    const auth = `consumerKey:consuemrSecret`;
    const curl = `curl -k -X POST ${tokenURL} -d "grant_type=client_credentials" -H "Authorization: Basic ${auth}"`;

    const curlDisplay = document.getElementById("curlDisplay_" + keyManager);
    curlDisplay.style.display = "block";
    console.log(document.getElementById("curl_" + keyManager))
    document.getElementById("curl_" + keyManager).textContent = curl;
  
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
        const tokenDetails = document.getElementById("tokenDisplay_" + keyManager);
        tokenDetails.style.display = "block";
        //openApiKeyModal(responseData.accessToken, "Generated OAuth Token", "OAuth Token");
        console.log(document.getElementById("token_" + keyManager))
        document.getElementById("token_" + keyManager).textContent = responseData.accessToken;
        if (response.ok) {
            await showAlert('Token generated successfully!', 'success');
        } else {
            console.error('Failed to generate access token:', responseData);
            await showAlert(`Failed to generate access token. Please try again.\n${responseData.description}`, 'error');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred while generating OAuth keys: \n${error.message}`, 'error');
    }


}




document.addEventListener('DOMContentLoaded', () => {
  
    const selectElement = document.getElementById("select-idp-list");
 
 
    function copyToClipboard(button) {
        const textToCopy = button.parentElement.querySelector('.endpoint-value').textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Optional: Show a copied notification
                const originalSvg = button.innerHTML;
                button.innerHTML = `
                        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    `;
                setTimeout(() => {
                    button.innerHTML = originalSvg;
                }, 1500);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
 
 
    function updateKeyManagerInfo() {
        document.querySelectorAll(".KMConfig").forEach((el) => {
            el.style.display = "none";
        });
        const selectedValue = selectElement.value;
        const kmData = document.getElementById("KMData_" + selectedValue);
        const kmURL = document.getElementById("KMURL_" + selectedValue);
        if (kmData) {
            kmData.style.display = "block";
        }
        if (kmURL) {
            kmURL.style.display = "block";
        }
    }
    selectElement.addEventListener("change", updateKeyManagerInfo);
    // Initialize with selected value
    updateKeyManagerInfo();
 
 
 });
  


function loadKeyGenModal() {
    const modal = document.getElementById('OauthKeyModal');
    modal.style.display = 'flex';
}


function showAdvanced(configId) {
    const content = document.getElementById(configId);
    content.style.display = content.style.display === "block" ? "none" : "block";
    // const KMDetails = document.getElementById(KMDetailsId) ;
    // KMDetails.style.display = KMDetails.style.display === "block" ? "none" : "block";
    
    // Get the arrow icon from the clicked header and toggle its rotation
    const headerElement = event.currentTarget;
    const arrowIcon = headerElement.querySelector('.arrow-icon');
    if (arrowIcon) {
        arrowIcon.classList.toggle('rotated');
    }
}


async function copyToken(KMName) {
    // Copy access token
    const tokenElement = document.getElementById('token_' + KMName);
    if (!tokenElement) {
        console.error('Token element not found for:', KMName);
        return;
    }

    const tokenText = tokenElement.textContent.trim();
    console.log('Copying token to clipboard:', tokenText);

    try {
        // Copy to clipboard
        await navigator.clipboard.writeText(tokenText);
        await showAlert('Token copied to clipboard!');
    } catch (err) {
        console.error('Could not copy text:', err);
        await showAlert('Failed to copy token', true);
    }
}


