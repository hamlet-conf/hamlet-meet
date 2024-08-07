import React, { useState, useEffect } from 'react';
import { Container, Box, Fade, Typography, Divider } from '@mui/material';
import PartnerSearch from './components/PartnerSearch';
import PartnerProfile from './components/PartnerProfile';
import AdaptiveTable from './components/AdaptiveTable';
import HistoryList from './components/HistoryList';

function Home({ showHistory, onShowHistory }) {
  const [partnerData, setPartnerData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        // Load history from session storage
        const storedHistory = JSON.parse(sessionStorage.getItem('partnerHistory') || '[]');
        setHistory(storedHistory);
      })
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch pair data and process all partners
    const currentUserId = localStorage.getItem('userID');
    fetch(`${process.env.PUBLIC_URL}/pairData.json`)
      .then(response => response.json())
      .then(data => {
        const userPairs = data[currentUserId];
        const processedPartners = Object.entries(userPairs)
          .map(([id, info]) => ({ 
            id, 
            name: info.name, 
            similarity: 1 - info.distance // Convert distance to similarity
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
        onShowHistory(); // This should toggle off the history view
      }
    }
  };

  const addToHistory = (partnerId) => {
    const updatedHistory = [partnerId, ...history.filter(id => id !== partnerId)].slice(0, 10);
    setHistory(updatedHistory);
    sessionStorage.setItem('partnerHistory', JSON.stringify(updatedHistory));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Fade in={true} timeout={500}>
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
              <Typography variant="h4" gutterBottom align="center" color="primary">
                Find Your Partner
              </Typography>
              <PartnerSearch onPartnerFound={handlePartnerFound} />
              <Box mt={6}>
                <Divider sx={{ mb: 4 }} />
                <Typography variant="h5" gutterBottom color="secondary">
                  Partner Similarity
                </Typography>
                <AdaptiveTable data={allPartners} onPartnerSelect={handlePartnerFound} />
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Container>
  );
}

export default Home;