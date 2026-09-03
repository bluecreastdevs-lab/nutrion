import React, { useState } from 'react';
import { FileText, Download, Share2, Calendar, TrendingUp, CheckCircle, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const ReportsScreen: React.FC = () => {
  const { navigateTo, userProfile, totalCalories } = useApp();
  const [periodTab, setPeriodTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const reportCategories = [
    { name: 'Calories', metric: '1,842 kcal avg', status: 'Optimal Deficit' },
    { name: 'Macros', metric: '142g Protein avg', status: 'Goal Met' },
    { name: 'Water', metric: '2.6 L / 3.0 L avg', status: 'Near Target' },
    { name: 'Steps', metric: '8,420 steps/day', status: 'Healthy' },
    { name: 'Workout', metric: '5 sessions / wk', status: 'Consistent' },
    { name: 'Sleep', metric: '7h 15m avg', status: 'Good Recovery' },
    { name: 'Weight', metric: '-1.2 kg net change', status: 'On Track' },
  ];

  const handleExport = (type: 'PDF' | 'Excel') => {
    setExportNotice(`Generated ${type} Report for ${userProfile.name}. Downloading...`);
    setTimeout(() => {
      setExportNotice(null);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'NutriFit AI Health Report',
        text: `My NutriFit AI Health Report: 12-day streak, 1,842 kcal target, 5 workouts completed!`,
      });
    } else {
      setExportNotice('Report link copied to clipboard!');
      setTimeout(() => setExportNotice(null), 3000);
    }
  };

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Health Reports"
        subtitle="Comprehensive data & analytics"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Period Tabs: Daily, Weekly, Monthly */}
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

        {/* Export Notification Toast */}
        {exportNotice && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Report Summary Card */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0b1120] border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {periodTab} Health Executive Summary
            </span>
            <span className="text-xs text-slate-400">Sep 1 - Sep 7</span>
          </div>

          <h3 className="text-lg font-bold text-white font-['Outfit'] mt-2">
            Overall Health Score: <span className="text-emerald-400 font-black">92%</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Consistently achieved macronutrient targets with high adherence to Indian regional
            meal recommendations and progressive workout overload.
          </p>
        </div>

        {/* Report Categories List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Category Breakdown
          </h3>

          <div className="space-y-2">
            {reportCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                  <span className="text-xs text-emerald-400 font-medium">{cat.metric}</span>
                </div>
                <span className="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/60 font-semibold">
                  {cat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Export & Share Buttons */}
        <div className="space-y-2.5 pt-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleExport('PDF')}
              className="py-3 px-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              Export PDF
            </button>

            <button
              onClick={() => handleExport('Excel')}
              className="py-3 px-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              Export Excel
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-full py-3 px-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            Share Report with Nutritionist or Coach
          </button>
        </div>
      </div>
    </div>
  );
};
