import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: password }),
    });
    
    if (res.status === 200) {      
      login({ email: email });
      toast.success("User Login Successfully!")
      navigate("/");
    } else {
      toast.error(res.statusText || "Failed to login")
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
          title="Login"
          titleTypographyProps={{ variant: 'h5', align: 'center', fontWeight: "600" }}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account? <a href="/register">Register</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
