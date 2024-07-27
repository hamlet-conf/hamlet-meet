import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, CircularProgress, Box, Fade } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

function Profile({ onBack }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      setError('User ID not found. Please log in again.');
      return;
    }

    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const user = data.find(user => user.ID.toString() === userID);
        if (user) {
          setUserData(user);
        } else {
          throw new Error('User data not found');
        }
      })
      .catch(error => {
        console.error('Error loading user data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!userData) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Fade in={true} timeout={500}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{ mb: 2 }}
            >
            Back to Home
            </Button>
            <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>{userData.Name}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <Typography><strong>Affiliation:</strong> {userData.Affiliation}</Typography>
                <Typography><strong>ORCID:</strong> {userData.ORCID || 'N/A'}</Typography>
                <Typography><strong>In-person attendance:</strong> {userData['In-person attendance']}</Typography>
                <Typography><strong>Seniority/Role:</strong> {userData['Seniority/Role']}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography><strong>Interest in ML methods/data:</strong> {userData['Interest in ML methods/data']}</Typography>
                <Typography><strong>Interest in Physics:</strong> {userData['Interest in Physics']}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography><strong>Workshop Goals:</strong> {userData['Workshop Goals']}</Typography>
                </Grid>
            </Grid>
            </Paper>
        </Container>
      </Fade>
    </Box>
  );
}

export default Profile;