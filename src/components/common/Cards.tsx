import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-gradient-to-b from-[#111827] to-[#0b1120] border border-slate-800/80 rounded-2xl p-4 shadow-lg relative overflow-hidden ${
        onClick ? 'cursor-pointer hover:border-slate-700/80 active:scale-[0.99] transition-all' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const NutritionCard: React.FC<{
  title: string;
  current: number;
  target: number;
  unit: string;
  colorHex: string;
  subtext?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}> = ({ title, current, target, unit, colorHex, subtext, icon: Icon, onClick }) => {
  const percent = Math.min(100, Math.round((current / (target || 1)) * 100));

  return (
    <Card onClick={onClick} className="flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      </div>
      <div className="flex items-baseline gap-1 my-1">
        <span className="text-xl font-bold text-white tracking-tight">{current}</span>
        <span className="text-xs text-slate-400">/ {target} {unit}</span>
      </div>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: colorHex }}
        />
      </div>
      {subtext && <p className="text-[11px] text-slate-400 mt-2">{subtext}</p>}
    </Card>
  );
};

export const ActivityCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  progress?: number; // 0-100
  accentColor: string;
  icon: LucideIcon;
  onClick?: () => void;
}> = ({ title, value, subtitle, progress, accentColor, icon: Icon, onClick }) => {
  return (
    <Card onClick={onClick} className="p-3.5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}1A` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
      </div>
      <div className="mt-2">
        <div className="text-lg font-bold text-white tracking-tight">{value}</div>
        {subtitle && <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>}
      </div>
      {progress !== undefined && (
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mt-2.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: accentColor }}
          />
        </div>
      )}
    </Card>
  );
};

export const WorkoutCard: React.FC<{
  title: string;
  duration: string;
  exercisesCount: number;
  level: string;
  calories: number;
  imageUrl?: string;
  onStart?: () => void;
}> = ({ title, duration, exercisesCount, level, calories, imageUrl, onStart }) => {
  return (
    <Card className="overflow-hidden p-0 border border-slate-800/90 group">
      {imageUrl && (
        <div className="h-32 w-full relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
            {level}
          </span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {duration} · {exercisesCount} exercises · {calories} kcal
            </p>
          </div>
          {onStart && (
            <button
              onClick={onStart}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export const MealCard: React.FC<{
  name: string;
  category: string;
  portion: string;
  calories: number;
  imageUrl?: string;
  timeLogged?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ name, category, portion, calories, imageUrl, timeLogged, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/70 rounded-2xl p-3 flex items-center gap-3.5 hover:border-slate-700/60 transition-colors">
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/40">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">Food</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {category}
          </span>
          {timeLogged && <span className="text-[10px] text-slate-400">{timeLogged}</span>}
        </div>
        <h4 className="text-sm font-semibold text-white truncate mt-0.5">{name}</h4>
        <p className="text-xs text-slate-400 truncate">{portion}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-white">{calories}</span>
        <span className="text-[10px] text-slate-400 block">kcal</span>
        <div className="flex items-center justify-end gap-1 mt-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[10px] text-slate-400 hover:text-emerald-400 px-1 py-0.5 cursor-pointer"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-[10px] text-red-400/80 hover:text-red-400 px-1 py-0.5 cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const AIInsightCard: React.FC<{
  title?: string;
  insight: string;
  buttonText?: string;
  onButtonClick?: () => void;
}> = ({ title = 'AI Insight', insight, buttonText = 'Ask AI', onButtonClick }) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/60 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.08)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🤖</span>
          <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">{title}</span>
        </div>
        {onButtonClick && (
          <button
            onClick={onButtonClick}
            className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-all cursor-pointer"
          >
            {buttonText}
          </button>
        )}
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-normal">"{insight}"</p>
    </div>
  );
};

export const ProgressCard: React.FC<{
  title: string;
  status: 'Good' | 'Excellent' | 'Needs Attention' | 'On Track';
  details: string;
  accentColor: string;
}> = ({ title, status, details, accentColor }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white">{title}</span>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}40`,
          }}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{details}</p>
    </div>
  );
};
