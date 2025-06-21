const express = require("express");
const Razorpay = require("razorpay");
const Payment = require("../models/Payment");

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
// router.post("/payment-success", (req, res) => {
//   const { paymentId, amount } = req.body;

//   paymentList.push({
//     id: paymentId,
//     amount: amount / 100,
//     date: new Date().toLocaleString()
//   });

//   res.json({ status: "success" });
// });

router.post("/payment-success", async (req, res) => {
  const { paymentId, amount } = req.body;

  try {
    const newPayment = new Payment({
      paymentId,
      amount: amount / 100
    });

    await newPayment.save();
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
});

router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch payments" });
  }
});

/**
 * @route GET /api/payments
 * @desc Get all payments
 */
router.get("/payments", (req, res) => {
  res.json(paymentList);
});

module.exports = router;
