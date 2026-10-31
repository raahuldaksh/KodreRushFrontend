import React from 'react';
import { CheckCircle2, Clock, ListTodo, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DashboardStats({ tasks = [] }) {
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const completionPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: total,
      subtext: `${completionPercentage}% completed`,
      icon: Layers,
      barGradient: 'from-indigo-500 to-purple-500',
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      indicator: 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]',
    },
    {
      title: 'To Do',
      value: todoCount,
      subtext: 'Pending start',
      icon: ListTodo,
      barGradient: 'from-sky-500 to-blue-500',
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      indicator: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]',
    },
    {
      title: 'In Progress',
      value: inProgressCount,
      subtext: 'Active execution',
      icon: Clock,
      barGradient: 'from-amber-500 to-yellow-500',
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      indicator: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    },
    {
      title: 'Completed',
      value: completedCount,
      subtext: 'Done & shipped',
      icon: CheckCircle2,
      barGradient: 'from-emerald-500 to-teal-500',
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      indicator: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-[#0d1522]/80 hover:bg-[#111a2a]/90 hover:border-slate-700/80 transition-all duration-200 group shadow-lg shadow-black/20"
          >
            {/* Top Border Accent Line */}
            <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${stat.barGradient}`} />

            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${stat.indicator}`} />
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Progress bar / Subtext */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>{stat.subtext}</span>
                {stat.title === 'Total Tasks' && (
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
