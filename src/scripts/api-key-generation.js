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

function addIp(event) {
  const ipContainer = document.getElementById('ip-container');
  const ipInput = document.getElementById('ip-input');
  const ipValuesInput = document.getElementById('ip-values');
  const ipList = [];

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
}

function addHttpReferrer(event) {
  const httpContainer = document.getElementById('http-container');
  const httpInput = document.getElementById('http-input');
  const httpValuesInput = document.getElementById('http-values');
  const httpList = [];

  if (event.key === 'Enter' && httpInput.value.trim() !== '') {
    event.preventDefault();
    const httpValue = httpInput.value.trim();
    httpList.push(httpValue);
    httpValuesInput.value = httpList.join(',');

    const chip2 = document.createElement('span');
    chip2.className = 'badge bg-primary me-2';
    chip2.textContent = httpValue;

    const removeButton2 = document.createElement('button');
    removeButton2.type = 'button';
    removeButton2.className = 'btn-close btn-close-white btn-sm ms-2';
    removeButton2.ariaLabel = 'Remove';
    removeButton2.onclick = function () {
      httpContainer.removeChild(chip2);

      const index = httpList.indexOf(httpValue);
      if (index > -1) {
        httpList.splice(index, 1);
      }

      httpValuesInput.value = httpList.join(',');
    };

    chip2.appendChild(removeButton2);
    httpContainer.insertBefore(chip2, httpInput);
    httpInput.value = '';
  }
}

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
}
