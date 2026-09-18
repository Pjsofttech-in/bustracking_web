import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { setAuthToken } from './api/authApi';

const token = localStorage.getItem('token');

if (token) {
  setAuthToken(token);
}

const basename =
  import.meta.env.VITE_APP_BASE_PATH ||
  (import.meta.env.MODE === 'production'
    ? '/bustracking'
    : '/');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);