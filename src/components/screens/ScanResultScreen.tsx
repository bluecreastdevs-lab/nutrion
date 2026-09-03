import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Edit3,
  Trash2,
  ShieldCheck,
  Camera,
  Plus,
  Heart,
  Flame,
  Activity,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';
import { mockAiScanResult } from '../../data/mockData';
import { ScannedFoodDetectedItem } from '../../types';

export const ScanResultScreen: React.FC = () => {
  const { navigateTo, addFoodLog, celebrateStreak, scannedMealResult } = useApp();

  // Load from context or fallback to mock
  const [mealTitle, setMealTitle] = useState<string>(
    scannedMealResult?.title || 'AI Scanned Indian Thali'
  );
  const [foods, setFoods] = useState<ScannedFoodDetectedItem[]>(
    scannedMealResult?.foods || mockAiScanResult.foods
  );
  const [imageUrl, setImageUrl] = useState<string>(
    scannedMealResult?.imageUrl ||
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80'
  );
  const [confidence, setConfidence] = useState<number>(
    scannedMealResult?.confidence || 98.4
  );
  const [healthScore, setHealthScore] = useState<number>(
    scannedMealResult?.healthScore || 92
  );
  const [glycemicIndex, setGlycemicIndex] = useState<'Low' | 'Medium' | 'High'>(
    scannedMealResult?.glycemicIndex || 'Medium'
  );
  const [aiInsights, setAiInsights] = useState<string[]>(
    scannedMealResult?.aiInsights || [
      'High protein density supports sustained glycogen recovery and muscle protein synthesis.',
      'Whole spices (cumin, mustard seeds & turmeric) provide active curcuminoids with anti-inflammatory benefits.',
      'Optimal fiber balance ensures smooth glucose absorption without insulin spikes.',
    ]
  );
  const [micronutrients, setMicronutrients] = useState(
    scannedMealResult?.micronutrients || {
      sodiumMg: 580,
      potassiumMg: 690,
      calciumMg: 340,
      ironMg: 4.2,
      vitaminCPercent: 48,
    }
  );

  // Sync state if context changes
  useEffect(() => {
    if (scannedMealResult) {
      setMealTitle(scannedMealResult.title);
      setFoods(scannedMealResult.foods);
      setImageUrl(scannedMealResult.imageUrl);
      setConfidence(scannedMealResult.confidence);
      if (scannedMealResult.healthScore) setHealthScore(scannedMealResult.healthScore);
      if (scannedMealResult.glycemicIndex) setGlycemicIndex(scannedMealResult.glycemicIndex);
      if (scannedMealResult.aiInsights) setAiInsights(scannedMealResult.aiInsights);
      if (scannedMealResult.micronutrients) setMicronutrients(scannedMealResult.micronutrients);
    }
  }, [scannedMealResult]);

  // Recalculate totals dynamically
  const totalCalories = Math.round(foods.reduce((acc, f) => acc + f.calories, 0));
  const totalProtein = Number(foods.reduce((acc, f) => acc + f.protein, 0).toFixed(1));
  const totalCarbs = Number(foods.reduce((acc, f) => acc + f.carbs, 0).toFixed(1));
  const totalFat = Number(foods.reduce((acc, f) => acc + f.fat, 0).toFixed(1));
  const totalFiber = Number(foods.reduce((acc, f) => acc + f.fiber, 0).toFixed(1));

  const handleConfirmAndLog = () => {
    // Log detected meal
    addFoodLog({
      name: mealTitle,
      category: 'Dinner',
      portion: `${foods.length} items (${Math.round(
        foods.reduce((acc, f) => acc + (f.weightGrams || 100), 0)
      )}g)`,
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: totalFiber,
      imageUrl: imageUrl,
    });
    celebrateStreak();
    navigateTo('FOOD_DIARY');
  };

  const handleRemoveItem = (index: number) => {
    setFoods((prev) => prev.filter((_, i) => i !== index));
  };

  // Adjust portion multiplier (e.g. 1.25x or 0.75x)
  const handleScalePortion = (index: number, multiplier: number) => {
    setFoods((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          calories: Math.round(item.calories * multiplier),
          protein: Number((item.protein * multiplier).toFixed(1)),
          carbs: Number((item.carbs * multiplier).toFixed(1)),
          fat: Number((item.fat * multiplier).toFixed(1)),
          fiber: Number((item.fiber * multiplier).toFixed(1)),
          weightGrams: item.weightGrams ? Math.round(item.weightGrams * multiplier) : undefined,
        };
      })
    );
  };

  return (
    <div className="min-h-full pb-10 flex flex-col justify-between p-4 bg-[#070b14] text-slate-100">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('AI_FOOD_SCANNER')}
            className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
            title="Scan Another"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">NutriFit Vision AI Complete</span>
          </div>
          <button
            onClick={() => navigateTo('AI_FOOD_SCANNER')}
            className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
            title="Camera Retake"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Captured Preview & Confidence Card */}
        <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
          <img
            src={imageUrl}
            alt="Scanned Food"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            <span className="text-[10px] font-bold bg-emerald-500/90 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3" />
              {confidence.toFixed(1)}% Match
            </span>
          </div>

          {/* Bottom details inside photo frame */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
            <div className="space-y-0.5 max-w-[70%]">
              <h2 className="text-sm font-bold text-white truncate drop-shadow-md">
                {mealTitle}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-300 font-medium">
                  {foods.length} items detected
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-300">
                  GI: {glycemicIndex}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-right">
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Health Score</span>
              <span className="text-sm font-extrabold text-emerald-400">{healthScore}/100</span>
            </div>
          </div>
        </div>

        {/* Nutrition Totals Summary Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Total Nutrition
              </span>
              <span className="text-[11px] text-emerald-400 block font-medium">
                Verified with Clinical Database
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white font-['Outfit']">
                {totalCalories}
              </span>
              <span className="text-xs text-slate-400 ml-1">kcal</span>
            </div>
          </div>

          {/* 4 Core Macros */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-slate-800">
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
                Protein
              </span>
              <span className="text-sm font-extrabold text-white">{totalProtein}g</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-amber-500/30">
              <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
                Carbs
              </span>
              <span className="text-sm font-extrabold text-white">{totalCarbs}g</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-orange-500/30">
              <span className="text-[10px] text-orange-400 font-bold block uppercase tracking-wider">
                Fat
              </span>
              <span className="text-sm font-extrabold text-white">{totalFat}g</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-teal-500/30">
              <span className="text-[10px] text-teal-400 font-bold block uppercase tracking-wider">
                Fiber
              </span>
              <span className="text-sm font-extrabold text-white">{totalFiber}g</span>
            </div>
          </div>

          {/* Micronutrient Badges */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto no-scrollbar gap-2">
            <span className="whitespace-nowrap">
              Iron: <strong className="text-slate-200">{micronutrients.ironMg}mg</strong>
            </span>
            <span>•</span>
            <span className="whitespace-nowrap">
              Calcium: <strong className="text-slate-200">{micronutrients.calciumMg}mg</strong>
            </span>
            <span>•</span>
            <span className="whitespace-nowrap">
              Potassium: <strong className="text-slate-200">{micronutrients.potassiumMg}mg</strong>
            </span>
            <span>•</span>
            <span className="whitespace-nowrap">
              Sodium: <strong className="text-slate-200">{micronutrients.sodiumMg}mg</strong>
            </span>
          </div>
        </div>

        {/* Detected Foods List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detected Food Breakdown ({foods.length})
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium">Tap + / - to scale</span>
          </div>

          <div className="space-y-2">
            {foods.map((food, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-0.5 max-w-[55%]">
                  <h4 className="text-sm font-bold text-white truncate">{food.name}</h4>
                  <p className="text-xs text-slate-400">{food.portion}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                    <span>P: {food.protein}g</span>
                    <span>•</span>
                    <span>C: {food.carbs}g</span>
                    <span>•</span>
                    <span>F: {food.fat}g</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-400">{food.calories}</span>
                    <span className="text-[10px] text-slate-400 block">kcal</span>
                  </div>

                  {/* Portion scaling buttons */}
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700/60">
                    <button
                      onClick={() => handleScalePortion(idx, 0.8)}
                      className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white rounded active:bg-slate-700 cursor-pointer"
                      title="Reduce portion"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleScalePortion(idx, 1.25)}
                      className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white rounded active:bg-slate-700 cursor-pointer"
                      title="Increase portion"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Dietitian Insights */}
        {aiInsights && aiInsights.length > 0 && (
          <div className="bg-emerald-950/25 border border-emerald-500/25 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Lightbulb className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Nutritionist Insights</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aiInsights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="space-y-2 pt-5 sticky bottom-0 bg-[#070b14]/90 backdrop-blur-md">
        <PrimaryButton onClick={handleConfirmAndLog}>
          <Check className="w-4 h-4" />
          <span>Confirm & Log {totalCalories} kcal Meal</span>
        </PrimaryButton>
        <SecondaryButton onClick={() => navigateTo('AI_FOOD_SCANNER')}>
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>Scan / Upload Another Meal</span>
        </SecondaryButton>
      </div>
    </div>
  );
};
