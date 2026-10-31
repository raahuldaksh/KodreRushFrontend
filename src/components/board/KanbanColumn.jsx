import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Inbox } from 'lucide-react';
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
  accentColor = 'border-blue-500',
  badgeBg = 'bg-blue-100 text-blue-700',
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'Column',
      columnId: id,
    },
  });

  const taskIds = React.useMemo(() => tasks.map((t) => t._id), [tasks]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col h-full min-h-[500px] rounded-2xl bg-slate-100/70 border border-slate-200/80 p-3 sm:p-4 transition-colors duration-200',
        isOver && 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-400/20'
      )}
    >
      {/* Column Header */}
      <div className={cn('pb-3 border-b border-slate-200/80 flex items-center justify-between')}>
        <div className="flex items-center gap-2">
          <div className={cn('w-2.5 h-2.5 rounded-full', accentColor)} />
          <h3 className="font-semibold text-slate-800 text-sm tracking-tight">{title}</h3>
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', badgeBg)}>
            {tasks.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
          onClick={() => onAddTask(id)}
          title={`Add task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Task List / Drop Area */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-3 min-h-[150px] pr-0.5">
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

        {/* Empty Column Placeholder */}
        {tasks.length === 0 && (
          <div className="h-44 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 text-center">
            <div className="p-2.5 rounded-full bg-slate-100 text-slate-400 mb-2">
              <Inbox className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-slate-500">No tasks here</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Drop a task or add a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
