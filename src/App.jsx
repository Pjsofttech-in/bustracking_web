// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Login from "./layouts/Login";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public route – login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes – all other pages */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Navigation />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;