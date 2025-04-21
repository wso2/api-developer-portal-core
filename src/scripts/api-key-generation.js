function updateProductionSections() {
  document.getElementById('section-ip-production').style.display = 'none';
  document.getElementById('section-http-production').style.display = 'none';

  if (document.getElementById('ipCheck-production').checked) {
    document.getElementById('section-ip-production').style.display = 'block';
  } else if (document.getElementById('httpCheck-production').checked) {
    document.getElementById('section-http-production').style.display = 'block';
  }

  validateGenerateButton(true);
}

function updateSandboxSections() {
  document.getElementById('section-ip-sandbox').style.display = 'none';
  document.getElementById('section-http-sandbox').style.display = 'none';

  if (document.getElementById('ipCheck-sandbox').checked) {
    document.getElementById('section-ip-sandbox').style.display = 'block';
  } else if (document.getElementById('httpCheck-sandbox').checked) {
    document.getElementById('section-http-sandbox').style.display = 'block';
  }

  validateGenerateButton(false);
}

function validateGenerateButton(isProduction) {
  let ipValuesInput = document.getElementById(
    'ip-values-' + (isProduction ? 'production' : 'sandbox')
  ).value;
  let httpValuesInput = document.getElementById(
    'http-values-' + (isProduction ? 'production' : 'sandbox')
  ).value;
  let generateButton = document.getElementById(
    'apiKeyGenerateButton-' + (isProduction ? 'production' : 'sandbox')
  );
  const validity = document.getElementById('validity-' + (isProduction ? 'production' : 'sandbox')).value;

  if (
    (isProduction &&
      document.getElementById('ipCheck-production').checked &&
      !ipValuesInput) ||
    (isProduction &&
      document.getElementById('httpCheck-production').checked &&
      !httpValuesInput) ||
    (!isProduction &&
      document.getElementById('ipCheck-sandbox').checked &&
      !ipValuesInput) ||
    (!isProduction &&
      document.getElementById('httpCheck-sandbox').checked &&
      !httpValuesInput) ||
    validity === ''
  ) {
    generateButton.disabled = true;
  } else {
    generateButton.disabled = false;
  }
}

(function () {
  const ipLists = { production: [], sandbox: [] };

  window.addIp = function (event, isProduction) {
    const ipContainer = document.getElementById(
      'ip-container-' + (isProduction ? 'production' : 'sandbox')
    );
    const ipInput = document.getElementById(
      'ip-input-' + (isProduction ? 'production' : 'sandbox')
    );
    const ipValuesInput = document.getElementById(
      'ip-values-' + (isProduction ? 'production' : 'sandbox')
    );

    const ipList = ipLists[isProduction ? 'production' : 'sandbox'];

    if (event.key === 'Enter' && ipInput.value.trim() !== '') {
      event.preventDefault();
      const ipValue = ipInput.value.trim();
      ipList.push(ipValue);
      ipValuesInput.value = ipList.join(',');

      const chip = document.createElement('span');
      chip.className = 'badge bg-primary me-2';
      chip.textContent = ipValue;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'btn-close btn-close-white btn-sm ms-2';
      removeButton.ariaLabel = 'Remove';
      removeButton.onclick = function () {
        ipContainer.removeChild(chip);

        const index = ipList.indexOf(ipValue);
        if (index > -1) {
          ipList.splice(index, 1);
        }

        ipValuesInput.value = ipList.join(',');
        validateGenerateButton(isProduction);
      };

      chip.appendChild(removeButton);
      ipContainer.insertBefore(chip, ipInput);
      ipInput.value = '';

      validateGenerateButton(isProduction);
    }
  };
})();

(function () {
  const referrerLists = { production: [], sandbox: [] };

  window.addHttpReferrer = function (event, isProduction) {
    const referrerContainer = document.getElementById(
      'http-container-' + (isProduction ? 'production' : 'sandbox')
    );
    const referrerInput = document.getElementById(
      'http-input-' + (isProduction ? 'production' : 'sandbox')
    );
    const referrerValuesInput = document.getElementById(
      'http-values-' + (isProduction ? 'production' : 'sandbox')
    );

    const referrerList = referrerLists[isProduction ? 'production' : 'sandbox'];

    if (event.key === 'Enter' && referrerInput.value.trim() !== '') {
      event.preventDefault();
      const referrerValue = referrerInput.value.trim();
      referrerList.push(referrerValue);
      referrerValuesInput.value = referrerList.join(',');

      const chip = document.createElement('span');
      chip.className = 'badge bg-primary me-2';
      chip.textContent = referrerValue;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'btn-close btn-close-white btn-sm ms-2';
      removeButton.ariaLabel = 'Remove';
      removeButton.onclick = function () {
        referrerContainer.removeChild(chip);

        const index = referrerList.indexOf(referrerValue);
        if (index > -1) {
          referrerList.splice(index, 1);
        }

        referrerValuesInput.value = referrerList.join(',');
        validateGenerateButton(isProduction);
      };

      chip.appendChild(removeButton);
      referrerContainer.insertBefore(chip, referrerInput);
      referrerInput.value = '';

      validateGenerateButton(isProduction);
    }
  };
})();

async function generateAPIKey(projectID, apiID, subPlan, appID, subID) {

  const uri = `/devportal/applications/${appID}/api-keys/generate`;

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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Key generated successfully:', responseData.value);

    const modal = document.getElementById('apiKeyModal');
    modal.style.display = 'flex';

    let keyText = document.getElementById("token_apiKeyText");
    keyText.textContent = responseData.value;

    let generateBtn = document.getElementById('generateKeyBtn-' + subID);
    generateBtn.style.display = 'none';

    let regenerateBtn = document.getElementById('regenerateKeyBtn-' + subID);
    regenerateBtn.style.display = 'inline-flex';
    regenerateBtn.setAttribute('data-api-key-id', responseData.id);

    let revokeBtn = document.getElementById('revokeKeyBtn-' + subID);
    revokeBtn.style.display = 'inline-flex';
    
  } catch (error) {
    console.error('Error:', error);
  }
}
