import React from 'react';
import {
  Kanban,
  BarChart3,
  CalendarDays,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Database,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Sidebar({
  activeView,
  setActiveView,
  isCollapsed,
  setIsCollapsed,
  tasks = [],
}) {
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const navigation = [
    { id: 'board', name: 'Kanban Board', icon: Kanban, badge: total },
    { id: 'analytics', name: 'Analytics & Insights', icon: BarChart3 },
    { id: 'timeline', name: 'Deadlines & Timeline', icon: CalendarDays },
    { id: 'team', name: 'Sprint Members', icon: Users, badge: '4' },
    { id: 'settings', name: 'Workspace Settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-slate-800/80 bg-[#080c14]/95 backdrop-blur-xl transition-all duration-300 z-30',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Workspace / Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 shadow-md shadow-indigo-500/25 text-white shrink-0">
            <Kanban className="w-5 h-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080c14]" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
                CodeRush 5.0
              </h2>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Sprint Workspace
              </p>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg shrink-0 cursor-pointer"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {!isCollapsed ? 'Views & Modules' : '•••'}
        </div>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer group',
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/15 to-blue-500/10 text-white border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                )}
              />
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.name}</span>
              )}
              {!isCollapsed && item.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700/60'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Live Feature Callout */}
        {!isCollapsed && (
          <div className="pt-4">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-md bg-amber-500/20 text-amber-300">
                  <Zap className="w-3.5 h-3.5 fill-amber-400/40" />
                </div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                  Surprise Feature
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                High Priority tasks are dynamically pinned above Normal & Low tasks in every column.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sprint Progress Widget (Expanded Mode) */}
      {!isCollapsed && (
        <div className="p-3.5 mx-3 mb-3 rounded-xl bg-[#0d1522]/90 border border-slate-800/90 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Sprint Velocity
            </span>
            <span className="text-indigo-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
            <span>{completedCount} of {total} completed</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Database className="w-3 h-3" /> Atlas Live
            </span>
          </p>
        </div>
      )}

      {/* User Profile Card at Bottom */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white font-bold text-xs shadow-inner shrink-0">
            AM
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#080c14]" />
          </div>
          {!isCollapsed && (
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-slate-200 truncate leading-tight">
                Ashish Meena
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                Technical Lead · CodeRush
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
