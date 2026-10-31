import React from 'react';
import { cn } from '@/lib/utils';

export function PriorityBadge({ priority = 'medium', className }) {
  const normalizedPriority = (priority || 'medium').toLowerCase();

  const configs = {
    high: {
      label: 'High',
      badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
      dotClass: 'bg-red-400',
    },
    medium: {
      label: 'Medium',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      dotClass: 'bg-amber-400',
    },
    low: {
      label: 'Low',
      badgeClass: 'bg-zinc-500/10 text-zinc-400 border-zinc-700/40',
      dotClass: 'bg-zinc-400',
    },
  };

  const config = configs[normalizedPriority] || configs.medium;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border tracking-wide select-none',
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
