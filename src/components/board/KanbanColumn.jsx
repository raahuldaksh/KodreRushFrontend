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

  // Status Indicator Glows
  const statusGlows = {
    todo: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',
    in_progress: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]',
    completed: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]',
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col h-full min-h-[550px] rounded-2xl bg-zinc-900/25 border border-zinc-800/60 p-3 sm:p-4 transition-all duration-200 backdrop-blur-sm',
        isOver && 'bg-zinc-900/50 border-zinc-600/80 ring-1 ring-zinc-500/30'
      )}
    >
      {/* Column Header */}
      <div className="pb-3 border-b border-zinc-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full', statusGlows[id] || 'bg-zinc-400')} />
          <h3 className="font-semibold text-zinc-200 text-sm tracking-tight">{title}</h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/40">
            {tasks.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-md"
          onClick={() => onAddTask(id)}
          title={`Add task to ${title}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Task List / Drop Area */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-2.5 min-h-[160px] pr-0.5">
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
          <div className="h-40 flex flex-col items-center justify-center border border-dashed border-zinc-800/70 rounded-xl p-4 text-center bg-zinc-900/10">
            <div className="p-2 rounded-lg bg-zinc-800/40 text-zinc-500 mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-zinc-400">No tasks in {title}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Drag a task here or click + to add</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
