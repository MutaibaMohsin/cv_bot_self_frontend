import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const BASE_URL = "https://cv-bot-self-backend.onrender.com/achievements"; // Replace with your actual base if different
// const BASE_URL = "http://localhost:8000/achievements"; // Replace with your actual base if different

function MyAchviementTable() {
  const [achievements, setAchievements] = useState([]);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all achievements
  const fetchAchievements = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setAchievements(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Add or update achievement
  const handleAddOrUpdate = async () => {
    const payload = { name, organization, description };

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

    setName('');
    setOrganization('');
    setDescription('');
    fetchAchievements();
  };

  // Delete an achievement
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchAchievements();
  };

  // Edit an achievement
  const handleEdit = (ach) => {
    setName(ach.name);
    setOrganization(ach.organization);
    setDescription(ach.description);
    setEditingId(ach._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Achievements</Typography>

      <TextField
        fullWidth
        label="Achievement Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Organization"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleAddOrUpdate}
        sx={{ mb: 3 }}
      >
        {editingId ? 'Update Achievement' : 'Add Achievement'}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Organization</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((ach) => (
              <TableRow key={ach.id}>
                <TableCell>{ach.name}</TableCell>
                <TableCell>{ach.organization}</TableCell>
                <TableCell>{ach.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(ach)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(ach._id)}>
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

export default MyAchviementTable;
