import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryCharging } from 'lucide-react';

export const AndroidStatusBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-7 px-5 flex items-center justify-between text-[11px] font-medium text-slate-300 bg-[#070b14] select-none z-30 shrink-0 ${className}`}>
      {/* Dynamic Android System Time */}
      <span className="font-semibold tracking-tight">{timeStr}</span>

      {/* Android System Icons */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-emerald-400">5G</span>
        <Signal className="w-3.5 h-3.5 text-slate-300" />
        <Wifi className="w-3.5 h-3.5 text-slate-300" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">98%</span>
          <BatteryCharging className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

export const AndroidGestureNavBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-4 bg-[#070b14] flex items-center justify-center pb-[max(0.2rem,env(safe-area-inset-bottom))] select-none z-30 shrink-0 ${className}`}>
      <div className="w-28 h-1 bg-slate-600/70 rounded-full" />
    </div>
  );
};
