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
    let grantTypes;
    if(!jsonObject.grantTypes) {
        grantTypes = ["client_credentials"];
    } else {
        grantTypes = jsonObject.grantTypes;
    }
    const payload = JSON.stringify({
        "applicationName": clientName,
        "apis": apiList,
        "tokenType": "OAUTH",
        "tokenDetails": {
            "grantTypesToBeSupported": grantTypes,
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
            // close modal
            const modal = document.getElementById('OauthKeyModal');
            //await showAlert('Application keys generated successfully!', 'success');
            // reload the page to reflect the changes
            // TODO: update the function to handle the response and update the UI accordingly
            //window.location.reload();
            
            const consumerKey = responseData.consumerKey;
            const consumerSecret = responseData.consumerSecret;
            document.getElementById(consumerKeyID).value = consumerKey;
            document.getElementById(consumerSecretID).value = consumerSecret;

            const consumerKeyElement = document.getElementById("consumerKeys_" + keyManager);
            consumerKeyElement.style.display = "block";

            const keyActionsContainer = document.getElementById("keyActionsContainer");
            if (keyActionsContainer) {
                keyActionsContainer.style.display = "flex";
            }
             // Update UI elements in the overview section
            const generateKeyContainer = document.getElementById("generateKeyContainer");
            if (generateKeyContainer) {
                generateKeyContainer.style.display = "none";
            }

            //enable token view
            // document.querySelectorAll("#tokenDisplay_" + keyManager).forEach(tokenDetails => {
            //     tokenDetails.style.display = "block";
            // });
            // //openApiKeyModal(responseData.accessToken, "Generated OAuth Token", "OAuth Token");
            // document.querySelectorAll("#token_" + keyManager).forEach(tokenDetails => {
            //     tokenDetails.textContent = responseData.accessToken;
            // });
            const tokenbtn = document.getElementById('tokenKeyBtn');
            tokenbtn.setAttribute("data-keyMappingId", responseData.keyMappingId);
            tokenbtn.setAttribute("data-consumerSecretID", consumerSecretID);
            tokenbtn.setAttribute("data-appRefID", responseData.appRefId);
            loadKeysViewModal();
           

            // // Hide the key action container
            // const keyActionContainer = document.getElementById("key-action-container");
            // keyActionContainer.style.display = "none";
            // const generateKeysButton = document.getElementById("applicationKeyGenerateButton");
            // generateKeysButton.style.display = "none";

            // // Move the advanced configuration section to the placeholder
            // const advancedConfig = document.getElementById("KMData_" + keyManager);
            // const advancedConfigPlaceholder = document.getElementById("advanced-config-placeholder");
            // if (advancedConfig && advancedConfigPlaceholder) {
            //     advancedConfigPlaceholder.appendChild(advancedConfig);
            //     advancedConfig.style.display = "none"; // Keep it hidden initially
            // }

            // // Show the advanced config button
            // const advancedConfigButton = document.getElementById("advanced-config-button");
            // if (advancedConfigButton) {
            //     advancedConfigButton.style.display = "flex";
            // }

            // // Show the token generation buttons
            // const tokenGenerationButtons = document.getElementById("tokenGenerationButtons_" + keyManager);
            // if (tokenGenerationButtons) {
            //     tokenGenerationButtons.style.display = "flex";
                
            //     // Get the generate token button and update its onClick handler with correct values
            //     const generateTokenButton = tokenGenerationButtons.querySelector(`#apiKeyGenerateButton-${keyType.toLowerCase()}`);
            //     if (generateTokenButton) {
            //         generateTokenButton.setAttribute("onClick", 
            //             `generateOauthKey('${formId}', '${responseData.appRefId}', '${responseData.keyMappingId}', '${keyManager}', '${clientName}')`);
            //     }
            // }

            // // Show the update button container
            // const updateButtonContainer = document.getElementById("applicationKeyUpdateButtonContainer");
            // if (updateButtonContainer) {
            //     updateButtonContainer.style.display = "flex";
                
            //     // Get the update button and set its onClick handler with the correct appRefID
            //     const updateButton = document.getElementById("applicationKeyUpdateButton");
            //     if (updateButton) {
            //         updateButton.setAttribute("onClick", 
            //             `updateApplicationKey('${formId}', '${JSON.stringify([{appRefID: responseData.appRefId}])}', '${keyType}', '${keyManager}', '${responseData.keyMappingId}', '${clientName}')`);
            //     }
            // }

            // const KMURLs = document.getElementById("KMURl_" + keyManager);
            // KMURLs.style.display = "block";
            
           
            
           
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




async function generateOauthKey(formId, appId, keyMappingId, keyManager, clientName, clientSecret) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    if (!keyMappingId) {
        const tokenbtn = document.getElementById('tokenKeyBtn');
        let clientSecretID =   tokenbtn.getAttribute("data-consumerSecretID");
        clientSecret = document.getElementById(clientSecretID).value;
        keyMappingId = tokenbtn.getAttribute("data-keyMappingId");
        appId = tokenbtn.getAttribute("data-appRefID");
    }
    const jsonObject = getFormData(formData, keyManager, clientName);

    try {
        const response = await fetch(`/devportal/applications/${appId}/oauth-keys/${keyMappingId}/generate-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "additionalProperties": jsonObject.additionalProperties,
                "consumerSecret": clientSecret,
                "revokeToken": null,
                "scopes": [],
                "validityPeriod": 3600
            }),
            credentials: 'include'
        });


        const responseData = await response.json();
       

        if (response.ok) {
            // let tokenDetails = document.getElementById("tokenDisplay_" + keyManager);
            // tokenDetails.style.display = "block";
            // tokenDetails.textContent = responseData.accessToken;

            // document.querySelectorAll("#tokenDisplay_" + keyManager).forEach(tokenDetails => {
            //     tokenDetails.style.display = "block";
            // });
            //openApiKeyModal(responseData.accessToken, "Generated OAuth Token", "OAuth Token");
            // document.querySelectorAll("#token_" + keyManager).forEach(tokenDetails => {
            //     tokenDetails.textContent = responseData.accessToken;
            // });
            let tokenDetails = document.getElementById("tokenDisplay_" + keyManager);
            tokenDetails.style.display = "block";
            let tokenText = document.getElementById("token_"+ keyManager);
            tokenText.textContent = responseData.accessToken;
            loadKeysTokenModal();
            await showAlert('Token generated successfully!', 'success');
        } else {
            ('Failed to generate access token:', responseData);
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
    
    // Collapse all advanced configurations and reset UI state
    document.querySelectorAll(".KMConfig").forEach(el => el.style.display = "none");
    document.querySelectorAll(".arrow-icon").forEach(icon => icon.classList.remove('rotated'));
    
    // Move generate keys button back to original container if needed
    const generateKeysBtn = document.getElementById("applicationKeyGenerateButton");
    const originalContainer = document.getElementById("generate-keys-btn-container");
    const advancedContainer = document.getElementById("generate-keys-btn-advanced-container");
    
    if (generateKeysBtn && originalContainer && advancedContainer) {
        advancedContainer.style.display = "none";
        originalContainer.style.display = "flex";
        if (generateKeysBtn.parentElement === advancedContainer) {
            originalContainer.appendChild(generateKeysBtn);
        }
    }
}

function loadKeysViewModal() {
    const modal = document.getElementById('keysViewModal');
    modal.style.display = 'flex';
}

function loadKeysModifyModal() {
    const modal = document.getElementById('keysModifyModal');
    modal.style.display = 'flex';

    // Collapse all advanced configurations and reset UI state
    document.querySelectorAll(".KMConfig").forEach(el => el.style.display = "none");
    document.querySelectorAll(".arrow-icon").forEach(icon => icon.classList.remove('rotated'));
}

function loadKeysTokenModal() {
    const modal = document.getElementById('keysTokenModal');
    modal.style.display = 'flex';
}

function loadKeysInstructionsModal() {
    const modal = document.getElementById('keysInstructionsModal');
    modal.style.display = 'flex';
}

function showAdvanced(configId) {
    document.querySelectorAll("#" + configId).forEach(content => {
        const isExpanding = content.style.display !== "block";
        content.style.display = isExpanding ? "block" : "none";

        // Get the arrow icon from the clicked header and toggle its rotation
        const headerElement = event.currentTarget;
        const arrowIcon = headerElement.querySelector('.arrow-icon');
        if (arrowIcon) {
            if (isExpanding) {
                arrowIcon.classList.add('rotated');
            } else {
                arrowIcon.classList.remove('rotated');
            }
        }

        // Handle Generate Keys button movement
        const generateKeysBtn = content.querySelector("#applicationKeyGenerateButton");
        const originalContainer = content.querySelector("#generate-keys-btn-container");
        const advancedContainer = content.querySelector("#generate-keys-btn-advanced-container");

        if (generateKeysBtn && originalContainer && advancedContainer) {
            if (isExpanding) {
                // Move Generate Keys button to the advanced container
                originalContainer.style.display = "none";
                advancedContainer.style.display = "flex";
                advancedContainer.appendChild(generateKeysBtn);
            } else {
                // Move Generate Keys button back to its original container
                advancedContainer.style.display = "none";
                originalContainer.style.display = "flex";
                originalContainer.appendChild(generateKeysBtn);
            }
        }
    });
}


async function copyToken(KMName) {
    // Copy access token
    const tokenElement = document.getElementById('token_' + KMName);
    if (!tokenElement) {
        return;
    }

    const tokenText = tokenElement.textContent.trim();

    try {
        // Copy to clipboard
        await navigator.clipboard.writeText(tokenText);
        await showAlert('Token copied to clipboard!');
    } catch (err) {
        console.error('Could not copy text:', err);
        await showAlert('Failed to copy token', true);
    }
}

/**
 * Toggles password visibility for the specified input field
 * @param {string} inputId - The ID of the input field
 */
function togglePasswordVisibility(inputId) {
    document.querySelectorAll('#' + inputId).forEach(inputElement => {
        const buttonElement = inputElement.nextElementSibling;
        const iconElement = buttonElement.querySelector('i');

        // Toggle the input type between password and text
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            // Change to eye-slash icon
            iconElement.classList.remove('bi-eye');
            iconElement.classList.add('bi-eye-slash');
        } else {
            inputElement.type = 'password';
            // Change back to eye icon
            iconElement.classList.remove('bi-eye-slash');
            iconElement.classList.add('bi-eye');
        }
    });
}

/**
 * Copies the consumer secret to the clipboard
 * @param {string} inputId - The ID of the input field
 */
async function copyConsumerSecret(inputId) {
    const inputElement = document.getElementById(inputId);
    const buttonElement = inputElement.nextElementSibling.nextElementSibling;
    const iconElement = buttonElement.querySelector('i');
    
    try {
        // Get the value regardless of whether it's shown as password or text
        const secretValue = inputElement.value;
        
        // Copy to clipboard
        await navigator.clipboard.writeText(secretValue);
        
        // Show visual feedback
        iconElement.classList.remove('bi-clipboard');
        iconElement.classList.add('bi-clipboard-check');
        
        // Show alert
        await showAlert('Consumer Secret copied to clipboard!');
        
        // Revert to original icon after 1.5 seconds
        setTimeout(() => {
            iconElement.classList.remove('bi-clipboard-check');
            iconElement.classList.add('bi-clipboard');
        }, 1500);
    } catch (err) {
        console.error('Could not copy text:', err);
        await showAlert('Failed to copy Consumer Secret', true);
    }
}

async function copyRealCurl(button) {
    const tokenEndpoint = button.getAttribute('data-endpoint');
    const consumerKey = button.getAttribute('data-consumer-key');
    const consumerSecret = button.getAttribute('data-consumer-secret');
    
    if (!consumerKey || !consumerSecret) {
        await showAlert('Consumer key or secret not available. Please generate keys first.', 'warning');
        return;
    }
    
    try {
        const credentials = `${consumerKey}:${consumerSecret}`;
        const curlCommand = `curl -k -X POST ${tokenEndpoint} -d "grant_type=client_credentials" -H "Authorization: Basic ${credentials}"`;
        
        // Copy to clipboard
        await navigator.clipboard.writeText(curlCommand);
        
        // Show visual feedback
        const originalSvg = button.innerHTML;
        button.innerHTML = `
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
        
        // Show alert
        await showAlert('cURL command with your credentials has been copied to clipboard!');
        
        // Revert to original icon after 1.5 seconds
        setTimeout(() => {
            button.innerHTML = originalSvg;
        }, 1500);
    } catch (err) {
        console.error('Could not copy text:', err);
        await showAlert('Failed to copy cURL command: ' + err.message, 'error');
    }
}


