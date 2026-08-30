import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import InputField from './ui/InputField';

export default function ForgotPasswordView({ onSubmit, onNavigate, loading }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const success = await onSubmit({ email });
    if (success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 py-3">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Check Your Email</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          We have sent a password reset link to <strong className="text-slate-700">{email}</strong>. Please check your inbox and click the link to reset your password.
        </p>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
          >
            <ArrowLeft size={16} /> Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-slate-500 text-center leading-relaxed">
        Provide your registered email address to receive a password reset link.
      </p>
      <InputField
        label="Registered Email"
        type="email"
        icon={Mail}
        placeholder="registered@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2 text-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Reset Request'}
      </button>
      <div className="text-center text-xs text-slate-500 pt-2">
        Remember your password?{' '}
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