import React, { useState } from 'react';
import { Clock, Play, Pause, Flame, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { PrimaryButton } from '../common/Buttons';

export const FastingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedProtocol, setSelectedProtocol] = useState<'16:8' | '18:6' | '20:4' | 'OMAD' | 'Custom'>('16:8');
  const [isFastingActive, setIsFastingActive] = useState(true);

  const presets = ['16:8', '18:6', '20:4', 'OMAD', 'Custom'] as const;

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Intermittent Fasting"
        subtitle="Autophagy & metabolic flexibility"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Fasting Timer Dial Hero */}
        <div className="bg-gradient-to-b from-[#17132a] via-[#0f0e21] to-[#080714] border border-purple-500/30 rounded-3xl p-6 flex flex-col items-center justify-center relative shadow-xl">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* SVG circular track */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="#1e1b4b"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="#A855F7"
                strokeWidth="7"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * 90.8) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 shadow-[0_0_20px_#A855F7]"
              />
            </svg>

            {/* Center Fasting Timer Display: 14:32:18 */}
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                Fasting Elapsed
              </span>
              <span className="text-4xl font-black text-white font-['Outfit'] tracking-tight mt-0.5">
                14:32:18
              </span>
              <span className="text-xs text-slate-400 mt-1">Goal: {selectedProtocol}</span>
            </div>
          </div>

          <div className="w-full mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 block">Started</span>
              <span className="font-bold text-white">Yesterday, 8:30 PM</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-purple-400 font-bold block">Eating Window Opens</span>
              <span className="font-bold text-purple-300">Today, 12:30 PM</span>
            </div>
          </div>
        </div>

        {/* Protocol Presets: 16:8, 18:6, 20:4, OMAD, Custom */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
            Fasting Protocols
          </span>
          <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSelectedProtocol(preset)}
                className={`flex-1 py-2 font-bold rounded-xl transition-all cursor-pointer ${
                  selectedProtocol === preset
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Current Metabolic State Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Active Metabolic Phase: Deep Ketosis & Autophagy</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            At 14+ hours of fasting, your body switches into optimal cellular cleanup (autophagy)
            and burns stored body fat for energy.
          </p>
        </div>

        {/* Control Button */}
        <button
          onClick={() => setIsFastingActive(!isFastingActive)}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
            isFastingActive
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              : 'bg-purple-600 text-white hover:bg-purple-500'
          }`}
        >
          {isFastingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isFastingActive ? 'End Fast Early & Log Meal' : 'Start Fasting Session'}
        </button>
      </div>
    </div>
  );
};
