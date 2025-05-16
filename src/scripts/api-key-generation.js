const e = require("express");

function openApiKeyModal(projectID, apiRefID, subPlan, cpAppID, appID, subID, subIDs, subscribedScopes) {
  const modal = document.getElementById('apiKeyModal-' + subID);
  modal.style.display = 'flex';

  document.getElementById('apiKeyCard-' + subID).classList.add('d-none');
  document.getElementById('apiKeyInfo-' + subID).classList.add('d-none');

  const scopeContainer = document.getElementById('scopeContainer-' + subID);
  const scopeInput = document.getElementById('scope-' + subID);
  scopeContainer.setAttribute('data-scopes', subscribedScopes);

  document.getElementById('generateAPIKeyBtn-' + subID).setAttribute('onclick', `generateAPIKey('${projectID}', '${apiRefID}', '${subPlan}', '${cpAppID}', '${appID}', '${subID}', '${subIDs}', '${subscribedScopes}')`);
  const scopesData = scopeContainer?.dataset?.scopes;

  if (scopesData) {
    // Clear existing scopes
    scopeContainer.querySelectorAll('.span-tag').forEach(el => el.remove());
    const scopes = JSON.parse(scopesData);

    scopes.forEach(scope => {
      addScope(scope);
    });
  }

  scopeContainer?.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = scopeContainer.querySelector('input');
      const scope = input.value.trim();

      // Add additional scopes
      if (scope) {
        addScope(scope);
        this.value = '';
      }
    }
  });

  function addScope(scope) {
    // Create a new span element for the scope
    const span = document.createElement('span');
    span.className = 'span-tag';
    span.innerHTML = `${scope}<span class="remove">&times;</span>`;

    // Append the new span to the scope container only if it doesn't already exist
    const existingScopes = Array.from(scopeContainer.querySelectorAll('.span-tag'))
      .map(el => el.textContent.replace('×', '').trim());

    if (!existingScopes.includes(scope)) {
      span.querySelector('.remove').addEventListener('click', function () {
        scopeContainer.removeChild(span);
      });
    }

    // Append the new span to the scope container
    scopeContainer.setAttribute('data-scopes', JSON.stringify(subscribedScopes));
    scopeContainer.insertBefore(span, scopeInput);
    scopeInput.value = '';
  }

}

async function generateAPIKey(projectID, apiID, subPlan, cpAppID, appID, subID, subIDs, scopes) {
  console.log(projectID, apiID, subPlan, cpAppID, appID, subID, subIDs);

  const tokenBtn = document.getElementById('generateAPIKeyBtn-' + subID);
  const normalState = tokenBtn.querySelector('.button-normal-state');
  const loadingState = tokenBtn.querySelector('.button-loading-state');
  const subscriptionPlan = document.getElementById('policy_' + subID).textContent;

  normalState.style.display = 'none';
  loadingState.style.display = 'inline-block';

  const uri = `/devportal/api-keys/generate`;

  JSONbody = JSON.stringify(
    {
      "applicationId": cpAppID ? `${cpAppID}` : tokenBtn.getAttribute('data-app-ref-id'),
      "apiId": `${apiID}`,
      "subscriptionPlan": `${subscriptionPlan}`,
      "scopes": JSON.parse(scopes),
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

      document.getElementById('apiKeyCard-' + subID).classList.remove('d-none');
      document.getElementById('apiKeyInfo-' + subID).classList.remove('d-none');
      document.getElementById("token_apiKeyText-" + subID).textContent = responseData.value;
      document.getElementById('generateKeyBtn-' + subID).style.display = 'none';
      document.getElementById('generateAPIKeyBtn-' + subID).style.display = 'none';

      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID);
      regenerateBtn.style.display = 'inline-flex';
      regenerateBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);

      let revokeBtn = document.getElementById('revokeKeyBtn-' + subID);
      revokeBtn.style.display = 'inline-flex';
      revokeBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);

      const scopeInput = document.getElementById(`scope-${subID}`);
      scopeInput.disabled = true;
      scopeInput.style.display = 'none';

      const scopeContainer = document.getElementById('scopeContainer-' + subID);
      scopeContainer.querySelectorAll('.remove').forEach(el => {
        el.style.display = 'none';
      });

      const subList = JSON.parse(subIDs);
      subList.forEach(subID => {
        document.getElementById("generateAPIKeyBtn-" + subID)?.setAttribute('data-app-ref-id', `${responseData.appRefId}`);
      })

      await showAlert('API Key generated successfully!', 'success');

    } else {
      await showAlert(`Failed to generate API Key. Please try again.\n${responseData?.description || ''}`, 'error');
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
      await showAlert(`Failed to revoke API Key. Please try again.\n${responseData?.description || ''}`, 'error');
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

    console.log(responseData);
    if (response.ok) {
      
      document.getElementById('apiKeyModal-' + subID).style.display = 'flex';
      document.getElementById("token_apiKeyText-" + subID).textContent = responseData.value;
      document.getElementById("generateAPIKeyBtn-" + subID).style.display = 'none'
      document.getElementById("scopeContainer-" + subID).style.display = 'none'
      document.getElementById("scopeTitle-" + subID).style.display = 'none'

      await showAlert('API Key regenerated successfully!', 'success');
    } else {
      await showAlert(`Failed to regenerate API Key. Please try again.\n${responseData?.description || ''}`, 'error');
    }
  } catch (error) {
    console.log(error);
    await showAlert(`Failed to generate API Key. Please try again.\n${error}`, 'error');
  }
  normalState.style.display = 'inline-block';
  loadingState.style.display = 'none';
}
