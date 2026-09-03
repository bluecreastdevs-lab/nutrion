import React from 'react';
import { Loader2, AlertCircle, Inbox, WifiOff, CheckCircle2 } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { useApp } from '../../context/AppContext';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading your nutrition data...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-emerald-500/20 animate-ping" />
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-300">{message}</p>
      <span className="text-[10px] text-slate-400 mt-1 font-mono">NutriFit AI Engine</span>
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}> = ({ title, description, actionText, onAction, icon: Icon = Inbox }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 my-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400 mb-3 border border-slate-700/50">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message = 'Something went wrong. Please check connection.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-red-950/20 rounded-2xl border border-red-500/30 my-4">
      <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
      <h4 className="text-sm font-bold text-white mb-1">Notice</h4>
      <p className="text-xs text-slate-300 max-w-xs mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/30 cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export const OfflineBanner: React.FC = () => {
  const { isOffline, pendingSyncCount, triggerSync } = useApp();

  if (!isOffline) return null;

  return (
    <div className="w-full px-4 py-1.5 transition-all">
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-semibold text-amber-300 block text-[11px]">You're offline</span>
            <span className="text-[10px] text-amber-400/80">
              Your entries will sync automatically ({pendingSyncCount} pending in Room DB)
            </span>
          </div>
        </div>
        <button
          onClick={triggerSync}
          className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded-lg border border-emerald-500/30 cursor-pointer shrink-0"
        >
          Sync Now
        </button>
      </div>
    </div>
  );
};
