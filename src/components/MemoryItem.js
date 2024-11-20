import React, {useState} from 'react';
import { CardMedia, Modal, Box } from '@mui/material';
import '../css/MemoryItem.css';

const MemoryItem = ({ memory }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomOpen = () => setIsZoomed(true);
  const handleZoomClose = () => setIsZoomed(false);

  return (
    <div>
        {/* Thumbnail Image */}
      <CardMedia
        className="memory-card"
        component="img"
        alt={memory.title}
        height="140"
        image={memory.photo}
        onClick={handleZoomOpen} // Open zoom on click
      />
      {/* Zoomed Image Modal */}
      <Modal 
        open={isZoomed} 
        onClick={handleZoomClose} // Closes on outside click
      >
        <Box className="zoomed-image-container" 
              onClick={handleZoomClose} // Handle click outside image 
        >
          <img src={memory.photo} alt={memory.title} className="zoomed-image" onClick={(e) => e.stopPropagation()}/>
        </Box>
      </Modal>    
    </div>
  );
};

export default MemoryItem;
