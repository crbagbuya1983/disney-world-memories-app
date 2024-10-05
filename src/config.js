// src/config.js
// const API_BASE_URL = 'http://localhost:5000/api/memories';
const API_BASE_URL = 'https://your-heroku-app.herokuapp.com/api/memories';
const FETCH_MEMORY_ACTION = 'memories/fetchMemories';
const ADD_MEMORY_ACTION = 'memories/addMemory';
const UPDATE_MEMORY_ACTION = 'memories/updateMemory';
const DELETE_MEMORY_ACTION = 'memories/deleteMemory';
const TOGGLE_FAVORITE_ACTION = 'memories/toggleFavoriteInDb';

export {API_BASE_URL, FETCH_MEMORY_ACTION, UPDATE_MEMORY_ACTION, ADD_MEMORY_ACTION, DELETE_MEMORY_ACTION, TOGGLE_FAVORITE_ACTION};