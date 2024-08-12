import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, CircularProgress, Box, Fade, IconButton, Modal } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

library.add(fas);

function Profile({ onBack }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

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

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!userData) {
    return <CircularProgress />;
  }

  const badgeColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Fade in={true} timeout={500}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mb: 2 }}>
            Back to Home
          </Button>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>{userData.Name}</Typography>
            <Typography><strong>Affiliation:</strong> {userData.Affiliation}</Typography>
            <Typography><strong>Seniority/Role:</strong> {userData['Seniority/Role']}</Typography>
            {userData.ORCID && (
              <Typography>
                <strong>ORCID:</strong>{' '}
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  href={`https://orcid.org/${userData.ORCID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'normal',
                    padding: '0 4px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {userData.ORCID}
                </Button>
              </Typography>
            )}
            
            {userData.Contributions && userData.Contributions.Title && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Contribution</Typography>
                <Button
                  variant="text"
                  color="primary"
                  endIcon={userData.Contributions.Url && <OpenInNewIcon />}
                  href={userData.Contributions.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'normal',
                    justifyContent: 'flex-start',
                    padding: '4px 8px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {userData.Contributions.Title}
                </Button>
              </Box>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
              {userData.researcher_badges.research_interests.map((badge, index) => (
                <Box key={index} sx={{ textAlign: 'center', width: '30%' }}>
                  <IconButton
                    onClick={() => handleBadgeClick(badge)}
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: badgeColors[index],
                      '&:hover': { backgroundColor: badgeColors[index] },
                      boxShadow: 3,
                      mb: 1,
                    }}
                  >
                    <FontAwesomeIcon icon={badge.font_awesome_icon} size="2x" color="white" />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
                    {badge.research_interest_title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </Fade>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="badge-modal-title"
        aria-describedby="badge-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="badge-modal-title" variant="h6" component="h2">
            {selectedBadge?.research_interest_title}
          </Typography>
          <Typography id="badge-modal-description" sx={{ mt: 2 }}>
            {selectedBadge?.research_interest_long_description}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default Profile;