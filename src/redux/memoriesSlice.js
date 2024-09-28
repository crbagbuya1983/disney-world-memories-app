// 9/12/2024 update:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchMemories = createAsyncThunk('memories/fetchMemories', async () => {
  const response = await axios.get('http://localhost:5000/api/memories');
  return response.data;
});

export const addMemory = createAsyncThunk('memories/addMemory', async (memoryData) => {
 
  const response = await axios.post('http://localhost:5000/api/memories', memoryData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const editMemory = createAsyncThunk('memories/updateMemory', async (memory) => {
  const response = await axios.put(`http://localhost:5000/api/memories/${memory._id}`, memory);
  return response.data;
});

export const deleteMemory = createAsyncThunk('memories/deleteMemory', async (_id) => {
  await axios.delete(`http://localhost:5000/api/memories/${_id}`);
  return _id;
});

// Async thunk to sync the toggle favorite status with the database
export const toggleFavoriteInDb = createAsyncThunk(
  'memories/toggleFavoriteInDb',
  async (memoryId, { getState, rejectWithValue }) => {
    const state = getState();
    const memory = state.memories.memories.find(mem => mem._id === memoryId);

    // Toggle the current value of isfavorite
    try {
      // Send the updated isfavorite status to the backend
      const response = await axios.put(`http://localhost:5000/api/memories/${memoryId}`, {
        isfavorite: memory.isfavorite,
      });

      return response.data;  // Return the updated memory object from the backend
    } catch (error) {
      // If the API call fails, reject the thunk with an error message
      return rejectWithValue(error.response.data);
    }
  }
);


const memoriesSlice = createSlice({
  name: 'memories',
  initialState: {
    memories: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const memory = state.memories.find(mem => mem._id === action.payload);
      if (memory) {
        memory.isfavorite = !memory.isfavorite;
      }
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMemories.fulfilled, (state, action) => {
        state.loading = false;
        state.memories = action.payload;
      })
      .addCase(fetchMemories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMemory.fulfilled, (state, action) => {
        state.memories.push(action.payload);
      })
      .addCase(editMemory.fulfilled, (state, action) => {
        const updatedMemory = action.payload;
        const index = state.memories.findIndex(mem => mem._id === updatedMemory._id);
        if (index !== -1) {
          state.memories[index] = updatedMemory;          
        }
      })
      .addCase(deleteMemory.fulfilled, (state, action) => {
        const id = action.payload;
        state.memories = state.memories.filter(mem => mem._id !== id);
      })
  },
});

export const { toggleFavorite, } = memoriesSlice.actions;
export const selectMemories = (state) => state.memories.memories;
export default memoriesSlice.reducer;
