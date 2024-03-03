// eventListeners.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value, // Include password here
            languages: Array.from(document.getElementById('languages').selectedOptions).map(option => option.value),
            major: document.getElementById('major').value,
            courses: Array.from(document.getElementById('courses').selectedOptions).map(option => option.value),
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
