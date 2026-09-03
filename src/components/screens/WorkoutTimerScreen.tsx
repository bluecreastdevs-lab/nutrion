import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, CheckSquare, Dumbbell, Flame, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkoutTimerScreen: React.FC = () => {
  const { navigateTo, finishWorkout, celebrateStreak } = useApp();
  const [seconds, setSeconds] = useState(42);
  const [isActive, setIsActive] = useState(true);
  const [currentSet, setCurrentSet] = useState(2);
  const totalSets = 3;
  const maxSeconds = 60;

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleFinish = () => {
    finishWorkout();
    celebrateStreak();
    navigateTo('PROGRESS');
  };

  const handleSkip = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
      setSeconds(45);
      setIsActive(true);
    } else {
      handleFinish();
    }
  };

  const progressPercent = ((maxSeconds - seconds) / maxSeconds) * 100;

  return (
    <div className="min-h-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#060c18] via-[#081226] to-[#040813] text-white relative overflow-hidden select-none">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Push Ups</h3>
            <p className="text-[11px] text-slate-400">Hypertrophy Chest Routine</p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-emerald-400">
          Set {currentSet} / {totalSets}
        </div>
      </div>

      {/* Center Animated Circular Timer */}
      <div className="flex flex-col items-center justify-center my-auto z-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#1e293b"
              strokeWidth="6"
            />
            {/* Active animated stroke */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#00E676"
              strokeWidth="6"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear shadow-[0_0_20px_#00E676]"
            />
          </svg>

          {/* Center Digital Display */}
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-black font-['Outfit'] tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,230,118,0.4)]">
              {formatTime(seconds)}
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold mt-1">
              {isActive ? 'Keep Pushing' : 'Rest Completed'}
            </span>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>185 kcal burned</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>142 bpm</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-3 z-10">
        <div className="flex items-center justify-center gap-4">
          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-slate-600 text-white text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            {isActive ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />}
            {isActive ? 'Pause' : 'Resume'}
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="flex-1 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-slate-600 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <SkipForward className="w-5 h-5" />
            Skip Set
          </button>
        </div>

        {/* Finish Workout Button */}
        <button
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-sm font-black flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.35)]"
        >
          <CheckSquare className="w-5 h-5 stroke-[2.5]" />
          Finish Workout Session
        </button>
      </div>
    </div>
  );
};
