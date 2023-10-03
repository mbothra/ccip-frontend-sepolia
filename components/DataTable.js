import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField'; // <-- Import the TextField component

const DataTable = ({ data, columns, className }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

    // Filter the data based on the search term
    const filteredData = data.filter(row =>
      columns.some(column =>
        String(row[column.dataKey])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

  const displayedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper style={{ width: '100%', ...className }}>
            <TextField
        style={{ margin: '16px', width: '1100px' }}
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={handleChangeSearch}
      />

      <TableContainer>
        <Table sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  variant="head"
                  align={'left'}
                  style={{ width: column.width, fontFamily: 'Montserrat', color:"#375bd2", fontWeight: 'bold'}}
                  sx={{ backgroundColor: 'background.paper' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.id || row[columns[0].dataKey]}>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    align={'left'}
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {row[column.dataKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}

export default DataTable;
