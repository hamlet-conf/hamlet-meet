import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function PartnerSearch({ onPartnerFound }) {
  const [partnerID, setPartnerID] = useState('');

  const handleFetchPartnerProfile = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/pairData.json`);
      const pairData = await response.json();
      
      const userID = localStorage.getItem('userID');
      const partnerData = pairData[userID] && pairData[userID][partnerID];
      
      if (partnerData) {
        onPartnerFound(partnerData);
      } else {
        alert('Partner not found or not paired with you.');
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
      alert('Error fetching partner data. Please try again.');
    }
  };

  return (
    <Box mt={3}>
      <TextField
        label="Enter Partner's ID"
        variant="outlined"
        fullWidth
        value={partnerID}
        onChange={(e) => setPartnerID(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleFetchPartnerProfile}
        style={{ marginTop: '10px' }}
      >
        Find Partner
      </Button>
    </Box>
  );
}

export default PartnerSearch;