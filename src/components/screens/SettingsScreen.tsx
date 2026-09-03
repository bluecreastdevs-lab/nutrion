import React, { useState } from 'react';
import {
  Moon,
  Globe,
  Bell,
  Ruler,
  Lock,
  Shield,
  Target,
  Utensils,
  Activity,
  Download,
  Trash2,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Database,
  FileCode2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const SettingsScreen: React.FC = () => {
  const { navigateTo, isOffline, setIsOffline, setShowCodeExport } = useApp();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState<'Metric (kg, cm)' | 'Imperial (lb, in)'>('Metric (kg, cm)');
  const [language, setLanguage] = useState<'English' | 'Tamil'>('English');

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Settings"
        subtitle="App preferences & account management"
        showBack
        onBack={() => navigateTo('PROFILE')}
      />

      <div className="px-4 space-y-4 text-xs">
        {/* SECTION 1: ACCOUNT */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400 px-1 block tracking-wider">
            Account & Security
          </span>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
            <div
              onClick={() => navigateTo('PROFILE_SETUP')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-white">Profile Information</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => alert('Password change link sent to email.')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-white">Change Password</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* SECTION 2: PREFERENCES */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400 px-1 block tracking-wider">
            App Preferences
          </span>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Moon className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-semibold text-white block">Dark Mode</span>
                  <span className="text-[10px] text-slate-400">AMOLED high-contrast theme</span>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-emerald-400 cursor-pointer"
              >
                {darkMode ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-slate-500" />}
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">Language</span>
              </div>
              <button
                onClick={() => setLanguage(language === 'English' ? 'Tamil' : 'English')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-emerald-400 cursor-pointer"
              >
                {language === 'English' ? 'English (EN)' : 'தமிழ் (Tamil)'}
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Push Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className="text-emerald-400 cursor-pointer"
              >
                {notifications ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-slate-500" />}
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-white">Measurement Units</span>
              </div>
              <span className="text-slate-400 font-medium">{units}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: HEALTH SETTINGS */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400 px-1 block tracking-wider">
            Health & Goals
          </span>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
            <div
              onClick={() => navigateTo('GOALS')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Goal: Muscle Gain</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => navigateTo('PREFERENCES')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">Food & Regional Cuisines</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Offline Mode Room Database Simulator */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-semibold text-white block">Offline Room Sync Mode</span>
                  <span className="text-[10px] text-slate-400">Simulate offline local storage</span>
                </div>
              </div>
              <button
                onClick={() => setIsOffline(!isOffline)}
                className="text-emerald-400 cursor-pointer"
              >
                {isOffline ? <ToggleRight className="w-7 h-7 text-amber-400" /> : <ToggleLeft className="w-7 h-7 text-slate-500" />}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: DATA & EXPORT */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400 px-1 block tracking-wider">
            Data Management
          </span>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
            <div
              onClick={() => setShowCodeExport(true)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer text-emerald-400 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <FileCode2 className="w-4 h-4" />
                <span>Export Native Android Jetpack Compose Source</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>

            <div
              onClick={() => alert('Data exported as JSON file to downloads.')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-white">Export My Personal Health Data</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => {
                if (confirm('Are you sure you want to reset all data?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="p-3.5 flex items-center justify-between hover:bg-red-950/20 text-red-400 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4" />
                <span className="font-semibold">Clear Local Cache & Reset</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>

        {/* SECTION 5: SUPPORT */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400 px-1 block tracking-wider">
            Support
          </span>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
            <div
              onClick={() => alert('NutriFit AI Help Center: Email support@nutrifitai.in')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-white">Help Center & FAQ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => navigateTo('AI_ASSISTANT')}
              className="p-3.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-white">Chat with AI Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="text-center pt-2 pb-4 text-slate-500 text-[10px]">
          NutriFit AI v2.4.0 (Build 2026.09) · Android 14+ Jetpack Compose Ready
        </div>
      </div>
    </div>
  );
};
