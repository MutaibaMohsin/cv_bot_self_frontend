import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// const BASE_URL = "https://cv-bot-backend.onrender.com/education"; // Adjust if needed
const BASE_URL = "http://localhost:8000/education"; // Adjust if needed

function MyEducationTable() {
  const [educationList, setEducationList] = useState([]);
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all education entries
  const fetchEducation = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setEducationList(data.reverse());
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // Add or update
  const handleAddOrUpdate = async () => {
    const payload = { degree, university };

    if (editingId) {
      await fetch(`${BASE_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setEditingId(null);
    } else {
      await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    setDegree('');
    setUniversity('');
    fetchEducation();
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchEducation();
  };

  // Edit
  const handleEdit = (education) => {
    setDegree(education.degree);
    setUniversity(education.university);
    setEditingId(education._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Education</Typography>

      <TextField
        fullWidth
        label="Degree"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="University"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAddOrUpdate}
        sx={{ mb: 3 }}
      >
        {editingId ? 'Update Education' : 'Add Education'}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Degree</strong></TableCell>
              <TableCell><strong>University</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educationList.map(edu => (
              <TableRow key={edu.id}>
                <TableCell>{edu.degree}</TableCell>
                <TableCell>{edu.university}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(edu)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(edu._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyEducationTable;
