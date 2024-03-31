const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));


document.addEventListener('DOMContentLoaded', function() {
    // Select the sign-up form
    const signUpForm = document.querySelector('form[action="/signup"]');
    // Select the sign-in form
    const signInForm = document.querySelector('form[action="/signin"]');

    // Function to validate password
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    // Event listener for sign-up form submission
    signUpForm.addEventListener('submit', function(event) {
        const password = document.getElementById('signup-password').value;
        if (!validatePassword(password)) {
            customAlert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            event.preventDefault(); // Prevent form submission
        }
    });

    // Event listener for sign-in form submission
    signInForm.addEventListener('submit', function(event) {
        const password = document.getElementById('signin-password').value;
        if (!validatePassword(password)) {
            customAlert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            event.preventDefault(); // Prevent form submission
        }
    });
});
