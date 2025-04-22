const e = require("express");

async function generateAPIKey(projectID, apiID, subPlan, cpAppID, appID, subID) {

  const tokenBtn = document.getElementById('generateKeyBtn-' + subID);
  const normalState = tokenBtn.querySelector('.button-normal-state');
  const loadingState = tokenBtn.querySelector('.button-loading-state');

  normalState.style.display = 'none';
  loadingState.style.display = 'inline-block';

  const uri = `/devportal/api-keys/generate`;

  JSONbody = JSON.stringify(
    {
      "applicationId": cpAppID ? `${cpAppID}`: tokenBtn.getAttribute('data-app-ref-id'),
      "apiId": `${apiID}`,
      "subscriptionPlan": `${subPlan}`,
      "scopes": [],
      "keyType": "PRODUCTION",
      "projectID": `${projectID}`,
      "devportalAppId": `${appID}`,
    });

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONbody,
    });

    const responseData = await response.json();

    if (response.ok) {

      const modal = document.getElementById('apiKeyModal');
      modal.style.display = 'flex';

      let keyText = document.getElementById("token_apiKeyText");
      keyText.textContent = responseData.value;

      let generateBtn = document.getElementById('generateKeyBtn-' + subID);
      generateBtn.style.display = 'none';

      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID);
      regenerateBtn.style.display = 'inline-flex';
      regenerateBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);

      let revokeBtn = document.getElementById('revokeKeyBtn-' + subID);
      revokeBtn.style.display = 'inline-flex';
      revokeBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);

      await showAlert('Token generated successfully!', 'success');

    } else {
      await showAlert(`Failed to generate API Key. Please try again.\n${responseData.description}`, 'error');
    }
  } catch (error) {
    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
  normalState.style.display = 'inline-block';
  loadingState.style.display = 'none';
}

async function revokeAPIKey(apiKeyID, subID, appID, apiRefID) {

  let revokeBtn = document.getElementById('revokeKeyBtn-' + subID);
  const normalState = revokeBtn.querySelector('.button-normal-state');
  const loadingState = revokeBtn.querySelector('.button-loading-state');

  normalState.style.display = 'none';
  loadingState.style.display = 'inline-block';

  const uri = `/devportal/api-keys/${apiKeyID}/revoke`;

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "applicationId": `${appID}`,
        "apiRefID": `${apiRefID}`,
      }),
    });

    const responseData = await response.json();
    if (response.ok) {
      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID);
      regenerateBtn.style.display = 'none';

      revokeBtn.style.display = 'none';

      let generateBtn = document.getElementById('generateKeyBtn-' + subID);
      generateBtn.style.display = 'inline-flex';

      await showAlert('API Key revoked successfully!', 'success');

    } else {
      await showAlert(`Failed to revoke API Key. Please try again.\n${responseData.description}`, 'error');
    }
  } catch (error) {
    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
  normalState.style.display = 'inline-block';
  loadingState.style.display = 'none';
}

async function regenerateAPIKey(apiKeyID, subID) {

  const tokenBtn = document.getElementById('regenerateKeyBtn-' + subID);
  const normalState = tokenBtn.querySelector('.button-normal-state');
  const loadingState = tokenBtn.querySelector('.button-loading-state');

  normalState.style.display = 'none';
  loadingState.style.display = 'inline-block';

  const uri = `/devportal/api-keys/${apiKeyID}/regenerate`;

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      const modal = document.getElementById('apiKeyModal');
      modal.style.display = 'flex';

      let keyText = document.getElementById("token_apiKeyText");
      keyText.textContent = responseData.value;

      await showAlert('API Key regenerated successfully!', 'success');
    } else {
      console.log('Here')
      await showAlert(`Failed to regenerate API Key. Please try again.\n${responseData.description}`, 'error');
    }
  } catch (error) {
    console.log('Here2')

    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
  console.log('Here3')

  normalState.style.display = 'inline-block';
  loadingState.style.display = 'none';
}
