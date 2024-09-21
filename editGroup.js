// Opens the popup to add a new member
function openAddMemberPopup() {
    document.getElementById('add-member-popup').style.display = 'flex';
}

// Closes the popup
function closeAddMemberPopup() {
    document.getElementById('add-member-popup').style.display = 'none';
}

// Removes a member from the group
function removeMember(memberName) {
    const membersList = document.querySelector('.members-list');
    const memberItem = [...membersList.getElementsByClassName('member-item')].find(item => item.textContent.includes(memberName));
    if (memberItem) {
        membersList.removeChild(memberItem);
    }
}

// Adds a new member to the group
function addMember() {
    const username = document.getElementById('new-member-username').value;
    if (username.trim() === '') {
        alert('Please enter a valid username');
        return false;
    }

    // Create a new member element and append it to the list
    const newMember = document.createElement('div');
    newMember.className = 'member-item';
    newMember.innerHTML = `<span>${username}</span><button type="button" class="remove-btn" onclick="removeMember('${username}')">Remove</button>`;

    document.querySelector('.members-list').insertBefore(newMember, document.querySelector('.add-member'));

    closeAddMemberPopup(); // Close the popup after adding the member

    return false; // Prevent form submission
}
