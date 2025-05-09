import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Typography,
  Box
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
const BASE_URL = "http://localhost:8000/users/signup";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const HandleSignUpClick = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please log in.");
        navigate("/dashboard"); 
      } else {
        alert(data.detail || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };


  const paperStyle = {
    padding: '40px 30px',
    maxWidth: 400,
    margin: '60px auto',
    borderRadius: 10,
  };

  const avatarStyle = {
    backgroundColor: '#1976d2',
    width: 56,
    height: 56,
    marginBottom: '10px'
  };

  const btnStyle = {
    marginTop: '20px',
    padding: '10px',
    fontWeight: 'bold',
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper elevation={6} style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <LoginIcon fontSize="medium" />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign Up
          </Typography>
        </Grid>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            label="Username"
            placeholder="Enter Username"
            variant="standard"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            placeholder="Enter Email"
            variant="standard"
            type='Email'
            fullWidth
            required
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            variant="standard"
            type="password"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={btnStyle}
            onClick={HandleSignUpClick}
          >
            Sign Up
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            {"Already have an account?"}
            <Link href="#" underline="hover">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SignUp;
