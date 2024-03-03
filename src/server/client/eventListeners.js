// eventListeners.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Collecting checkbox values for interests
        const interests = [];
        document.querySelectorAll('#interestsSelection .form-check-input:checked').forEach(function(checkbox) {
            interests.push(checkbox.value);
        });

        // Collecting checkbox values for courses
        const courses = [];
        document.querySelectorAll('#courseSelection .form-check-input:checked').forEach(function(checkbox) {
            courses.push(checkbox.value);
        });

        // Updated formData to include interests and courses
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value, // Assuming password is included in your form
            languages: Array.from(document.getElementById('languages').selectedOptions).map(option => option.value),
            major: document.getElementById('major').value,
            interests: interests, // Added interests
            courses: courses, // Updated courses to be collected from checkboxes
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            alert(responseData.message);
        } catch (error) {
            console.error('Error submitting registration form:', error);
            alert('Failed to submit registration form. Please try again.');
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        alert(data.error || 'Login failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
            } else {
                alert('Username and password cannot be empty.');
            }
        });
    }
});