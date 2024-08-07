import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useTable, useSortBy } from 'react-table';

function AdaptiveTable({ data, onPartnerSelect }) {
  const [showAllEntries, setShowAllEntries] = useState(false);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { 
        Header: 'Similarity', 
        accessor: 'similarity',
        Cell: ({ value }) => value.toFixed(2),
      },
    ],
    []
  );

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.similarity - a.similarity);
    if (!showAllEntries) {
      return [
        ...sorted.slice(0, 5),
        { id: 'separator', name: '...', similarity: null },
        ...sorted.slice(-3)
      ];
    }
    return sorted;
  }, [data, showAllEntries]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: sortedData }, useSortBy);

  const getColor = (similarity) => {
    const r = Math.round(0 * similarity + 0 * (1 - similarity));
    const g = Math.round(255 * similarity + 0 * (1 - similarity));
    const b = Math.round(0 * similarity + 255 * (1 - similarity));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Paper>
      <TableContainer>
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ fontWeight: 'bold' }}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              if (row.original.id === 'separator') {
                return (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                      Hidden entries...
                    </TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow 
                  {...row.getRowProps()}
                  onClick={() => onPartnerSelect({ id: row.original.id })}
                  style={{ cursor: 'pointer' }}
                  hover
                >
                  {row.cells.map(cell => (
                    <TableCell 
                      {...cell.getCellProps()}
                      style={
                        cell.column.Header === 'Similarity' 
                          ? { 
                              color: getColor(cell.value),
                              fontWeight: 'bold',
                              textShadow: '0px 0px 2px rgba(0,0,0,0.3)'
                            } 
                          : {}
                      }
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
        <Button onClick={() => setShowAllEntries(!showAllEntries)} variant="contained">
          {showAllEntries ? 'Show Less' : 'Show All'}
        </Button>
      </Box>
    </Paper>
  );
}

export default AdaptiveTable;