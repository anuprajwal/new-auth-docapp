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
          element={<AuthPortal role="general_user" view="login" />} 
        />
        <Route 
          path="/patient/register" 
          element={<AuthPortal role="general_user" view="register" />} 
        />

        {/* Doctor Routes */}
        <Route 
          path="/doctor/login" 
          element={<AuthPortal role="doctor" view="login" />} 
        />
        <Route 
          path="/doctor/register" 
          element={<AuthPortal role="doctor" view="register" />} 
        />

        {/* Hospital Routes */}
        <Route 
          path="/hospital/login" 
          element={<AuthPortal role="hospital_organisation" view="login" />} 
        />
        <Route 
          path="/hospital/register" 
          element={<AuthPortal role="hospital_organisation" view="register" />} 
        />

        {/* Utility / Password Management */}
        <Route 
          path="/user/forgot-password" 
          element={<AuthPortal role="general_user" view="forgot" />} 
        />
        <Route 
          path="/doctor/forgot-password" 
          element={<AuthPortal role="doctor" view="forgot" />} 
        />
        <Route 
          path="/hospital/forgot-password" 
          element={<AuthPortal role="hospital_organisation" view="forgot" />} 
        />


        {/* Password Reset Route with Hash and ID */}
        <Route 
          path="/reset-password/:hash/:id"
          element={<AuthPortal view="reset" />}
        />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/patient/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}