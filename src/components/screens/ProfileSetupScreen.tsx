import React, { useState } from 'react';
import { Camera, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomTextField } from '../common/Inputs';
import { PrimaryButton } from '../common/Buttons';

export const ProfileSetupScreen: React.FC = () => {
  const { navigateTo, userProfile, updateUserProfile } = useApp();
  const [name, setName] = useState(userProfile.name || 'Gopinath');
  const [age, setAge] = useState(userProfile.age ? String(userProfile.age) : '23');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(userProfile.gender || 'Male');
  const [height, setHeight] = useState(userProfile.heightCm ? String(userProfile.heightCm) : '178');
  const [weight, setWeight] = useState(userProfile.weightKg ? String(userProfile.weightKg) : '72.5');

  const handleNext = () => {
    updateUserProfile({
      name,
      age: Number(age) || 23,
      gender,
      heightCm: Number(height) || 178,
      weightKg: Number(weight) || 72.5,
    });
    navigateTo('GOALS');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14]">
      <div>
        {/* Top bar with Step Counter */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateTo('WELCOME')}
            className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 1 of 4
          </span>
        </div>

        {/* Progress indicator bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
          <div className="w-1/4 h-full bg-emerald-400 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
          Profile Setup
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Tell us about yourself so NutriFit AI can calibrate your BMR and macros accurately.
        </p>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center my-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500/60 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <img
                src={userProfile.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button
              type="button"
              onClick={() => alert('Photo gallery selector: selected Gopinath portrait.')}
              className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg border-2 border-[#070b14] cursor-pointer active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Tap to change profile picture</span>
        </div>

        {/* Fields */}
        <div className="space-y-3.5">
          <CustomTextField
            label="Your Name"
            value={name}
            onChange={setName}
            placeholder="Gopinath"
          />

          <div className="grid grid-cols-2 gap-3">
            <CustomTextField
              label="Age"
              type="number"
              value={age}
              onChange={setAge}
              placeholder="23"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
              <div className="flex rounded-2xl bg-[#0f172a] p-1 border border-slate-700/60">
                {(['Male', 'Female'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      gender === g
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CustomTextField
              label="Height (cm)"
              type="number"
              value={height}
              onChange={setHeight}
              placeholder="178"
            />

            <CustomTextField
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={setWeight}
              placeholder="72.5"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <PrimaryButton onClick={handleNext}>
          Next: Select Goals
          <ArrowRight className="w-4 h-4" />
        </PrimaryButton>
      </div>
    </div>
  );
};
