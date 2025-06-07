import { useEffect, useState } from "react";
import PaymentList from "./components/Payment";
import DonationCard from "./components/DonationCard";
import ResponsiveAppBar from "./components/Header";

function App() {
  const [amount, setAmount] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const enteredAmount = parseFloat(amount);
    if (!enteredAmount || isNaN(enteredAmount) || enteredAmount < 1) {
      alert("Please enter an amount of at least ₹1");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const res = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: enteredAmount }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_ofOme4GbloIWpu",
      amount: data.amount,
      currency: data.currency,
      name: "Test Corp",
      description: "Test Transaction",
      order_id: data.id,
      handler: async function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);

        // Store payment in backend
        await fetch("http://localhost:5000/payment-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            amount: data.amount,
          }),
        });

        fetchPayments(); // Refresh payment list
      },
      prefill: {
        name: "Hardik",
        email: "hardik@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  return (
    <div style={{ padding: "50px", textAlign: "center", }}>
      <ResponsiveAppBar />
      <DonationCard onDonate={handlePayment} amount={amount} setAmount={setAmount}/>
     
      <PaymentList />
    </div>
  );
}

export default App;
