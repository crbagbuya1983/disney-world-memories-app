// 9/12/2024 update:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL, FETCH_MEMORY_ACTION, ADD_MEMORY_ACTION, UPDATE_MEMORY_ACTION, DELETE_MEMORY_ACTION, TOGGLE_FAVORITE_ACTION} from '../config';
// configure Axios to allow credentials explicitly:
axios.defaults.withCredentials = true;
// checking API_BASE_URL 
console.log(API_BASE_URL);


// Async Thunks
export const fetchMemories = createAsyncThunk(FETCH_MEMORY_ACTION, async () => {
  const response = await axios.get(API_BASE_URL, {
    withCredentials: true,
    });
  return response.data;
});

export const addMemory = createAsyncThunk(ADD_MEMORY_ACTION, async (memoryData) => {
 
  const response = await axios.post(API_BASE_URL, memoryData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // Include credentials
  });
  return response.data;
});

export const editMemory = createAsyncThunk(UPDATE_MEMORY_ACTION, async (memory) => {
  const response = await axios.put(`${API_BASE_URL}/${memory._id}`, memory, {
    withCredentials: true,
  });
  return response.data;
});

export const deleteMemory = createAsyncThunk(DELETE_MEMORY_ACTION, async (_id) => {
  await axios.delete(`${API_BASE_URL}/${_id}`, {
    withCredentials: true, // Include credentials
  });
  return _id;
});

// Async thunk to sync the toggle favorite status with the database
export const toggleFavoriteInDb = createAsyncThunk(
  TOGGLE_FAVORITE_ACTION,
  async (memoryId, { getState, rejectWithValue }) => {
    const state = getState();
    const memory = state.memories.memories.find(mem => mem._id === memoryId);

    // Toggle the current value of isfavorite
    try {
      // Send the updated isfavorite status to the backend
      const response = await axios.put(`${API_BASE_URL}/${memoryId}`, {
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

        // if (memory.isfavorite) {
        //   state.memories.splice(memoryIndex, 1); // Remove it from current position
        //   state.memories.unshift(memory); // Add it to the beginning
        // }
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
        state.memories = action.payload.reverse();
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
