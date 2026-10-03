// import React from 'react'
// import AuthPortal from './components/AuthPortal'

// export default function App() {
//   return (
//     <AuthPortal />
//   )
// }


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPortal from './components/AuthPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/patient/login" replace />} />

        {/* 1 & 2: Patient Routes */}
        <Route 
          path="/patient/login" 
          element={<AuthPortal defaultRole="general_user" defaultView="login" />} 
        />
        <Route 
          path="/patient/register" 
          element={<AuthPortal defaultRole="general_user" defaultView="register" />} 
        />

        {/* 3 & 4: Doctor Routes */}
        <Route 
          path="/doctor/login" 
          element={<AuthPortal defaultRole="doctor" defaultView="login" />} 
        />
        <Route 
          path="/doctor/register" 
          element={<AuthPortal defaultRole="doctor" defaultView="register" />} 
        />

        {/* 5 & 6: Hospital Routes */}
        <Route 
          path="/hospital/login" 
          element={<AuthPortal defaultRole="hospital_organisation" defaultView="login" />} 
        />
        <Route 
          path="/hospital/register" 
          element={<AuthPortal defaultRole="hospital_organisation" defaultView="register" />} 
        />

        {/* Shared / Dynamic Support Routes */}
        <Route 
          path="/forgot-password" 
          element={<AuthPortal defaultView="forgot" />} 
        />
        {/* Password Reset Route (supports hash/id params in path) */}
        <Route 
          path="/reset-password/*" 
          element={<AuthPortal defaultView="reset" />} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/patient/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}