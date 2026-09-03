import React from 'react';
import {
  Plus,
  Camera,
  Droplets,
  Footprints,
  Dumbbell,
  Moon,
  ChevronRight,
  Flame,
  Scale,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { ProgressRing } from '../common/ProgressRing';
import { MacroProgressBar } from '../common/MacroProgressBar';
import { AIInsightCard, MealCard, ActivityCard } from '../common/Cards';

export const HomeScreen: React.FC = () => {
  const {
    navigateTo,
    userProfile,
    foodLogs,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    waterLiters,
    deleteFoodLog,
  } = useApp();

  const remainingKcal = Math.max(0, userProfile.targetCalories - totalCalories);

  // Group meals
  const breakfastItems = foodLogs.filter((f) => f.category === 'Breakfast');
  const lunchItems = foodLogs.filter((f) => f.category === 'Lunch');
  const snackItems = foodLogs.filter((f) => f.category === 'Snack');
  const dinnerItems = foodLogs.filter((f) => f.category === 'Dinner');

  return (
    <div className="min-h-full pb-6 space-y-4 bg-[#070b14]">
      {/* Top App Bar */}
      <TopAppBar />

      <div className="px-4 space-y-4">
        {/* User Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight font-['Outfit'] flex items-center gap-1.5">
              Good Morning, {userProfile.name} 👋
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Ready to achieve your goals today?</p>
          </div>
          <button
            onClick={() => navigateTo('STREAKS')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>12 Days</span>
          </button>
        </div>

        {/* TODAY'S PROGRESS CARD */}
        <div className="bg-gradient-to-b from-[#111827] to-[#0d1322] border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Today's Progress
              </span>
              <h3 className="text-sm font-bold text-white">Daily Calorie Target</h3>
            </div>
            <button
              onClick={() => navigateTo('FOOD_DIARY')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              Diary <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Circular Calorie Progress */}
            <div className="shrink-0 flex flex-col items-center">
              <ProgressRing
                current={totalCalories}
                target={userProfile.targetCalories}
                remainingText={`${remainingKcal.toLocaleString()} kcal left`}
                size={160}
                strokeWidth={13}
              />
            </div>

            {/* MACROS BREAKDOWN */}
            <div className="w-full space-y-2.5">
              <MacroProgressBar
                label="Protein"
                current={totalProtein}
                target={userProfile.targetProtein}
                colorHex="#10B981"
              />
              <MacroProgressBar
                label="Carbs"
                current={totalCarbs}
                target={userProfile.targetCarbs}
                colorHex="#FBBF24"
              />
              <MacroProgressBar
                label="Fat"
                current={totalFat}
                target={userProfile.targetFat}
                colorHex="#F97316"
              />
              <MacroProgressBar
                label="Fiber"
                current={totalFiber}
                target={userProfile.targetFiber}
                colorHex="#34D399"
              />
            </div>
          </div>
        </div>

        {/* QUICK STATS 2x2 GRID */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Stats
            </span>
            <button
              onClick={() => navigateTo('ACTIVITY')}
              className="text-xs text-emerald-400 hover:underline cursor-pointer"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ActivityCard
              title="Water"
              value={`${waterLiters.toFixed(1)} / 3 L`}
              subtitle="Daily target 3.0 L"
              progress={(waterLiters / 3) * 100}
              accentColor="#06B6D4"
              icon={Droplets}
              onClick={() => navigateTo('HYDRATION')}
            />

            <ActivityCard
              title="Steps"
              value="6,240 / 10,000"
              subtitle="4.25 km covered"
              progress={62.4}
              accentColor="#F59E0B"
              icon={Footprints}
              onClick={() => navigateTo('ACTIVITY')}
            />

            <ActivityCard
              title="Workout"
              value="45 min"
              subtitle="Upper Body Plan"
              progress={100}
              accentColor="#10B981"
              icon={Dumbbell}
              onClick={() => navigateTo('AI_WORKOUT_PLAN')}
            />

            <ActivityCard
              title="Sleep"
              value="7h 10m"
              subtitle="Goal: 8h 00m"
              progress={89.5}
              accentColor="#8B5CF6"
              icon={Moon}
              onClick={() => navigateTo('SLEEP')}
            />
          </div>
        </div>

        {/* BODY METRICS BANNER */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">BMI</span>
            <span className="text-sm font-bold text-white">{userProfile.bmi}</span>
            <span className="text-[9px] text-emerald-400 block font-medium">Normal</span>
          </div>
          <div className="h-7 w-[1px] bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">BMR</span>
            <span className="text-sm font-bold text-white">{userProfile.bmr}</span>
            <span className="text-[9px] text-slate-400 block">kcal/day</span>
          </div>
          <div className="h-7 w-[1px] bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">TDEE</span>
            <span className="text-sm font-bold text-emerald-400">{userProfile.tdee}</span>
            <span className="text-[9px] text-slate-400 block">kcal target</span>
          </div>
          <div className="h-7 w-[1px] bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fasting</span>
            <span
              onClick={() => navigateTo('FASTING')}
              className="text-xs font-bold text-purple-400 hover:underline cursor-pointer block"
            >
              14h 32m
            </span>
            <span className="text-[9px] text-slate-400 block">16:8 Goal</span>
          </div>
        </div>

        {/* AI INSIGHT CARD */}
        <AIInsightCard
          title="AI Insight"
          insight="You are 82% toward your protein target today. Consider a high-protein dinner."
          buttonText="Ask AI"
          onButtonClick={() => navigateTo('AI_ASSISTANT')}
        />

        {/* TODAY'S MEALS & ACTION BUTTONS */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Today's Meals</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('ADD_FOOD')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Food
              </button>
              <button
                onClick={() => navigateTo('AI_FOOD_SCANNER')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                <Camera className="w-3.5 h-3.5" />
                Scan Food
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {foodLogs.slice(0, 4).map((food) => (
              <MealCard
                key={food.id}
                name={food.name}
                category={food.category}
                portion={food.portion}
                calories={food.calories}
                imageUrl={food.imageUrl}
                timeLogged={food.timeLogged}
                onDelete={() => deleteFoodLog(food.id)}
              />
            ))}
          </div>

          {/* AI Voice Assistant Trigger Banner */}
          <div
            onClick={() => navigateTo('VOICE_ASSISTANT')}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/25 flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Voice Food & Workout Logging</span>
                <span className="text-[10px] text-slate-400">Speak in English or Tamil: "I ate two rotis and dal"</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Speak →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
