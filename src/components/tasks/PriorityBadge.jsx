import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PriorityBadge({ priority = 'medium', className }) {
  const normalizedPriority = (priority || 'medium').toLowerCase();

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <Badge
      variant={normalizedPriority}
      className={cn('capitalize text-[11px] font-medium tracking-wide px-2 py-0.5', className)}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        normalizedPriority === 'high' && "bg-red-500",
        normalizedPriority === 'medium' && "bg-amber-500",
        normalizedPriority === 'low' && "bg-emerald-500"
      )} />
      {labels[normalizedPriority] || 'Medium'}
    </Badge>
  );
}

export default PriorityBadge;
