import React, { useState } from 'react';
import DataTable from '../../components/data-table';
import { useGetPosts } from '../../services/posts';
import {
  TextField,
  Box,
  Typography,
  TablePagination,
} from '@mui/material';

export default function Posts() {
  const { data, isLoading, isError } = useGetPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const headers = ['id', 'title', 'body'];

  const filteredRows = (data?.data ?? []).filter((post) => {
    const term = searchTerm.toLowerCase();
    return post.title.toLowerCase().includes(term);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: { xs: 1, sm: 0 } }}>
          Posts List
        </Typography>

        <TextField
          label="Search by post title"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0); 
          }}
          sx={{
            width: { xs: '100%', sm: '300px' },
            backgroundColor: 'white',
            boxShadow: 1,
            borderRadius: 1,
          }}
        />
      </Box>

      <DataTable headers={headers} rows={paginatedRows} />

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
