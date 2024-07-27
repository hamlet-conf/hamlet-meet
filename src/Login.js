import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Box } from '@mui/material';

function Login({ onLogin }) {
  const [userID, setUserID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateUserID = async (id) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/userData.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.some(user => user.ID.toString() === id);
    } catch (error) {
      console.error('Error validating user ID:', error);
      throw error;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const isValid = await validateUserID(userID);
      if (isValid) {
        localStorage.setItem('userID', userID);
        onLogin();
      } else {
        setError('Invalid User ID. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/hamlet-square.png`} alt="Logo" style={{ height: 80, marginBottom: 20 }} />
        <img src={`${process.env.PUBLIC_URL}/hamlet-banner.png`} alt="Conference Banner" style={{ width: '100%', marginBottom: 20 }} />
        <TextField
          label="Enter your User ID"
          variant="outlined"
          fullWidth
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleLogin}
          disabled={isLoading}
          sx={{ mt: 2, mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Container>
    </Box>
  );
}

export default Login;