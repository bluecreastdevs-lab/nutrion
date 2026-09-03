import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Utensils, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityLevel, FoodDietPreference, RegionalCuisine } from '../../types';
import { PrimaryButton } from '../common/Buttons';

export const PreferencesScreen: React.FC = () => {
  const { navigateTo, userProfile, updateUserProfile, celebrateStreak } = useApp();
  const [activity, setActivity] = useState<ActivityLevel>(userProfile.activityLevel || 'Moderately Active');
  const [diet, setDiet] = useState<FoodDietPreference>(userProfile.dietPreference || 'Non-Vegetarian');
  const [selectedCuisines, setSelectedCuisines] = useState<RegionalCuisine[]>(
    userProfile.cuisines || ['Tamil', 'South Indian', 'North Indian']
  );

  const activityLevels: { level: ActivityLevel; desc: string }[] = [
    { level: 'Sedentary', desc: 'Desk job, minimal daily movement' },
    { level: 'Lightly Active', desc: '1-3 light workouts or walking per week' },
    { level: 'Moderately Active', desc: '3-5 moderate workouts per week (Recommended)' },
    { level: 'Very Active', desc: '6-7 intense training sessions per week' },
    { level: 'Athlete', desc: 'Double daily sessions or competitive sports' },
  ];

  const dietPreferences: FoodDietPreference[] = [
    'Vegetarian',
    'Non-Vegetarian',
    'Vegan',
    'Eggitarian',
    'Jain',
  ];

  const cuisinesList: RegionalCuisine[] = [
    'Tamil',
    'South Indian',
    'North Indian',
    'Kerala',
    'Andhra',
    'Telangana',
    'Karnataka',
    'Bengali',
    'Gujarati',
    'Maharashtrian',
  ];

  const toggleCuisine = (cuisine: RegionalCuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      if (selectedCuisines.length > 1) {
        setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
      }
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleFinish = () => {
    updateUserProfile({
      activityLevel: activity,
      dietPreference: diet,
      cuisines: selectedCuisines,
    });
    celebrateStreak();
    navigateTo('HOME');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#070b14]">
      <div>
        {/* Top bar with Step Counter */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateTo('GOALS')}
            className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 3 of 4
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
          <div className="w-3/4 h-full bg-emerald-400 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
          Activity & Food Preferences
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize meal suggestions with your favorite Indian regional recipes.
        </p>

        {/* Section 1: Activity Level */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
            <Activity className="w-3.5 h-3.5" /> Daily Activity Level
          </label>
          <div className="space-y-2">
            {activityLevels.map((item) => {
              const isSelected = activity === item.level;
              return (
                <div
                  key={item.level}
                  onClick={() => setActivity(item.level)}
                  className={`px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      {item.level}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Dietary Preference */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
            <Utensils className="w-3.5 h-3.5" /> Dietary Preference
          </label>
          <div className="flex flex-wrap gap-2">
            {dietPreferences.map((pref) => {
              const isSelected = diet === pref;
              return (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setDiet(pref)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {pref}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Regional Indian Cuisines */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Regional Indian Cuisines
            </label>
            <span className="text-[10px] text-slate-400">Select all that apply</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cuisinesList.map((cuisine) => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => toggleCuisine(cuisine)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <PrimaryButton onClick={handleFinish}>
          Complete & Launch NutriFit AI
          <Sparkles className="w-4 h-4" />
        </PrimaryButton>
      </div>
    </div>
  );
};
