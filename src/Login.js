import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

function Login({ onLogin }) {
  const [userID, setUserID] = useState('');

  const handleLogin = () => {
    localStorage.setItem('userID', userID);
    onLogin();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Conference Networking App
      </Typography>
      <TextField
        label="Enter your User ID"
        variant="outlined"
        fullWidth
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
