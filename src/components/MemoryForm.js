
// update 10/29/2024 style 4
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { addMemory } from '../redux/memoriesSlice';
import '../css/MemoryForm.css';

const MemoryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // State for preview
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // updated 11/26/2024
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const dispatch = useDispatch();
  // updated 11/26/2024
  const navigate = useNavigate();

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
    // setIsModalOpen(false); // Close modal on successful submission
    // updated 11/26/2024
    setIsUploadModalOpen(false);
    setIsSuccessModalOpen(true); // Open success modal
  };

  // Handle closing modal and reset preview
  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setPhoto(null); // Reset photo
  //   setPhotoPreview(null); // Reset preview
  // };
  
  // updated 11/26/2024
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/view-list'); // Navigate to the photo gallery
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
    setPhoto(null);
    setPhotoPreview(null);
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
        {/* <Button onClick={() => setIsModalOpen(true)} variant="contained"> */}
        <Button onClick={() => setIsUploadModalOpen(true)} variant="contained">
          Upload Photo
        </Button>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className="pulsate">
          Add Memory
        </Button>
      </Box>

      {/* Custom Modal */}
      {isUploadModalOpen  && (
        <div className="custom-modal-overlay" onClick={handleUploadModalClose}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Photo</h3>
            <input
              type="file"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <img src={photoPreview} alt="preview" className="photo-preview" />
            )}
            <Button onClick={() => setIsUploadModalOpen(false)} disabled={!photo}>Done</Button>
            <Button onClick={handleUploadModalClose}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="custom-modal-overlay" onClick={handleSuccessModalClose}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Photo Added!</h3>
            <p>Your photo has been successfully added to your memory.</p>
            <Button variant="contained" onClick={handleSuccessModalClose}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryForm;
