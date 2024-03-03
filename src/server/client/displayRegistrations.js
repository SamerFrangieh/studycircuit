document.getElementById('loadRegistrations').addEventListener('click', function() {
    fetch('/getRegistrations')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('registrationData');
            container.innerHTML = ''; // Clear previous content
            
            data.registrations.forEach(reg => {
                // Exclude the password field
                const { password, ...rest } = reg;
                
                const regDiv = document.createElement('div');
                regDiv.classList.add("registration-info"); // Add a class for styling if needed
                
                for (const [key, value] of Object.entries(rest)) {
                    const para = document.createElement('p');
                    // For arrays like interests and courses, join the array into a comma-separated string
                    const displayText = Array.isArray(value) ? value.join(', ') : value;
                    para.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayText}`;
                    regDiv.appendChild(para);
                }
                
                container.appendChild(regDiv);
            });
        })
        .catch(error => console.error('Error fetching registration data:', error));
});
