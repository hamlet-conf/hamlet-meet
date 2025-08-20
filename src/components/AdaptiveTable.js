import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box, 
  useMediaQuery, 
  useTheme, 
  Button,
  Avatar,
  Chip,
  LinearProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function AdaptiveTable({ data, onPartnerSelect }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showAllEntries, setShowAllEntries] = useState(false);

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const sorted = [...data].sort((a, b) => b.similarity - a.similarity);
    if (!showAllEntries && sorted.length > 8) {
      return [
        ...sorted.slice(0, 5),
        { id: 'separator', name: '...', similarity: null, isSeparator: true },
        ...sorted.slice(-3)
      ];
    }
    return sorted;
  }, [data, showAllEntries]);

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No similar partners found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Check back later as more attendees join the platform
        </Typography>
      </Box>
    );
  }

  const handleRowClick = (partner) => {
    if (partner.isSeparator) return;
    onPartnerSelect({ id: partner.id, name: partner.name });
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 0.8) return theme.palette.success.main;
    if (similarity >= 0.6) return theme.palette.warning.main;
    return theme.palette.info.main;
  };

  const getSimilarityLabel = (similarity) => {
    if (similarity >= 0.7) return 'High';
    if (similarity >= 0.63) return 'Medium';
    return 'Moderate';
  };

  if (isMobile) {
    return (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sortedData.map((partner, index) => {
            if (partner.isSeparator) {
              return (
                <Box 
                  key={index}
                  sx={{ 
                    textAlign: 'center', 
                    py: 2,
                    color: 'text.secondary',
                    fontStyle: 'italic'
                  }}
                >
                  <Typography variant="body2">
                    {data.length - 8} hidden entries...
                  </Typography>
                </Box>
              );
            }
            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid rgba(71, 85, 105, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px -8px rgba(71, 85, 105, 0.2)',
                    borderColor: 'rgba(71, 85, 105, 0.2)',
                  },
                }}
                onClick={() => handleRowClick(partner)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: theme.palette.primary.light,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {partner.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {partner.id}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Similarity
                    </Typography>
                    <Chip
                      label={getSimilarityLabel(partner.similarity)}
                      size="small"
                      sx={{
                        backgroundColor: getSimilarityColor(partner.similarity),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={partner.similarity * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getSimilarityColor(partner.similarity),
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {(partner.similarity * 100).toFixed(1)}% match
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                    },
                  }}
                >
                  View Profile
                </Button>
              </Paper>
            );
          })}
        </Box>
        {data.length > 8 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              onClick={() => setShowAllEntries(!showAllEntries)} 
              variant="outlined"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                },
              }}
            >
              {showAllEntries ? 'Show Less' : 'Show All'}
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          background: 'transparent',
          border: 'none'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'rgba(71, 85, 105, 0.04)',
                '& .MuiTableCell-head': {
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  borderBottom: `2px solid ${theme.palette.primary.light}`,
                  fontSize: '0.95rem',
                  py: 2,
                },
              }}
            >
              <TableCell>Partner</TableCell>
              <TableCell>Partner ID</TableCell>
              <TableCell align="center">Similarity</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((partner, index) => {
              if (partner.isSeparator) {
                return (
                  <TableRow key={index}>
                    <TableCell 
                      colSpan={4} 
                      sx={{ 
                        textAlign: 'center', 
                        fontStyle: 'italic',
                        color: 'text.secondary',
                        py: 3,
                        borderBottom: '1px solid rgba(71, 85, 105, 0.1)',
                      }}
                    >
                      {data.length - 8} hidden entries...
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(71, 85, 105, 0.02)',
                      transform: 'scale(1.005)',
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(71, 85, 105, 0.1)',
                      py: 2,
                    },
                  }}
                  onClick={() => handleRowClick(partner)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.palette.primary.light,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {partner.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      {partner.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={getSimilarityLabel(partner.similarity)}
                        size="small"
                        sx={{
                          backgroundColor: getSimilarityColor(partner.similarity),
                          color: 'white',
                          fontWeight: 600,
                          minWidth: 80
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {(partner.similarity * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 8 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button 
            onClick={() => setShowAllEntries(!showAllEntries)} 
            variant="contained"
            sx={{ px: 4 }}
          >
            {showAllEntries ? 'Show Less' : 'Show All'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default AdaptiveTable;