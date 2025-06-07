const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_ofOme4GbloIWpu",        
  key_secret: "Zsco4GxCF8c3DrACjYi0jbb7"
});

app.post("/order", async (req, res) => {
  const options = {
    amount: 50000, 
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
