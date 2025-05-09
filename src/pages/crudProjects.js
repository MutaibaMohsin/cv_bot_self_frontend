import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// const BASE_URL = "https://cv-bot-backend.onrender.com/projects"; // Replace with your backend URL
const BASE_URL = "http://localhost:8000/projects"; // Replace with your backend URL

function MyProjectTable() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setProjects(data.reverse());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddOrUpdate = async () => {
    const payload = {
      name,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean)
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

    setName('');
    setDescription('');
    setTechnologies('');
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setName(project.name);
    setDescription(project.description);
    setTechnologies((project.technologies || []).join(', '));
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Projects</Typography>

      <TextField
        fullWidth
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Technologies (comma separated)"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleAddOrUpdate}
        sx={{ mb: 3 }}
      >
        {editingId ? 'Update Project' : 'Add Project'}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Technologies</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj.id}>
                <TableCell>{proj.name}</TableCell>
                <TableCell>{proj.description}</TableCell>
                <TableCell>
                  <ul style={{ paddingLeft: 16 }}>
                    {(proj.technologies || []).map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(proj)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(proj._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyProjectTable;
