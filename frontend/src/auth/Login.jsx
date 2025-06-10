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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log({ email, password });

    // Redirect after login (example)
    navigate('/dashboard');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // minHeight="100vh"
      paddingY={15}
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 360, p: 2, boxShadow: 3 }}>
        <CardHeader
          title="Login"
          titleTypographyProps={{ variant: 'h5', align: 'center' }}
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
              Don't have an account? <a href="/signup">Sign up</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
