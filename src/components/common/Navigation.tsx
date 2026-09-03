import React from 'react';
import {
  Home,
  UtensilsCrossed,
  Dumbbell,
  TrendingUp,
  Sparkles,
  ArrowLeft,
  Settings,
  Bell,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';
import { BottomNavTab, ScreenType } from '../../types';
import { useApp } from '../../context/AppContext';

export const TopAppBar: React.FC<{
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
}> = ({ title, subtitle, showBack, onBack, actions }) => {
  const {
    navigateTo,
    userProfile,
    isOffline,
    pendingSyncCount,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#070b14]/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 border-b border-slate-800/60 flex items-center justify-between min-h-[56px]">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer active:scale-95 transition-all"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div
            onClick={() => navigateTo('HOME')}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] cursor-pointer"
          >
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span className="text-emerald-400 font-black text-sm tracking-tighter">NF</span>
            </div>
          </div>
        )}

        <div>
          <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            {title || 'NutriFit AI'}
            {isOffline ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-normal text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full border border-amber-400/20">
                <WifiOff className="w-2.5 h-2.5" /> Offline ({pendingSyncCount})
              </span>
            ) : null}
          </h1>
          {subtitle && <p className="text-[11px] text-slate-400 line-clamp-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {actions}

        {/* Notification indicator */}
        <button
          onClick={() => navigateTo('CHALLENGES')}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/40 relative active:scale-95 transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {/* Settings button */}
        <button
          onClick={() => navigateTo('SETTINGS')}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/40 active:scale-95 transition-all cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User profile avatar */}
        <button
          onClick={() => navigateTo('PROFILE')}
          className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shrink-0"
        >
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: BottomNavTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'ai', label: 'AI', icon: Sparkles },
  ];

  return (
    <nav className="shrink-0 w-full z-40 bg-[#070b14]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 pt-1 pb-1 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all duration-150 cursor-pointer ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 font-normal'
            }`}
          >
            <div
              className={`px-3.5 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-emerald-400' : 'font-medium text-slate-400'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
