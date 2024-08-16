import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemoryItem from './MemoryItem';
import { selectMemories,toggleFavorite, deleteMemory, editMemory } from '../redux/memoriesSlice';
import { Grid,Card, TextField, IconButton, CardContent,Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


const MemoryList = () => {
  const memories = useSelector(selectMemories);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEditMemory = (memory,index) => {
    setEditIndex(index);
    setEditTitle(memory.title);
    setEditDescription(memory.description);
  };

  const handleSaveEdit = (id) => {
    dispatch(editMemory({ id, title: editTitle, description: editDescription }));
    setEditIndex(null);
  };

  if (!Array.isArray(memories)) {
    console.error('Memories is not an array:', memories);
    return null;
  }

  return (
    <div className="container">
      <h2>Photo Gallery</h2>
      {memories.length === 0 ? (
        <p>No photos yet.</p>
        ) : <Grid container spacing={3}>
              {
                memories.map((memory,index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <MemoryItem memory={memory}/>
                                {editIndex === index ? (
                                        <>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Title" 
                                                variant="outlined" 
                                                defaultValue={editTitle} 
                                                onChange={(e) => setEditTitle(e.target.value)} 
                                                placeholder="Edit Title"/>                  
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                defaultValue={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                placeholder="Edit Description"
                                            />       
                                            <IconButton onClick={() => handleSaveEdit(memory.id)}><SaveIcon/></IconButton>
                                        </>
                                        ) : (
                                        <>
                                            <Typography variant="h5">{memory.title}</Typography>
                                            <Typography variant="body2">{memory.description}</Typography>                                        
                                            <IconButton onClick={() => handleEditMemory(memory, index)}><EditIcon/></IconButton>
                                        </> )
                                }
                                <IconButton onClick={() => dispatch(toggleFavorite(memory.id))}>
                                    <FavoriteIcon color={memory.isfavorite ? 'secondary' : 'disabled'} />
                                </IconButton> 
                                <IconButton onClick={() => dispatch(deleteMemory(memory.id))} ><DeleteIcon/></IconButton>                           
                            </CardContent>
                        </Card>
                    </Grid>
                  )                               
                )
              }
          </Grid>
            
      }
    </div>
  );
};

export default MemoryList;
