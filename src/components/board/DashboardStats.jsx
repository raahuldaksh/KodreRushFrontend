import React from 'react';
import { CheckCircle2, Clock, ListTodo, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DashboardStats({ tasks = [] }) {
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: total,
      icon: Layers,
      indicator: 'bg-zinc-400',
    },
    {
      title: 'To Do',
      value: todoCount,
      icon: ListTodo,
      indicator: 'bg-blue-400',
    },
    {
      title: 'In Progress',
      value: inProgressCount,
      icon: Clock,
      indicator: 'bg-amber-400',
    },
    {
      title: 'Completed',
      value: completedCount,
      icon: CheckCircle2,
      indicator: 'bg-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-200 group"
          >
            {/* Top Border Subtle Shine */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-300" />

            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${stat.indicator}`} />
                  <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    {stat.title}
                  </p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1.5 tracking-tight">
                  {stat.value}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-700/40 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
