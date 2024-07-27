import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function PartnerSearch({ onPartnerFound }) {
  const [partnerId, setPartnerId] = useState('');

  const handleSearch = () => {
    if (partnerId.trim()) {
      onPartnerFound({ id: partnerId.trim() });
    }
  };

  return (
    <Box>
      <TextField
        label="Partner ID"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
}

export default PartnerSearch;