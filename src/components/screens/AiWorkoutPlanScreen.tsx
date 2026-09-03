import React from 'react';
import { Dumbbell, Clock, Flame, Play, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { PrimaryButton } from '../common/Buttons';
import { defaultWorkoutPlan } from '../../data/mockData';

export const AiWorkoutPlanScreen: React.FC = () => {
  const { navigateTo, startWorkout } = useApp();
  const todayWorkout = defaultWorkoutPlan;

  const handleStartWorkout = () => {
    startWorkout(todayWorkout.title);
    navigateTo('WORKOUT_TIMER');
  };

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="AI Workout Plan"
        subtitle="Hypertrophy Routine · Day 3"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Workout Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0b1120] shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Today's Session
            </span>
            <span className="text-xs font-semibold text-slate-400">{todayWorkout.level}</span>
          </div>

          <h2 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
            {todayWorkout.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              {todayWorkout.durationMinutes} minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              {todayWorkout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-cyan-400" />
              {todayWorkout.exercises.length} exercises
            </span>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Exercises ({todayWorkout.exercises.length})
            </h3>
            <span className="text-xs text-emerald-400">3 Rest Periods</span>
          </div>

          <div className="space-y-2.5">
            {todayWorkout.exercises.map((ex, index) => (
              <div
                key={ex.id}
                onClick={() => navigateTo('WORKOUT_DETAIL')}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {ex.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {ex.sets} sets × {ex.repsOrDuration} · Rest {ex.restSeconds}s
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Start Workout Button */}
        <div className="pt-2">
          <PrimaryButton onClick={handleStartWorkout}>
            <Play className="w-4 h-4 fill-slate-950" />
            Start Workout
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
