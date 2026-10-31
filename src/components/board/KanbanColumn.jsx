import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Sparkles } from 'lucide-react';
import TaskCard from '../tasks/TaskCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function KanbanColumn({
  id,
  title,
  tasks = [],
  onEditTask,
  onDeleteTask,
  onAddTask,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'Column',
      columnId: id,
    },
  });

  const taskIds = React.useMemo(() => tasks.map((t) => t._id), [tasks]);

  const config = {
    todo: {
      glow: 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]',
      topBorder: 'border-t-sky-500/80',
      badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    },
    in_progress: {
      glow: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]',
      topBorder: 'border-t-amber-500/80',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    },
    completed: {
      glow: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]',
      topBorder: 'border-t-emerald-500/80',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
  };

  const colStyle = config[id] || config.todo;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col h-full min-h-[580px] rounded-2xl bg-[#0d1522]/60 border border-slate-800/80 p-3.5 sm:p-4 transition-all duration-200 backdrop-blur-md shadow-xl shadow-black/20',
        'border-t-2',
        colStyle.topBorder,
        isOver && 'bg-[#142033]/80 border-indigo-500/80 ring-2 ring-indigo-500/20'
      )}
    >
      {/* Column Header */}
      <div className="pb-3 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={cn('w-2 h-2 rounded-full', colStyle.glow)} />
          <h3 className="font-bold text-white text-sm tracking-tight">{title}</h3>
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', colStyle.badge)}>
            {tasks.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          onClick={() => onAddTask(id)}
          title={`Add task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Task List / Drop Area */}
      <div className="flex-1 overflow-y-auto mt-3.5 space-y-3 min-h-[160px] pr-0.5">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="h-44 flex flex-col items-center justify-center border border-dashed border-slate-800/90 rounded-xl p-5 text-center bg-slate-900/20">
            <div className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 mb-2.5 border border-slate-700/50">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
            <p className="text-xs font-semibold text-slate-300">No tasks in {title}</p>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">Drop a card here or create a new one</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddTask(id)}
              className="h-7 text-xs border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
