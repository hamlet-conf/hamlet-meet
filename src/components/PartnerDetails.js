import React, { useState } from 'react';
import { Typography, Grid, Box, IconButton, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function PartnerDetails({ userData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const badgeColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography><strong>Affiliation:</strong> {userData.Affiliation}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography><strong>Seniority/Role:</strong> {userData['Seniority/Role']}</Typography>
      </Grid>
      {userData.ORCID && (
        <Grid item xs={12}>
          <Typography><strong>ORCID:</strong> {userData.ORCID}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
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
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
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
      </Grid>

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
    </Grid>
  );
}

export default PartnerDetails;