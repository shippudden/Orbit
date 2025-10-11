// ✅ Initialize the Pi SDK
Pi.init({ version: "2.0", sandbox: true });

// ✅ Use your Replit backend URL here
const backendUrl = "https://85f7d394-11f9-440d-9ee9-f45b757a9322-00-31t8rw2v9f0th.worf.replit.dev/"; 

// Button handler
document.getElementById("payBtn").addEventListener("click", async () => {
  try {
    // 1️⃣ Authenticate user
    const scopes = ["payments"];
    const user = await Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Authenticated user:", user);

    // 2️⃣ Create payment data
    const paymentData = {
      amount: 0.001, // test payment amount
      memo: "Test payment from Orbit",
      metadata: { type: "test" },
    };

    // 3️⃣ Create payment
    const payment = await Pi.createPayment(paymentData);
    console.log("Payment created:", payment);

    // 4️⃣ Send payment ID to backend to approve
    const approveResponse = await fetch(`${backendUrl}/approve_payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: payment.identifier }),
    });
    const approveData = await approveResponse.json();
    console.log("Payment approved:", approveData);

    // 5️⃣ Complete the payment
    const completeResponse = await fetch(`${backendUrl}/complete_payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: payment.identifier }),
    });
    const completeData = await completeResponse.json();
    console.log("Payment completed:", completeData);

    alert("✅ Payment successful!");
  } catch (error) {
    console.error("Payment failed:", error);
    alert("⚠️ Payment failed — check console for details");
  }
});

// Handle incomplete payments (to avoid “pending payment” error)
async function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);

  // try to complete it again automatically
  await fetch(`${backendUrl}/complete_payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentId: payment.identifier }),
  });
}
