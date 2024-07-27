import React from 'react';
import { Typography, Grid } from '@mui/material';

function PartnerDetails({ userData }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography><strong>Affiliation:</strong> {userData.Affiliation}</Typography>
      </Grid>
      {userData.ORCID && (
        <Grid item xs={12}>
          <Typography><strong>ORCID:</strong> {userData.ORCID}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography><strong>Seniority/Role:</strong> {userData['Seniority/Role']}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography><strong>Interest in ML methods/data:</strong> {userData['Interest in ML methods/data']}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography><strong>Interest in Physics:</strong> {userData['Interest in Physics']}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography><strong>Workshop Goals:</strong> {userData['Workshop Goals']}</Typography>
      </Grid>
    </Grid>
  );
}

export default PartnerDetails;