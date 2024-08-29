function handlePaymentChange() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const upiSection = document.getElementById('upi-section');
    const netbankingSection = document.getElementById('netbanking-section');

    // Hide both sections initially
    upiSection.style.display = 'none';
    netbankingSection.style.display = 'none';

    // Show the appropriate section based on payment method
    if (paymentMethod === 'upi') {
        upiSection.style.display = 'block';
    } else if (paymentMethod === 'netbanking') {
        netbankingSection.style.display = 'block';
    }
}

// Attach the event listener to payment radio buttons
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener('change', handlePaymentChange);
});
