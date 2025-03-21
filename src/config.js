// src/config.js
//const API_BASE_URL = 'http://localhost:5000/api/memories';
// const API_BASE_URL = 'https://disney-express-backend-360388aa6246.herokuapp.com/api/memories';
const API_BASE_URL = 'https://photo-backend-3u0w.onrender.com/api/memories';
const FETCH_MEMORY_ACTION = 'memories/fetchMemories';
const ADD_MEMORY_ACTION = 'memories/addMemory';
const UPDATE_MEMORY_ACTION = 'memories/updateMemory';
const DELETE_MEMORY_ACTION = 'memories/deleteMemory';
const TOGGLE_FAVORITE_ACTION = 'memories/toggleFavoriteInDb';
const LOGO_PATH = '../public';

export {API_BASE_URL, FETCH_MEMORY_ACTION, UPDATE_MEMORY_ACTION, ADD_MEMORY_ACTION, DELETE_MEMORY_ACTION, TOGGLE_FAVORITE_ACTION, LOGO_PATH};