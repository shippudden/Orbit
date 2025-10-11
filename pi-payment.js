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

// Define app permissions
const scopes = ["payments"];

// ✅ Handle incomplete payments safely
async function onIncompletePaymentFound(payment) {
  log("Found incomplete payment: " + JSON.stringify(payment));

  // Skip if already approved or completed
  if (payment.status === "approved" || payment.status === "completed") {
    log("Skipping auto-approval — payment already processed.");
    return;
  }

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

// ✅ Authenticate the user in Pi Browser
async function authenticateUser() {
  try {
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    log("User authenticated: " + JSON.stringify(auth));
    return auth;
  } catch (error) {
    log("Authentication failed: " + error.message);
  }
}

// ✅ Handle Payment Button Click
document.getElementById("payButton").addEventListener("click", async () => {
  // Step 1: Authenticate user
  const auth = await authenticateUser();
  if (!auth) {
    alert("Authentication failed. Please try again in Pi Browser.");
    return;
  }

  // Step 2: Create a new payment
  try {
    const paymentData = {
      amount: 0.001, // 💰 Test amount
      memo: "Test payment from Orbit",
      metadata: { purpose: "test" },
    };

    const callbacks = {
      // 🔹 When Pi is ready for server approval
      onReadyForServerApproval: async (paymentId) => {
        log("Ready for server approval: " + paymentId);
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
          log("Server error approving: " + err.message);
        }
      },

      // 🔹 When Pi is ready for server completion
      onReadyForServerCompletion: async (paymentId, txid) => {
        log(`Ready for completion: ${paymentId} | TxID: ${txid}`);
        try {
          const res = await fetch(
            "https://934100cb-3b4d-404b-a0a5-a5a221c0e381-00-10y3qpo2vdvnf.spock.replit.dev/complete-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            }
          );
          const data = await res.json();
          log("Server completion response: " + JSON.stringify(data));
        } catch (err) {
          log("Error completing payment: " + err.message);
        }
      },

      // 🔹 When user cancels the payment
      onCancel: (paymentId) => log("Payment cancelled: " + paymentId),

      // 🔹 If any error happens during payment
      onError: (error, payment) =>
        log("Payment error: " + error.message + " | " + JSON.stringify(payment)),
    };

    // ✅ Create and execute payment
    const payment = await Pi.createPayment(paymentData, callbacks);
    log("Payment completed successfully: " + JSON.stringify(payment));
    alert("Payment successful! 🎉");
  } catch (err) {
    log("Payment failed: " + err.message);
    alert("Payment failed. Check console or log for details.");
  }
});
