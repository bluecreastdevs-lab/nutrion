import React, { useState } from 'react';
import { Sparkles, TrendingDown, Scale, Dumbbell, Footprints, ChevronRight, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const ProgressScreen: React.FC = () => {
  const { navigateTo, userProfile } = useApp();
  const [periodTab, setPeriodTab] = useState<'Week' | 'Month' | '3 Months'>('Month');

  const weightDataPoints = [
    { label: 'Week 1', weight: 73.7, height: 85 },
    { label: 'Week 2', weight: 73.3, height: 75 },
    { label: 'Week 3', weight: 72.9, height: 60 },
    { label: 'Week 4', weight: 72.5, height: 45, isCurrent: true },
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Progress & Trends"
        subtitle="Weight, body metrics & achievements"
        showBack
        onBack={() => navigateTo('HOME')}
        actions={
          <button
            onClick={() => navigateTo('AI_PROGRESS_ANALYSIS')}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Review
          </button>
        }
      />

      <div className="px-4 space-y-4">
        {/* Tabs: Week, Month, 3 Months */}
        <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
          {(['Week', 'Month', '3 Months'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriodTab(tab)}
              className={`flex-1 py-2 font-semibold rounded-xl transition-all cursor-pointer ${
                periodTab === tab
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Current Weight Hero Banner */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0b1120] border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Current Weight
            </span>
            <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>-1.2 kg this month</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-4xl font-black text-white font-['Outfit']">
              {userProfile.weightKg} kg
            </span>
            <span className="text-xs text-slate-400">Target: 70.0 kg</span>
          </div>

          {/* Simple Weight SVG Trend Line */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-end justify-between h-24 px-2">
              {weightDataPoints.map((pt) => (
                <div key={pt.label} className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-[10px] font-bold text-slate-300">{pt.weight}</span>
                  <div className="w-7 bg-slate-800 rounded-lg h-16 flex items-end justify-center p-0.5">
                    <div
                      style={{ height: `${pt.height}%` }}
                      className={`w-full rounded-md transition-all ${
                        pt.isCurrent
                          ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                          : 'bg-emerald-500/40'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{pt.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Metric Cards: BMI: 22.4, Steps: 48,320, Workouts: 5 / 7 */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">BMI</span>
            <span className="text-lg font-black text-white font-['Outfit'] mt-0.5 block">
              {userProfile.bmi}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">Healthy</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Steps (Mo)</span>
            <span className="text-lg font-black text-amber-400 font-['Outfit'] mt-0.5 block">
              48,320
            </span>
            <span className="text-[10px] text-slate-400">Avg 7.8k/d</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Workouts</span>
            <span className="text-lg font-black text-cyan-400 font-['Outfit'] mt-0.5 block">
              5 / 7
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">On Track</span>
          </div>
        </div>

        {/* AI Progress Analysis Banner */}
        <div
          onClick={() => navigateTo('AI_PROGRESS_ANALYSIS')}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">🤖 AI Progress Analysis</span>
              <span className="text-[11px] text-slate-400">Deep check on nutrition, hydration & workout volume</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Streaks & Badges Teaser */}
        <div
          onClick={() => navigateTo('STREAKS')}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Streaks & Badges</span>
              <span className="text-[11px] text-slate-400">12 days active · 4 trophies unlocked</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
