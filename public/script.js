
// Validation logic
document.getElementById("signupForm").addEventListener("submit", function (event) {
    let valid = true;

    // Clear previous error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";

    // Get form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").textContent = 
            "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        valid = false;
    }

    // Prevent form submission if validation fails
    if (!valid) {
        event.preventDefault();
    }
});
