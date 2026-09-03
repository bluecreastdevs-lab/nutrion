import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomTextField } from '../common/Inputs';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';

export const LoginScreen: React.FC = () => {
  const { navigateTo, userProfile, updateUserProfile } = useApp();
  const [email, setEmail] = useState(userProfile.email || 'gopinath@example.com');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    updateUserProfile({ email });
    navigateTo('HOME');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14]">
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigateTo('WELCOME')}
          className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
          Welcome Back 👋
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Continue your journey toward a healthier you.
        </p>

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <CustomTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              setError('');
            }}
            placeholder="gopinath@example.com"
            icon={Mail}
            error={error}
          />

          <CustomTextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            icon={Lock}
          />

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => alert('Password reset link sent to your registered email.')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit">Log In</PrimaryButton>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#070b14] px-3 text-[11px] text-slate-500 uppercase font-medium">or</span>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={() => navigateTo('HOME')}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 border border-slate-700/60 hover:bg-slate-800/80 text-white text-xs font-semibold flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      {/* Signup Navigation Link */}
      <div className="text-center pt-6 pb-2">
        <p className="text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('SIGNUP')}
            className="text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};
