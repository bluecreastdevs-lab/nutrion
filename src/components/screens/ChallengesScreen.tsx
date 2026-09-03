import React, { useState } from 'react';
import { Trophy, Footprints, Dumbbell, Droplets, ArrowRight, Check, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const ChallengesScreen: React.FC = () => {
  const { navigateTo, celebrateStreak } = useApp();
  const [joined, setJoined] = useState<{ [key: string]: boolean }>({
    c1: true,
    c2: true,
    c3: false,
  });

  const challenges = [
    {
      id: 'c1',
      title: '10K Steps Daily Challenge',
      desc: 'Hit 10,000 steps every day this week to win the Pedometer Master badge.',
      daysRemaining: '5 days remaining',
      participants: '14.2k joined',
      progress: 71,
      icon: Footprints,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
    },
    {
      id: 'c2',
      title: '30-Day Workout Challenge',
      desc: 'Complete 30 guided home or gym workouts with progressive overload.',
      daysRemaining: '12 / 30 days completed',
      participants: '8.7k joined',
      progress: 40,
      icon: Dumbbell,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
    },
    {
      id: 'c3',
      title: '7-Day Hydration Challenge',
      desc: 'Reach 3.0 Liters water intake daily for 7 consecutive days.',
      daysRemaining: '5 / 7 days completed',
      participants: '22.1k joined',
      progress: 71,
      icon: Droplets,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/15',
    },
  ];

  const toggleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
    celebrateStreak();
  };

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Fitness Challenges"
        subtitle="Compete, stay consistent & win badges"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#0b1120] border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" /> Community Leaderboard
          </div>
          <h2 className="text-xl font-black text-white font-['Outfit']">
            September Indian Fitness League
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Join thousands of fitness enthusiasts across India tracking steps, macros, and home workouts.
          </p>
        </div>

        {/* Challenges List */}
        <div className="space-y-3">
          {challenges.map((item) => {
            const Icon = item.icon;
            const isJoined = joined[item.id];

            return (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{item.daysRemaining}</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Users className="w-3 h-3" /> {item.participants}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.progress}%` }}
                      className="h-full bg-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => toggleJoin(item.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isJoined
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                    }`}
                  >
                    {isJoined ? <Check className="w-3.5 h-3.5" /> : <Trophy className="w-3.5 h-3.5" />}
                    {isJoined ? 'Joined · Keep Going!' : 'Join Challenge'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
