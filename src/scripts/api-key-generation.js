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

function openApiKeyModal(apiKey, title, subTitle) {
  const apiKeyInput = document.getElementById('apiKeyModalField');
  apiKeyInput.value = apiKey;
  const modal = document.getElementById('apiKeyModal');
  const modalTitle = document.getElementById('keyModalTitle');
  modalTitle.textContent = title;
  const modaSublTitle = document.getElementById('keyModalSubTitle');
  modaSublTitle.textContent = subTitle;
  if (title.includes('CURL')) {
    const modalDescription = document.getElementById('modalDescription');
    modalDescription.textContent = '';
  }
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

async function apiKeyCopyToClipboard() {
  const apiKeyInput = document.getElementById('apiKeyModalField');
  apiKeyInput.select();
  apiKeyInput.setSelectionRange(0, 99999);

  try {
    const success = document.execCommand('copy');
    if (success) {
      await showAlert('Copied to clipboard!', 'success');
    } else {
      await showAlert('Failed to copy!', 'error');
    }
  } catch (err) {
    await showAlert('Failed to copy!', 'error');
  }
  window.getSelection().removeAllRanges();
}

function cleanForms(isProduction) {
  const ipValuesInput = document.getElementById(
    'ip-values-' + (isProduction ? 'production' : 'sandbox')
  );
  const ipInput = document.getElementById(
    'ip-input-' + (isProduction ? 'production' : 'sandbox')
  );
  const httpValuesInput = document.getElementById(
    'http-values-' + (isProduction ? 'production' : 'sandbox')
  );
  const httpInput = document.getElementById(
    'http-input-' + (isProduction ? 'production' : 'sandbox')
  );
  const validityInput = document.getElementById(
    'validity-' + (isProduction ? 'production' : 'sandbox')
  );

  ipValuesInput.value = '';
  httpValuesInput.value = '';
  validityInput.value = '-1';

  const ipContainer = document.getElementById(
    'ip-container-' + (isProduction ? 'production' : 'sandbox')
  );
  const httpContainer = document.getElementById(
    'http-container-' + (isProduction ? 'production' : 'sandbox')
  );

  const iPchips = Array.from(ipContainer.children);

  iPchips.forEach(child => {
    if (child !== ipInput) {
      ipContainer.removeChild(child);
    }
  });

  const httpChips = Array.from(httpContainer.children);

  httpChips.forEach((child) => {
    if (child !== httpInput) {
      httpContainer.removeChild(child);
    }
  });

  const noneRadio = document.getElementById(
    'noneCheck-' + (isProduction ? 'production' : 'sandbox')
  );
  noneRadio.checked = true;

  if (isProduction) {
    updateProductionSections();
  } else {
    updateSandboxSections();
  }
}

async function generateAPIKey(applicationID, isProduction) {
  const ipValuesInput = document.getElementById(
    'ip-values-' + (isProduction ? 'production' : 'sandbox')
  );
  const httpValuesInput = document.getElementById(
    'http-values-' + (isProduction ? 'production' : 'sandbox')
  );
  const validityInput = document.getElementById(
    'validity-' + (isProduction ? 'production' : 'sandbox')
  );

  const noneRadio = document.getElementById(
    'noneCheck-' + (isProduction ? 'production' : 'sandbox')
  );
  const ipRadio = document.getElementById(
    'ipCheck-' + (isProduction ? 'production' : 'sandbox')
  );
  const httpRadio = document.getElementById(
    'httpCheck-' + (isProduction ? 'production' : 'sandbox')
  );

  const validityPeriod = validityInput.value;
  let JSONbody;
  const environment = isProduction ? 'PRODUCTION' : 'SANDBOX';
  const uri = `/devportal/applications/${applicationID}/api-keys/${environment}/generate`;

  if (noneRadio.checked) {
    JSONbody = JSON.stringify({
      validityPeriod,
      additionalProperties: { permittedIP: '', permittedReferer: '' },
    });
  } else if (ipRadio.checked) {
    const ipValues = ipValuesInput.value;
    JSONbody = JSON.stringify({
      validityPeriod,
      additionalProperties: { permittedIP: ipValues, permittedReferer: '' },
    });
  } else if (httpRadio.checked) {
    const httpValues = httpValuesInput.value;
    JSONbody = JSON.stringify({
      validityPeriod,
      additionalProperties: { permittedIP: '', permittedReferer: httpValues },
    });
  }

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
    cleanForms(isProduction);
    openApiKeyModal(responseData.apikey, 'Generated API Key', 'API Key');
    await showAlert('API Key generated successfully!', 'success');
  } catch (error) {
    ('Error:', error);
  }
}
