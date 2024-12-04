document.addEventListener('DOMContentLoaded', checkQueryParamsAndLoadModal);

function checkQueryParamsAndLoadModal() {
    const urlParams = new URLSearchParams(window.location.search);
    const subPlan = urlParams.get('tierPlan');

    const apiId = urlParams.get('apiId');
    if (apiId && subPlan) {
        const modal = document.getElementById('planModal');
        modal.style.display = 'block';

        const planName = document.getElementById('planName');
        planName.innerText = subPlan;
    }
}

async function unsubscribe(subscriptionId) {
    try {
        const response = await fetch(`/devportal/subscriptions/${subscriptionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert(`Unsubscribed successfully!`);
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            const responseData = await response.json();
            console.error('Failed to unsubscribe:', responseData);
            alert(`Failed to unsubscribe.\n${responseData.description}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred.\n${error.message}`);
    }
}

function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function closeModal() {
    hideElementById('planModal');
    hideElementById('applicationFormSection');

    const appInput = document.getElementById('appName');
    if (appInput) {
        appInput.value = '';
    }

    const throttlingTier = document.getElementById('throttlingPolicies');
    if (throttlingTier) {
        throttlingTier.selectedIndex = 0;
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('planModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Function to show the application creation form
function showApplicationForm() {
    const modal = document.getElementById('applicationFormSection');
    modal.style.display = 'block';

    const subButton = document.getElementById('createSubButton');
    subButton.style.display = 'block';
}

// Function to handle application creation
async function handleCreateSubscribe() {
    const urlParams = new URLSearchParams(window.location.search);
    try {
        const response = await fetch(`/devportal/application`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify
                ({
                    name: document.getElementById('appName').value,
                }),
        });

        const responseData = await response.json();

        if (response.ok) {
            handleSubscribe(responseData.applicationId, urlParams.get('tierPlan'));
        } else {
            console.error('Failed to create application:', responseData);
            alert(`Failed to create application. Please try again.\n${responseData.description}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred while subscribing: \n${error.message}`);
    }
}

async function handleSubscribe(appId) {

    const applicationId = appId || document.getElementById('applicationSelect').value;

    if (!applicationId) {
        alert('Please select an application.');
        return;
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const response = await fetch(`/devportal/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                applicationId: applicationId,
                apiId: urlParams.get('apiId'),
                throttlingPolicy: urlParams.get('tierPlan'),
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('Subscribed successfully!');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to subscribe:', responseData);
            alert(`Failed to subscribe. Please try again.\n${responseData.description}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred while subscribing: \n${error.message}`);
    }
}
