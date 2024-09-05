document.addEventListener('DOMContentLoaded', function() {
    const distributionTypeSelect = document.getElementById('distribution-type');
    const distributionDetails = document.getElementById('distribution-details');
    const form = document.getElementById('add-bill-form');

    // Update distribution details based on the selected type
    distributionTypeSelect.addEventListener('change', function() {
        const selectedType = distributionTypeSelect.value;
        distributionDetails.innerHTML = ''; // Clear previous details

        if (selectedType === 'percentage' || selectedType === 'amount') {
            const members = document.getElementById('members').value.split(',').map(m => m.trim());
            members.forEach(member => {
                if (member) {
                    const inputGroup = document.createElement('div');
                    inputGroup.classList.add('input-group');
                    inputGroup.innerHTML = `
                        <label for="${selectedType}-${member}">${member} ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</label>
                        <input type="${selectedType === 'percentage' ? 'number' : 'text'}" id="${selectedType}-${member}" name="${selectedType}-${member}" ${selectedType === 'percentage' ? 'step="0.01"' : ''} required>
                    `;
                    distributionDetails.appendChild(inputGroup);
                }
            });
            distributionDetails.classList.remove('hidden');
        } else {
            distributionDetails.classList.add('hidden');
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        const amountInput = document.getElementById('amount');
        const amount = parseInt(amountInput.value, 10);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid positive integer amount.');
            return;
        }

        const payers = document.getElementById('payers').value.split(',').map(p => p.trim());
        const members = document.getElementById('members').value.split(',').map(m => m.trim());
        const distributionType = distributionTypeSelect.value;

        // Ensure payer is included in the members list
        const allMembers = Array.from(new Set([...members, ...payers]));
        const nonPayers = allMembers.filter(member => !payers.includes(member));
        
        let result = '';
        let totalOwedToPayer = 0;
        let payerAmounts = {};
        
        if (distributionType === 'equal') {
            const perPerson = amount / allMembers.length;
            result = allMembers.map(member => {
                if (payers.includes(member)) {
                    payerAmounts[member] = perPerson * (allMembers.length - 1); // Total owed to payer
                    return `${member} is owed: ${(payerAmounts[member]).toFixed(2)}`;
                } else {
                    return `${member} owes ${payers.join(', ')}: ${perPerson.toFixed(2)}`;
                }
            }).join('\n');
        } else if (distributionType === 'percentage') {
            let totalPercentage = 0;
            const percentages = {};
            allMembers.forEach(member => {
                const percentageInput = document.getElementById(`percentage-${member}`);
                if (percentageInput) {
                    const percentage = parseFloat(percentageInput.value);
                    if (isNaN(percentage) || percentage < 0) {
                        alert('Please enter valid percentage values.');
                        return;
                    }
                    totalPercentage += percentage;
                    percentages[member] = percentage;
                }
            });

            if (totalPercentage !== 100) {
                alert('Total percentage must equal 100.');
                return;
            }

            result = allMembers.map(member => {
                const percentage = percentages[member] || 0;
                const amountOwed = amount * (percentage / 100);
                if (payers.includes(member)) {
                    payerAmounts[member] = amountOwed;
                    return `${member} is owed: ${(amount - amountOwed).toFixed(2)}`;
                } else {
                    return `${member} owes ${payers.join(', ')}: ${amountOwed.toFixed(2)}`;
                }
            }).join('\n');
        } else if (distributionType === 'amount') {
            let totalAmount = 0;
            const amounts = {};
            allMembers.forEach(member => {
                const amountInput = document.getElementById(`amount-${member}`);
                if (amountInput) {
                    const amountOwed = parseInt(amountInput.value, 10);
                    if (isNaN(amountOwed) || amountOwed < 0) {
                        alert('Please enter valid amount values.');
                        return;
                    }
                    totalAmount += amountOwed;
                    amounts[member] = amountOwed;
                }
            });

            if (totalAmount !== amount) {
                alert('Total amount must equal the bill amount.');
                return;
            }

            result = allMembers.map(member => {
                const amountOwed = amounts[member] || 0;
                if (payers.includes(member)) {
                    payerAmounts[member] = amountOwed;
                    return `${member} is owed: ${(amount - amountOwed).toFixed(2)}`;
                } else {
                    return `${member} owes ${payers.join(', ')}: ${amountOwed.toFixed(2)}`;
                }
            }).join('\n');
        }

        alert(result);

        // Clear the form fields
        form.reset();
        distributionDetails.innerHTML = ''; // Clear distribution details
    });
});
