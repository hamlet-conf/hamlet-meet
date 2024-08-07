import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography
} from '@mui/material';

function TopPartners({ partners, onPartnerSelect }) {
  // Function to interpolate color between green and blue
  const getColor = (similarity) => {
    const r = Math.round(0 * similarity + 0 * (1 - similarity));
    const g = Math.round(255 * similarity + 0 * (1 - similarity));
    const b = Math.round(0 * similarity + 255 * (1 - similarity));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label="partners table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">Name</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">Similarity</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partners.map((partner) => {
            const similarity = 1 - partner.distance;
            const color = getColor(similarity);
            return (
              <TableRow
                key={partner.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
                onClick={() => onPartnerSelect({ id: partner.id })}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {partner.id}
                </TableCell>
                <TableCell>{partner.name}</TableCell>
                <TableCell 
                  align="right" 
                  style={{ 
                    color: color, 
                    fontWeight: 'bold',
                    textShadow: '0px 0px 2px rgba(0,0,0,0.3)' // For better readability
                  }}
                >
                  {similarity.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopPartners;