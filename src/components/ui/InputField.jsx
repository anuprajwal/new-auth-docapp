import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({ label, type, icon: Icon, value, onChange, placeholder, required = true, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5 tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
        <input 
          type={inputType} 
          required={required} 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange}
          className="w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}