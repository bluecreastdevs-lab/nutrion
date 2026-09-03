import React from 'react';
import { Droplets, Plus, Sparkles, Check, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const HydrationScreen: React.FC = () => {
  const { navigateTo, waterLiters, addWater, celebrateStreak } = useApp();
  const targetLiters = 3.0;
  const progressPercent = Math.min(100, Math.round((waterLiters / targetLiters) * 100));

  const handleAdd = (liters: number) => {
    addWater(liters);
    celebrateStreak();
  };

  const logs = [
    { time: '08:30 AM', amount: '+500 ml', label: 'Morning Hydration Glass' },
    { time: '11:15 AM', amount: '+250 ml', label: 'Mid-Morning Water' },
    { time: '01:45 PM', amount: '+500 ml', label: 'Post-Lunch Bottle' },
    { time: '04:20 PM', amount: '+550 ml', label: 'Pre-Workout Electrolyte Water' },
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Hydration Tracker"
        subtitle="Stay energized & support metabolism"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Main Water Visualizer Bottle */}
        <div className="bg-gradient-to-b from-[#0e1a2f] to-[#070e1a] border border-cyan-500/30 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          {/* Ambient Cyan Glow */}
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />

          {/* Water Bottle Graphic with Animated Liquid Level */}
          <div className="relative w-36 h-56 rounded-[36px] border-4 border-cyan-400/50 p-2 bg-slate-950/60 flex flex-col justify-end overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            {/* Liquid Fill */}
            <div
              style={{ height: `${progressPercent}%` }}
              className="w-full bg-gradient-to-t from-cyan-600 via-cyan-400 to-teal-300 rounded-[24px] transition-all duration-700 relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.6)]"
            >
              {/* Wave shimmer */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>

            {/* Target marker lines */}
            <div className="absolute top-1/4 right-3 border-t border-cyan-400/40 w-4 text-[9px] text-cyan-300 text-right pr-5">
              2.25L
            </div>
            <div className="absolute top-2/4 right-3 border-t border-cyan-400/40 w-4 text-[9px] text-cyan-300 text-right pr-5">
              1.5L
            </div>
            <div className="absolute top-3/4 right-3 border-t border-cyan-400/40 w-4 text-[9px] text-cyan-300 text-right pr-5">
              0.75L
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-black text-white font-['Outfit']">
                {waterLiters.toFixed(1)}
              </span>
              <span className="text-base font-semibold text-cyan-400">/ 3.0 L</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {progressPercent}% of daily target achieved ({((3.0 - waterLiters) > 0 ? (3.0 - waterLiters).toFixed(1) : 0)} L remaining)
            </p>
          </div>
        </div>

        {/* Quick Action Buttons: +250 ml, +500 ml, +750 ml, Custom Amount */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 block">
            Quick Add
          </span>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleAdd(0.25)}
              className="py-3 px-2 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex flex-col items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-cyan-400" />
              +250 ml
            </button>

            <button
              onClick={() => handleAdd(0.5)}
              className="py-3 px-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex flex-col items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <Droplets className="w-4 h-4 text-cyan-400" />
              +500 ml
            </button>

            <button
              onClick={() => handleAdd(0.75)}
              className="py-3 px-2 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex flex-col items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-cyan-400" />
              +750 ml
            </button>

            <button
              onClick={() => handleAdd(1.0)}
              className="py-3 px-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex flex-col items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-400" />
              Custom
            </button>
          </div>
        </div>

        {/* Daily Timeline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Today's Water Log
            </h4>
            <span className="text-xs text-cyan-400 font-semibold">{logs.length} Entries</span>
          </div>

          <div className="space-y-2">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">{log.label}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {log.time}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400">{log.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
