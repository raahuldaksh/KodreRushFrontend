import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PriorityBadge } from '@/components/tasks/PriorityBadge';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';

export function AnalyticsView({ tasks = [] }) {
  const total = tasks.length;
  const highTasks = tasks.filter((t) => t.priority === 'high');
  const mediumTasks = tasks.filter((t) => t.priority === 'medium');
  const lowTasks = tasks.filter((t) => t.priority === 'low');

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate || t.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(t.dueDate) < today;
  });

  const completionRate = total > 0 ? Math.round((completedTasks.length / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if Overdue */}
      {overdueTasks.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-200">
                {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''} Detected
              </h4>
              <p className="text-xs text-rose-300/80 mt-0.5">
                Review and reprioritize overdue items to maintain sprint momentum.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/30">
            Requires Attention
          </span>
        </div>
      )}

      {/* Grid of Analytical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Sprint Completion Gauge */}
        <Card className="rounded-2xl border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Sprint Completion Rate
              </CardTitle>
              <span className="text-xs font-bold text-indigo-400">{completionRate}%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>{completedTasks.length} Completed</span>
              <span>{total - completedTasks.length} Remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <Card className="rounded-2xl border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Priority Allocation
              </CardTitle>
              <span className="text-xs font-bold text-slate-400">{total} Total</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> High Priority
              </span>
              <span className="font-bold text-white">{highTasks.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Medium Priority
              </span>
              <span className="font-bold text-white">{mediumTasks.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-500" /> Low Priority
              </span>
              <span className="font-bold text-white">{lowTasks.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Bottleneck Health */}
        <Card className="rounded-2xl border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Workflow Health
              </CardTitle>
              <span className="text-xs font-bold text-emerald-400">Optimal</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">To Do Queue:</span>
              <span className="font-bold text-sky-400">{todoTasks.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active In Progress:</span>
              <span className="font-bold text-amber-400">{inProgressTasks.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Completed Shipped:</span>
              <span className="font-bold text-emerald-400">{completedTasks.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tasks Breakdown Table */}
      <Card className="rounded-2xl border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Task Health Roster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 font-semibold">
                  <th className="pb-3 font-semibold">Task Title</th>
                  <th className="pb-3 font-semibold">Priority</th>
                  <th className="pb-3 font-semibold">Workflow Status</th>
                  <th className="pb-3 font-semibold">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-medium text-white max-w-[280px] truncate">
                      {task.title}
                    </td>
                    <td className="py-3">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="py-3 capitalize">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          task.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : task.status === 'in_progress'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            : 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                        }`}
                      >
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsView;
