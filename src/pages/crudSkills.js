import { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const BASE_URL = "https://cv-bot-self-backend.onrender.com/skills"; 
// const BASE_URL = "http://localhost:8000/skills"; 
function MySkillTable() {
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState('');
  const [items, setItems] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchSkills = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setSkills(data);
    console.log("Fetched skills:", data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddOrUpdate = async () => {
    const payload = {
      category,
      items: items.split(',').map(item => item.trim())
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
    setCategory('');
    setItems('');
    fetchSkills();
  };
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchSkills();
  };
  const handleEdit = (skill) => {
    setCategory(skill.category);
    setItems(skill.items.join(', '));
    setEditingId(skill._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Skills</Typography>

      <TextField
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Items (comma-separated)"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAddOrUpdate}
        sx={{ mb: 3 }}
      >
        {editingId ? 'Update Skill' : 'Add Skill'}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map(skill => (
              <TableRow key={skill._id}>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.items.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(skill)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(skill._id)}>
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

export default MySkillTable;
