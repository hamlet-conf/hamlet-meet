import React, { useState, useEffect } from 'react';
import { Container, Box, Fade } from '@mui/material';
import PartnerSearch from './components/PartnerSearch';
import PartnerProfile from './components/PartnerProfile';

function Home() {
  const [partnerData, setPartnerData] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handlePartnerFound = (data) => {
    setPartnerData(data);
    console.log('Partner Data:', data);  // Console log partner data
  };

  useEffect(() => {
    if (partnerData) {
      console.log('Updated Partner Data:', partnerData);  // Console log partner data whenever it changes
    }
  }, [partnerData]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Fade in={true} timeout={500}>
          <Box>
            {partnerData ? (
              <PartnerProfile 
                partnerData={partnerData} 
                onBack={() => setPartnerData(null)} 
                userData={userData}
              />
            ) : (
              <PartnerSearch onPartnerFound={handlePartnerFound} />
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default Home;