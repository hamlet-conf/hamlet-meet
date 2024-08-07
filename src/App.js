import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Fade, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
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
  const [showHistory, setShowHistory] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(userID !== null);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowHistory(false);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setShowProfile(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('userID');
    sessionStorage.removeItem('partnerHistory');
    setIsLoggedIn(false);
    setShowProfile(false);
    setShowHistory(false);
    setShowLogoutConfirmation(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isLoggedIn && (
          <Navbar
            onShowProfile={toggleProfile}
            onShowHistory={toggleHistory}
            onLogout={handleLogoutClick}
            showProfileButton={!showProfile}
            isHistoryShown={showHistory}
          />
        )}
        <Fade in={true} timeout={500}>
          <Box sx={{ flexGrow: 1 }}>
            {isLoggedIn ? (
              showProfile ? (
                <Profile onBack={toggleProfile} />
              ) : (
                <Home 
                  showHistory={showHistory}
                  onShowHistory={toggleHistory}
                />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Box>
        </Fade>
        <Dialog
          open={showLogoutConfirmation}
          onClose={handleLogoutCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out? Your viewing history will be cleared.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;