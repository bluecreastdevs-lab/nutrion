import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp, Droplets, Dumbbell, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { PrimaryButton } from '../common/Buttons';

export const AiProgressAnalysisScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="AI Progress Analysis"
        subtitle="Comprehensive weekly evaluation"
        showBack
        onBack={() => navigateTo('PROGRESS')}
      />

      <div className="px-4 space-y-4">
        {/* Hero AI Rating Card */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Weekly Health Score
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white font-['Outfit']">88 / 100</span>
            <span className="text-xs text-emerald-400 font-semibold">Excellent Progress</span>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Your calorie deficit and workout adherence are driving consistent fat loss while preserving
            lean muscle tissue.
          </p>
        </div>

        {/* 4 Cards: Nutrition, Activity, Hydration, Weight */}
        <div className="space-y-2.5">
          {/* Nutrition */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Nutrition</span>
                <span className="text-sm font-bold text-white">Good</span>
                <span className="text-[11px] text-emerald-400 block">Protein consistency improved 14%</span>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          {/* Activity */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Activity</span>
                <span className="text-sm font-bold text-white">Excellent</span>
                <span className="text-[11px] text-cyan-400 block">Workout consistency increased</span>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          {/* Hydration */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Hydration</span>
                <span className="text-sm font-bold text-amber-300">Needs Attention</span>
                <span className="text-[11px] text-slate-400 block">Average water intake is below target</span>
              </div>
            </div>
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          </div>

          {/* Weight */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Weight</span>
                <span className="text-sm font-bold text-white">On Track</span>
                <span className="text-[11px] text-purple-300 block">-1.2 kg pace matches your 0.5kg/wk plan</span>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* AI Recommendations List */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> AI Recommendations
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Increase daily water intake:</strong> Sip 500 ml
                right after waking up and another 500 ml around 3:00 PM to hit your 3.0 L goal.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Keep protein consistent:</strong> Maintain 150g daily
                with paneer, boiled eggs, or chicken breast at dinner.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Maintain workout schedule:</strong> Complete your 5
                weekly hypertrophy sessions and allow 2 active recovery rest days.
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <PrimaryButton onClick={() => navigateTo('AI_ASSISTANT')}>
            Ask AI Coach for Plan Adjustment
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
