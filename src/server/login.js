// login.js
let loginAttempts = []; // Temporary storage for login attempts

function handleLogin(request, response) {
    console.log("Handle login called");
    let receivedData = '';

    request.on('data', chunk => {
        receivedData += chunk.toString();
    });

    request.on('end', () => {
        console.log("Raw Received Data:", receivedData);
        try {
            const loginData = JSON.parse(receivedData);
            console.log("Login Data Received:", loginData);
            loginAttempts.push(loginData); // Store data temporarily

            console.log("Temporary Storage:", loginAttempts);

            if (loginData.username && loginData.password) {
                // For now, just check if the fields are not empty
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ redirect: "/MainChatroom.html" }));
            } else {
                // Invalid login attempt
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Invalid credentials" }));
            }
        } catch (error) {
            console.error("Error processing login data:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    });
}

module.exports = { handleLogin };
