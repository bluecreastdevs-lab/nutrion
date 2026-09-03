import React from 'react';
import { Footprints, MapPin, Clock, Flame, ChevronRight, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const ActivityScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const weeklySteps = [
    { day: 'Mon', steps: 8420, heightPct: 84 },
    { day: 'Tue', steps: 9100, heightPct: 91 },
    { day: 'Wed', steps: 6240, heightPct: 62, isToday: true },
    { day: 'Thu', steps: 7800, heightPct: 78 },
    { day: 'Fri', steps: 10400, heightPct: 100 },
    { day: 'Sat', steps: 5900, heightPct: 59 },
    { day: 'Sun', steps: 7100, heightPct: 71 },
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Activity Tracker"
        subtitle="Daily movement, steps & cardio"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Main Step Metric Hero */}
        <div className="bg-gradient-to-br from-amber-950/40 via-[#111827] to-[#0a0f1d] border border-amber-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Footprints className="w-4 h-4" /> Daily Step Count
            </span>
            <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              62% Completed
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-black text-white font-['Outfit']">6,240</span>
            <span className="text-sm text-slate-400 font-semibold">/ 10,000 steps</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="w-[62.4%] h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          </div>

          <p className="text-xs text-slate-400 mt-2">
            3,760 steps remaining to reach your daily goal.
          </p>
        </div>

        {/* 3 Metric Cards: Distance, Active Time, Calories Burned */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-slate-400 block">Distance</span>
            <span className="text-sm font-bold text-white font-['Outfit']">4.25 km</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center mx-auto mb-1.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-slate-400 block">Active Time</span>
            <span className="text-sm font-bold text-white font-['Outfit']">58 min</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center mx-auto mb-1.5">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-slate-400 block">Burned</span>
            <span className="text-sm font-bold text-orange-400 font-['Outfit']">420 kcal</span>
          </div>
        </div>

        {/* Weekly Step Bar Chart */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Weekly Steps Trend
              </h3>
              <p className="text-[11px] text-slate-400">Average: 7,851 steps/day</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400">+12% vs last week</span>
          </div>

          {/* Bar Columns */}
          <div className="flex items-end justify-between h-36 pt-4 px-2">
            {weeklySteps.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-6 bg-slate-800 rounded-t-lg relative flex items-end justify-center h-28 overflow-hidden">
                  <div
                    style={{ height: `${item.heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      item.isToday
                        ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                        : 'bg-emerald-500/50 hover:bg-emerald-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold ${
                    item.isToday ? 'text-amber-400 font-black' : 'text-slate-400'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sync with Google Fit / Health Connect banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/30 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              Fit
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Health Connect Synced</span>
              <span className="text-[10px] text-slate-400">Auto-tracking pedometer sensor</span>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">Active</span>
        </div>
      </div>
    </div>
  );
};
