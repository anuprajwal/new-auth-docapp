// import React, { useState } from 'react';
// import { Lock, User } from 'lucide-react';
// import { setAuthCookie } from '../utils/cookieHelper';

// import RoleTabs from './ui/RoleTabs';
// import Alert from './ui/Alert';
// import LoginView from './LoginView';
// import RegisterView from './RegisterView';
// import ForgotPasswordView from './ForgotPasswordView';
// import ResetPasswordView from './ResetPasswordView';


// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function AuthPortal() {
//   const [view, setView] = useState('login'); // login | register | forgot | reset
//   const [role, setRole] = useState('general_user');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
  
//   // Transition context keys
//   const [contextData, setContextData] = useState({ id: '', hash: '' });

//   const resetMessages = () => { setError(''); setSuccess(''); };
  
//   const handleViewChange = (newView) => { resetMessages(); setView(newView); };

//   const onLogin = async (payload) => {
//     setLoading(true); resetMessages();
//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...payload, role }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Invalid credentials.');
      
//       if (data.token) setAuthCookie('auth_token', data.token, 7);
//       setSuccess('Login successful! Transporting to secure panel...');
//     } catch (err) { setError(err.message); } 
//     finally { setLoading(false); }
//   };

//   const onRegister = async (payload) => {
//     setLoading(true); resetMessages();
//     try {
//       const response = await fetch(`${BASE_URL}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...payload, role }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Registration failed.');

//       setSuccess('Account generated successfully! Forwarding to login...');
//       setTimeout(() => handleViewChange('login'), 1500);
//     } catch (err) { setError(err.message); } 
//     finally { setLoading(false); }
//   };

//   const onForgot = async (payload) => {
//     setLoading(true); resetMessages();
//     try {
//       const response = await fetch(`${BASE_URL}/forgot-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...payload, role }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Forgot request failed.');

//       setSuccess('Verification tokens obtained.');
//       setContextData({ id: data.id || '', hash: data.password_hash || '' });
//       setView('reset');
//     } catch (err) { setError(err.message); } 
//     finally { setLoading(false); }
//   };

//   const onReset = async ({ id, hash, newPassword }) => {
//     setLoading(true); resetMessages();
//     try {
//       const response = await fetch(`${BASE_URL}/change-forgoten-password/${hash}/${id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to reconfigure password.');

//       setSuccess('Password updated successfully! Re-routing...');
//       setTimeout(() => handleViewChange('login'), 2000);
//     } catch (err) { setError(err.message); } 
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-600 p-4 relative overflow-hidden">
//       <div className="absolute top-10 right-10 text-white/10"><Lock size={120} /></div>
//       <div className="absolute bottom-10 left-10 text-white/10"><User size={120} /></div>

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 border border-blue-100">
//             <Lock size={26} className="stroke-[2.5]" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Hospital Management System</h2>
//           <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
//             {role === 'general_user' ? 'Patient Portal' : role === 'doctor' ? 'Doctor Portal' : 'Admin Operations'}
//           </p>
//         </div>

//         {view !== 'reset' && <RoleTabs currentRole={role} onRoleChange={setRole} />}
        
//         <Alert type={error ? 'error' : 'success'} message={error || success} />

//         {view === 'login' && <LoginView onSubmit={onLogin} onNavigate={handleViewChange} loading={loading} currentRole={role} />}
//         {view === 'register' && <RegisterView onSubmit={onRegister} onNavigate={handleViewChange} loading={loading} />}
//         {view === 'forgot' && <ForgotPasswordView onSubmit={onForgot} onNavigate={handleViewChange} loading={loading} />}
//         {view === 'reset' && <ResetPasswordView onSubmit={onReset} onNavigate={handleViewChange} loading={loading} initialId={contextData.id} initialHash={contextData.hash} />}
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
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

  const resetMessages = () => { setError(''); setSuccess(''); };
  const handleViewChange = (newView) => { resetMessages(); setView(newView); };

  // const onLogin = async (payload) => {
  //   setLoading(true); resetMessages();
  //   try {
  //     const response = await fetch(`${BASE_URL}/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ ...payload, role }),
  //     });
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message || 'Invalid credentials.');
      
  //     // 1. Save cookie across all subdomains
  //     if (data.token) {
  //       setAuthCookie('auth_token', data.token, 7);
  //     }
      
  //     setSuccess('Login successful! Transporting to secure panel...');

  //     // 2. Handle cross-subdomain redirection after a brief delay so they see the success message
  //     setTimeout(() => {
  //       if (role === 'general_user') {
  //         window.location.href = 'https://users.docapp.co.in';
  //       } else if (role === 'doctor') {
  //         window.location.href = 'https://doctors.docapp.co.in';
  //       } else if (role === 'hospital_admin') {
  //         window.location.href = 'https://hospitals.docapp.co.in';
  //       }
  //     }, 1200);

  //   } catch (err) { 
  //     setError(err.message); 
  //   } finally { 
  //     setLoading(false); 
  //   }
  // };


  const onLogin = async (payload) => {
  setLoading(true); 
  resetMessages();
  
  console.log("=== [LOGIN START] ===");
  console.log("Selected Role:", role);
  console.log("Payload being sent:", payload);

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, role }),
    });

    console.log("HTTP Response Status:", response.status);
    const data = await response.json();
    console.log("Full Backend JSON Response Data:", data);

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials.');
    }
    
    // DEBUGGING THE BACKEND TOKEN ISSUE
    if (!data.token) {
      console.warn("⚠️ WARNING: 'data.token' is missing or undefined from the backend response!");
      console.log("Check if clientType is 'web': Current clientType is ->", data.clientType);
      
      // If your backend sets the cookie via Set-Cookie headers directly for 'web', 
      // it won't be visible in javascript data.token. Let's check if document.cookie updated:
      console.log("Current document.cookie state:", document.cookie);
    } else {
      console.log("✅ Token received successfully:", data.token.substring(0, 15) + "...");
      
      // Attempting to set cookie
      console.log("Calling setAuthCookie...");
      setAuthCookie('auth_token', data.token, 7);
      
      console.log("Cookies available immediately after setting:", document.cookie);
    }
    
    setSuccess('Login successful! Transporting to secure panel...');

    // Subdomain Redirection Debugging
    console.log("Preparing redirection based on role...");
    setTimeout(() => {
      let targetUrl = '';
      if (role === 'general_user') {
        targetUrl = 'https://users.docapp.co.in';
      } else if (role === 'doctor') {
        targetUrl = 'https://doctors.docapp.co.in';
      } else if (role === 'hospital_admin') {
        targetUrl = 'https://hospitals.docapp.co.in';
      }

      console.log(`🚀 Redirecting now to: ${targetUrl} for role: ${role}`);
      
      // Uncomment this line when you want to execute the redirect. 
      // Keeping it commented out or visible helps you read the logs first!
      window.location.href = targetUrl;
    }, 2000); // Bumped to 2 seconds so you have time to read the console logs

  } catch (err) { 
    console.error("❌ Login Error Caught:", err.message);
    setError(err.message); 
  } finally { 
    console.log("=== [LOGIN END] ===");
    setLoading(false); 
  }
};
  const onRegister = async (payload) => {
    setLoading(true); resetMessages();
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed.');

      setSuccess('Account generated successfully! Forwarding to login...');
      setTimeout(() => handleViewChange('login'), 1500);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  const onForgot = async (payload) => {
    setLoading(true); resetMessages();
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Forgot request failed.');

      setSuccess('Verification tokens obtained.');
      setContextData({ id: data.id || '', hash: data.password_hash || '' });
      setView('reset');
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  const onReset = async ({ id, hash, newPassword }) => {
    setLoading(true); resetMessages();
    try {
      const response = await fetch(`${BASE_URL}/change-forgoten-password/${hash}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reconfigure password.');

      setSuccess('Password updated successfully! Re-routing...');
      setTimeout(() => handleViewChange('login'), 2000);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
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

        {view !== 'reset' && <RoleTabs currentRole={role} onRoleChange={setRole} />}
        
        <Alert type={error ? 'error' : 'success'} message={error || success} />

        {view === 'login' && <LoginView onSubmit={onLogin} onNavigate={handleViewChange} loading={loading} currentRole={role} />}
        {view === 'register' && <RegisterView onSubmit={onRegister} onNavigate={handleViewChange} loading={loading} />}
        {view === 'forgot' && <ForgotPasswordView onSubmit={onForgot} onNavigate={handleViewChange} loading={loading} />}
        {view === 'reset' && <ResetPasswordView onSubmit={onReset} onNavigate={handleViewChange} loading={loading} initialId={contextData.id} initialHash={contextData.hash} />}
      </div>
    </div>
  );
}