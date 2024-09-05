// Handle tilt animation for cards
document.querySelectorAll('.feature-item, .step-item').forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
});

function handleMouseMove(event) {
    const card = event.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const tiltX = (deltaY / cardHeight) * 15; // Adjust the tilt intensity
    const tiltY = -(deltaX / cardWidth) * 15;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

function handleMouseLeave(event) {
    event.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

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
