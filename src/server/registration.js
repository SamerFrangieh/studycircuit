// registration.js
async function handleRegistration(request, response) {
    let receivedData = '';

    request.on('data', chunk => {
        receivedData += chunk.toString(); // Convert Buffer to string
    });

    request.on('end', () => {
        try {
            const formData = JSON.parse(receivedData);
            console.log("Registration Data Received:", formData);
            // Here, process and validate formData, then save to your database

            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Registration successful" }));
        } catch (error) {
            console.error("Error processing registration data:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    });
}

module.exports = { handleRegistration };
