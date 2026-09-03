import React, { useState } from 'react';
import { Camera, Plus, Check, Star, Clock, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';
import { SearchField } from '../common/Inputs';
import { indianFoodDatabase } from '../../data/mockData';
import { FoodItem, MealCategory } from '../../types';

export const AddFoodScreen: React.FC = () => {
  const { navigateTo, addFoodLog, celebrateStreak } = useApp();
  const [activeTab, setActiveTab] = useState<'Search' | 'Recent' | 'Favorites' | 'Scan'>('Search');
  const [searchQuery, setSearchQuery] = useState('');
  const [targetCategory, setTargetCategory] = useState<MealCategory>('Lunch');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // Tabs handling
  const handleTabClick = (tab: 'Search' | 'Recent' | 'Favorites' | 'Scan') => {
    if (tab === 'Scan') {
      navigateTo('AI_FOOD_SCANNER');
      return;
    }
    setActiveTab(tab);
  };

  const filteredFoods = indianFoodDatabase.filter((food) => {
    if (activeTab === 'Favorites') {
      return food.isFavorite && food.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return food.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddFood = (food: FoodItem) => {
    addFoodLog({
      name: food.name,
      category: targetCategory,
      portion: food.portion,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      imageUrl: food.imageUrl,
    });
    setAddedItemName(food.name);
    celebrateStreak();
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Add Food"
        subtitle="Search Indian database or scan meal"
        showBack
        onBack={() => navigateTo('FOOD_DIARY')}
      />

      <div className="px-4 space-y-4">
        {/* Navigation Tabs: Search, Recent, Favorites, Scan */}
        <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
          {(['Search', 'Recent', 'Favorites', 'Scan'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`flex-1 py-2 font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'Scan' && <Camera className="w-3.5 h-3.5" />}
                {tab === 'Favorites' && <Star className="w-3.5 h-3.5" />}
                {tab === 'Recent' && <Clock className="w-3.5 h-3.5" />}
                {tab === 'Search' && <Search className="w-3.5 h-3.5" />}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Category Target Picker */}
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1.5">
            Log to Meal Category:
          </span>
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs">
            {(['Breakfast', 'Lunch', 'Snack', 'Dinner'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTargetCategory(cat)}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  targetCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Roti, Rice, Idli, Paneer, Dosa..."
          onClear={() => setSearchQuery('')}
        />

        {/* Success toast notification */}
        {addedItemName && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Added "{addedItemName}" to {targetCategory}!</span>
          </div>
        )}

        {/* Popular Indian Foods List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Indian Foods
            </span>
            <span className="text-[11px] text-emerald-400">{filteredFoods.length} items</span>
          </div>

          <div className="space-y-2.5">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/50">
                    <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{food.name}</h4>
                    <p className="text-xs text-slate-400">
                      {food.portion} · <span className="text-emerald-400 font-medium">{food.calories} kcal</span>
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span>P: {food.protein}g</span>
                      <span>C: {food.carbs}g</span>
                      <span>F: {food.fat}g</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddFood(food)}
                  className="w-8 h-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Camera Scan Banner */}
        <div
          onClick={() => navigateTo('AI_FOOD_SCANNER')}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">AI Camera Scanner</span>
              <span className="text-[11px] text-slate-400">Snap your Indian meal plate to detect foods automatically</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400">Scan Now →</span>
        </div>
      </div>
    </div>
  );
};
