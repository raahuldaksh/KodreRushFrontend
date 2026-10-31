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
        isDragging && 'opacity-30'
      )}
    >
      <Card
        className={cn(
          'p-3.5 bg-white border border-slate-200/80 rounded-xl transition-all duration-150',
          'hover:border-slate-300 hover:shadow-sm',
          isOverlay && 'shadow-xl border-blue-400 rotate-1 cursor-grabbing',
          isOverdue && 'border-l-4 border-l-red-500'
        )}
      >
        {/* Top Row: Priority Badge + Drag Grip + Actions */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1 -ml-1 text-slate-400 hover:text-slate-600 rounded cursor-grab active:cursor-grabbing focus:outline-none"
              title="Drag to move"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <PriorityBadge priority={task.priority} />
          </div>

          {/* Quick Actions & shadcn Dropdown Menu */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 opacity-70 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              title="Edit Task"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-70 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task);
                  }}
                  className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Task Title */}
        <h4 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
          {task.title}
        </h4>

        {/* Optional Description */}
        {task.description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Footer: Due Date indicator */}
        {formattedDate && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <div
              className={cn(
                'flex items-center gap-1.5 font-medium',
                isOverdue ? 'text-red-600' : 'text-slate-500'
              )}
            >
              {isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{formattedDate}</span>
              {isOverdue && (
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
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
