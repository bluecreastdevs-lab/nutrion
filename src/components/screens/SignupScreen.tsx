import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomTextField } from '../common/Inputs';
import { PrimaryButton } from '../common/Buttons';

export const SignupScreen: React.FC = () => {
  const { navigateTo, updateUserProfile } = useApp();
  const [fullName, setFullName] = useState('Gopinath');
  const [email, setEmail] = useState('gopinath@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const handleSignup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName || !email) {
      setError('Please fill in all required fields');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms & Privacy Policy');
      return;
    }
    updateUserProfile({ name: fullName, email });
    navigateTo('PROFILE_SETUP');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14]">
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigateTo('LOGIN')}
          className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
          Create Account 🚀
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Start your personalized AI health & fitness journey.
        </p>

        {/* Form Fields */}
        <form onSubmit={handleSignup} className="mt-6 space-y-3.5">
          <CustomTextField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={setFullName}
            placeholder="Gopinath"
            icon={User}
          />

          <CustomTextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="gopinath@example.com"
            icon={Mail}
          />

          <CustomTextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Create password"
            icon={Lock}
          />

          <CustomTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Repeat password"
            icon={Lock}
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer mt-0.5 ${
                agreed
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                  : 'bg-slate-900 border-slate-700 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <label
              onClick={() => setAgreed(!agreed)}
              className="text-xs text-slate-400 cursor-pointer select-none leading-tight"
            >
              I agree to the <span className="text-emerald-400 font-medium">Terms of Service</span> and{' '}
              <span className="text-emerald-400 font-medium">Privacy Policy</span>
            </label>
          </div>

          {error && <p className="text-xs text-red-400 font-medium pt-1">{error}</p>}

          <div className="pt-3">
            <PrimaryButton type="submit">Create Account</PrimaryButton>
          </div>
        </form>
      </div>

      <div className="text-center pt-6 pb-2">
        <p className="text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => navigateTo('LOGIN')}
            className="text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
