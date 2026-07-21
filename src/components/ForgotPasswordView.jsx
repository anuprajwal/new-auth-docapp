import React, { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import InputField from './ui/InputField';

export default function ForgotPasswordView({ onSubmit, onNavigate, loading }) {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ email }); }} className="space-y-4">
      <p className="text-xs text-slate-500 text-center leading-relaxed">Provide your verified email to request systemic recovery coordinates.</p>
      <InputField label="Registered Email" type="email" icon={Mail} placeholder="registered@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2 text-sm">
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Reset Request'}
      </button>
      <div className="text-center text-xs text-slate-500 pt-2">
        Back to <button type="button" onClick={() => onNavigate('login')} className="text-blue-600 font-bold hover:underline">Authentication Screen</button>
      </div>
    </form>
  );
}