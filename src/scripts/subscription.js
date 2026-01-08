document.addEventListener("DOMContentLoaded", () => {
  checkQueryParamsAndLoadModal();
  wireStripeReturnIfPresent();
  // Show subscription success message if redirected after payment or free flow
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('subscription') === 'success') {
    // Try to find the message overlay and card for UI update
    const messageOverlay = document.getElementById('subscription-message-overlay') || null;
    showSubscriptionMessage(messageOverlay, "Successfully subscribed", "success");
    // Optionally, mark the UI as subscribed if you can get the card and applicationID
    // Example: markSubscribedUI(card, applicationID); // You may need to adapt this line
    // Clean up the query param so the message doesn't show again on reload
    urlParams.delete('subscription');
    const url = new URL(window.location.href);
    url.searchParams.delete('subscription');
    window.history.replaceState({}, document.title, url.toString());
  }
});

// backend endpoints (keep your existing base)
const DEVPORTAL_BASE = "/devportal";

// UI behavior
const POLL_AFTER_PAYMENT_MS = 2500;
const POLL_MAX_ATTEMPTS = 20;

// Store the Stripe checkout instance globally so we can destroy it
let currentStripeCheckout = null;

// Flag to prevent duplicate payment processing
let isProcessingPayment = false;

// If you render these into the template, use them.
// Example in HBS:
// <script>
//   window.__API_META__ = {{{json apiMetadata}}};
// </script>
function getApiMeta() {
  return window.__API_META__ || null;
}

function isMonetizationEnabled() {
  const meta = getApiMeta();
  return !!meta?.monetizationInfo?.enabled;
}

function getBillingEngine() {
  const meta = getApiMeta();
  return (meta?.monetizationInfo?.billingEngine || "").toUpperCase();
}

/**
 * Each plan card should provide whether it's paid.
 * Recommended: pass isPaid + priceId from backend and render them as data attributes.
 * For example in HBS:
 *   <a ... data-is-paid="{{isPaid}}" data-price-id="{{priceId}}" ...>
 */
function isPaidPlan(policyId) {
  const el = document.getElementById(`subscribe-btn-${policyId}`);
  if (!el) return false;
  const val = el.getAttribute("data-is-paid");
  return val === "true" || val === "1";
}

function getPriceId(policyId) {
  const el = document.getElementById(`subscribe-btn-${policyId}`);
  if (!el) return null;
  return el.getAttribute("data-price-id") || null;
}

/**
 * Strong sanitization for IDs used in requests.
 */
function safeId(input) {
  if (!input) return "";
  return String(input).replace(/[^a-zA-Z0-9\s-_.:]/g, "");
}

function safeText(input) {
  if (!input) return "";
  // allow hyphen/dot/space
  return String(input).replace(/[^a-zA-Z0-9\s-_.]/g, "");
}

function hideElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) element.style.display = "none";
}

function closeModal(elementId) {
  hideElementById(elementId);
  const form = document.querySelector("form");
  if (form) form.reset();
}

window.onclick = function (event) {
  const modal = document.getElementById("planModal");
  if (event.target === modal) {
    closeModal();
  }
};

function loadModal(modalID) {
  const modal = document.getElementById(modalID);
  if (modal) modal.style.display = "flex";
}

function checkQueryParamsAndLoadModal() {
    const urlParams = new URLSearchParams(window.location.search);
    const subPlan = urlParams.get('policyName');
    const apiName = urlParams.get('apiName');
    const apiVersion = urlParams.get('apiVersion');

    if (subPlan && apiName && apiVersion) {
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
            await showAlert(`Unsubscribed successfully!`, 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            const responseData = await response.json();
            console.error('Failed to unsubscribe:', responseData);
            await showAlert(`Failed to unsubscribe.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred.\n${error.message}`, 'error');
    }
}

function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function closeModal(elementId) {
    hideElementById(elementId);
    document.querySelector("form").reset();
}

window.onclick = function (event) {
    const modal = document.getElementById('planModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Function to show the application creation form
function showApplicationForm() {
    const creationForm = document.getElementById('applicationFormCreation');
    creationForm.style.display = 'block';

    hideElementById('applicationFormSection');

    const subButton = document.getElementById('createSubButton');
    subButton.style.display = 'block';
}

// Function to handle application creation
async function handleCreateSubscribe() {
    const urlParams = new URLSearchParams(window.location.search);
    try {
        // Sanitize the application name
        const appName = document.getElementById('appName').value.trim().replace(/[^a-zA-Z0-9\s]/g, '');
        if (!appName) {
            await showAlert('Application name cannot be empty.', 'error');
            return;
        }

        const response = await fetch(`/devportal/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: sanitize(appName) }),
        });

        const responseData = await response.json();

        if (response.ok) {
            handleSubscribe(responseData.applicationId);
        } else {
            console.error('Failed to create application:', responseData);
            await showAlert(`Failed to create application. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred while subscribing: \n${error.message}`, 'error');
    }
}

function sanitize(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

async function handleSubscribe(appId, apiName, apiVersion, apiRefId) {
    const applicationSelect = document.getElementById('applicationSelect');
    let policyName;

    const applicationId = appId !== null
        ? appId
        : (applicationSelect ? applicationSelect.value : window.location.pathname.split('/').pop());


    if (!applicationId) {
        await showAlert('Please select an application.', 'error');
        return;
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('apiName') && urlParams.has('policyName')) {
            apiName = urlParams.get('apiName');
            apiVersion = urlParams.get('apiVersion');
            policyName = urlParams.get('policyName');
        } else {
            policyName = document.getElementById('subscriptionPlan').value;
        }

        const response = await fetch(`/devportal/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                applicationId: applicationId.replace(/[^a-zA-Z0-9\s-]/g, ''),
                apiName: apiName.replace(/[^a-zA-Z0-9\s-]/g, ''),
                apiVersion: apiVersion.replace(/[^a-zA-Z0-9\s-.]/g, ''),
                throttlingPolicy: policyName.replace(/[^a-zA-Z0-9\s-]/g, ''),
                apiRefId: apiRefId,
            }),
        });

        const responseData = await response.json();
        if (response.ok) {
            await showAlert('Subscribed successfully!', 'success');
            const url = new URL(window.location.origin + window.location.pathname);
            window.location.href = url.toString();
        } else {
            console.error('Failed to subscribe:', responseData);
            await showAlert(`Failed to subscribe. Please try again.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred while subscribing: \n${error.message}`, 'error');
    }
}

function loadModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.style.display = 'flex';
}

/**
 * =========================
 *  Unified Subscribe (FREE + PAID)
 *  - This is what your HBS "Subscribe" buttons should call.
 * =========================
 */
async function subscribe(orgID, applicationID, apiId, apiReferenceID, policyId, policyName) {
  console.log("Subscribing to API:", apiId);

  const card = getSubscriptionCard(apiId, policyId);
  const subscribeButton = card ? card.querySelector(".common-btn-primary") : null;
  const messageOverlay = card ? card.querySelector(".message-overlay") : null;

  try {
    // applicationID from hidden if not provided
    if (!applicationID && card) {
      const hiddenField = card.querySelector('input[type="hidden"]');
      if (hiddenField?.value) applicationID = hiddenField.value;
    }

    if (!applicationID) {
      showSubscriptionMessage(messageOverlay, "Please select an application.", "error");
      return;
    }

    const monetized = isMonetizationEnabled() && getBillingEngine() === "STRIPE";
    const paid = monetized && isPaidPlan(policyId);

    // Always reset UI button state safely on exit paths
    const resetUi = () => {
      const planButton = document.getElementById("subscribe-btn-" + policyId);
      if (planButton) resetSubscribeButtonState(planButton);
      resetSubscribeButtonState(subscribeButton);
    };

    // ✅ FREE FLOW: create DP subscription immediately (existing behavior)
    if (!paid) {
      const response = await fetch(`${DEVPORTAL_BASE}/organizations/${safeId(orgID)}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationID: safeId(applicationID),
          apiId: safeId(apiId),
          apiReferenceID: safeId(apiReferenceID),
          policyId: safeId(policyId),
          policyName: safeText(policyName),
        }),
      });

      const responseData = await response.json().catch(() => ({}));
      resetUi();

      if (response.ok) {
        showSubscriptionMessage(messageOverlay, "Successfully subscribed", "success");
        markSubscribedUI(card, applicationID);
      } else {
        console.error("Failed to create subscription:", responseData);
        showSubscriptionMessage(messageOverlay, `Failed to subscribe: ${responseData.description || response.statusText}`, "error");
      }
      return;
    }

    // ✅ PAID FLOW: start Stripe embedded checkout first
    const priceId = getPriceId(policyId);
    if (!priceId) {
      resetUi();
      showSubscriptionMessage(messageOverlay, "Paid plan misconfigured (missing priceId).", "error");
      return;
    }

    // Call backend to create embedded checkout session
    const checkoutRes = await fetch(`${DEVPORTAL_BASE}/organizations/${safeId(orgID)}/monetization/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationID: safeId(applicationID),
        apiId: safeId(apiId),
        apiReferenceID: safeId(apiReferenceID),
        policyId: safeId(policyId),
        policyName: safeText(policyName),
        priceId: safeId(priceId),
      }),
    });

    const checkoutData = await checkoutRes.json().catch(() => ({}));
    resetUi();

    if (!checkoutRes.ok) {
      console.error("Checkout creation failed:", checkoutData);
      showSubscriptionMessage(messageOverlay, `Failed to start checkout: ${checkoutData.description || checkoutRes.statusText}`, "error");
      return;
    }

    // Expect backend returns:
    // { clientSecret, publishableKey, checkoutContextId, returnUrl }
    const { clientSecret, publishableKey, checkoutContextId, returnUrl } = checkoutData;

    if (!clientSecret || !publishableKey) {
      showSubscriptionMessage(messageOverlay, "Checkout session response missing clientSecret/publishableKey.", "error");
      return;
    }

    // Open embedded checkout UI (modal)
    await openStripeEmbeddedCheckout({
      publishableKey,
      clientSecret,
      orgID,
      checkoutContextId,
      returnUrl,
    });

    // After checkout completes, user will be redirected or we can poll (see wireStripeReturnIfPresent)
  } catch (error) {
    console.error("Error:", error);
    showSubscriptionMessage(messageOverlay, `Error while subscribing: ${error.message}`, "error");
  }
}

/**
 * =========================
 *  Stripe Embedded Checkout (UI)
 * =========================
 * Requires you to include Stripe JS in layout:
 * <script src="https://js.stripe.com/v3/"></script>
 *
 * And create a modal container in your HBS layout:
 *  <div id="stripeCheckoutModal" class="modal hidden">
 *     <div class="modal-content">
 *        <button onclick="closeStripeCheckoutModal()">×</button>
 *        <div id="stripe-embedded-checkout"></div>
 *     </div>
 *  </div>
 */
async function openStripeEmbeddedCheckout({ publishableKey, clientSecret, returnUrl }) {
  console.log("🎯 openStripeEmbeddedCheckout called with:", {
    publishableKey,
    clientSecretLength: clientSecret ? clientSecret.length : null,
    clientSecretPreview: clientSecret ? clientSecret.substring(0, 8) + '...' : null,
    returnUrl
  });
  if (typeof publishableKey !== 'string' || publishableKey.length < 10) {
    console.warn("⚠️ publishableKey seems too short or invalid:", publishableKey);
  }
  if (typeof clientSecret !== 'string' || clientSecret.length < 10) {
    console.warn("⚠️ clientSecret seems too short or invalid:", clientSecret);
  }
  
  // Validate inputs
  if (!publishableKey) {
    console.error("❌ Missing publishableKey");
    await showAlert("Stripe publishable key is missing.", "error");
    return;
  }
  if (!clientSecret) {
    console.error("❌ Missing clientSecret");
    await showAlert("Stripe client secret is missing.", "error");
    return;
  }
  
  // If your UX is: redirect to a dedicated page, you can do:
  // window.location.href = returnUrl;
  // But since you want embedded, do in a modal.

  if (!window.Stripe) {
    console.error("❌ Stripe.js not loaded");
    await showAlert("Stripe.js not loaded. Add https://js.stripe.com/v3/ to layout.", "error");
    return;
  }
  console.log("✅ Stripe.js loaded");

  const stripe = window.Stripe(publishableKey);
  console.log("✅ Stripe instance created with key:", publishableKey);

  const modal = document.getElementById("stripeCheckoutModal");
  const mountPoint = document.getElementById("stripe-embedded-checkout");

  console.log("🔍 Modal element:", modal);
  if (!modal) {
    console.error("❌ Modal element #stripeCheckoutModal not found in DOM");
  }
  console.log("🔍 Mount point element:", mountPoint);
  if (!mountPoint) {
    console.error("❌ Mount point #stripe-embedded-checkout not found in DOM");
  }

  if (!modal || !mountPoint) {
    console.error("❌ Modal or mount point missing");
    await showAlert("Stripe checkout modal container is missing in template.", "error");
    return;
  }

  // Destroy previous checkout instance if it exists
  if (currentStripeCheckout) {
    console.log("🔄 Destroying previous Stripe checkout instance...");
    try {
      currentStripeCheckout.destroy();
    } catch (e) {
      console.warn("⚠️ Error destroying previous checkout:", e);
    }
    currentStripeCheckout = null;
  }

  // clear previous mount
  mountPoint.innerHTML = "";

  modal.classList.remove("hidden");
  modal.style.display = "flex";
  console.log("✅ Modal opened");

  try {
    console.log("🔄 Initializing embedded checkout with clientSecret (first 8 chars):", clientSecret.substring(0, 8) + "...");
    const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
    console.log("✅ Checkout initialized, mounting...");

    // Store the checkout instance globally
    currentStripeCheckout = checkout;

    checkout.mount("#stripe-embedded-checkout");
    console.log("✅ Checkout mounted successfully");
  } catch (e) {
    console.error("❌ Failed to init embedded checkout - Full error:", {
      name: e.name,
      message: e.message,
      type: e.type,
      code: e.code,
      decline_code: e.decline_code,
      param: e.param,
      stack: e.stack
    });

    let errorMessage = "Failed to load checkout UI";
    if (e.message) {
      errorMessage += ": " + e.message;
    }
    if (e.type === 'invalid_request_error') {
      errorMessage = "Invalid checkout session. Please try again.";
    }

    await showAlert(errorMessage, "error");
    closeStripeCheckoutModal();
  }
}

function closeStripeCheckoutModal() {
  console.log("🔄 Closing Stripe checkout modal...");
  
  // Destroy the checkout instance when closing
  if (currentStripeCheckout) {
    console.log("🔄 Destroying Stripe checkout instance...");
    try {
      currentStripeCheckout.destroy();
    } catch (e) {
      console.warn("⚠️ Error destroying checkout:", e);
    }
    currentStripeCheckout = null;
  }
  
  const modal = document.getElementById("stripeCheckoutModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
  
  // Clear the mount point
  const mountPoint = document.getElementById("stripe-embedded-checkout");
  if (mountPoint) {
    mountPoint.innerHTML = "";
  }
  
  console.log("✅ Modal closed and cleaned up");
}

/**
 * =========================
 *  After Return: confirm checkout + refresh UI
 * =========================
 * Called when Stripe redirects back after payment completion.
 * This finalizes the subscription by calling the register endpoint.
 */
async function wireStripeReturnIfPresent() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const dpSubId = params.get("dp_sub_id");
  const orgId = params.get("org_id");
  
  if (!sessionId) return;

  // Prevent duplicate processing
  if (isProcessingPayment) {
    console.log("⚠️ Payment already being processed, skipping...");
    return;
  }

  isProcessingPayment = true;
  console.log("🔄 Processing Stripe return with session_id:", sessionId, "dp_sub_id:", dpSubId, "org_id:", orgId);

  if (!orgId) {
    console.error("❌ Missing org_id in URL parameters");
    await showAlert("Missing organization ID. Cannot complete subscription.", "error");
    isProcessingPayment = false;
    return;
  }

  // Show a loading indicator
  showAlert("Processing your payment...", "info");

  try {
    console.log("🔄 Calling register endpoint for orgId:", orgId);

    // Call register endpoint to finalize the subscription
    const response = await fetch(`${DEVPORTAL_BASE}/organizations/${safeId(orgId)}/monetization/stripe/register/${encodeURIComponent(sessionId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Subscription registered successfully:", result);
      await showAlert("Payment successful! Subscription activated.", "success");
      
      // Wait a moment before reloading
      await new Promise(r => setTimeout(r, 2000));
      
      // Clean URL before reloading to prevent re-processing
      const url = new URL(window.location.href);
      url.searchParams.delete("session_id");
      url.searchParams.delete("dp_sub_id");
      url.searchParams.delete("org_id");
      
      // Reload the page to show updated subscription status
      window.location.href = url.toString();
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Failed to register subscription:", errorData);
      await showAlert(`Payment completed but subscription activation failed: ${errorData.message || "Unknown error"}`, "error");
      isProcessingPayment = false;
    }
  } catch (error) {
    console.error("❌ Error processing return:", error);
    await showAlert(`Error processing payment return: ${error.message}`, "error");
    isProcessingPayment = false;
  } finally {
    // Clean URL to remove session_id, dp_sub_id, and org_id (if not already done)
    const url = new URL(window.location.href);
    if (url.searchParams.has("session_id")) {
      url.searchParams.delete("session_id");
      url.searchParams.delete("dp_sub_id");
      url.searchParams.delete("org_id");
      window.history.replaceState({}, document.title, url.toString());
    }
  }
}




async function updateSubscription(orgID, applicationID, apiId, apiReferenceID, policyId, policyName, oldPolicyName, subID) {

    // Find the related card and button elements
    const card = getSubscriptionCard(apiId, policyId);
    const subscribeButton = card ? card.querySelector(".common-btn-primary") : null;
    const messageOverlay = card ? card.querySelector(".message-overlay") : null;

    try {
        // Get application ID from hidden field if not provided
        if (!applicationID && card) {
            const hiddenField = card.querySelector('input[type="hidden"]');
            if (hiddenField && hiddenField.value) {
                applicationID = hiddenField.value;
            }
        }

        // Make the API request
        const response = await fetch(`/devportal/organizations/${orgID}/subscriptions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ applicationID, apiId, apiReferenceID, policyId, policyName }),
        });

        const responseData = await response.json();

        // Always reset button state and close modal
        const updatedButton = document.getElementById('subscribe-btn-' + apiId + "-" + policyName);
        if (updatedButton) {
            resetSubscribeButtonState(updatedButton);
        }
        // closeModal('planModal-' + apiId);
        resetSubscribeButtonState(subscribeButton);

        if (response.ok) {

            // Show success notification
            const updatedPlanCard = document.getElementById('api-card-' + apiId + "-" + policyName);
            updatedPlanCard.style.borderColor = 'var(--primary-main-color)';

            updatedButton.setAttribute('disabled', 'disabled');
            updatedButton.classList.add('disabled');
            updatedButton.style.setProperty('pointer-events', 'none', 'important');
            updatedButton.textContent = 'Update';

            const apiCards = document.querySelectorAll(`[id^="api-card-${apiId}-"]`);
            apiCards.forEach(card => {
                if (card.id !== `api-card-${apiId}-${policyName}`) {
                    card.style.borderColor = '';
                    const cardButton = card.querySelector('a[type="button"]');
                    cardButton.style.pointerEvents = 'auto';
                    cardButton.removeAttribute('disabled');
                    cardButton.classList.remove('disabled');
                }
            });
            document.getElementById('policy_' + subID).textContent = policyName;
            showSubscriptionMessage(messageOverlay, 'Successfully updated API subscription', 'success');
        } else {
            // Handle API error
            console.error('Failed to create subscription:', responseData);
            const errorMessage = `Failed to subscribe: ${responseData.description || 'Unknown error'}`;
            showSubscriptionMessage(messageOverlay, errorMessage, 'error');
        }
    } catch (error) {
        // Handle exceptions
        console.error('Error:', error);

        // Always reset button state and close modal
        const planButton = document.getElementById('subscribe-btn-' + policyId);
        if (planButton) {
            resetSubscribeButtonState(planButton);
        }
        closeModal('planModal-' + apiId);
        resetSubscribeButtonState(subscribeButton);

        const errorMessage = `Error while updating subscription: ${error.message}`;
        showSubscriptionMessage(messageOverlay, errorMessage, 'error');
    }
}

// Helper functions for the subscribe function
function getSubscriptionCard(apiId, policyId) {
    return document.getElementById('apiCard-' + apiId) ||
        document.getElementById('subscriptionCard-' + policyId) ||
        null;
}

function resetSubscribeButtonState(button) {
    if (button && typeof window.resetSubscribeButtonState === 'function') {
        window.resetSubscribeButtonState(button);
    }
}

function showSubscriptionMessage(messageOverlay, message, type) {
    if (messageOverlay && typeof window.showApiMessage === 'function') {
        window.showApiMessage(messageOverlay, message, type);
    } else {
        showAlert(message, type);
    }
}

function addAPISubscription(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const subscriptionPolicies = JSON.parse(selectedOption.getAttribute("data-policies") || "[]");
    const planSelect = document.getElementById("planSelect");

    planSelect.innerHTML = '<option value="" disabled selected>Select a Plan</option>';

    subscriptionPolicies.forEach(policy => {
        const option = document.createElement("option");
        option.value = policy.policyID;
        option.textContent = policy.displayName;
        option.setAttribute("data-policyName", policy.policyName);
        planSelect.appendChild(option);
    });

}

async function removeSubscription(orgID, appID, apiRefID, subID) {

    try {
        const response = await fetch(`/devportal/organizations/${orgID}/subscriptions?appID=${appID}&apiReferenceID=${apiRefID}&subscriptionID=${subID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await showAlert(`Unsubscribed successfully!`, 'success');
            document.getElementById(`data-row-${subID}`)?.remove();
            const rowCount = document.getElementById(`app-table-${appID}`).rows.length;
            if (rowCount === 1) {
                document.getElementById(`app-table-${appID}`).remove();
                document.getElementById('no-subscription').style.display = 'block';
            }
            const mcpTable = document.getElementById(`app-table-mcp-${appID}`);
            if (mcpTable && mcpTable.rows.length === 1) {
                mcpTable.remove();
                document.getElementById('no-subscription-mcp').style.display = 'block';
            }
        } else {
            const responseData = await response.json();
            console.error('Failed to unsubscribe:', responseData);
            await showAlert(`Failed to unsubscribe.\n${responseData.description}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        await showAlert(`An error occurred.\n${error.message}`, 'error');
    }
}

function markSubscribedUI(card, applicationID) {
  if (!card) return;

  const subscriptionFlag = card.querySelector(".subscription-flag");
  if (subscriptionFlag) subscriptionFlag.style.display = "block";

  const dropdown = card.querySelector(".custom-dropdown");
  if (dropdown) {
    const appOption = dropdown.querySelector(`.select-item[data-value="${applicationID}"]`);
    if (appOption) {
      let subscriptionIcon = appOption.querySelector(".subscription-icon");
      if (subscriptionIcon) {
        subscriptionIcon.style.display = "inline-block";
      } else {
        const subscriptionIconHtml = `<img src="https://raw.githubusercontent.com/wso2/docs-bijira/refs/heads/main/en/devportal-theming/success-rounded.svg"
          alt="Subscribed" class="subscription-icon" style="display: inline-block;" />`;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = subscriptionIconHtml;
        subscriptionIcon = tempDiv.firstElementChild;
        appOption.appendChild(subscriptionIcon);
      }
      appOption.classList.add("disabled");
    }

    const btn = card.querySelector(".common-btn-primary");
    if (btn) btn.setAttribute("disabled", "disabled");
  }
}

/**
 * =========================
 *  Handler for Plan Selection Modal
 *  - Called from subscription-plans.hbs modal
 * =========================
 */
function handlePlanSubscription(orgID, apiID, apiReferenceID, policyID, policyName, buttonElement) {
  console.log('🔵 handlePlanSubscription called', {
    orgID,
    apiID,
    apiReferenceID,
    policyID,
    policyName,
    buttonElement
  });
  
  const isPaid = buttonElement.dataset.isPaid === 'true';
  console.log('🔵 isPaid:', isPaid, 'dataset:', buttonElement.dataset);
  
  // Get application ID from modal's hidden field (passed from listing page)
  const modalAppField = document.getElementById(`modal-selected-app-${apiID}`);
  const applicationID = modalAppField ? modalAppField.value : '';
  console.log('🔵 applicationID from modal:', applicationID, 'modalAppField:', modalAppField);

  if (!applicationID) {
    console.error('❌ No application ID found');
    showAlert('Please select an application first.', 'error');
    return;
  }

  if (isPaid) {
    console.log('💳 Paid plan - calling subscribeAndCheckout');
    // Paid plan - trigger Stripe checkout flow
    subscribeAndCheckout(orgID, apiID, apiReferenceID, policyID, policyName);
  } else {
    console.log('✅ Free plan - calling subscribe');
    // Free plan - direct subscription
    subscribe(orgID, applicationID, apiID, apiReferenceID, policyID, policyName);
  }
}

/**
 * =========================
 *  Handler for API Landing Page (single plan or paid plan)
 *  - Called from api-subscription-plans.hbs
 * =========================
 */
function handleSubscribeWithPayment(orgID, apiID, apiReferenceID, policyID, policyName, buttonElement) {
  const isPaid = buttonElement.dataset.isPaid === 'true';
  
  if (isPaid) {
    // Paid plan - trigger Stripe checkout flow
    subscribeAndCheckout(orgID, apiID, apiReferenceID, policyID, policyName);
  } else {
    // Free plan - direct subscription
    const applicationID = ''; // Will be extracted from hidden field in subscribe()
    subscribe(orgID, applicationID, apiID, apiReferenceID, policyID, policyName);
  }
}

/**
 * =========================
 *  Stripe Checkout Flow (for paid plans)
 * =========================
 */
async function subscribeAndCheckout(orgID, apiID, apiReferenceID, policyID, policyName) {
  console.log("💰 subscribeAndCheckout called", { orgID, apiID, apiReferenceID, policyID, policyName });

  const card = getSubscriptionCard(apiID, policyID);
  console.log("💰 Card found:", card);
  const subscribeButton = card ? card.querySelector(".common-btn-primary") : null;
  const messageOverlay = card ? card.querySelector(".message-overlay") : null;

  try {
    // Get application ID from hidden field or modal
    let applicationID = '';
    
    // Try modal's hidden field first (from listing page)
    const modalAppField = document.getElementById(`modal-selected-app-${apiID}`);
    console.log("💰 modalAppField:", modalAppField, "value:", modalAppField?.value);
    if (modalAppField && modalAppField.value) {
      applicationID = modalAppField.value;
      console.log("💰 Got applicationID from modal field:", applicationID);
    }
    
    // Fall back to card hidden field (for landing page)
    if (!applicationID && card) {
      const hiddenField = card.querySelector('input[type="hidden"]');
      console.log("💰 Trying card hidden field:", hiddenField, "value:", hiddenField?.value);
      if (hiddenField?.value) applicationID = hiddenField.value;
    }

    console.log("💰 Final applicationID:", applicationID);

    if (!applicationID) {
      console.error("❌ No applicationID found");
      showAlert("Please select an application.", "error");
      return;
    }

    // Get price ID from button data attribute
    const priceId = document.getElementById(`subscribe-btn-${policyID}`)?.getAttribute('data-external-price-id');
    console.log("💰 Price ID:", priceId);
    
    if (!priceId) {
      console.error("❌ No priceId found");
      showAlert("Paid plan misconfigured (missing priceId).", "error");
      return;
    }

    // Call backend to create Stripe checkout session
    const requestBody = {
      applicationID: safeId(applicationID),
      apiId: safeId(apiID),
      apiReferenceID: safeId(apiReferenceID),
      policyId: safeId(policyID),
      policyName: safeText(policyName),
      priceId: safeId(priceId), // <-- ensure priceId is sent
      sourcePage: window.location.pathname, // Store current page to redirect back after payment
    };
    
    console.log("💰 Sending checkout request:", requestBody);
    console.log("💰 URL:", `${DEVPORTAL_BASE}/organizations/${safeId(orgID)}/monetization/checkout`);
    
    const checkoutRes = await fetch(`${DEVPORTAL_BASE}/organizations/${safeId(orgID)}/monetization/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const checkoutData = await checkoutRes.json().catch(() => ({}));
    
    console.log("💰 Checkout response status:", checkoutRes.status);
    console.log("💰 Checkout response data:", checkoutData);

    if (!checkoutRes.ok) {
      console.error("❌ Checkout creation failed:", checkoutData);
      const errorMsg = checkoutData.message || checkoutData.error || checkoutData.description || checkoutRes.statusText;
      showSubscriptionMessage(messageOverlay, `Failed to start checkout: ${errorMsg}`, "error");
      return;
    }

    // Expect backend returns: { clientSecret, publishableKey, checkoutContextId, returnUrl }
    const { clientSecret, publishableKey, checkoutContextId, returnUrl } = checkoutData;

    if (!clientSecret || !publishableKey) {
      showSubscriptionMessage(messageOverlay, "Checkout session response missing clientSecret/publishableKey.", "error");
      return;
    }

    // Close the plan selection modal if open (ID is planModal-{apiID})
    closeModal(`planModal-${apiID}`);

    // Open Stripe embedded checkout modal
    await openStripeEmbeddedCheckout({
      publishableKey,
      clientSecret,
      orgID,
      checkoutContextId,
      returnUrl,
    });

  } catch (error) {
    console.error("Error during paid subscription:", error);
    showSubscriptionMessage(messageOverlay, `Error: ${error.message}`, "error");
  }
}

/**
 * =========================
 *  Open modal and pass selected application ID
 * =========================
 */
function openModalWithApp(modalId, appIdFieldId) {
  const appIdField = document.getElementById(appIdFieldId);
  if (!appIdField || !appIdField.value) {
    showAlert('Please select an application first.', 'error');
    return;
  }
  
  const selectedAppId = appIdField.value;
  
  // Extract API ID from modal ID (e.g., "planModal-api123" -> "api123")
  const apiId = modalId.replace('planModal-', '');
  
  // Store the selected app ID in the modal's hidden field
  const modalAppField = document.getElementById(`modal-selected-app-${apiId}`);
  if (modalAppField) {
    modalAppField.value = selectedAppId;
  }
  
  // Open the modal
  loadModal(modalId);
}

/**
 * =========================
 *  Handler for single plan subscription from listing page
 *  - Handles both paid and free plans
 * =========================
 */
function handleListingSubscribe(orgID, apiID, apiReferenceID, policyID, policyName, appIdFieldId, buttonElement) {
  console.log('🟢 handleListingSubscribe called', {
    orgID,
    apiID,
    apiReferenceID,
    policyID,
    policyName,
    appIdFieldId,
    buttonElement
  });
  
  const isPaid = buttonElement.dataset.isPaid === 'true';
  console.log('🟢 isPaid:', isPaid, 'dataset:', buttonElement.dataset);
  
  // Get selected application ID
  const appIdField = document.getElementById(appIdFieldId);
  const applicationID = appIdField ? appIdField.value : '';
  console.log('🟢 applicationID from listing:', applicationID, 'appIdField:', appIdField);
  
  if (!applicationID) {
    console.error('❌ No application ID selected');
    showAlert('Please select an application first.', 'error');
    return;
  }
  
  // Store app ID in the hidden field that subscribeAndCheckout looks for
  const modalAppField = document.getElementById(`modal-selected-app-${apiID}`);
  console.log('🟢 Storing app ID in modal field:', modalAppField);
  if (modalAppField) {
    modalAppField.value = applicationID;
    console.log('🟢 Stored app ID:', modalAppField.value);
  }
  
  if (isPaid) {
    console.log('💳 Paid plan - calling subscribeAndCheckout');
    // Paid plan - trigger Stripe checkout
    subscribeAndCheckout(orgID, apiID, apiReferenceID, policyID, policyName);
  } else {
    console.log('✅ Free plan - calling subscribe');
    // Free plan - direct subscription
    subscribe(orgID, applicationID, apiID, apiReferenceID, policyID, policyName);
  }
}

/**
 * =========================
 *  Export to window (important for inline onclick in HBS)
 * =========================
 */
window.subscribe = subscribe;
window.unsubscribe = unsubscribe;
window.updateSubscription = updateSubscription;
window.removeSubscription = removeSubscription;
window.handleCreateSubscribe = handleCreateSubscribe;
window.showApplicationForm = showApplicationForm;
window.closeStripeCheckoutModal = closeStripeCheckoutModal;
window.handlePlanSubscription = handlePlanSubscription;
window.handleSubscribeWithPayment = handleSubscribeWithPayment;
window.subscribeAndCheckout = subscribeAndCheckout;
window.openModalWithApp = openModalWithApp;
window.handleListingSubscribe = handleListingSubscribe;