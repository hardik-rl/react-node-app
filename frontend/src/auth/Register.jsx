import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("User Registered Successfully!")
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error(data.error || "Failed to register")
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingY={5}
      minHeight={500}
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 360, p: 2, boxShadow: 3 }}>
        <CardHeader
          title="Register"
          titleTypographyProps={{ variant: 'h5', align: 'center', fontWeight: "600" }}
        />
        <CardContent>
            <div>
              <TextField
                type="email"
                required
                fullWidth
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 1, width: "100%", padding: 1 }}
              />
            </div>
            <div>
              <TextField
                type="password"
                fullWidth
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 1, width: "100%", padding: 1 }}
              />
              <Button variant="contained" onClick={handleRegister}>Register</Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
