import React from 'react';
import { CardMedia} from '@mui/material';

const MemoryItem = ({ memory }) => {
  return (
    <div>
        <CardMedia component="img" alt={memory.title} height="140" image={`data:image/png;base64,${memory.photo}`} />     
    </div>
  );
};

export default MemoryItem;
