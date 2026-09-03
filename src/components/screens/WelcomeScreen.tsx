import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';

export const WelcomeScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-52 h-52 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner & Hero Visual */}
      <div className="pt-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
          <Sparkles className="w-6 h-6" />
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight font-['Outfit']">
          Your AI Coach for a <span className="text-emerald-400">Healthier You</span>
        </h1>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Track food, workouts, water, progress and reach your goals with AI.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 gap-2.5 mt-8">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Instant Indian Food Scanner</span>
              <span className="text-[11px] text-slate-400">CameraX AI macro detection for rotis, idlis, sambar</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Tamil & English Voice Assistant</span>
              <span className="text-[11px] text-slate-400">Speak naturally: "I ate two rotis and dal"</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Offline Room Database</span>
              <span className="text-[11px] text-slate-400">Never lose a single meal entry without internet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-6 pb-2">
        <PrimaryButton onClick={() => navigateTo('PROFILE_SETUP')}>
          Get Started
          <ArrowRight className="w-4 h-4" />
        </PrimaryButton>

        <SecondaryButton onClick={() => navigateTo('LOGIN')}>
          I already have an account
        </SecondaryButton>

        <p className="text-[11px] text-center text-slate-500 pt-1">
          NutriFit AI · Built for Indian nutrition & fitness goals
        </p>
      </div>
    </div>
  );
};
