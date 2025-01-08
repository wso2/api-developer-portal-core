document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            console.log({
                username: username,
                password: password,
            });
            const response = await fetch(`/devportal/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                loginForm.reset();
                const currentUrl = window.location.href;
                const newUrl = currentUrl.replace('/login', '');
                window.location.href = document.referrer || newUrl;
            } else {
                console.error('Login failed:', responseData);
                await showAlert(`Failed to login. ${responseData.message}`, 'error');
            }
        } catch (error) {
            console.error('Error saving application:', error);
            await showAlert('Failed to update application.', 'error');
        }
    });
});
