import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Fade, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#475569',
      light: '#94a3b8',
      dark: '#334155',
    },
    secondary: {
      main: '#0ea5e9',
      light: '#7dd3fc',
      dark: '#0284c7',
    },
    background: {
      default: '#fafbfc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
      secondary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#1e293b',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#334155',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(19).fill('0 25px 50px -12px rgba(0, 0, 0, 0.25)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px -4px rgba(71, 85, 105, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
        },
        elevation3: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            '&:hover': {
              backgroundColor: '#f1f5f9',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              boxShadow: '0 0 0 3px rgba(71, 85, 105, 0.1)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '16px 0',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBox-root': {
            borderRadius: 16,
            border: 'none',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});

theme.palette.gradient = {
  primary: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
  secondary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
};

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
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #fafbfc 0%, #f3f4f6 100%)',
        }}
      >
        {isLoggedIn && (
          <Navbar
            onShowProfile={toggleProfile}
            onShowHistory={toggleHistory}
            onLogout={handleLogoutClick}
            showProfileButton={!showProfile}
            isHistoryShown={showHistory}
          />
        )}
        <Fade in={true} timeout={800}>
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
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1,
            }
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
            {"Confirm Logout"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ color: 'text.secondary' }}>
              Are you sure you want to log out? Your viewing history will be cleared.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={handleLogoutCancel} variant="outlined" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} variant="contained" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;