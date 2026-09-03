import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Camera, Calendar, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { MealCard } from '../common/Cards';
import { MealCategory } from '../../types';

export const FoodDiaryScreen: React.FC = () => {
  const { navigateTo, foodLogs, deleteFoodLog, totalCalories, userProfile } = useApp();
  const [selectedDate, setSelectedDate] = useState('Today, 3 Sep');

  const categories: MealCategory[] = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  return (
    <div className="min-h-full pb-6 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Food Diary"
        subtitle="Track daily nutrition & macros"
        showBack
        onBack={() => navigateTo('HOME')}
        actions={
          <button
            onClick={() => navigateTo('AI_FOOD_SCANNER')}
            className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        {/* Date Selector Navigation Bar: ← Today, 3 Sep → */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm">
          <button
            onClick={() => setSelectedDate('Yesterday, 2 Sep')}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white tracking-tight">{selectedDate}</span>
          </div>
          <button
            onClick={() => setSelectedDate('Tomorrow, 4 Sep')}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Summary Pill */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Logged</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-white font-['Outfit']">
                {totalCalories.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ {userProfile.targetCalories} kcal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('AI_FOOD_SCANNER')}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              Scan / Upload
            </button>
            <button
              onClick={() => navigateTo('ADD_FOOD')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold flex items-center gap-1 border border-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>

        {/* Meals Sections: Breakfast, Lunch, Snack, Dinner */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = foodLogs.filter((f) => f.category === cat);
            const catCalories = items.reduce((acc, curr) => acc + curr.calories, 0);

            return (
              <div key={cat} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{cat}</h3>
                    <span className="text-xs text-emerald-400 font-semibold">{catCalories} kcal</span>
                  </div>
                  <button
                    onClick={() => navigateTo('ADD_FOOD')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                {items.length > 0 ? (
                  <div className="space-y-2">
                    {items.map((food) => (
                      <MealCard
                        key={food.id}
                        name={food.name}
                        category={food.category}
                        portion={food.portion}
                        calories={food.calories}
                        imageUrl={food.imageUrl}
                        timeLogged={food.timeLogged}
                        onEdit={() => navigateTo('ADD_FOOD')}
                        onDelete={() => deleteFoodLog(food.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-center">
                    <p className="text-xs text-slate-500">No {cat.toLowerCase()} logged yet</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
