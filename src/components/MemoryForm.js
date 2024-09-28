//9/12/2024 update:
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addMemory } from '../redux/memoriesSlice';

const MemoryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isfavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit =  (e) => {
    e.preventDefault();
 
    if (!photo) {
      alert('Please upload a photo');
      return;
    }
  
    // Create a FormData object to send the photo file and other fields
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', photo); // Attach the photo file
    formData.append('isfavorite', false);
  
    try {
      // Dispatch the addMemory thunk with formData
       dispatch(addMemory(formData));
  
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setPhoto(null);
      setIsFavorite(isfavorite);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add new Memory</h2>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" hidden onChange={(e) => setPhoto(e.target.files[0])} />
        </Button>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Memory
        </Button>
      </Box>
    </div>
  );
};

export default MemoryForm;


