import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Box, Accordion, AccordionSummary, AccordionDetails, Fade, Slide, CircularProgress } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PartnerDetails from './PartnerDetails';

function PartnerProfile({ partnerData, onBack, userData }) {
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      setLoading(true);
      try {
        const currentUserId = localStorage.getItem('userID');
        const response = await fetch(`${process.env.PUBLIC_URL}/pairData.json`);
        const pairData = await response.json();
        
        const partnerInfo = pairData[currentUserId][partnerData.id];
        if (partnerInfo) {
          const partnerUserData = userData.find(user => user.ID.toString() === partnerData.id);
          setPartnerDetails({
            ...partnerInfo,
            userData: partnerUserData
          });
        } else {
          setError('Partner not found');
        }
      } catch (err) {
        console.error('Error fetching partner details:', err);
        setError('Error fetching partner details');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [partnerData.id, userData]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!partnerDetails) {
    return <Typography>No partner data available.</Typography>;
  }

  return (
    <Box mt={3}>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mb: 2 }}>
          Back to Search
        </Button>
      </Slide>
      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>{partnerDetails.name}</Typography>
          
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="partner-details-content"
              id="partner-details-header"
            >
              <Typography variant="h6">Partner Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {partnerDetails.userData ? (
                <PartnerDetails userData={partnerDetails.userData} />
              ) : (
                <Typography>Partner details not available.</Typography>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="discussion-points-content"
              id="discussion-points-header"
            >
              <Typography variant="h6">Discussion Points</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {partnerDetails.discussion_points?.map((point, index) => (
                <Box key={index} mt={1}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{point}</ReactMarkdown>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Fade>
    </Box>
  );
}

export default PartnerProfile;