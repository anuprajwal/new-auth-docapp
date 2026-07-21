import React from 'react';

export default function RoleTabs({ currentRole, onRoleChange }) {
  const roles = [
    { id: 'general_user', label: 'Patient' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'organisation', label: 'Admin' }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-medium text-slate-600">
      {roles.map((role) => (
        <button 
          key={role.id}
          type="button"
          className={`py-2 rounded-lg transition-all ${currentRole === role.id ? 'bg-white text-blue-600 shadow-sm font-bold' : 'hover:bg-slate-200/50'}`}
          onClick={() => onRoleChange(role.id)}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
}