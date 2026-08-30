// src/components/AuthPortal.jsx

import React, { useState, useEffect } from 'react';
import { Lock, User } from 'lucide-react';
import { setAuthCookie } from '../utils/cookieHelper';

import RoleTabs from './ui/RoleTabs';
import Alert from './ui/Alert';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import ForgotPasswordView from './ForgotPasswordView';
import ResetPasswordView from './ResetPasswordView';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AuthPortal() {
  const [view, setView] = useState('login'); // login | register | forgot | reset
  const [role, setRole] = useState('general_user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [contextData, setContextData] = useState({ id: '', hash: '' });

  // Robust path extractor for bcrypt hashes and IDs
  useEffect(() => {
    // 1. Decode the full raw pathname (handles %24 -> $)
    const fullPath = decodeURIComponent(window.location.pathname);
    
    // 2. Extract segments cleanly by splitting on forward slashes
    const segments = fullPath.split('/').filter(Boolean);

    // 3. Match format: /:hash/:id or /api/auth/:hash/:id
    if (segments.length >= 2) {
      const idCandidate = segments[segments.length - 1];
      const hashCandidate = segments[segments.length - 2];

      // Bcrypt hash signatures always start with $2a$, $2b$, or $2y$
      if (idCandidate && hashCandidate && (hashCandidate.startsWith('$2b$') || hashCandidate.startsWith('$2a$') || hashCandidate.startsWith('$2y$'))) {
        setContextData({
          id: idCandidate,
          hash: hashCandidate
        });
        setView('reset');
      }
    }
  }, []);

  const resetMessages = () => { setError(''); setSuccess(''); };
  
  const handleViewChange = (newView) => {
    resetMessages();
    if (newView === 'login') {
      window.history.pushState({}, '', '/');
    }
    setView(newView);
  };

  const onLogin = async (payload) => {
    setLoading(true); 
    resetMessages();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials.');
      }
      
      if (data.token) {
        setAuthCookie('auth_token', data.token, 7);
      }
      
      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        let targetUrl = 'https://users.docapp.co.in';
        if (role === 'doctor') {
          targetUrl = 'https://doctors.docapp.co.in';
        } else if (role === 'hospital_organisation') {
          targetUrl = 'https://hospitals.docapp.co.in';
        }
        window.location.href = targetUrl;
      }, 500);

    } catch (err) { 
      setError(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const onRegister = async (payload) => {
    setLoading(true); 
    resetMessages();
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed.');

      setSuccess('Account created successfully! Forwarding to login...');
      setTimeout(() => handleViewChange('login'), 1500);
    } catch (err) { 
      setError(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const onForgot = async (payload) => {
    setLoading(true); 
    resetMessages();
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to process request.');

      return true;
    } catch (err) { 
      setError(err.message); 
      return false;
    } finally { 
      setLoading(false); 
    }
  };

  const onReset = async ({ newPassword }) => {
    setLoading(true); 
    resetMessages();
    const { id, hash } = contextData;

    try {
      // Send the hash and id extracted from URL parameters in the endpoint path
      const targetEndpoint = `${BASE_URL}/change-forgoten-password/${encodeURIComponent(hash)}/${encodeURIComponent(id)}`;
      
      const response = await fetch(targetEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reset password. Link may be expired.');

      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        handleViewChange('login');
      }, 2000);
    } catch (err) { 
      setError(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-600 p-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-white/10"><Lock size={120} /></div>
      <div className="absolute bottom-10 left-10 text-white/10"><User size={120} /></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 border border-blue-100">
            <Lock size={26} className="stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Hospital Management System</h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
            {role === 'general_user' ? 'Patient Portal' : role === 'doctor' ? 'Doctor Portal' : 'Admin Operations'}
          </p>
        </div>

        {/* Hide role tabs when resetting password */}
        {view !== 'reset' && <RoleTabs currentRole={role} onRoleChange={setRole} />}
        
        <Alert type={error ? 'error' : 'success'} message={error || success} />

        {view === 'login' && <LoginView onSubmit={onLogin} onNavigate={handleViewChange} loading={loading} currentRole={role} />}
        {view === 'register' && <RegisterView onSubmit={onRegister} onNavigate={handleViewChange} loading={loading} />}
        {view === 'forgot' && <ForgotPasswordView onSubmit={onForgot} onNavigate={handleViewChange} loading={loading} />}
        {view === 'reset' && <ResetPasswordView onSubmit={onReset} onNavigate={handleViewChange} loading={loading} />}
      </div>
    </div>
  );
}