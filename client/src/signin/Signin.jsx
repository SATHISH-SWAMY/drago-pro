// src/pages/SignIn.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
axios.defaults.baseURL = "https://drago-pro.onrender.com";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loder, setloder] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloder(true);
    try {
      const data = await axios.post("/sigin", {
        email,
        password,
      });
      localStorage.setItem("token", data.data.token);
      setloder(false);
     
      navigate("/dashboard");
    } catch (error) {
      setloder(false);
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs">
      <Toaster position="top-center"/>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          component="h1"
          variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}>
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
            disabled={loder}
            sx={{ mt: 3, mb: 2 }}>
            {loder ? <CircularProgress size={25} /> : "Sign In"}
          </Button>
          <Link
            href="/register"
            variant="body2">
            {"Don't have an account? Register here"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
