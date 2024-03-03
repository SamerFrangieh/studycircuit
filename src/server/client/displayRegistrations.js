document.getElementById('loadRegistrations').addEventListener('click', function() {
    fetch('/getRegistrations')
        .then(response => response.json())
        .then(data => {
            console.log("data" + data);
            const container = document.getElementById('registrationData');
            container.innerHTML = ''; // Clear previous content
            data.registrations.forEach(reg => {
                const para = document.createElement('p');
                para.textContent = `Email: ${reg.email}, Name: ${reg.firstName} ${reg.lastName}`;
                container.appendChild(para);
            });
        })
        .catch(error => console.error('Error fetching registration data:', error));
});
