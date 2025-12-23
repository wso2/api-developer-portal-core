const e = require("express");

function openApiKeyModal(projectID, apiRefID, subPlan, cpAppID, appID, subID, subIDs, subscribedScopes, keyType) {

  let scopes = Array.isArray(subscribedScopes) ? subscribedScopes : JSON.parse(subscribedScopes);

  if (scopes.length < 1) {
    return generateAPIKey(projectID, apiRefID, subPlan, cpAppID, appID, subID, subIDs, 'generateKeyBtn-', keyType)
  }
  const modal = document.getElementById('apiKeyModal-' + subID + '-' + keyType);
  modal.style.display = 'flex';

  document.getElementById("generateAPIKeyBtn-" + subID + '-' + keyType).style.display = 'block';
  document.getElementById('apiKeyCard-' + subID + '-' + keyType).classList.add('d-none');
  document.getElementById('apiKeyInfo-' + subID + '-' + keyType).classList.add('d-none');

  const scopeContainer = document.getElementById('scopeContainer-' + subID + '-' + keyType);
  scopeContainer.setAttribute('data-scopes', subscribedScopes);

  const scopesData = scopeContainer?.dataset?.scopes;

  if (scopesData) {
    // Clear existing scopes
    scopeContainer.querySelectorAll('.span-tag').forEach(el => el.remove());
    const scopes = JSON.parse(scopesData);

    scopes.forEach(scope => {
      addScope(scope);
    });
  }

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
    scopeContainer.appendChild(span);

  }

  document.getElementById('generateAPIKeyBtn-' + subID + '-' + keyType).setAttribute('onclick', `generateAPIKey('${projectID}', '${apiRefID}', '${subPlan}', '${cpAppID}', '${appID}', '${subID}', '${subIDs}', 'generateAPIKeyBtn-', '${keyType}')`);
}

async function generateAPIKey(projectID, apiID, subPlan, cpAppID, appID, subID, subIDs, tokenBtnPrefix, keyType) {

  const tokenBtn = document.getElementById(tokenBtnPrefix + subID + '-' + keyType);
  const normalState = tokenBtn.querySelector('.button-normal-state');
  const loadingState = tokenBtn.querySelector('.button-loading-state');
  const subscriptionPlan = document.getElementById('policy_' + subID).textContent;
  const scopeContainer = document.getElementById('scopeContainer-' + subID + '-' + keyType);
  const scopeTags = scopeContainer.querySelectorAll('.span-tag');
  const scopes = Array.from(scopeTags).map(el => el.textContent.replace('×', '').trim());
  scopeContainer.setAttribute('data-scopes', [scopes]);

  normalState.style.display = 'none';
  loadingState.style.display = 'inline-block';

  const uri = `/devportal/api-keys/generate`;

  JSONbody = JSON.stringify(
    {
      "applicationId": cpAppID ? `${cpAppID}` : tokenBtn.getAttribute('data-app-ref-id'),
      "apiId": `${apiID}`,
      "subscriptionPlan": `${subscriptionPlan}`,
      "scopes": scopes,
      "keyType": `${keyType.toUpperCase()}`,
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
      const modal = document.getElementById('apiKeyModal-' + subID + '-' + keyType);
      modal.style.display = 'flex';

      document.getElementById('apiKeyCard-' + subID + '-' + keyType).classList.remove('d-none');
      document.getElementById('apiKeyInfo-' + subID + '-' + keyType).classList.remove('d-none');
      document.getElementById("token_apiKeyText-" + subID + '-' + keyType).textContent = responseData.value;
      
      // Hide the generate button in the modal
      const generateAPIKeyBtn = document.getElementById('generateAPIKeyBtn-' + subID + '-' + keyType);
      if (generateAPIKeyBtn) {
        generateAPIKeyBtn.style.display = 'none';
      }

      // Check if we're on the manage-keys page
      const isManageKeysPage = window.location.pathname.includes('/manage-keys');
      
      const generateBtn = document.getElementById('generateKeyBtn-' + subID + '-' + keyType);
      if (generateBtn) {
        if (isManageKeysPage) {
          // On manage-keys.hbs: Just hide the generate button, regenerate/revoke buttons will be shown
          generateBtn.style.display = 'none';
        } else {
          // On apis.hbs: Replace generate button with "Manage Key" link
          const envLabel = keyType === 'PRODUCTION' ? 'Production' : 'Sandbox';
          const envHash = keyType === 'PRODUCTION' ? '#production' : '#sandbox';
          
          const manageLink = document.createElement('a');
          manageLink.className = 'common-btn-outlined btn-sm';
          manageLink.id = 'manageKeyBtn-' + subID + '-' + keyType;
          manageLink.href = window.location.pathname.replace(/\/[^\/]*$/, '/manage-keys') + envHash;
          manageLink.setAttribute('title', 'Manage ' + envLabel + ' Key');
          manageLink.innerHTML = '<i class="bi bi-gear me-1"></i> ' + envLabel;
          
          generateBtn.parentNode.replaceChild(manageLink, generateBtn);
        }
      }

      // Also update regenerate/revoke buttons in manage-keys page if they exist
      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID + '-' + keyType);
      if (regenerateBtn) {
        regenerateBtn.style.display = 'inline-flex';
        regenerateBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);
        regenerateBtn.setAttribute('data-scopes', `${JSON.stringify(scopes)}`);
      }

      let revokeBtn = document.getElementById('revokeKeyBtn-' + subID + '-' + keyType);
      if (revokeBtn) {
        revokeBtn.style.display = 'inline-flex';
        revokeBtn.setAttribute('data-api-key-id', `'${responseData.id}'`);
      }

      const removeElementSpan = scopeContainer.querySelectorAll('.remove');

      if (removeElementSpan.length > 0) {
        removeElementSpan.forEach(el => {
          el.style.display = 'none';
        });
      } else {
        const scopeContainerEl = document.getElementById("scopeContainer-" + subID + '-' + keyType);
        const scopeTitleEl = document.getElementById("scopeTitle-" + subID + '-' + keyType);
        if (scopeContainerEl) scopeContainerEl.style.display = 'none';
        if (scopeTitleEl) scopeTitleEl.style.display = 'none';
      }

      const subList = JSON.parse(subIDs);
      subList.forEach(subID => {
        document.getElementById("generateAPIKeyBtn-" + subID + '-' + keyType)?.setAttribute('data-app-ref-id', `${responseData.appRefId}`);
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

async function revokeAPIKey(apiKeyID, subID, appID, apiRefID, keyType) {

  let revokeBtn = document.getElementById('revokeKeyBtn-' + subID + '-' + keyType);
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
      let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID + '-' + keyType);
      if (regenerateBtn) {
        regenerateBtn.style.display = 'none';
      }

      revokeBtn.style.display = 'none';

      // Show the generate button if it exists
      let generateBtn = document.getElementById('generateKeyBtn-' + subID + '-' + keyType);
      if (generateBtn) {
        generateBtn.style.display = 'inline-flex';
      }

      // Check if we're on the manage-keys page
      const isManageKeysPage = window.location.pathname.includes('/manage-keys');
      
      if (!isManageKeysPage) {
        // Only on apis.hbs: Replace "Manage Key" button with "Generate Key" button
        // Note: "Manage Key" buttons only exist in apis.hbs page
        let manageBtn = document.getElementById('manageKeyBtn-' + subID + '-' + keyType);
        if (manageBtn) {
          const envLabel = keyType === 'PRODUCTION' ? 'Production' : 'Sandbox';
          const generateButton = document.createElement('button');
          generateButton.className = 'common-btn-outlined btn-sm';
          generateButton.id = 'generateKeyBtn-' + subID + '-' + keyType;
          generateButton.setAttribute('data-app-ref-id', '');
          generateButton.setAttribute('title', 'Generate ' + envLabel + ' Key');
          generateButton.innerHTML = `
            <span class="button-normal-state">
              <i class="bi bi-key me-1"></i> ${envLabel}
            </span>
            <span class="button-loading-state" style="display: none;">
              <span class="spinner-border spinner-border-sm me-1" role="status"> Revoking...</span>
            </span>
          `;
          // Note: The page will need to be refreshed to get the onclick handler with proper parameters
          manageBtn.parentNode.replaceChild(generateButton, manageBtn);
        }
      }
      // On manage-keys.hbs: regenerate/revoke buttons are already hidden above, generate button is shown

      await showAlert('API Key revoked successfully!', 'success');

    } else {
      await showAlert(`Failed to revoke API Key. Please try again.\n${responseData?.description || ''}`, 'error');
    }
  } catch (error) {
    await showAlert(`Failed to revoke API Key. Please try again.\n${error}`, 'error');
  }
  normalState.style.display = 'inline-block';
  loadingState.style.display = 'none';
}

async function regenerateAPIKey(apiKeyID, subID, keyType) {

  const tokenBtn = document.getElementById('regenerateKeyBtn-' + subID + '-' + keyType);
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
      document.getElementById('apiKeyModal-' + subID + '-' + keyType).style.display = 'flex';
      document.getElementById("token_apiKeyText-" + subID + '-' + keyType).textContent = responseData.value;
      document.getElementById("generateAPIKeyBtn-" + subID + '-' + keyType).style.display = 'none';

      const regenerateBtn = document.getElementById("regenerateKeyBtn-" + subID + '-' + keyType);
      const scopeContainer = document.getElementById('scopeContainer-' + subID + '-' + keyType);
      const scopes = regenerateBtn?.dataset?.scopes || '[]';

      if (JSON.parse(scopes).length > 0) {
        const existingScopes = Array.from(scopeContainer.querySelectorAll('.span-tag'));
        existingScopes.forEach(el => scopeContainer.removeChild(el));

        JSON.parse(scopes).forEach(scope => {
          const span = document.createElement('span');
          span.className = 'span-tag';
          span.innerHTML = `${scope}`;

          scopeContainer.appendChild(span);
        });
      } else {
        document.getElementById("scopeContainer-" + subID + '-' + keyType).style.display = 'none'
        document.getElementById("scopeTitle-" + subID + '-' + keyType).style.display = 'none'
      }

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
