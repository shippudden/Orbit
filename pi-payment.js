// Load and initialize the Pi SDK
Pi.init({ 
    version: "2.0", 
    sandbox: true, // Change to false for production
    permissions: ["payments", "username", "wallet_address"] 
});

async function payWithPi(amount, memo, metadata = {}) {
    try {
        // Authenticate user
        const scopes = ["payments", "username", "wallet_address"];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        if (!auth) {
            throw new Error("User canceled authentication");
        }

        // Create payment
        const payment = await Pi.createPayment({
            amount: parseFloat(amount),
            memo: memo,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString(),
                type: metadata.type || 'product_purchase'
            },
        });

        // Handle the payment
        const result = await handlePayment(payment);
        
        if (result.status === 'completed') {
            showPaymentSuccessModal(result.paymentId, metadata.type);
            return true;
        } else {
            throw new Error("Payment incomplete");
        }
    } catch (error) {
        console.error("Payment error:", error);
        showSnackbar("Payment failed: " + error.message);
        return false;
    }
}

async function handlePayment(payment) {
    try {
        // Complete the payment
        const completedPayment = await payment.complete();
        
        // Save transaction details to your system
        const transactionDetails = {
            paymentId: completedPayment.identifier,
            amount: completedPayment.amount,
            user: completedPayment.user.username,
            timestamp: new Date().toISOString(),
            status: 'completed'
        };

        // You might want to save this to localStorage or your backend
        saveTransaction(transactionDetails);
        
        return {
            status: 'completed',
            paymentId: completedPayment.identifier
        };
    } catch (error) {
        console.error("Error completing payment:", error);
        return {
            status: 'failed',
            error: error.message
        };
    }
}

function saveTransaction(transaction) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Handle incomplete payments
function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment found:", payment);
    // Implement your incomplete payment recovery logic here
    return handlePayment(payment);
}