import React, { useEffect } from 'react';
import { Sparkles, Dumbbell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Allow user to click or auto-advance
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div
      onClick={() => navigateTo('WELCOME')}
      className="min-h-full h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#070b14] via-[#091224] to-[#040711] text-center select-none cursor-pointer relative overflow-hidden"
    >
      {/* Ambient Green Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-full pt-8" />

      {/* Center Logo & Branding */}
      <div className="flex flex-col items-center relative z-10">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-300 p-[2px] shadow-[0_0_40px_rgba(16,185,129,0.4)] mb-6 animate-pulse">
          <div className="w-full h-full bg-[#070b14] rounded-[22px] flex items-center justify-center relative">
            <Dumbbell className="w-10 h-10 text-emerald-400" />
            <Sparkles className="w-5 h-5 text-emerald-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white font-['Outfit'] flex items-center gap-1">
          NUTRIFIT <span className="text-emerald-400">AI</span>
        </h1>
        <p className="text-xs font-semibold tracking-wider uppercase text-emerald-400/90 mt-2">
          AI-Powered Nutrition & Fitness Tracker
        </p>
        <p className="text-slate-400 text-xs mt-3 max-w-xs leading-relaxed">
          Your intelligent Indian meal planner, macro coach, and workout companion
        </p>
      </div>

      {/* Animated Loading Indicator */}
      <div className="w-full pb-8 flex flex-col items-center gap-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[11px] text-slate-500 tracking-wide">Tap anywhere to start</span>
      </div>
    </div>
  );
};
