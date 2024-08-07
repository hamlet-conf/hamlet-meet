import React, { useState, useEffect } from 'react';
import { Container, Box, Fade, Typography, Divider } from '@mui/material';
import PartnerSearch from './components/PartnerSearch';
import PartnerProfile from './components/PartnerProfile';
import TopPartners from './components/TopPartners';

function Home() {
  const [partnerData, setPartnerData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [topPartners, setTopPartners] = useState([]);
  const [leastSimilarPartners, setLeastSimilarPartners] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch pair data and process top and least similar partners
    const currentUserId = localStorage.getItem('userID');
    fetch(`${process.env.PUBLIC_URL}/pairData.json`)
      .then(response => response.json())
      .then(data => {
        const userPairs = data[currentUserId];
        const sortedPartners = Object.entries(userPairs)
          .sort(([, a], [, b]) => a.distance - b.distance)
          .map(([id, info]) => ({ id, name: info.name, distance: info.distance }));
        
        setTopPartners(sortedPartners.slice(0, 5));
        setLeastSimilarPartners(sortedPartners.slice(-3).reverse());
      })
      .catch(error => console.error('Error fetching pair data:', error));
  }, []);

  const handlePartnerFound = (data) => {
    setPartnerData(data);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Fade in={true} timeout={500}>
          <Box>
            {partnerData ? (
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
                    Top 5 Most Similar Partners
                  </Typography>
                  <TopPartners partners={topPartners} onPartnerSelect={handlePartnerFound} />
                </Box>
                <Box mt={6}>
                  <Divider sx={{ mb: 4 }} />
                  <Typography variant="h5" gutterBottom color="secondary">
                    3 Least Similar Partners
                  </Typography>
                  <TopPartners partners={leastSimilarPartners} onPartnerSelect={handlePartnerFound} />
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default Home;