import React, { useState } from 'react';
import { Sparkles, RefreshCw, ShoppingCart, Shuffle, Check, ArrowLeft, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const AiMealPlannerScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [periodTab, setPeriodTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);

  const [plannedMeals, setPlannedMeals] = useState([
    {
      id: 'm1',
      title: 'Masala Oats + Boiled Eggs',
      time: '7:30 AM',
      category: 'Breakfast',
      calories: 520,
      protein: 26,
      carbs: 64,
      fat: 14,
      imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'm2',
      title: 'Paneer Curry + Brown Rice + Salad',
      time: '1:00 PM',
      category: 'Lunch',
      calories: 650,
      protein: 38,
      carbs: 85,
      fat: 18,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'm3',
      title: 'Sprouts Chaat + Fruits',
      time: '5:00 PM',
      category: 'Snack',
      calories: 250,
      protein: 12,
      carbs: 42,
      fat: 4,
      imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'm4',
      title: 'Chicken Curry + Brown Rice',
      time: '8:30 PM',
      category: 'Dinner',
      calories: 580,
      protein: 44,
      carbs: 60,
      fat: 16,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80',
    },
  ]);

  const handleSwapMeal = (id: string) => {
    setPlannedMeals((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          if (m.category === 'Lunch') {
            return {
              ...m,
              title: 'Soya Chunks Biryani + Cucumber Raita',
              calories: 640,
              protein: 42,
              carbs: 80,
              fat: 14,
            };
          } else if (m.category === 'Dinner') {
            return {
              ...m,
              title: 'Grilled Fish Chettinad + 2 Phulkas',
              calories: 560,
              protein: 46,
              carbs: 52,
              fat: 14,
            };
          } else {
            return {
              ...m,
              title: 'Pesarattu (Moong Dal Dosa) + Chutney',
              calories: 490,
              protein: 22,
              carbs: 68,
              fat: 12,
            };
          }
        }
        return m;
      })
    );
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 900);
  };

  const shoppingItems = [
    'Rolled Oats (500g)',
    'Eggs (12 pcs)',
    'Low-fat Paneer (400g)',
    'Brown Basmati Rice (1kg)',
    'Moong Sprouts (250g)',
    'Skinless Chicken Breast (500g)',
    'Cucumber, Tomatoes, Onions',
    'Curd / Greek Yogurt (400g)',
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="AI Meal Planner"
        subtitle="Calibrated for Muscle Gain & Indian Diet"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Tabs: Daily, Weekly, Monthly */}
        <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriodTab(tab)}
              className={`flex-1 py-2 font-semibold rounded-xl transition-all cursor-pointer ${
                periodTab === tab
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Nutrition Target Banner */}
        <div className="bg-gradient-to-r from-[#111827] to-[#0d1322] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Target Nutrition
            </span>
            <span className="text-sm font-black text-white font-['Outfit']">2,400 kcal</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
            <div>
              <span className="text-[10px] text-emerald-400 font-semibold block">Protein</span>
              <span className="text-xs font-bold text-white">150 g</span>
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-semibold block">Carbs</span>
              <span className="text-xs font-bold text-white">300 g</span>
            </div>
            <div>
              <span className="text-[10px] text-orange-400 font-semibold block">Fat</span>
              <span className="text-xs font-bold text-white">70 g</span>
            </div>
          </div>
        </div>

        {/* Meals Schedule */}
        <div className="space-y-3">
          {plannedMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {meal.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {meal.time}
                  </span>
                </div>
                <button
                  onClick={() => handleSwapMeal(meal.id)}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" /> Swap
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/50">
                  <img src={meal.imageUrl} alt={meal.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white leading-tight">{meal.title}</h4>
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-400 mt-1">
                    <span className="text-white font-semibold">{meal.calories} kcal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fat}g</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons: Swap Meal, Regenerate Plan, Shopping List */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="py-3 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700/60 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-emerald-400' : ''}`} />
            {isRegenerating ? 'Generating...' : 'Regenerate Plan'}
          </button>

          <button
            onClick={() => setShowShoppingModal(true)}
            className="py-3 px-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
            Shopping List
          </button>
        </div>

        {/* Shopping List Modal */}
        {showShoppingModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1120] border border-slate-700 rounded-3xl p-5 w-full max-w-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  Indian Grocery Shopping List
                </h3>
                <button
                  onClick={() => setShowShoppingModal(false)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {shoppingItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  alert('Shopping list copied to clipboard!');
                  setShowShoppingModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
