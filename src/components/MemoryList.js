// update 09/16/24 - w/ pagination
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemories, deleteMemory, editMemory, toggleFavoriteInDb, toggleFavorite } from '../redux/memoriesSlice';
import { Grid, Card, CardContent, IconButton, Typography, TextField,Dialog, DialogActions, DialogContent, DialogTitle, Button, } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import MemoryItem from './MemoryItem';
import Pagination from '@mui/material/Pagination';
import '../css/MemoryList.css';

const MemoryList = () => {
  const dispatch = useDispatch();
  const memories = useSelector((state) => state.memories.memories);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = memories.filter(memory =>
        memory.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMemories(filtered);
      // Reset to the first page when a new search is performed
      setCurrentPage(1);
    } else {
      setFilteredMemories(memories);
    }   
  }, [searchQuery, memories]);

  
  const handleSaveEdit = (_id) => {
    dispatch(editMemory({ _id, title: editTitle, description: editDescription }));
    setEditIndex(null);
  };

  const handleEditMemory = (memory) => {
    setEditIndex(memory._id);
    setEditTitle(memory.title);
    setEditDescription(memory.description);
  };

  const handleToggleFavorite = (memory) => {
    dispatch(toggleFavorite(memory._id));
    dispatch(toggleFavoriteInDb(memory._id));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Modal handlers
  const openModal = (memory) => {
    setMemoryToDelete(memory);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMemoryToDelete(null);
  };

  const confirmDelete = () => {
    if (memoryToDelete) {
      dispatch(deleteMemory(memoryToDelete._id));
      closeModal();
    }
  };

  // Pagination logic
  const indexOfLastMemory = currentPage * itemsPerPage;
  const indexOfFirstMemory = indexOfLastMemory - itemsPerPage;
  const currentMemories = filteredMemories.slice(indexOfFirstMemory, indexOfLastMemory);

  return (
    <div className="container">
      <h2>Photo Gallery</h2>
      {memories.length === 0 ? (
        <p>No photos yet.</p>
      ) : (
        <>
          <form>
            <TextField
              id="search"
              label="Search by Title"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter title"
            />
          </form>
          
          {filteredMemories.length === 0 && searchQuery && (
            <p>No results found for "{searchQuery}".</p>
          )}
          <Pagination
            count={Math.ceil(filteredMemories.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
          />
          <br/>
          <Grid container spacing={3}>
            {currentMemories.map((memory) => (
              <Grid item xs={12} sm={6} md={4} key={memory._id}>
                <Card>
                  <CardContent>
                    <MemoryItem memory={memory} />
                    {editIndex === memory._id ? (
                      <>
                      <br/>
                        <TextField
                          label="Title"
                          variant="outlined"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <IconButton onClick={() => handleSaveEdit(memory._id)}>
                          <SaveIcon color="success" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Typography variant="h5">{memory.title}</Typography>
                        <Typography variant="body2">{memory.description}</Typography>
                        <IconButton onClick={() => handleEditMemory(memory)}>
                          <EditIcon color="warning" />
                        </IconButton>
                        <IconButton className="favorite-icon" onClick={() => handleToggleFavorite(memory)}>
                          <FavoriteIcon color={memory.isfavorite ? 'primary' : 'disabled'} />
                        </IconButton>
                        {/* <IconButton onClick={() => dispatch(deleteMemory(memory._id))}>
                          <DeleteIcon color="error" />
                        </IconButton> */}
                        <IconButton onClick={() => openModal(memory)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredMemories.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
          />
          {/* Modal */}
          <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              {memoryToDelete && (
                <>
                  <Typography>
                    Are you sure you want to delete this photo?
                  </Typography>
                  <MemoryItem memory={memoryToDelete} />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} color="primary">
                No
              </Button>
              <Button onClick={confirmDelete} color="error">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default MemoryList;

