document.addEventListener('DOMContentLoaded', function () {
    const signinCard = document.getElementById('signin-card');
    const enterpriseCard = document.getElementById('enterprise-card');

    const showEnterpriseBtn = document.getElementById('show-enterprise');
    const backBtn = document.getElementById('back-to-signin');

    showEnterpriseBtn.addEventListener('click', function () {
        signinCard.style.display = 'none';
        enterpriseCard.style.display = 'block';
    });

    backBtn.addEventListener('click', function () {
        enterpriseCard.style.display = 'none';
        signinCard.style.display = 'block';
    });
});

const emailInput = document.getElementById('enterprise-email');
const continueBtn = document.getElementById('enterprise-continue');
const enterpriseCard = document.getElementById('enterprise-card');
const baseUrl = enterpriseCard.getAttribute('data-base-url');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    const isValid = validateEmail(email);
    if (isValid) {       
        continueBtn.href = `${baseUrl}/login?fidp=enterprise&username=${encodeURIComponent(email)}`;
        continueBtn.style.pointerEvents = 'auto';
        continueBtn.style.opacity = '1';
    } else {
        continueBtn.href = '#';
        continueBtn.style.pointerEvents = 'none';
        continueBtn.style.opacity = '0.5';
    }
});