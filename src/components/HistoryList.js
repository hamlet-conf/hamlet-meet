import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

function HistoryList({ history, userData, onPartnerSelect }) {
  return (
    <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recently Viewed Partners
      </Typography>
      <List>
        {history.map((partnerId, index) => {
          const partner = userData.find(user => user.ID.toString() === partnerId);
          return partner ? (
            <ListItem 
              key={index} 
              button 
              onClick={() => onPartnerSelect({ id: partnerId })}
            >
              <ListItemText primary={`${partner.Name} (ID: ${partnerId})`} />
            </ListItem>
          ) : null;
        })}
      </List>
    </Paper>
  );
}

export default HistoryList;