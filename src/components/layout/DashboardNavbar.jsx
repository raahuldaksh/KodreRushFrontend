import React from 'react';
import {
  Search,
  Plus,
  Sun,
  Moon,
  ChevronRight,
  Kanban,
  BarChart3,
  CalendarDays,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function DashboardNavbar({
  activeView,
  setActiveView,
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  onOpenCreateDialog,
  isLightMode,
  onToggleTheme,
}) {
  const teamMembers = [
    { initials: 'AM', name: 'Ashish Meena', bg: 'bg-indigo-600' },
    { initials: 'RK', name: 'Ritik Bhaiya', bg: 'bg-purple-600' },
    { initials: 'JD', name: 'John Doe', bg: 'bg-blue-600' },
  ];

  const viewTitles = {
    board: 'Kanban Board',
    analytics: 'Analytics & Insights',
    timeline: 'Deadlines & Timeline',
    team: 'Sprint Members',
    settings: 'Workspace Settings',
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#080c14]/85 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
          {/* Breadcrumbs & Active Module Title */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Sprint 5.0</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-bold">{viewTitles[activeView] || 'Kanban Board'}</span>

            {/* View Switcher Tabs */}
            <div className="hidden md:flex items-center ml-4 p-1 rounded-xl bg-slate-900/90 border border-slate-800/90">
              <button
                onClick={() => setActiveView('board')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  activeView === 'board'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <Kanban className="w-3.5 h-3.5" />
                Board
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  activeView === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </button>
              <button
                onClick={() => setActiveView('timeline')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  activeView === 'timeline'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                Deadlines
              </button>
            </div>
          </div>

          {/* Right Action Tools: Team Stack + Search + Filter + Add Task */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Team Members Avatar Stack */}
            <div className="hidden xl:flex items-center -space-x-2 mr-2">
              {teamMembers.map((m, idx) => (
                <div
                  key={idx}
                  title={m.name}
                  className={`flex items-center justify-center w-7 h-7 rounded-full ${m.bg} text-white font-bold text-[10px] ring-2 ring-[#080c14] shadow-sm`}
                >
                  {m.initials}
                </div>
              ))}
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] ring-2 ring-[#080c14]">
                +2
              </div>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 sm:w-56 min-w-[170px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Filter tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                  /
                </kbd>
              </div>
            </div>

            {/* Priority Filter */}
            <div className="w-[135px]">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 text-xs sm:text-sm bg-slate-900/80 border-slate-800 text-slate-200 rounded-lg">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent className="bg-slate-950 border-slate-800 text-slate-200">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      High Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Medium Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Low Priority
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dark / Light Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-lg border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* Primary Action Button */}
            <Button
              onClick={onOpenCreateDialog}
              className="h-9 px-3.5 text-xs sm:text-sm font-semibold gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-[0.98] border border-indigo-400/20 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
