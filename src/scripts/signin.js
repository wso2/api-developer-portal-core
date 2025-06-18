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