import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Edit2, Trash2, GripVertical, AlertCircle, MoreHorizontal, CheckCircle2 } from 'lucide-react';
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
          'relative p-3.5 bg-[#101726]/85 hover:bg-[#141e30] border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all duration-150 backdrop-blur-md shadow-md shadow-black/25',
          'hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5',
          isOverlay && 'shadow-2xl border-indigo-400 bg-[#141e30] rotate-1 cursor-grabbing scale-[1.02] ring-2 ring-indigo-500/30',
          isOverdue && 'border-l-4 border-l-rose-500',
          task.status === 'completed' && 'opacity-85'
        )}
      >
        {/* Subtle Card Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/5 rounded-t-xl" />

        {/* Top Header: Drag Handle + Priority Badge + Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1 -ml-1 text-slate-500 hover:text-slate-300 rounded cursor-grab active:cursor-grabbing focus:outline-none transition-colors"
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
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md cursor-pointer"
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
                  className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-3 h-3" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-200">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="gap-2 focus:bg-slate-800 focus:text-white cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task);
                  }}
                  className="gap-2 text-rose-400 focus:text-rose-300 focus:bg-rose-950/60 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Task Title */}
        <h4 className={cn(
          "text-sm font-semibold text-slate-100 tracking-tight leading-snug line-clamp-2",
          task.status === 'completed' && "line-through text-slate-400"
        )}>
          {task.title}
        </h4>

        {/* Optional Description */}
        {task.description && (
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-normal">
            {task.description}
          </p>
        )}

        {/* Footer: Due Date indicator & Completion Check */}
        <div className="mt-3.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
          {formattedDate ? (
            <div
              className={cn(
                'flex items-center gap-1.5 text-[11px] font-medium',
                isOverdue ? 'text-rose-400' : 'text-slate-400'
              )}
            >
              {isOverdue ? (
                <AlertCircle className="w-3 h-3 text-rose-400" />
              ) : (
                <Calendar className="w-3 h-3 text-slate-500" />
              )}
              <span>{formattedDate}</span>
              {isOverdue && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Overdue
                </span>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-slate-500 italic">No deadline</span>
          )}

          {task.status === 'completed' && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Done
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TaskCard;
