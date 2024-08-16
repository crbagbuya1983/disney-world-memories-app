import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toggleFavorite, deleteMemory, editMemory } from '../redux/memoriesSlice';
import { CardMedia} from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';

const MemoryItem = ({ memory }) => {
  // const dispatch = useDispatch();
  // const [editIndex, setEditIndex] = useState(null);
  // const [editTitle, setEditTitle] = useState('');
  // const [editDescription, setEditDescription] = useState('');

  // const handleEditMemory = (memory) => {
  //   setEditIndex(memory.id);
  //   setEditTitle(memory.title);
  //   setEditDescription(memory.description);
  // };

  // const handleSaveEdit = (id) => {
  //   dispatch(editMemory({ id, title: editTitle, description: editDescription }));
  //   setEditIndex(null);
  // };

  return (
    <div>
        <CardMedia component="img" alt={memory.title} height="140" image={memory.image} />     
    </div>
      
   
  );
};


export default MemoryItem;
