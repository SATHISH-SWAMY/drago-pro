// src/pages/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';


axios.defaults.baseURL = "http://localhost:8000";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(email,password);
    try {
     
      const data = await axios.post('/sigin',{
       email,password
      })
      console.log(data.data);
      localStorage.setItem('token', data.data.token); // Replace with actual token from backend
      navigate('/dashboard');
    } catch (error) {
      console.log(error.response.data)
    }
    // Handle sign-in logic (e.g., verify credentials with backend)
    // For now, just save to localStorage and navigate to dashboard
  
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
    
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/register" variant="body2">
            {"Don't have an account? Register here"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
