import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import InputField from './ui/InputField';

export default function ResetPasswordView({ onSubmit, onNavigate, loading, initialId, initialHash }) {
  const [id, setId] = useState(initialId || '');
  const [hash, setHash] = useState(initialHash || '');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: id || 'default_id', hash: hash || 'default_hash', newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1 tracking-wide">ID Parameter</label>
          <input type="text" placeholder="id" value={id} onChange={(e) => setId(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1 tracking-wide">Hash Key</label>
          <input type="text" placeholder="password_hash" value={hash} onChange={(e) => setHash(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white" />
        </div>
      </div>
      <InputField label="New Secure Password" type="password" icon={Lock} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2 text-sm">
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Modify Account Password'}
      </button>
    </form>
  );
}