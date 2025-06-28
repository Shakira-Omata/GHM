document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("donation-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("donorName").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const phone = document.getElementById("donorPhone").value.trim();
    const amount = document.getElementById("donationAmount").value.trim();
    const donationType = document.getElementById("donation-type").value;
    const notes = document.getElementById("notes").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    // Basic validation
    if (!paymentMethod || !amount || !email || !name) {
      alert("Please complete all required fields.");
      return;
    }

    // Build your Paystack payment page URL
    const paystackURL = new URL("https://paystack.shop/pay/golden-heart");
    paystackURL.searchParams.append("name", name);
    paystackURL.searchParams.append("email", email);
    paystackURL.searchParams.append("phone", phone);
    paystackURL.searchParams.append("amount", amount);
    paystackURL.searchParams.append("donation_type", donationType);
    paystackURL.searchParams.append("notes", notes);
    paystackURL.searchParams.append("method", paymentMethod);

    // Open in a new tab
    window.open(paystackURL.toString(), "_blank");
  });
});
