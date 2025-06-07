import React from 'react';

function App() {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const res = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_ofOme4GbloIWpu", // Replace with Razorpay test key
      amount: data.amount,
      currency: data.currency,
      name: "Test Corp",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Hardik",
        email: "hardik@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1>Razorpay Payment Test</h1>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}

export default App;
