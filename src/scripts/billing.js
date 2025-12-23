/**
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

console.log('✅ billing.js loaded successfully');

// Function to initialize the billing page
function initializeBillingPage() {
  console.log('🔧 Initializing billing page...');
  console.log('🔧 Document ready state:', document.readyState);
  
  // Load initial data based on active tab
  const billingTabs = document.querySelector('.billing-tabs');
  console.log('🔧 Billing tabs container found:', !!billingTabs);
  
  const activeTab = document.querySelector('.billing-tabs .nav-link.active');
  console.log('🔧 Active tab found:', activeTab);
  console.log('🔧 Active tab ID:', activeTab?.id);
  console.log('🔧 Active tab data-bs-target:', activeTab?.getAttribute('data-bs-target'));
  
  // Always load usage data on page load since Usage is the first/default tab
  console.log('🔧 🚀 Calling loadUsageData() on page load');
  setTimeout(() => {
    loadUsageData();
  }, 100);
  
  // Set up tab change listeners
  const tabs = document.querySelectorAll('.billing-tabs .nav-link');
  console.log('🔧 Found', tabs.length, 'tabs');
  
  tabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function(event) {
      const targetId = event.target.getAttribute('data-bs-target');
      console.log('🔧 Tab changed to:', targetId);
      
      if (targetId === '#usage') {
        loadUsageData();
      } else if (targetId === '#invoices') {
        loadInvoices();
      } else if (targetId === '#payment') {
        loadPaymentDetails();
      }
    });
  });
  
  console.log('🔧 Billing page initialization complete');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  console.log('🔧 DOM still loading, adding event listener');
  document.addEventListener('DOMContentLoaded', initializeBillingPage);
} else {
  console.log('🔧 DOM already loaded, initializing immediately');
  initializeBillingPage();
}

/**
 * Load usage data for the selected period
 */
async function loadUsageData() {
  const period = document.getElementById('usagePeriod')?.value || 'current';
  const tableBody = document.getElementById('usageTableBody');
  const orgId = getOrgIdFromContext();
  
  console.log('Loading usage data with orgId:', orgId, 'period:', period);
  
  if (!tableBody) {
    console.error('❌ usageTableBody element not found!');
    return;
  }
  
  try {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading usage data...
        </td>
      </tr>
    `;

    const url = `/devportal/organizations/${orgId}/billing/usage-data?period=${period}`;
    console.log('Fetching usage data from:', url);
    
    const response = await fetch(url);
    
    console.log('Usage data response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Usage data error response:', errorText);
      throw new Error(`Failed to fetch usage data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usage data received:', data);
    
    // Update statistics cards
    document.getElementById('totalRequests').textContent = formatNumber(data.totalRequests || 0);
    document.getElementById('activeSubscriptions').textContent = data.activeSubscriptions || 0;
    document.getElementById('estimatedCost').textContent = formatCurrency(data.estimatedCost || 0);
    document.getElementById('avgResponseTime').textContent = `${data.avgResponseTime || 0}ms`;

    // Populate usage table
    if (data.subscriptions && data.subscriptions.length > 0) {
      tableBody.innerHTML = data.subscriptions.map(sub => `
        <tr>
          <td><strong>${escapeHtml(sub.apiName)}</strong></td>
          <td>${escapeHtml(sub.applicationName)}</td>
          <td><span class="badge bg-secondary">${escapeHtml(sub.planName)}</span></td>
          <td>${formatNumber(sub.requests)}</td>
          <td>
            ${sub.pricingModel === 'PER_UNIT' 
              ? '<span class="badge bg-info">Metered</span>' 
              : '<span class="badge bg-success">Flat</span>'}
          </td>
          <td><strong>${formatCurrency(sub.cost)}</strong></td>
        </tr>
      `).join('');
    } else {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            <i class="fas fa-chart-line fa-2x mb-3"></i>
            <p>No usage data available for this period</p>
          </td>
        </tr>
      `;
    }
  } catch (error) {
    console.error('Error loading usage data:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-danger">
          <i class="fas fa-exclamation-circle me-2"></i>
          Failed to load usage data
          <div class="small text-muted mt-2">${escapeHtml(error.message)}</div>
        </td>
      </tr>
    `;
    showAlert('Failed to load usage data', 'danger');
  }
}

/**
 * Load invoice history
 */
async function loadInvoices() {
  const tableBody = document.getElementById('invoicesTableBody');
  const noInvoices = document.getElementById('noInvoices');
  const period = document.getElementById('invoicePeriod')?.value || 'last3months';
  const orgId = getOrgIdFromContext();
  
  try {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading invoices...
        </td>
      </tr>
    `;

    const response = await fetch(`/devportal/organizations/${orgId}/invoices?period=${period}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }

    const data = await response.json();
    
    if (data.invoices && data.invoices.length > 0) {
      noInvoices.style.display = 'none';
      tableBody.innerHTML = data.invoices.map(invoice => `
        <tr>
          <td><strong>${escapeHtml(invoice.number)}</strong></td>
          <td>${formatDate(invoice.created)}</td>
          <td>${escapeHtml(invoice.period)}</td>
          <td><strong>${formatCurrency(invoice.amount)}</strong></td>
          <td>
            <span class="badge-status badge-${getInvoiceStatusClass(invoice.status)}">
              ${escapeHtml(invoice.status)}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary" onclick="downloadInvoice('${invoice.id}')">
              <i class="fas fa-download"></i> Download
            </button>
            ${invoice.hostedInvoiceUrl ? `
              <a href="${invoice.hostedInvoiceUrl}" target="_blank" class="btn btn-sm btn-outline-secondary ms-2">
                <i class="fas fa-external-link-alt"></i> View
              </a>
            ` : ''}
          </td>
        </tr>
      `).join('');
    } else {
      tableBody.innerHTML = '';
      noInvoices.style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading invoices:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-danger">
          <i class="fas fa-exclamation-circle me-2"></i>
          Failed to load invoices. Please try again.
        </td>
      </tr>
    `;
    showAlert('Failed to load invoices', 'danger');
  }
}

/**
 * Load payment details including payment methods and billing info
 */
async function loadPaymentDetails() {
  console.log('💳 loadPaymentDetails() called');
  try {
    await Promise.all([
      loadPaymentMethods(),
      loadBillingInfo(),
      loadActiveSubscriptions()
    ]);
    console.log('💳 All payment details loaded successfully');
  } catch (error) {
    console.error('💳 Error loading payment details:', error);
  }
}

/**
 * Load payment methods
 */
async function loadPaymentMethods() {
  console.log('💳 loadPaymentMethods() called');
  const container = document.getElementById('paymentMethodsList');
  const orgId = getOrgIdFromContext();
  
  console.log('💳 orgId:', orgId);
  console.log('💳 container found:', !!container);
  
  if (!orgId) {
    container.innerHTML = `
      <div class="text-center py-4 text-danger">
        <i class="fas fa-exclamation-circle me-2"></i>
        Organization ID not found
      </div>
    `;
    return;
  }
  
  try {
    container.innerHTML = `
      <div class="text-center py-4">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        Loading payment methods...
      </div>
    `;

    const response = await fetch(`/devportal/organizations/${orgId}/billing/payment-methods`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Payment methods fetch failed:', response.status, errorText);
      
      // Try to parse error JSON
      let errorMessage = 'Failed to load payment methods';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Use default message if not JSON
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Payment methods data:', data);
    
    if (data.paymentMethods && data.paymentMethods.length > 0) {
      container.innerHTML = data.paymentMethods.map(method => `
        <div class="payment-method-card ${method.isDefault ? 'default' : ''}">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <i class="fab fa-cc-${method.brand.toLowerCase()} fa-2x me-3"></i>
              <div>
                <strong>${escapeHtml(method.brand)}</strong> •••• ${escapeHtml(method.last4)}
                <div class="text-muted small">Expires ${escapeHtml(method.expMonth)}/${escapeHtml(method.expYear)}</div>
              </div>
            </div>
            <div>
              ${method.isDefault ? '<span class="badge bg-primary">Default</span>' : ''}
            </div>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="fas fa-credit-card fa-2x mb-3"></i>
          <p>No payment methods found</p>
          <p class="small">Add a payment method through Stripe to get started</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading payment methods:', error);
    container.innerHTML = `
      <div class="text-center py-4">
        <div class="text-danger mb-3">
          <i class="fas fa-exclamation-circle fa-2x mb-2"></i>
          <p>Failed to load payment methods</p>
          <p class="small text-muted">${escapeHtml(error.message)}</p>
        </div>
        <button class="common-btn-outlined" onclick="loadPaymentMethods()">
          <i class="fas fa-redo me-2"></i>Retry
        </button>
      </div>
    `;
  }
}

/**
 * Load billing information
 */
async function loadBillingInfo() {
  console.log('💳 loadBillingInfo() called');
  const container = document.getElementById('billingInfoContent');
  const orgId = getOrgIdFromContext();
  
  console.log('💳 billing info orgId:', orgId);
  console.log('💳 billingInfoContent found:', !!container);
  
  try {
    container.innerHTML = `
      <div class="text-center py-4">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        Loading billing information...
      </div>
    `;

    const response = await fetch(`/devportal/organizations/${orgId}/billing/info`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch billing info');
    }

    const data = await response.json();
    
    container.innerHTML = `
      <div class="billing-info">
        <div class="mb-3">
          <label class="text-muted small">Organization</label>
          <div class="fw-bold">${escapeHtml(data.organizationName || 'N/A')}</div>
        </div>
        <div class="mb-3">
          <label class="text-muted small">Email</label>
          <div>${escapeHtml(data.email || 'N/A')}</div>
        </div>
        ${data.address ? `
          <div class="mb-3">
            <label class="text-muted small">Billing Address</label>
            <div>
              ${escapeHtml(data.address.line1 || '')}<br>
              ${data.address.line2 ? escapeHtml(data.address.line2) + '<br>' : ''}
              ${escapeHtml(data.address.city || '')}, ${escapeHtml(data.address.state || '')} ${escapeHtml(data.address.postalCode || '')}<br>
              ${escapeHtml(data.address.country || '')}
            </div>
          </div>
        ` : ''}
        ${data.taxId ? `
          <div class="mb-3">
            <label class="text-muted small">Tax ID</label>
            <div>${escapeHtml(data.taxId)}</div>
          </div>
        ` : ''}
        <div class="text-center mt-4">
          <button class="common-btn-outlined" onclick="editBillingInfo()">
            <i class="fas fa-external-link-alt me-2"></i>Update in Stripe Portal
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading billing info:', error);
    container.innerHTML = `
      <div class="text-center py-4 text-danger">
        <i class="fas fa-exclamation-circle me-2"></i>
        Failed to load billing information
      </div>
    `;
  }
}

/**
 * Load active subscriptions
 */
async function loadActiveSubscriptions() {
  const tableBody = document.getElementById('subscriptionsTableBody');
  const orgId = getOrgIdFromContext();
  
  try {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-4">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading subscriptions...
        </td>
      </tr>
    `;

    const response = await fetch(`/devportal/organizations/${orgId}/billing/subscriptions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions');
    }

    const data = await response.json();
    
    if (data.subscriptions && data.subscriptions.length > 0) {
      tableBody.innerHTML = data.subscriptions.map(sub => `
        <tr>
          <td><strong>${escapeHtml(sub.apiName)}</strong></td>
          <td>${escapeHtml(sub.applicationName || 'N/A')}</td>
          <td><span class="badge bg-secondary">${escapeHtml(sub.planName)}</span></td>
          <td>${escapeHtml(sub.billingCycle)}</td>
          <td><strong>${formatCurrency(sub.amount)}</strong></td>
          <td>${formatDate(sub.nextBillingDate)}</td>
          <td>
            <span class="badge-status badge-${sub.status === 'active' ? 'paid' : 'pending'}">
              ${escapeHtml(sub.status)}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-secondary" onclick="manageSubscription('${sub.id}')">
              <i class="fas fa-cog"></i> Manage
            </button>
          </td>
        </tr>
      `).join('');
    } else {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4 text-muted">
            <i class="fas fa-inbox fa-2x mb-3"></i>
            <p>No active subscriptions</p>
          </td>
        </tr>
      `;
    }
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-4 text-danger">
          <i class="fas fa-exclamation-circle me-2"></i>
          Failed to load subscriptions
        </td>
      </tr>
    `;
  }
}

/**
 * Download a specific invoice
 */
async function downloadInvoice(invoiceId) {
  const orgId = getOrgIdFromContext();
  try {
    const response = await fetch(`/devportal/organizations/${orgId}/invoices/${invoiceId}/pdf`);
    
    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }

    // The API returns JSON with the PDF URL
    const data = await response.json();
    
    if (data.invoice_pdf) {
      // Redirect to Stripe's PDF URL
      window.open(data.invoice_pdf, '_blank');
      showAlert('Invoice opened in new tab', 'success');
    } else {
      throw new Error('Invoice PDF URL not available');
    }
  } catch (error) {
    console.error('Error downloading invoice:', error);
    showAlert('Failed to download invoice', 'danger');
  }
}

/**
 * Download all invoices
 */
async function downloadAllInvoices() {
  const orgId = getOrgIdFromContext();
  try {
    showAlert('Preparing invoices for download...', 'info');
    
    const response = await fetch(`/devportal/organizations/${orgId}/invoices/download-all`);
    
    if (!response.ok) {
      throw new Error('Failed to download invoices');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-invoices-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showAlert('Invoices downloaded successfully', 'success');
  } catch (error) {
    console.error('Error downloading invoices:', error);
    showAlert('Failed to download invoices', 'danger');
  }
}

/**
 * Add a new payment method
 */
async function addPaymentMethod() {
  const orgId = getOrgIdFromContext();
  console.log('🔧 addPaymentMethod called with orgId:', orgId);
  
  try {
    // Use the new endpoint that doesn't require subscription ID
    const portalUrl = `/devportal/organizations/${orgId}/billing-portal`;
    console.log('🔧 Creating billing portal session at:', portalUrl);
    
    const response = await fetch(portalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('🔧 Billing portal response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to create portal session:', errorText);
      throw new Error(`Failed to create portal session: ${response.status}`);
    }

    const data = await response.json();
    console.log('🔧 Billing portal data:', data);
    
    if (data.url) {
      console.log('🔧 Opening Stripe portal in new tab:', data.url);
      // Open Stripe portal in new tab instead of redirecting
      window.open(data.url, '_blank', 'noopener,noreferrer');
      showAlert('Stripe Customer Portal opened in new tab', 'success');
    } else {
      throw new Error('No portal URL returned');
    }
  } catch (error) {
    console.error('❌ Error in addPaymentMethod:', error);
    showAlert('Failed to open payment method management: ' + error.message, 'danger');
  }
}

/**
 * Remove a payment method
 */
async function removePaymentMethod(methodId) {
  if (!confirm('Are you sure you want to remove this payment method?')) {
    return;
  }

  const orgId = getOrgIdFromContext();
  try {
    const response = await fetch(`/devportal/organizations/${orgId}/billing/payment-methods/${methodId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove payment method');
    }

    showAlert('Payment method removed successfully', 'success');
    loadPaymentMethods();
  } catch (error) {
    console.error('Error removing payment method:', error);
    showAlert('Failed to remove payment method', 'danger');
  }
}

/**
 * Edit billing information
 */
async function editBillingInfo() {
  const orgId = getOrgIdFromContext();
  try {
    // First, get active subscriptions to find a subscription ID
    const subsResponse = await fetch(`/devportal/organizations/${orgId}/subscriptions`);
    if (!subsResponse.ok) {
      throw new Error('Failed to get subscriptions');
    }
    
    const subsData = await subsResponse.json();
    
    // Check if there are any subscriptions
    if (!subsData.subscriptions || subsData.subscriptions.length === 0) {
      showAlert('No subscriptions found. Please create a subscription first.', 'warning');
      return;
    }
    
    // Use the first subscription's ID
    const subId = subsData.subscriptions[0].id;
    
    // Redirect to Stripe Customer Portal for billing info management
    const response = await fetch(`/devportal/organizations/${orgId}/subscriptions/${subId}/billing-portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const data = await response.json();
    // Open Stripe portal in new tab instead of redirecting
    window.open(data.url, '_blank', 'noopener,noreferrer');
    showAlert('Stripe Customer Portal opened in new tab', 'success');
  } catch (error) {
    console.error('Error editing billing info:', error);
    showAlert('Failed to open billing information editor', 'danger');
  }
}

/**
 * Manage a subscription
 */
async function manageSubscription(subscriptionId) {
  const orgId = getOrgIdFromContext();
  try {
    // Redirect to Stripe Customer Portal for subscription management
    const response = await fetch(`/devportal/organizations/${orgId}/subscriptions/${subscriptionId}/billing-portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const data = await response.json();
    // Open Stripe portal in new tab instead of redirecting
    window.open(data.url, '_blank', 'noopener,noreferrer');
    showAlert('Stripe Customer Portal opened in new tab', 'success');
  } catch (error) {
    console.error('Error managing subscription:', error);
    showAlert('Failed to open subscription management', 'danger');
  }
}

// Utility Functions

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount / 100); // Stripe amounts are in cents
}

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getInvoiceStatusClass(status) {
  const statusMap = {
    'paid': 'paid',
    'open': 'pending',
    'void': 'failed',
    'uncollectible': 'failed',
    'draft': 'pending'
  };
  return statusMap[status] || 'pending';
}

function getOrgIdFromContext() {
  // Get orgId from main or div element's data attribute
  const element = document.querySelector('[data-org-id]');
  if (element && element.dataset.orgId) {
    console.log('Found orgId from data attribute:', element.dataset.orgId);
    return element.dataset.orgId;
  }
  
  // Fallback: try to extract from URL path (e.g., /hiranyakavi/views/default/billing)
  const pathParts = window.location.pathname.split('/');
  if (pathParts.length > 1 && pathParts[1]) {
    console.log('Using orgId from URL path:', pathParts[1]);
    return pathParts[1];
  }
  
  console.warn('No orgId found, using default');
  return 'default';
}

function showAlert(message, type = 'info') {
  const alertContainer = document.querySelector('.alert-container');
  if (alertContainer) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alertDiv);
    
    setTimeout(() => {
      alertDiv.classList.remove('show');
      setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
  }
}

// Expose functions to global scope for onclick handlers
window.loadUsageData = loadUsageData;
window.loadInvoices = loadInvoices;
window.loadPaymentDetails = loadPaymentDetails;
window.loadPaymentMethods = loadPaymentMethods;
window.loadBillingInfo = loadBillingInfo;
window.loadActiveSubscriptions = loadActiveSubscriptions;
window.downloadInvoice = downloadInvoice;
window.downloadAllInvoices = downloadAllInvoices;
window.addPaymentMethod = addPaymentMethod;
window.removePaymentMethod = removePaymentMethod;
window.editBillingInfo = editBillingInfo;
window.manageSubscription = manageSubscription;

console.log('✅ All billing functions exposed to window scope');
console.log('✅ window.addPaymentMethod is:', typeof window.addPaymentMethod);

// Test if function is callable
if (typeof window.addPaymentMethod === 'function') {
  console.log('✅ addPaymentMethod is properly exposed as a function');
} else {
  console.error('❌ addPaymentMethod is NOT a function!');
}
