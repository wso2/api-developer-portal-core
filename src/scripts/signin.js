document.addEventListener('DOMContentLoaded', function () {
    const signinCard = document.getElementById('signin-card');
    const enterpriseCard = document.getElementById('enterprise-card');
    const baseUrl = enterpriseCard.getAttribute('data-base-url');

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

    // Google Login
    document.getElementById('login-google').addEventListener('click', function () {
        console.log('Google login clicked');
        window.location.href = `${baseUrl}/login?fidp=google`;
    });

    // GitHub Login
    document.getElementById('login-github').addEventListener('click', function () {
        console.log('GitHub login clicked');
        window.location.href = `${baseUrl}/login?fidp=github`;
    });

    // Microsoft Login
    document.getElementById('login-microsoft').addEventListener('click', function () {
        console.log('Microsoft login clicked');
        window.location.href = `${baseUrl}/login?fidp=microsoft`;
    });

    // Email Login
    document.getElementById('login-email').addEventListener('click', function () {
        console.log('Email login clicked');
        window.location.href = `${baseUrl}/login?fidp=email`;
    });

    // Enterprise login
    const emailInput = document.getElementById('enterprise-email');
    const continueBtn = document.getElementById('login-enterprise');

    continueBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const redirectUrl = `${baseUrl}/login?fidp=enterprise&username=${encodeURIComponent(email)}`;
        console.log('Enterprise login triggered with:', email);
        window.location.href = redirectUrl;
    });

    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const isValid = validateEmail(email);

        continueBtn.disabled = !isValid;
        continueBtn.style.opacity = isValid ? '1' : '0.5';
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
