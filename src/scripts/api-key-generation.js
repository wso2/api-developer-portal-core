const e = require("express");

async function generateAPIKey(projectID, apiID, subPlan, appID, subID) {

  const uri = `/devportal/api-keys/generate`;

  JSONbody = JSON.stringify(
    {
      "applicationId": `${appID}`,
      "apiId": `${apiID}`,
      "subscriptionPlan": `${subPlan}`,
      "scopes": [],
      "keyType": "PRODUCTION",
      "projectID": `${projectID}`,
    });

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONbody,
    });

    if (response.ok) {

      const responseData = await response.json();
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
      await showAlert(`Failed to generate API Key. Please try again.\n${response.description}`, 'error');
    }
  } catch (error) {
    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
}

async function revokeAPIKey(apiKeyID, subID) {

  console.log(apiKeyID);
  const uri = `/devportal/api-keys/${apiKeyID}/revoke`;

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID);
      regenerateBtn.style.display = 'none';

      let revokeBtn = document.getElementById('revokeKeyBtn-' + subID);
      revokeBtn.style.display = 'none';

      let generateBtn = document.getElementById('generateKeyBtn-' + subID);
      generateBtn.style.display = 'inline-flex';

      await showAlert('API Key revoked successfully!', 'success');

    } else {
      await showAlert(`Failed to revoke API Key. Please try again.\n${response.description}`, 'error');
    }
  } catch (error) {
    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
}
