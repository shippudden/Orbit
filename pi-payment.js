function log(msg) {
  const debug = document.getElementById("debug");
  if (debug) {
    debug.innerHTML += msg + "<br>";
    debug.scrollTop = debug.scrollHeight;
  }
  console.log(msg);
}

// ✅ Initialize Pi SDK
Pi.init({ version: "2.0", sandbox: false });

// ✅ App permissions
const scopes = ["payments"];

// ✅ Handle incomplete payments (if any exist)
async function onIncompletePaymentFound(payment) {
  log("Found incomplete payment: " + JSON.stringify(payment));

  if (["approved", "completed", "cancelled"].includes(payment.status)) {
    log("Skipping — payment already resolved.");
    return;
  }

  try {
    const res = await fetch(
      "https://85f7d394-11f9-440d-9ee9-f45b757a9322-00-31t8rw2v9f0th.worf.replit.dev/approve-payment",
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

// ✅ Authenticate user
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
document.getElementById("payBtn").addEventListener("click", async () => {
  const auth = await authenticateUser();
  if (!auth) {
    alert("Authentication failed. Please try again in Pi Browser.");
    return;
  }

  try {
    const paymentData = {
      amount: 0.001, // 💰 Test amount
      memo: "Test payment from Orbit",
      metadata: { purpose: "test" },
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId) => {
        log("Ready for server approval: " + paymentId);
        try {
          const res = await fetch(
            "https://85f7d394-11f9-440d-9ee9-f45b757a9322-00-31t8rw2v9f0th.worf.replit.dev/approve-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            }
          );
          const data = await res.json();
          log("Server approval response: " + JSON.stringify(data));
        } catch (err) {
          log("Error approving: " + err.message);
        }
      },

      onReadyForServerCompletion: async (paymentId, txid) => {
        log(`Ready for completion: ${paymentId} | TxID: ${txid}`);
        try {
          const res = await fetch(
            "https://85f7d394-11f9-440d-9ee9-f45b757a9322-00-31t8rw2v9f0th.worf.replit.dev/complete-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            }
          );
          const data = await res.json();
          log("Server completion response: " + JSON.stringify(data));
        } catch (err) {
          log("Error completing: " + err.message);
        }
      },

      onCancel: (paymentId) => log("Payment cancelled: " + paymentId),
      onError: (error, payment) => log("Payment error: " + error.message),
    };

    const payment = await Pi.createPayment(paymentData, callbacks);
    log("Payment finished: " + JSON.stringify(payment));
    alert("✅ Payment processed successfully!");
  } catch (err) {
    log("Payment failed: " + err.message);
    alert("Payment failed. Check console or debug log.");
  }
});
