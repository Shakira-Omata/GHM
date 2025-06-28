document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("donation-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("donorName").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const phone = document.getElementById("donorPhone").value.trim();
    const amount = parseFloat(document.getElementById("donationAmount").value.trim()) * 100; // Convert to kobo
    const donationType = document.getElementById("donation-type").value;
    const notes = document.getElementById("notes").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!paymentMethod || !amount || !email || !name) {
      alert("Please complete all required fields.");
      return;
    }

    // Paystack Integration
    let handler = PaystackPop.setup({
      key: 'pk_test_1816638ca2eae0a6830151029323a4bceb7ad291', // Replace with your real Paystack public key
      email: email,
      amount: amount,
      currency: "KES",
      metadata: {
        custom_fields: [
          {
            display_name: name,
            variable_name: "donation_type",
            value: donationType,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: phone,
          },
          {
            display_name: "Note",
            variable_name: "dedication_note",
            value: notes,
          },
          {
            display_name: "Payment Method",
            variable_name: "method",
            value: paymentMethod
          }
        ],
      },
      callback: function (response) {
        // ✅ Redirect to success page with reference
        window.location.href = "success.html?ref=" + response.reference;
      },
      onClose: function () {
        alert("Transaction was cancelled.");
      }
    });

    handler.openIframe();
  });
});
