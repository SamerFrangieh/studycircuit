//registration.js
let temporaryStorage = []; // Temporary storage for registration data

function handleRegistration(request, response) {
    let receivedData = '';

    request.on('data', chunk => {
        receivedData += chunk.toString();
    });

    request.on('end', () => {
        try {
            const formData = JSON.parse(receivedData);
            console.log("Registration Data Received:", formData);
            temporaryStorage.push(formData); // Store data temporarily

            console.log("Temporary Storage:", temporaryStorage); // Ensure this is within the 'end' event callback

            // Respond to client
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
