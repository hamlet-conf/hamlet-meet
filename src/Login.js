import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Alert, Fade, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function Login({ onLogin }) {
  const [userID, setUserID] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userID.trim()) {
      setError('Please enter your User ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/userData.json`);
      if (!response.ok) {
        throw new Error('Failed to load user data');
      }
      const userData = await response.json();
      const user = userData.find(user => user.ID.toString() === userID.trim());
      if (user) {
        localStorage.setItem('userID', userID.trim());
        onLogin();
      } else {
        setError('User ID not found. Please check your ID and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #475569 0%, #64748b 40%, #94a3b8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"5\"/%3E%3Ccircle cx=\"53\" cy=\"53\" r=\"5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 10px 25px -10px rgba(71, 85, 105, 0.4)',
                }}
              >
                <SchoolIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 1,
                  letterSpacing: '-0.02em'
                }}
              >
                Hamlet Meet
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Sign in to discover your best matches at the conference
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <img
                src={`${process.env.PUBLIC_URL}/hamlet-banner.png`}
                alt="Conference Banner"
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Sign in with your User ID
              </Typography>
              <TextField
                fullWidth
                label="User ID"
                variant="outlined"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                    },
                  },
                }}
                placeholder="Enter your User ID"
              />

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontSize: '0.95rem'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
                  boxShadow: '0 8px 25px -8px rgba(71, 85, 105, 0.5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                    boxShadow: '0 12px 35px -10px rgba(71, 85, 105, 0.6)',
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                  },
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.5
              }}
            >
              Need help? Contact the organizers if you don't have your User ID.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default Login;