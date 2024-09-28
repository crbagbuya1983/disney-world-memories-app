// Update 09/27/24
import React, { useState, } from 'react';
import { useSelector, } from 'react-redux';
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MemoryItem from './MemoryItem';
// import { toggleFavorite } from '../redux/memoriesSlice';

const Favorites = () => {
  // const dispatch = useDispatch();
  const memories = useSelector((state) => state.memories.memories);
  
  // Filter memories to get only those marked as favorite
  const favoriteMemories = memories.filter((memory) => memory.isfavorite);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(favoriteMemories.length / photosPerPage);

  // Get the current photos for the current page
  const currentPhotos = favoriteMemories.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage
  );

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h2>Favorites</h2>
      {favoriteMemories.length === 0 ? (
        <p>No favorite photos yet.</p>
      ) : (
        <>
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
        />
        <br/>
          <Grid container spacing={3}>
            {currentPhotos.map((memory) => (
              <Grid item xs={12} sm={6} md={4} key={memory._id}>
                <Card>
                  <CardContent>
                    <MemoryItem memory={memory} />
                    <Typography variant="h5">{memory.title}</Typography>
                    <Typography variant="body2">{memory.description}</Typography>
                    <FavoriteIcon color={memory.isfavorite ? 'primary' : 'disabled'} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
          />
        </>
      )}
    </div>
  );
};

export default Favorites;
