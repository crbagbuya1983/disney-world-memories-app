import React from 'react';
import { CardMedia} from '@mui/material';

const MemoryItem = ({ memory }) => {
  return (
    <div>
        <CardMedia component="img" alt={memory.title} height="140" image={memory.photo} />     
    </div>
  );
};

export default MemoryItem;
