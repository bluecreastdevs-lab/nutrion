import React, { useState } from 'react';
import { Search, Eye, EyeOff, LucideIcon } from 'lucide-react';

interface CustomTextFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: LucideIcon;
  error?: string;
  id?: string;
  disabled?: boolean;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  error,
  id,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-semibold text-slate-300">{label}</label>}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={effectiveType}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[#0f172a]/90 text-white placeholder-slate-500 text-sm rounded-2xl border ${
            error ? 'border-red-500' : 'border-slate-700/60 focus:border-emerald-500'
          } py-3.5 ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-red-400 font-medium pl-1">{error}</p>}
    </div>
  );
};

export const SearchField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}> = ({ value, onChange, placeholder = 'Search Indian foods, meals...', onClear, className = '' }) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0f172a]/90 text-white placeholder-slate-400 text-sm rounded-2xl border border-slate-700/60 focus:border-emerald-500 py-3 pl-10 pr-9 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
};
