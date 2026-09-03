import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Dumbbell, Clock, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';

export const WorkoutDetailScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSet, setCurrentSet] = useState(2);
  const [totalSets] = useState(3);
  const [reps] = useState(12);
  const [restSec] = useState(45);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-full pb-8 flex flex-col justify-between p-4 bg-[#070b14]">
      <div className="space-y-4">
        {/* Header */}
        <TopAppBar
          title="Workout Details"
          subtitle="Exercise 1 of 5"
          showBack
          onBack={() => navigateTo('AI_WORKOUT_PLAN')}
        />

        {/* Exercise Video / Animation Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 h-52 bg-slate-900 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80"
            alt="Push Ups Exercise"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Chest & Triceps Focus
            </span>
            <h2 className="text-2xl font-black text-white font-['Outfit']">Push Ups</h2>
          </div>
        </div>

        {/* Set & Target Display Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Set</span>
              <span className="text-lg font-black text-emerald-400 font-['Outfit']">
                {currentSet} / {totalSets}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reps</span>
              <span className="text-lg font-black text-white font-['Outfit']">{reps}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Rest</span>
              <span className="text-lg font-black text-amber-400 font-['Outfit']">{restSec}s</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed text-center">
            Keep your core tight and elbows at a 45-degree angle. Lower yourself until your chest
            nearly touches the floor, then push back up explosively.
          </p>
        </div>
      </div>

      {/* Controls: Previous, Pause, Next */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentSet(Math.max(1, currentSet - 1))}
            className="flex-1 py-3 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700/60 cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 py-3 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700/60 cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={() => navigateTo('WORKOUT_TIMER')}
            className="flex-1 py-3 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            Next
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => navigateTo('WORKOUT_TIMER')}
          className="w-full text-center text-xs text-emerald-400 hover:underline cursor-pointer"
        >
          Open Full-Screen Immersive Workout Timer →
        </button>
      </div>
    </div>
  );
};
