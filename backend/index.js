const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/", paymentRoutes);


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
