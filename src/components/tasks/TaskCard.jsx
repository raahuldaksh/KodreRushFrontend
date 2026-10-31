import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Edit2, Trash2, GripVertical, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PriorityBadge from './PriorityBadge';
import { cn } from '@/lib/utils';

export function TaskCard({ task, onEdit, onDelete, isOverlay = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: 'Task',
      task,
    },
    disabled: isOverlay,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  // Format Due Date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Check if overdue
  const isOverdue = React.useMemo(() => {
    if (!task.dueDate || task.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    return due < today;
  }, [task.dueDate, task.status]);

  const formattedDate = formatDate(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative touch-none',
        isDragging && 'opacity-20'
      )}
    >
      <Card
        className={cn(
          'p-3.5 bg-zinc-900/60 hover:bg-zinc-800/40 border border-zinc-800/70 hover:border-zinc-700/90 rounded-xl transition-all duration-150 backdrop-blur-sm',
          'hover:shadow-sm',
          isOverlay && 'shadow-2xl border-zinc-400 bg-zinc-900 rotate-1 cursor-grabbing scale-[1.02]',
          isOverdue && 'border-l-2 border-l-red-500'
        )}
      >
        {/* Top Row: Priority Badge + Drag Grip + Actions */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1 -ml-1 text-zinc-500 hover:text-zinc-300 rounded cursor-grab active:cursor-grabbing focus:outline-none transition-colors"
              title="Drag task"
            >
              <GripVertical className="w-3.5 h-3.5" />
            </button>
            <PriorityBadge priority={task.priority} />
          </div>

          {/* Quick Actions & Dropdown Menu */}
          <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              title="Edit Task"
            >
              <Edit2 className="w-3 h-3" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-3 h-3" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="gap-2 focus:bg-zinc-800 focus:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task);
                  }}
                  className="gap-2 text-red-400 focus:text-red-300 focus:bg-red-950/60"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Task Title */}
        <h4 className="text-sm font-medium text-zinc-100 leading-snug line-clamp-2">
          {task.title}
        </h4>

        {/* Optional Description */}
        {task.description && (
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-normal">
            {task.description}
          </p>
        )}

        {/* Footer: Due Date indicator */}
        {formattedDate && (
          <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
            <div
              className={cn(
                'flex items-center gap-1.5 text-[11px] font-normal',
                isOverdue ? 'text-red-400 font-medium' : 'text-zinc-400'
              )}
            >
              {isOverdue ? (
                <AlertCircle className="w-3 h-3 text-red-400" />
              ) : (
                <Calendar className="w-3 h-3 text-zinc-500" />
              )}
              <span>{formattedDate}</span>
              {isOverdue && (
                <span className="text-[10px] font-medium tracking-wide uppercase px-1 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                  Overdue
                </span>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default TaskCard;
