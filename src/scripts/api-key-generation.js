function updateProductionSections() {
  document.getElementById('section-ip-production').style.display = 'none';
  document.getElementById('section-http-production').style.display = 'none';

  console.log('production');
  if (document.getElementById('ipCheck-production').checked) {
    document.getElementById('section-ip-production').style.display = 'block';
  } else if (document.getElementById('httpCheck-production').checked) {
    document.getElementById('section-http-production').style.display = 'block';
  }
}

function updateSandboxSections() {
  document.getElementById('section-ip-sandbox').style.display = 'none';
  document.getElementById('section-http-sandbox').style.display = 'none';

  console.log('sandbox');
  if (document.getElementById('ipCheck-sandbox').checked) {
    document.getElementById('section-ip-sandbox').style.display = 'block';
  } else if (document.getElementById('httpCheck-sandbox').checked) {
    document.getElementById('section-http-sandbox').style.display = 'block';
  }
}

(function () {
  const ipLists = { production: [], sandbox: [] };

  window.addIp = function (event, isProduction) {
    const ipContainer = document.getElementById('ip-container-' + (isProduction ? 'production' : 'sandbox'));
    const ipInput = document.getElementById('ip-input-' + (isProduction ? 'production' : 'sandbox'));
    const ipValuesInput = document.getElementById('ip-values-' + (isProduction ? 'production' : 'sandbox'));

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
      };

      chip.appendChild(removeButton);
      ipContainer.insertBefore(chip, ipInput);
      ipInput.value = '';
    }
  };
})();

(function () {
  const referrerLists = { production: [], sandbox: [] };

  window.addHttpReferrer = function (event, isProduction) {
    const referrerContainer = document.getElementById('http-container-' + (isProduction ? 'production' : 'sandbox'));
    const referrerInput = document.getElementById('http-input-' + (isProduction ? 'production' : 'sandbox'));
    const referrerValuesInput = document.getElementById('http-values-' + (isProduction ? 'production' : 'sandbox'));

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
      };

      chip.appendChild(removeButton);
      referrerContainer.insertBefore(chip, referrerInput);
      referrerInput.value = '';
    }
  };
})();

// Submittion of the form

function generateAPIKey(applicationId, isProduction) {

  let isNoneChecked, isIPChecked, isHTTPChecked;

  if (isProduction) {
    isNoneChecked = document.getElementById('noneCheck-production').checked;
    isIPChecked = document.getElementById('ipCheck-production').checked;
    isHTTPChecked = document.getElementById('httpCheck-production').checked;
  } else {
    isNoneChecked = document.getElementById('noneCheck-sandbox').checked;
    isIPChecked = document.getElementById('ipCheck-sandbox').checked;
    isHTTPChecked = document.getElementById('httpCheck-sandbox').checked;
  }

  console.log(isNoneChecked);
  console.log(isIPChecked);
  console.log(isHTTPChecked);

  console.log(applicationId);
  console.log(isProduction);

  console.log(document.getElementById('ip-values-production').value);
  console.log(document.getElementById('http-values-production').value);
  console.log(document.getElementById('ip-values-sandbox').value);
  console.log(document.getElementById('http-values-sandbox').value);
}
