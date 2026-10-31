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
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3.5">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white text-black shadow-sm font-bold">
              <Kanban className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Smart Kanban
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                  Board
                </span>
              </h1>
              <p className="text-xs text-zinc-400">Minimal task workflow for agile teams</p>
            </div>
          </div>

          {/* Search, Filter & Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs sm:text-sm bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-400"
              />
            </div>

            {/* Priority Filter */}
            <div className="w-[140px]">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 text-xs sm:text-sm bg-zinc-900 border-zinc-800 text-zinc-200">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">⚪ High</SelectItem>
                  <SelectItem value="medium">🔘 Medium</SelectItem>
                  <SelectItem value="low">⚫ Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Toggle (Dark / Light) */}
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="h-9 w-9 border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* Add Task Button (High Contrast White) */}
            <Button
              onClick={onOpenCreateDialog}
              className="h-9 px-3.5 text-xs sm:text-sm font-semibold gap-1.5 bg-white text-black hover:bg-zinc-200 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
