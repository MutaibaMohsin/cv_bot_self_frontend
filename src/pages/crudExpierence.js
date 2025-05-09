import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// const BASE_URL = "https://cv-bot-backend.onrender.com/experience"; // Replace with your actual backend URL
const BASE_URL = "http://localhost:8000/experience"; // Replace with your actual backend URL

function MyExpierenceTable() {
  const [experiences, setExperiences] = useState([]);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchExperiences = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setExperiences(data.reverse());
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddOrUpdate = async () => {
    const payload = {
      position,
      company,
      location,
      description: description.split('\n').filter(line => line.trim() !== '')
    };

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

    setPosition('');
    setCompany('');
    setLocation('');
    setDescription('');
    fetchExperiences();
  };

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchExperiences();
  };

  const handleEdit = (exp) => {
    setPosition(exp.position);
    setCompany(exp.company);
    setLocation(exp.location);
    setDescription((exp.description || []).join('\n'));
    setEditingId(exp._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Experience</Typography>

      <TextField
        fullWidth
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description (each line will be a bullet point)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleAddOrUpdate}
        sx={{ mb: 3 }}
      >
        {editingId ? 'Update Experience' : 'Add Experience'}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Position</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.position}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>{exp.location}</TableCell>
                <TableCell>
                  <ul>
                    {(exp.description || []).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(exp)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(exp._id)}>
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

export default MyExpierenceTable;
