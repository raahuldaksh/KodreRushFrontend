import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PriorityBadge } from '@/components/tasks/PriorityBadge';
import { Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export function TimelineView({ tasks = [], onEditTask }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = [];
  const dueThisWeek = [];
  const upcomingLater = [];
  const noDeadline = [];

  tasks.forEach((task) => {
    if (!task.dueDate) {
      noDeadline.push(task);
      return;
    }
    const due = new Date(task.dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (due < today && task.status !== 'completed') {
      overdue.push({ ...task, diffDays });
    } else if (diffDays <= 7 && diffDays >= 0) {
      dueThisWeek.push({ ...task, diffDays });
    } else {
      upcomingLater.push({ ...task, diffDays });
    }
  });

  const renderSection = (title, items, icon, colorClass, emptyMessage) => {
    const Icon = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${colorClass}`} />
            <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {items.length}
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((task) => (
              <Card
                key={task._id}
                onClick={() => onEditTask(task)}
                className="p-3.5 bg-[#0d1522]/80 hover:bg-[#111a2a] border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <PriorityBadge priority={task.priority} />
                  <span className="text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {task.status.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
                  {task.title}
                </h4>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                  </span>
                  {task.diffDays !== undefined && (
                    <span
                      className={`text-[11px] font-medium ${
                        task.diffDays < 0
                          ? 'text-rose-400'
                          : task.diffDays === 0
                          ? 'text-amber-400'
                          : 'text-indigo-400'
                      }`}
                    >
                      {task.diffDays < 0
                        ? `${Math.abs(task.diffDays)}d overdue`
                        : task.diffDays === 0
                        ? 'Due today'
                        : `In ${task.diffDays}d`}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {renderSection(
        'Critical Overdue Tasks',
        overdue,
        AlertCircle,
        'text-rose-400',
        'No overdue tasks. All deadlines on schedule!'
      )}

      {renderSection(
        'Due This Week (Upcoming 7 Days)',
        dueThisWeek,
        Clock,
        'text-amber-400',
        'No tasks due this week.'
      )}

      {renderSection(
        'Later Scheduled Deadlines',
        upcomingLater,
        Calendar,
        'text-indigo-400',
        'No later deadlines scheduled.'
      )}

      {renderSection(
        'Tasks with No Set Deadline',
        noDeadline,
        CheckCircle2,
        'text-slate-400',
        'All tasks have set deadlines.'
      )}
    </div>
  );
}

export default TimelineView;
