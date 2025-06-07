const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_ofOme4GbloIWpu",
  key_secret: "Zsco4GxCF8c3DrACjYi0jbb7",
});

// In-memory store for demo (use DB in production)
let paymentList = [];

/**
 * @route POST /api/order
 * @desc Create Razorpay order
 */
router.post("/order", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @route POST /api/payment-success
 * @desc Store payment after success
 */
router.post("/payment-success", (req, res) => {
  const { paymentId, amount } = req.body;

  paymentList.push({
    id: paymentId,
    amount: amount / 100,
    date: new Date().toLocaleString()
  });

  res.json({ status: "success" });
});

/**
 * @route GET /api/payments
 * @desc Get all payments
 */
router.get("/payments", (req, res) => {
  res.json(paymentList);
});

module.exports = router;
