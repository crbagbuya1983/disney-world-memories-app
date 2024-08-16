import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addMemory, selectMemories } from '../redux/memoriesSlice';

const MemoryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const photos = useSelector(selectMemories);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(addMemory({
          id: Date.now(),
          image: reader.result,
          title: title,
          description: description,
          isfavorite: false,
        }));
        setPhoto(null);
        setTitle('');
        setDescription('');
      };
      reader.readAsDataURL(photo);
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
      <Box>
        {
          photos.map((photo, index) => (
            <img
              key={index}
              src={photo.image}
              alt={photo.title || `Uploaded ${index + 1}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))
        }
      </Box>
    </div>    
  );
};

export default MemoryForm;
