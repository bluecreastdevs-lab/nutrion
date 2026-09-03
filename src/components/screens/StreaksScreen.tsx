import React from 'react';
import { Flame, Trophy, Award, Utensils, Droplets, Dumbbell, Footprints, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const StreaksScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const streakCategories = [
    { title: 'Food Logging', days: 12, icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
    { title: 'Hydration', days: 8, icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
    { title: 'Workout', days: 10, icon: Dumbbell, color: 'text-orange-400', bg: 'bg-orange-500/15' },
    { title: 'Steps', days: 7, icon: Footprints, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  ];

  const achievements = [
    { title: '7-Day Streak', desc: 'Logged all daily meals for 7 continuous days', date: 'Earned Sep 1', icon: '🔥' },
    { title: '10 Workouts', desc: 'Completed 10 full strength or HIIT routines', date: 'Earned Sep 2', icon: '🏆' },
    { title: 'Protein Champion', desc: 'Achieved 150g protein target 5 days in a row', date: 'Earned Aug 30', icon: '💪' },
    { title: 'Hydration Hero', desc: 'Hit 3.0 Liters daily water goal consecutively', date: 'Earned Aug 28', icon: '💧' },
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Streaks & Achievements"
        subtitle="Habits, consistency & rewards"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Main Hero Streak Banner: 🔥 12 Day Streak */}
        <div className="bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-[#0c0f1d] border border-orange-500/40 rounded-3xl p-6 text-center relative overflow-hidden shadow-xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 mx-auto mb-3 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
            <div className="w-full h-full bg-[#0c0f1d] rounded-full flex items-center justify-center">
              <Flame className="w-9 h-9 text-orange-400 fill-orange-400 animate-pulse" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-white font-['Outfit'] tracking-tight">
            12 Day Streak! 🔥
          </h2>
          <p className="text-xs text-amber-300 font-medium mt-1">
            You're on fire! Log tomorrow's breakfast to extend to 13 days.
          </p>

          {/* 7-day mini calendar dots */}
          <div className="flex justify-center gap-2 mt-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                  ✓
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Categories Breakdown */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Active Habits Breakdown
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {streakCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3"
                >
                  <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{item.title}</span>
                    <span className="text-sm font-black text-white font-['Outfit']">
                      {item.days} days
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Unlocked Achievements
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">4 of 12</span>
          </div>

          <div className="space-y-2">
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-lg shadow-sm">
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{ach.title}</h4>
                    <p className="text-xs text-slate-400 leading-tight mt-0.5">{ach.desc}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                      {ach.date}
                    </span>
                  </div>
                </div>

                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Challenges CTA */}
        <div
          onClick={() => navigateTo('CHALLENGES')}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Community Challenges</span>
              <span className="text-[10px] text-slate-400">Join 10K steps, 30-day workouts & win badges</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
