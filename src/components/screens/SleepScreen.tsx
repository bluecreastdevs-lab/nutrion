import React from 'react';
import { Moon, Sun, Clock, Sparkles, TrendingUp, BedDouble } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

export const SleepScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const weeklySleep = [
    { day: 'Mon', hours: '7h 30m', heightPct: 75 },
    { day: 'Tue', hours: '6h 50m', heightPct: 68 },
    { day: 'Wed', hours: '7h 10m', heightPct: 72, isToday: true },
    { day: 'Thu', hours: '7h 45m', heightPct: 78 },
    { day: 'Fri', hours: '8h 15m', heightPct: 83 },
    { day: 'Sat', hours: '8h 40m', heightPct: 88 },
    { day: 'Sun', hours: '7h 20m', heightPct: 73 },
  ];

  return (
    <div className="min-h-full pb-8 space-y-4 bg-[#070b14]">
      <TopAppBar
        title="Sleep & Recovery"
        subtitle="Circadian rhythm & muscle repair"
        showBack
        onBack={() => navigateTo('HOME')}
      />

      <div className="px-4 space-y-4">
        {/* Main Statistic Card: 7h 10m / 8h */}
        <div className="bg-gradient-to-br from-[#1b1535] via-[#101026] to-[#080816] border border-purple-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Moon className="w-4 h-4" /> Last Night's Sleep
            </span>
            <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              89.5% Quality
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-black text-white font-['Outfit']">7h 10m</span>
            <span className="text-sm text-slate-400 font-semibold">/ 8h 00m goal</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="w-[89.5%] h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
          </div>

          {/* Bedtime & Wake-up Times */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center">
                <BedDouble className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Bedtime</span>
                <span className="text-xs font-bold text-white">11:20 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Wake-up</span>
                <span className="text-xs font-bold text-white">06:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Sleep Insight Card */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                AI Recovery Insight
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                “Your sleep consistency improved this week. Deep REM sleep is optimal for your
                hypertrophy muscle recovery.”
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Sleep Chart */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-400" /> Weekly Sleep Duration
              </h3>
              <p className="text-[11px] text-slate-400">Average: 7 hours 32 minutes</p>
            </div>
          </div>

          <div className="flex items-end justify-between h-36 pt-4 px-2">
            {weeklySleep.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-6 bg-slate-800 rounded-t-lg relative flex items-end justify-center h-28 overflow-hidden">
                  <div
                    style={{ height: `${item.heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      item.isToday
                        ? 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                        : 'bg-purple-500/40 hover:bg-purple-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold ${
                    item.isToday ? 'text-purple-400 font-black' : 'text-slate-400'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
