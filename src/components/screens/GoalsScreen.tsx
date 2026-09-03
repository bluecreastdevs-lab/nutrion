import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Flame, Dumbbell, Scale, Target, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GoalType } from '../../types';
import { PrimaryButton } from '../common/Buttons';

export const GoalsScreen: React.FC = () => {
  const { navigateTo, userProfile, updateUserProfile } = useApp();
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(userProfile.goal || 'Muscle Gain');

  const goalsList: { type: GoalType; desc: string; icon: React.ElementType }[] = [
    { type: 'Weight Loss', desc: 'Burn fat and achieve a lean, healthy body mass', icon: Flame },
    { type: 'Weight Gain', desc: 'Build mass and strength with surplus nutrition', icon: Target },
    { type: 'Muscle Gain', desc: 'Hypertrophy-focused training with high-protein Indian diet', icon: Dumbbell },
    { type: 'Fat Loss', desc: 'Drop body fat percentage while preserving lean muscle', icon: Flame },
    { type: 'Six-Pack', desc: 'Defined core with disciplined macro deficit & ab training', icon: Sparkles },
    { type: 'Maintain Weight', desc: 'Sustain current body composition and boost vitality', icon: Scale },
  ];

  const handleContinue = () => {
    updateUserProfile({ goal: selectedGoal });
    navigateTo('PREFERENCES');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14]">
      <div>
        {/* Top bar with Step Counter */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateTo('PROFILE_SETUP')}
            className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 2 of 4
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
          <div className="w-2/4 h-full bg-emerald-400 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
          What's your main goal?
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          NutriFit AI will calculate your daily TDEE (2,400 kcal) and macronutrient ratios to match this goal.
        </p>

        {/* Goals Grid */}
        <div className="mt-6 space-y-3">
          {goalsList.map((g) => {
            const isSelected = selectedGoal === g.type;
            const Icon = g.icon;

            return (
              <div
                key={g.type}
                onClick={() => setSelectedGoal(g.type)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-950/50 to-slate-900 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/50'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {g.type}
                    </h4>
                    <p className="text-[11px] text-slate-400 max-w-[210px] leading-tight mt-0.5">
                      {g.desc}
                    </p>
                  </div>
                </div>

                {/* Check Indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-emerald-400 border-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'border-slate-700 bg-slate-900 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 pb-2">
        <PrimaryButton onClick={handleContinue}>
          Next: Preferences
          <ArrowRight className="w-4 h-4" />
        </PrimaryButton>
      </div>
    </div>
  );
};
