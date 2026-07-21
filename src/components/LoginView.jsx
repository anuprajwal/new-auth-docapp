import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import InputField from './ui/InputField';

export default function LoginView({ onSubmit, onNavigate, loading, currentRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Email Address" type="email" icon={Mail} placeholder="name@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" icon={Lock} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div className="flex items-center justify-between text-xs font-semibold pt-1">
        <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
          <input type="checkbox" className="rounded text-blue-600 border-slate-300 w-4 h-4" />
          Remember me
        </label>
        <button type="button" onClick={() => onNavigate('forgot')} className="text-blue-600 hover:underline">Forgot Password?</button>
      </div>

      <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition active:scale-[0.99] disabled:opacity-50 flex justify-center items-center gap-2 text-sm">
        {loading ? <Loader2 className="animate-spin" size={18} /> : `Sign In`}
      </button>

      <div className="text-center text-xs text-slate-500 pt-2">
        Don't have an account? <button type="button" onClick={() => onNavigate('register')} className="text-blue-600 font-bold hover:underline">Create one</button>
      </div>
    </form>
  );
}