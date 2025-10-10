function log(msg) {
  const debug = document.getElementById("debug");
  if (debug) {
    debug.innerHTML += msg + "<br>";
    debug.scrollTop = debug.scrollHeight;
  }
  console.log(msg);
}

// Initialize Pi SDK
Pi.init({ version: "2.0" });

// Define app permissions (what the app can do)
const scopes = ["payments"];

// Handle incomplete payments (required by Pi SDK)
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}

// Authenticate the user before any payment
async function authenticateUser() {
  try {
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("User authenticated:", auth);
    return auth;
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}

// Payment button logic
document.getElementById("payButton").addEventListener("click", async () => {
  // Step 1: Authenticate
  const auth = await authenticateUser();
  if (!auth) {
    alert("Authentication failed. Please try again in Pi Browser.");
    return;
  }

  // Step 2: Create a payment
  try {
    const payment = await Pi.createPayment({
      amount: 0.001, // Small test payment
      memo: "Test payment from Orbit",
      metadata: { purpose: "test" },
    });

    console.log("Payment complete!", payment);
    alert("Payment successful! 🎉");
  } catch (err) {
    console.error("Payment failed:", err);
    alert("Payment failed. Check console for details.");
  }
});
