import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(userID !== null);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isLoggedIn && (
          <Navbar
            onShowProfile={toggleProfile}
            onLogout={handleLogout}
            showProfileButton={!showProfile}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          {isLoggedIn ? (
            showProfile ? (
              <Profile onBack={toggleProfile} />
            ) : (
              <Home />
            )
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;