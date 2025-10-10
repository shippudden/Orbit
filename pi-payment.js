function log(msg) {
  const debug = document.getElementById("debug");
  if (debug) {
    debug.innerHTML += msg + "<br>";
    debug.scrollTop = debug.scrollHeight;
  }
  console.log(msg); // keep console output too
}

// Initialize Pi SDK
Pi.init({ version: "2.0" });

// Define app permissions
const scopes = ["payments"];

// Handle incomplete payments (required)
async function onIncompletePaymentFound(payment) {
  log("Found incomplete payment: " + JSON.stringify(payment));

  try {
    const res = await fetch(
      "https://934100cb-3b4d-404b-a0a5-a5a221c0e381-00-10y3qpo2vdvnf.spock.replit.dev/approve-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: payment.identifier }),
      }
    );
    const data = await res.json();
    log("Auto-approved incomplete payment: " + JSON.stringify(data));
  } catch (err) {
    log("Error auto-approving incomplete payment: " + err.message);
  }
}


// Authenticate the user
async function authenticateUser() {
  try {
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    log("User authenticated: " + JSON.stringify(auth));
    return auth;
  } catch (error) {
    log("Authentication failed: " + error.message);
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

  // Step 2: Create a payment with callbacks
  try {
    const paymentData = {
      amount: 0.001,
      memo: "Test payment from Orbit",
      metadata: { purpose: "test" },
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId) => {
        try {
          const res = await fetch(
            "https://934100cb-3b4d-404b-a0a5-a5a221c0e381-00-10y3qpo2vdvnf.spock.replit.dev/approve-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            }
          );
          const data = await res.json();
          log("Server approval response: " + JSON.stringify(data));
        } catch (err) {
          log("Server error: " + err.message);
        }
      },

      onReadyForServerCompletion: (paymentId, txid) =>
        log("Ready for server completion: " + paymentId + " | TxID: " + txid),
      onCancel: (paymentId) => log("Payment cancelled: " + paymentId),
      onError: (error, payment) =>
        log("Payment error: " + error.message + " | " + JSON.stringify(payment)),
    };

    const payment = await Pi.createPayment(paymentData, callbacks);
    log("Payment complete: " + JSON.stringify(payment));
    alert("Payment successful! 🎉");
  } catch (err) {
    log("Payment failed: " + err.message);
    alert("Payment failed. Check console or log box for details.");
  }
});
