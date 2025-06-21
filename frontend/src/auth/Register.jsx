import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("Registered successfully. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMsg(data.error || "Failed to register");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h2>Register</h2>
      <div>
        <TextField
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 3, width: "100%", padding: 1 }}
        />
      </div>
      <div>
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 3, width: "100%", padding: 1 }}
        />
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        {msg && <p style={{ color: "red", marginTop: 10 }}>{msg}</p>}
      </div>
    </div>
  );
};

export default Register;
