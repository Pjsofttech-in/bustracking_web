// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setAuthToken } from './api/authApi';

// ✅ Rehydrate JWT into axios defaults on every page load/refresh
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// ✅ FIX: Match the production mount path (nginx serves the SPA under /bus-api/)
const basename =
  import.meta.env.MODE === 'production' ? '/bus-api' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);