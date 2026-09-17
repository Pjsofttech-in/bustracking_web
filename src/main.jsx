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

// ✅ Basename matches the nginx mount and vite.config.js `base`
//    production → "/bustracking"
//    dev        → "/"
const basename =
  import.meta.env.MODE === 'production'
    ? (import.meta.env.VITE_APP_BASE_PATH || '/bustracking')
    : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);