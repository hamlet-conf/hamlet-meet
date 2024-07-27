import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Container, Grid, Box, Tooltip, Modal } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

function Home() {
  const [partnerID, setPartnerID] = useState('');
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [researchIcons, setResearchIcons] = useState([
    { class: 'fa-dna', info: 'Biology aspects of biomechanics' },
    { class: 'fa-cogs', info: 'Mechanical aspects of biomechanics' },
    { class: 'fa-heartbeat', info: 'Health applications of biomechanics' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userID');
    window.location.reload();
  };

  const handleOpenModal = (info) => {
    setModalContent(info);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFetchPartnerProfile = () => {
    // Fetch and display partner profile logic here
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Conference Networking
          </Typography>
          <IconButton color="inherit" onClick={() => alert('Profile clicked')}>
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box mt={3}>
        <TextField
          label="Enter Partner's ID"
          variant="outlined"
          fullWidth
          value={partnerID}
          onChange={(e) => setPartnerID(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleFetchPartnerProfile}>
          Go
        </Button>
      </Box>
      <Box mt={3}>
        <Typography variant="h5">Research Focus: Biomechanics</Typography>
        <Grid container spacing={2} mt={2}>
          {researchIcons.map((icon, index) => (
            <Grid item key={index}>
              <Tooltip title={icon.info}>
                <i className={`fas ${icon.class}`} onClick={() => handleOpenModal(icon.info)} style={{ cursor: 'pointer', fontSize: '2em' }}></i>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            Information
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #
