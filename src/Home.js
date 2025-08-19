import React, { useState, useEffect } from 'react';
import { Container, Box, Fade, Typography, Paper, useTheme } from '@mui/material';
import PartnerSearch from './components/PartnerSearch';
import PartnerProfile from './components/PartnerProfile';
import AdaptiveTable from './components/AdaptiveTable';
import HistoryList from './components/HistoryList';

function Home({ showHistory, onShowHistory }) {
  const [partnerData, setPartnerData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [history, setHistory] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        const storedHistory = JSON.parse(sessionStorage.getItem('partnerHistory') || '[]');
        setHistory(storedHistory);
      })
      .catch(error => console.error('Error fetching user data:', error));

    const currentUserId = localStorage.getItem('userID');
    fetch(`${process.env.PUBLIC_URL}/pairData.json`)
      .then(response => response.json())
      .then(data => {
        const userPairs = data[currentUserId];
        const processedPartners = Object.entries(userPairs)
          .map(([id, info]) => ({ 
            id, 
            name: info.name, 
            similarity: 1 - info.distance
          }));
        setAllPartners(processedPartners);
      })
      .catch(error => console.error('Error fetching pair data:', error));
  }, []);

  const handlePartnerFound = (data) => {
    const partnerId = data.id.toString();
    const partner = userData.find(user => user.ID.toString() === partnerId);
    if (partner) {
      setPartnerData({ id: partnerId, ...partner });
      addToHistory(partnerId);
      if (showHistory) {
        onShowHistory();
      }
    }
  };

  const addToHistory = (partnerId) => {
    const updatedHistory = [partnerId, ...history.filter(id => id !== partnerId)].slice(0, 10);
    setHistory(updatedHistory);
    sessionStorage.setItem('partnerHistory', JSON.stringify(updatedHistory));
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 100%)', 
      minHeight: '100vh' 
    }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Fade in={true} timeout={1000}>
          <Box>
            {showHistory ? (
              <HistoryList 
                history={history} 
                userData={userData} 
                onPartnerSelect={handlePartnerFound} 
              />
            ) : partnerData ? (
              <PartnerProfile 
                partnerData={partnerData} 
                onBack={() => setPartnerData(null)} 
                userData={userData}
              />
            ) : (
              <>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800,
                      background: theme.palette.gradient.primary,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Find Your Research Partner
                  </Typography>
                </Box>

                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    mb: 6,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(71, 85, 105, 0.1)',
                    textAlign: 'center',
                    borderRadius: 3
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    Search by ID
                  </Typography>
                  <PartnerSearch onPartnerFound={handlePartnerFound} />
                </Paper>

                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(71, 85, 105, 0.1)',
                    borderRadius: 3
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2
                      }}
                    >
                      Partner Similarity
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        maxWidth: '500px',
                        mx: 'auto'
                      }}
                    >
                      Based on interests and backgrounds, these partners share the most similarity with you
                    </Typography>
                  </Box>
                  <AdaptiveTable data={allPartners} onPartnerSelect={handlePartnerFound} />
                </Paper>
              </>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default Home;