// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPortal from './components/AuthPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/patient/login" replace />} />

        {/* Patient Routes */}
        <Route 
          path="/patient/login" 
          element={<AuthPortal role="general_users" view="login" />} 
        />
        <Route 
          path="/patient/register" 
          element={<AuthPortal role="general_users" view="register" />} 
        />

        {/* Doctor Routes */}
        <Route 
          path="/doctor/login" 
          element={<AuthPortal role="doctors" view="login" />} 
        />
        <Route 
          path="/doctor/register" 
          element={<AuthPortal role="doctors" view="register" />} 
        />

        {/* Hospital Routes */}
        <Route 
          path="/hospital/login" 
          element={<AuthPortal role="hospital" view="login" />} 
        />
        <Route 
          path="/hospital/register" 
          element={<AuthPortal role="hospital" view="register" />} 
        />

        {/* Utility / Password Management */}
        <Route 
          path="/forgot-password" 
          element={<AuthPortal role="general_users" view="forgot" />} 
        />
        <Route 
          path="/reset-password/*" 
          element={<AuthPortal role="general_users" view="reset" />} 
        />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/patient/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}