import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import PartnerSearch from './components/PartnerSearch';
import PartnerProfile from './components/PartnerProfile';

function Home() {
  const [partnerData, setPartnerData] = useState(null);

  const handlePartnerFound = (data) => {
    setPartnerData(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {partnerData ? (
          <PartnerProfile partnerData={partnerData} onBack={() => setPartnerData(null)} />
        ) : (
          <PartnerSearch onPartnerFound={handlePartnerFound} />
        )}
      </Container>
    </Box>
  );
}

export default Home;