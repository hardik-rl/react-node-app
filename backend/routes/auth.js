const express = require("express");
const router = express.Router();
const User = require("../models/User");
const secretKey = process.env.JWT_SECRET;

// NodeEmailer
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already registered" });

  const newUser = await User.create({ name, email, password });

  const token = jwt.sign({ email }, secretKey, { expiresIn: "15m" });
  const verificationLink = `http://localhost:5000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<p>Please verify your email by clicking here. <br/><br/> <a style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;" href="${verificationLink}">Verify</a></p>`,
  });

  res.status(201).json({ message: "Registration successful. Please verify your email." });
});


// Verify Email
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const { email } = jwt.verify(token, secretKey);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    user.verified = true;
    await user.save();
    res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .box {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .emoji {
          font-size: 28px;
        }
        .btn {
          margin-top: 20px;
          display: inline-block;
          padding: 10px 20px;
          background: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="emoji">✅</div>
        <h2>Email Verified!</h2>
        <p>You can now log in to your account.</p>
        <a class="btn" href="http://localhost:5173/login">Go to Login</a>
      </div>
    </body>
  </html>
`);

    // res.send("✅ Email verified! You can now log in.");
  } catch (err) {
    res.status(400).send(` <!DOCTYPE html>
  <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .box {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .emoji {
          font-size: 28px;
        }
        .btn {
          margin-top: 20px;
          display: inline-block;
          padding: 10px 20px;
          background: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 6px; 
        }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="emoji">❌</div>
        <h2>Email Can't be Verified!</h2>
        <p>Invalid or expired token.</p>
        <a class="btn" href="http://localhost:5173/login">Go to Login</a>
      </div>
    </body>
  </html>`);
  }
});


// Sign In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (!user.verified) {
      return res.status(403).json({ error: "Please verify your email first" });
    }
    res.status(200).json({ message: "Login successful", email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});

module.exports = router;
