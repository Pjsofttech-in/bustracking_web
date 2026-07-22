import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // ← must be present
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);