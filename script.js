document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const appContent = document.getElementById('app-content');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameDisplay = document.getElementById('username-display');
    const loginError = document.getElementById('login-error');
    const sendUserInfoButton = document.getElementById('send-user-info');
    const tg = window.Telegram.WebApp;

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // In a real application, you would send these to a backend for verification.
        // For this simple example, we'll just simulate a successful login
        if (username && password) {
            // Simulate successful login
            loginForm.classList.add('hidden');
            appContent.classList.remove('hidden');
            usernameDisplay.textContent = username;
            loginError.textContent = '';

            // You might want to send some initial data to the bot upon login
            tg.sendData(JSON.stringify({ event: 'login', username: username }));
        } else {
            loginError.textContent = 'Please enter both username and password.';
        }
    });

    sendUserInfoButton.addEventListener('click', function() {
        // Get user information provided by Telegram (if available and user has granted permission)
        const user = tg.initDataUnsafe?.user;
        if (user) {
            tg.sendData(JSON.stringify({ event: 'user_info', user: user }));
            tg.showAlert(`User ID: ${user.id}, Name: ${user.first_name} ${user.last_name || ''}`);
        } else {
            tg.showAlert('User information not available.');
        }
    });
});