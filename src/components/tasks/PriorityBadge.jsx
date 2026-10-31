import React from 'react';
import { cn } from '@/lib/utils';

export function PriorityBadge({ priority = 'medium', className }) {
  const normalizedPriority = (priority || 'medium').toLowerCase();

  const configs = {
    high: {
      label: 'High Priority',
      badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]',
      dotClass: 'bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.8)]',
    },
    medium: {
      label: 'Medium',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      dotClass: 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]',
    },
    low: {
      label: 'Low',
      badgeClass: 'bg-slate-800/80 text-slate-400 border-slate-700/60',
      dotClass: 'bg-slate-400',
    },
  };

  const config = configs[normalizedPriority] || configs.medium;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border select-none tracking-tight',
        config.badgeClass,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      {config.label}
    </span>
  );
}

export default PriorityBadge;
