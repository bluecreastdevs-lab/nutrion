import React from 'react';

interface MacroProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  colorHex: string;
  bgColorHex?: string;
  className?: string;
}

export const MacroProgressBar: React.FC<MacroProgressBarProps> = ({
  label,
  current,
  target,
  unit = 'g',
  colorHex,
  bgColorHex = '#1e293b',
  className = '',
}) => {
  const percent = Math.min(100, Math.round((current / (target || 1)) * 100));

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorHex }} />
          <span className="font-semibold text-slate-300">{label}</span>
        </div>
        <div className="font-medium text-slate-400">
          <span className="text-white font-bold">{Math.round(current)}</span> / {target} {unit}
        </div>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: bgColorHex }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: colorHex,
            boxShadow: `0 0 8px ${colorHex}55`,
          }}
        />
      </div>
    </div>
  );
};
