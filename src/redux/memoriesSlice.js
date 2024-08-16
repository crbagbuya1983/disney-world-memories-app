import { createSlice } from '@reduxjs/toolkit';

const memoriesSlice = createSlice({
  name: 'memories',
  initialState: {
    memories: [],
    favorites: [],
  },
  reducers: {
    addMemory: (state, action) => {
      state.memories.push(action.payload);
    },

    deleteMemory: (state, action) => {
      state.memories = state.memories.filter((mem) => mem.id !== action.payload);
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload); 
    },

    editMemory: (state, action) => {
      const {id, title, description} = action.payload;
      const memory = state.memories.find(mem => mem.id === id);
      const favorite = state.favorites.find(fav => fav.id === id);
      if(memory){
        memory.title = title;
        memory.description = description;
        if(memory.isfavorite){
          if(favorite){
            favorite.title = title;
            favorite.description = description;
          }
        }
      }
    },

    toggleFavorite: (state, action) => {
      const memory = state.memories.find(mem => mem.id === action.payload);
      if (memory) {
        memory.isfavorite = !memory.isfavorite;
        if (memory.isfavorite) {
          state.favorites.push(memory);
        } else {
          state.favorites = state.favorites.filter(fav => fav.id !== memory.id);
        }
      }
    },

  },
});

export const { addMemory, deleteMemory, editMemory, toggleFavorite } = memoriesSlice.actions;
export const selectMemories = (state) => state.memories.memories;
export const selectFavorites = (state) => state.memories.favorites;
export default memoriesSlice.reducer;
