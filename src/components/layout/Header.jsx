import React from 'react';
import { Kanban, Plus, Search, Sun, Moon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Header({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  onOpenCreateDialog,
  isLightMode,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080c14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 shadow-md shadow-indigo-500/20 text-white">
              <Kanban className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  Smart Kanban
                </h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  R1-01
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 hidden sm:inline-flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400/30" />
                  High Priority First
                </span>
              </div>
              <p className="text-xs text-slate-400">Streamlined task management for high-velocity teams</p>
            </div>
          </div>

          {/* Search, Filter & Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-9 h-9 text-xs sm:text-sm bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                  /
                </kbd>
              </div>
            </div>

            {/* shadcn Priority Select */}
            <div className="w-[145px]">
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

            {/* Dark / Light Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-lg border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* Primary Add Task Button (Vibrant Indigo Gradient) */}
            <Button
              onClick={onOpenCreateDialog}
              className="h-9 px-4 text-xs sm:text-sm font-semibold gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-[0.98] border border-indigo-400/20"
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

export default Header;
