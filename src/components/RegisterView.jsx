import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import InputField from './ui/InputField';

export default function RegisterView({ onSubmit, onNavigate, loading }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, phone_number: phone, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Username" type="text" icon={User} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <InputField label="Email Address" type="email" icon={Mail} placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Phone Number" type="tel" icon={Phone} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <InputField label="Password" type="password" icon={Lock} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2 text-sm">
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Complete Registration'}
      </button>

      <div className="text-center text-xs text-slate-500 pt-2">
        Already verified? <button type="button" onClick={() => onNavigate('login')} className="text-blue-600 font-bold hover:underline">Sign In</button>
      </div>
    </form>
  );
}