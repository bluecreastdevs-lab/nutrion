import React from 'react';

interface ProgressRingProps {
  current: number;
  target: number;
  remainingText?: string;
  size?: number;
  strokeWidth?: number;
  glowColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  current,
  target,
  remainingText,
  size = 180,
  strokeWidth = 14,
  glowColor = '#00E676',
  className = '',
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, current / (target || 1)));
  const strokeDashoffset = circumference - progressRatio * circumference;
  const remaining = Math.max(0, target - current);

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#00E676" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Animated Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#calorieGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
            filter: `drop-shadow(0 0 8px ${glowColor}66)`,
          }}
        />
      </svg>

      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        {children ? (
          children
        ) : (
          <>
            <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
              {current.toLocaleString()}
            </span>
            <span className="text-[11px] font-medium text-slate-400 -mt-0.5">
              / {target.toLocaleString()} kcal
            </span>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-semibold text-emerald-400">
                {remainingText || `${remaining.toLocaleString()} left`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
