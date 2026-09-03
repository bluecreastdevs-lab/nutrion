import React, { useState } from 'react';
import { Compass, Sparkles, X, Layers, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AndroidStatusBar, AndroidGestureNavBar } from './AndroidSystemBars';
import { BottomNavigation } from './Navigation';
import { DeviceType, ScreenType } from '../../types';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceType, setDeviceType, currentScreen, navigateTo } = useApp();
  const [showMobileNavDrawer, setShowMobileNavDrawer] = useState(false);

  // Screen dimensions for desktop simulator
  const getFrameWidth = (type: DeviceType) => {
    switch (type) {
      case 'galaxy':
        return 'md:w-[360px] md:h-[780px]';
      case 'pixel8':
        return 'md:w-[393px] md:h-[840px]';
      case 'promax':
        return 'md:w-[430px] md:h-[890px]';
      case 'tablet':
        return 'md:w-[768px] md:h-[920px]';
      case 'fullscreen':
        return 'md:w-full md:max-w-2xl md:min-h-[90vh]';
    }
  };

  // Screens that should NOT show the bottom nav (e.g., full-screen splash, onboarding, camera, workout timer)
  const hideBottomNavScreens: ScreenType[] = [
    'SPLASH',
    'WELCOME',
    'LOGIN',
    'SIGNUP',
    'PROFILE_SETUP',
    'GOALS',
    'PREFERENCES',
    'AI_FOOD_SCANNER',
    'SCAN_RESULT',
    'WORKOUT_TIMER',
    'WORKOUT_DETAIL',
  ];

  const shouldShowBottomNav = !hideBottomNavScreens.includes(currentScreen);

  // Quick switcher screens list for testing all flows
  const quickScreens: { name: string; screen: ScreenType; category: string }[] = [
    { name: 'Home', screen: 'HOME', category: 'Main' },
    { name: 'Food Diary', screen: 'FOOD_DIARY', category: 'Diet' },
    { name: 'Add Food', screen: 'ADD_FOOD', category: 'Diet' },
    { name: 'Food Scanner', screen: 'AI_FOOD_SCANNER', category: 'Diet' },
    { name: 'Scan Result', screen: 'SCAN_RESULT', category: 'Diet' },
    { name: 'Meal Planner', screen: 'AI_MEAL_PLANNER', category: 'Diet' },
    { name: 'Workout Plan', screen: 'AI_WORKOUT_PLAN', category: 'Workout' },
    { name: 'Workout Detail', screen: 'WORKOUT_DETAIL', category: 'Workout' },
    { name: 'Workout Timer', screen: 'WORKOUT_TIMER', category: 'Workout' },
    { name: 'Activity & Steps', screen: 'ACTIVITY', category: 'Fitness' },
    { name: 'Hydration', screen: 'HYDRATION', category: 'Fitness' },
    { name: 'Sleep Tracker', screen: 'SLEEP', category: 'Fitness' },
    { name: 'Intermittent Fasting', screen: 'FASTING', category: 'Fitness' },
    { name: 'Progress', screen: 'PROGRESS', category: 'Analytics' },
    { name: 'AI Health Analysis', screen: 'AI_PROGRESS_ANALYSIS', category: 'Analytics' },
    { name: 'AI Coach', screen: 'AI_ASSISTANT', category: 'AI' },
    { name: 'Voice Coach', screen: 'VOICE_ASSISTANT', category: 'AI' },
    { name: 'Streaks', screen: 'STREAKS', category: 'Gamify' },
    { name: 'Challenges', screen: 'CHALLENGES', category: 'Gamify' },
    { name: 'Reports', screen: 'REPORTS', category: 'Analytics' },
    { name: 'Profile', screen: 'PROFILE', category: 'Settings' },
    { name: 'Settings', screen: 'SETTINGS', category: 'Settings' },
    { name: 'Splash Screen', screen: 'SPLASH', category: 'Auth' },
    { name: 'Welcome', screen: 'WELCOME', category: 'Auth' },
    { name: 'Login', screen: 'LOGIN', category: 'Auth' },
    { name: 'Signup', screen: 'SIGNUP', category: 'Auth' },
    { name: 'Profile Setup', screen: 'PROFILE_SETUP', category: 'Auth' },
    { name: 'Goals', screen: 'GOALS', category: 'Auth' },
    { name: 'Preferences', screen: 'PREFERENCES', category: 'Auth' },
  ];

  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-0 md:p-4 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden select-none">
      {/* Top Device & Screen Switcher Bar (Visible on Desktop/Laptop screens only) */}
      <div className="hidden md:flex w-full max-w-5xl mb-3 items-center justify-between gap-2 px-3 py-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-lg shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">NutriFit AI</span>
          </div>

          {/* Device Dimension Selectors */}
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setDeviceType('galaxy')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                deviceType === 'galaxy' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Galaxy (360dp)
            </button>
            <button
              onClick={() => setDeviceType('pixel8')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                deviceType === 'pixel8' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pixel 8 (393dp)
            </button>
            <button
              onClick={() => setDeviceType('promax')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                deviceType === 'promax' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Large (430dp)
            </button>
            <button
              onClick={() => setDeviceType('tablet')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                deviceType === 'tablet' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tablet (768dp)
            </button>
            <button
              onClick={() => setDeviceType('fullscreen')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                deviceType === 'fullscreen' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full
            </button>
          </div>
        </div>

        {/* Quick Screen Nav Carousel for Desktop */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-md py-0.5 no-scrollbar text-[11px]">
          <span className="text-slate-500 shrink-0 text-[10px] uppercase font-bold flex items-center gap-1 pl-1">
            <Compass className="w-3 h-3" /> Quick Nav:
          </span>
          {quickScreens.slice(0, 10).map((s) => (
            <button
              key={s.screen}
              onClick={() => navigateTo(s.screen)}
              className={`px-2 py-0.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === s.screen
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Android Mobile Viewport Container
          - On mobile: 100% full screen edge-to-edge (w-full h-full, border-0, rounded-none)
          - On desktop: Centered Android device bezel simulation
      */}
      <div
        className={`w-full h-full max-w-md md:max-w-none ${getFrameWidth(deviceType)} md:max-h-[92vh] bg-[#070b14] md:rounded-[40px] md:border-[8px] md:border-slate-900 md:shadow-[0_25px_70px_rgba(0,0,0,0.85)] md:ring-1 md:ring-slate-800 flex flex-col overflow-hidden relative transition-all duration-200`}
      >
        {/* Android Punch Hole Camera (only on desktop bezel simulator) */}
        <div className="hidden md:block absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-slate-800 z-50 pointer-events-none" />

        {/* Android System Status Bar with live clock */}
        <AndroidStatusBar />

        {/* Main Application Scroll Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#070b14] smooth-touch-scroll overscroll-contain">
          {children}
        </main>

        {/* Material 3 Android Bottom Navigation Bar */}
        {shouldShowBottomNav && <BottomNavigation />}

        {/* Android System Gesture Pill */}
        <AndroidGestureNavBar />

        {/* Subtle Floating Screen Switcher for Mobile Testers (non-intrusive bottom corner pill) */}
        <div className="md:hidden absolute top-2 right-2 z-50">
          <button
            onClick={() => setShowMobileNavDrawer(true)}
            className="w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-400 hover:text-emerald-400 flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer opacity-40 hover:opacity-100"
            title="Switch Screen"
            aria-label="Switch Screen"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Screen Switcher Bottom Sheet Modal */}
      {showMobileNavDrawer && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-4 max-h-[75vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Select Screen to Preview</span>
              </div>
              <button
                onClick={() => setShowMobileNavDrawer(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 smooth-touch-scroll">
              <div className="grid grid-cols-2 gap-2">
                {quickScreens.map((s) => (
                  <button
                    key={s.screen}
                    onClick={() => {
                      navigateTo(s.screen);
                      setShowMobileNavDrawer(false);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                      currentScreen === s.screen
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 ml-1">{s.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
