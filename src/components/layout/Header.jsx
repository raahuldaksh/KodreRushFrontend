import React from 'react';
import { Kanban, Plus, Search, Sun, Moon } from 'lucide-react';
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
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 shadow-inner">
              <Kanban className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-zinc-100 tracking-tight">
                  Smart Kanban
                </h1>
                <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-zinc-800/90 text-zinc-300 border border-zinc-700/50">
                  R1-01
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 hidden sm:inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  High Priority First
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Agile task workflow</p>
            </div>
          </div>

          {/* Search, Filter & Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Search Input with Keyboard Shortcut Hint */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-10 h-9 text-xs sm:text-sm bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-lg focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:border-zinc-700"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/90 text-zinc-400 border border-zinc-700/60">
                  /
                </kbd>
              </div>
            </div>

            {/* shadcn Priority Select */}
            <div className="w-[145px]">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 text-xs sm:text-sm bg-zinc-900/60 border-zinc-800 text-zinc-200 rounded-lg">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
              className="h-9 w-9 rounded-lg border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* Primary Action Button (White high-contrast with subtle ambient glow) */}
            <Button
              onClick={onOpenCreateDialog}
              className="h-9 px-3.5 text-xs sm:text-sm font-medium gap-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.12)] transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-zinc-950" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
