
// update 10/29/2024 style 4
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addMemory } from '../redux/memoriesSlice';
import '../css/MemoryForm.css';

const MemoryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // State for preview
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null); // Set preview URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photo) {
      alert('Please upload a photo');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('isfavorite', false);

    dispatch(addMemory(formData));
    setTitle('');
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
    setIsModalOpen(false); // Close modal on successful submission
  };

  // Handle closing modal and reset preview
  const handleModalClose = () => {
    setIsModalOpen(false);
    setPhoto(null); // Reset photo
    setPhotoPreview(null); // Reset preview
  };

  return (
    <div className="container">
      <h2>Add New Memory</h2>
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
        <Button onClick={() => setIsModalOpen(true)} variant="contained">
          Upload Photo
        </Button>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className="pulsate">
          Add Memory
        </Button>
      </Box>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={handleModalClose}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Photo</h3>
            <input
              type="file"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <img src={photoPreview} alt="preview" className="photo-preview" />
            )}
            <Button onClick={() => setIsModalOpen(false)} disabled={!photo}>Done</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryForm;
