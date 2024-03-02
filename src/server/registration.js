// registration.js
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

            // Respond to client
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Registration successful" }));

            // Later, you might manipulate and move this data to a database
            console.log("Temporary Storage:", temporaryStorage);
        } catch (error) {
            console.error("Error processing registration data:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    });

    console.log("Temporary storage:" + temporaryStorage);
}

module.exports = { handleRegistration };
