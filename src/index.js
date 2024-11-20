import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' in React 18
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import './index.css';
import './App.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
