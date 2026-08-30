import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import InputField from './ui/InputField';

export default function ResetPasswordView({ onSubmit, onNavigate, loading }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }
    setValidationError('');
    onSubmit({ newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-slate-500 text-center leading-relaxed">
        Enter your new password below to reset your account access.
      </p>

      {validationError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
          {validationError}
        </div>
      )}

      <InputField
        label="New Password"
        type="password"
        icon={Lock}
        placeholder="••••••••"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <InputField
        label="Confirm New Password"
        type="password"
        icon={Lock}
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2 text-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save New Password'}
      </button>

      <div className="text-center text-xs text-slate-500 pt-2">
        Cancel and return to{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="text-blue-600 font-bold hover:underline"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}