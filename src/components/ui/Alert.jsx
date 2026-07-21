import React from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export default function Alert({ type, message }) {
  if (!message) return null;
  
  const isError = type === 'error';
  const bgClass = isError ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-800';
  const Icon = isError ? ShieldAlert : CheckCircle;
  const iconColor = isError ? 'text-red-500' : 'text-emerald-500';

  return (
    <div className={`flex items-start gap-3 border text-sm p-3.5 rounded-xl mb-4 animate-fadeIn ${bgClass}`}>
      <Icon className={`shrink-0 mt-0.5 ${iconColor}`} size={18} />
      <div>{message}</div>
    </div>
  );
}