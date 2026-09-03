import React, { useState } from 'react';
import { User, Target, Utensils, Camera, Settings, ChevronRight, Award, Flame, LogOut, FileCode2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const ProfileScreen: React.FC = () => {
  const { navigateTo, userProfile, setShowCodeExport } = useApp();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="My Profile"
        showBack
        onBack={() => navigateTo('HOME')}
        actions={
          <button
            onClick={() => navigateTo('SETTINGS')}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        {/* User Card */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0b1120] border border-emerald-500/30 rounded-3xl p-5 shadow-xl flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white tracking-tight font-['Outfit']">
              {userProfile.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {userProfile.goal}
              </span>
              <span className="text-xs text-slate-400">Chennai, IN</span>
            </div>
          </div>
        </div>

        {/* 4 Body Metrics Display Grid: Height, Weight, Age, Activity */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Height</span>
            <span className="text-base font-bold text-white font-['Outfit'] mt-0.5 block">
              {userProfile.heightCm} cm
            </span>
            <span className="text-[10px] text-slate-400">5 ft 10 in</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Weight</span>
            <span className="text-base font-bold text-white font-['Outfit'] mt-0.5 block">
              {userProfile.weightKg} kg
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">-1.2 kg this month</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Age</span>
            <span className="text-base font-bold text-white font-['Outfit'] mt-0.5 block">
              {userProfile.age} years
            </span>
            <span className="text-[10px] text-slate-400">{userProfile.gender}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Activity</span>
            <span className="text-base font-bold text-emerald-400 font-['Outfit'] mt-0.5 block truncate">
              {userProfile.activityLevel}
            </span>
            <span className="text-[10px] text-slate-400">3-5 workouts/wk</span>
          </div>
        </div>

        {/* Buttons List: Edit Profile, My Goals, Food Preferences, Progress Photos */}
        <div className="space-y-2">
          <button
            onClick={() => navigateTo('PROFILE_SETUP')}
            className="w-full p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-white active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">Edit Profile</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => navigateTo('GOALS')}
            className="w-full p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-white active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">My Goals</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => navigateTo('PREFERENCES')}
            className="w-full p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-white active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">Food Preferences & Regional Cuisines</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => setShowPhotoModal(true)}
            className="w-full p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-white active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">Progress Photos (3 Uploaded)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* Android Studio Kotlin Code Exporter button */}
          <button
            onClick={() => setShowCodeExport(true)}
            className="w-full p-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-between text-emerald-300 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block">Android Studio Kotlin Code</span>
                <span className="text-[10px] text-slate-400">View & export native Jetpack Compose files</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-emerald-500/30 px-2 py-1 rounded-lg">Export</span>
          </button>
        </div>

        {/* Progress Photos Modal */}
        {showPhotoModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1120] border border-slate-700 rounded-3xl p-5 w-full max-w-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-purple-400" />
                  Monthly Transformation Photos
                </h3>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80"
                    alt="Week 1"
                    className="w-full h-24 object-cover"
                  />
                  <span className="text-[10px] text-center block py-1 bg-slate-900 text-slate-400">
                    Week 1 (73.7kg)
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80"
                    alt="Week 2"
                    className="w-full h-24 object-cover"
                  />
                  <span className="text-[10px] text-center block py-1 bg-slate-900 text-slate-400">
                    Week 2 (73.1kg)
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-emerald-500/60 ring-1 ring-emerald-500">
                  <img
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80"
                    alt="Week 4"
                    className="w-full h-24 object-cover"
                  />
                  <span className="text-[10px] text-center block py-1 bg-emerald-950 text-emerald-300 font-bold">
                    Week 4 (72.5kg)
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Photo upload simulator: Uploaded new check-in picture.');
                  setShowPhotoModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                + Add Today's Check-in Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
