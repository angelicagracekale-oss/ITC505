// XSS Sanitization Function
function sanitizeInput(str) {
    return str.replace(/[<>&"']/g, function (char) {
        const escapeMap = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[char];
    });
}

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form values
    let firstName = sanitizeInput(document.getElementById("firstName").value.trim());
    let lastName = sanitizeInput(document.getElementById("lastName").value.trim());
    let email = sanitizeInput(document.getElementById("email").value.trim());
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let message = document.getElementById("message");

    // Validation – check empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        message.textContent = "Error: Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    // Email format check
    let emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        message.textContent = "Error: Invalid email format.";
        message.style.color = "red";
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        message.textContent = "Error: Passwords do not match.";
        message.style.color = "red";
        return;
    }

    // SUCCESS
    message.textContent = "Form submitted successfully!";
    message.style.color = "green";

    // Prevent XSS by NOT showing user inputs back in HTML using innerHTML
    console.log("Data sanitized and validated:", {
        firstName, lastName, email
    });
});
