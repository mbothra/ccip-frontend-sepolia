import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

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

  const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper style={{ width: '100%', ...className }}>
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
