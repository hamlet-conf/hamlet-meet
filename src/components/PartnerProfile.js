import React from 'react';
import { Typography, Paper, Button, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function PartnerProfile({ partnerData, onBack }) {
  return (
    <Box mt={3}>
      <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mb: 2 }}>
        Back to Search
      </Button>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>{partnerData.name}</Typography>
        
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="partner-details-content"
            id="partner-details-header"
          >
            <Typography variant="h6">Partner Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography><strong>FAS:</strong> {partnerData.fas}</Typography>
            {/* Add more partner details here as needed */}
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
            {partnerData.discussion_points.map((point, index) => (
              <Box key={index} mt={1}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{point}</ReactMarkdown>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}

export default PartnerProfile;