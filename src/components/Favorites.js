import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import MemoryItem from './MemoryItem';
import { toggleFavorite, selectFavorites } from '../redux/memoriesSlice';
import { Card, CardContent, CardMedia, Typography, IconButton, TextField} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Favorites = () => {
  const memories = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h2>Favorites</h2>
      {memories.length === 0 ? (<p>No photos yet.</p>) : (
        <Grid container spacing={3}> 
          {memories.map((memory) => (
             
            <Grid item xs={12} sm={6} md={4} key={memory.id} >
              <Card>
                <CardContent>
                  <MemoryItem memory={memory} toggleFavorite={() => dispatch(toggleFavorite(memory.id))} />
                <Typography variant="h5">{memory.title}</Typography>
                <Typography variant="body2">{memory.description}</Typography>
                <IconButton onClick={() => dispatch(toggleFavorite(memory.id))}>
                    <FavoriteIcon color={memory.isfavorite ? 'secondary' : 'disabled'} />
                </IconButton>
                </CardContent>
              </Card>         
            </Grid>) )
          }
        </Grid>
      ) }
    </div>
  );
};

export default Favorites;
