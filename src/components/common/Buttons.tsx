import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 active:scale-[0.98] transition-all duration-150 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 active:scale-[0.98] transition-all duration-150 border border-slate-700/50 flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-5 rounded-2xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  className = '',
  id,
  ariaLabel,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 active:scale-95 transition-all duration-150 border border-slate-700/40 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
