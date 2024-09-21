// Call the checkLoginStatus function on page load
document.addEventListener("DOMContentLoaded", function() {
    // Debugging: Confirm that the script is loading
    console.log("Script loaded");

    // Event listeners for buttons
    const createGroupBtn = document.getElementById("create-group");
    const openGroupBtn = document.getElementById("open-group");
    const addBillBtn = document.getElementById("add-bill");
    const editGroupBtn = document.getElementById("edit-group");
    const addBillToGroupBtn = document.getElementById("add-bill-to-group");
    const logoutButton = document.getElementById("logout");

    // Event listener for creating a group
    if (createGroupBtn) {
        createGroupBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "create-group.html"; // Redirect to Create Group page
        });
    }

    // Event listener for opening a group
    if (openGroupBtn) {
        openGroupBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "open-group.html"; // Redirect to Open Group page
        });
    }

    // Event listener for adding a bill
    if (addBillBtn) {
        addBillBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "add-bill.html"; // Redirect to Add Bill page
        });
    }

    // Event listener for editing a group
    if (editGroupBtn) {
        editGroupBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "edit-group.html"; // Redirect to Edit Group page
        });
    }

    // Event listener for adding a bill to an existing group
    if (addBillToGroupBtn) {
        addBillToGroupBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "add-bill.html"; // Redirect to Add Bill page
        });
    }

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Clear user session data
            sessionStorage.removeItem("userLoggedIn");

            // Log the logout action
            console.log("User logged out. Redirecting to index.html...");

            // Redirect to the home page
            window.location.href = "index.html"; // Redirect to index.html after logout
        });
    }
});

// Function to validate the form
function validateForm() {
    // Get the mobile number, new password, and confirm password fields
    const mobile = document.getElementById('mobile');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    // Validate the mobile number for 10 digits
    if (!/^\d{10}$/.test(mobile.value)) {
        document.getElementById('mobile-error').style.display = 'block';
        mobile.focus();
        return false;
    } else {
        document.getElementById('mobile-error').style.display = 'none';
    }

    // Check if the new password and confirm password match
    if (newPassword.value !== confirmPassword.value) {
        document.getElementById('password-error').style.display = 'block';
        confirmPassword.focus();
        return false;
    } else {
        document.getElementById('password-error').style.display = 'none';
    }

    return true; // Allow form submission if validation passes
}