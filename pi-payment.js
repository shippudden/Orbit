// Load and initialize the Pi SDK
Pi.init({ 
    version: "2.0", 
    sandbox: true, 
    permissions: ["payments", "username", "wallet_address"] 
});

async function payWithPi(amount, memo, metadata = {}) {
  try {
    const scopes = ["payments"];
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Authenticated:", auth);

    const payment = await Pi.createPayment({
      amount: amount,
      memo: memo,
      metadata: metadata,
    });

    console.log("Payment complete:", payment);
    alert("Payment successful! 🎉");
  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed: " + error.message);
  }
}

// Handle any incomplete payments
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}