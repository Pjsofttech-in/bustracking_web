import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setAuthToken } from './api/authApi'; // ✅ FIX: import token setter

// ✅ FIX: Rehydrate JWT into axios defaults on every page load/refresh
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const basename =
  import.meta.env.MODE === 'production'
    ? '/bustracking'
    : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);