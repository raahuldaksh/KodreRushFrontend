import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import TaskCard from '../tasks/TaskCard';
import { Skeleton } from '@/components/ui/skeleton';

export function KanbanBoard({
  columns,
  loading,
  onEditTask,
  onDeleteTask,
  onAddTask,
  onUpdateStatus,
}) {
  const [activeTask, setActiveTask] = useState(null);

  // Setup sensors with activation constraints to prevent accidental drag on button clicks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Must drag at least 5px to initiate
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = active.data.current?.task;
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id;
    const currentTask = active.data.current?.task;
    if (!currentTask) return;

    // Check if dropped directly onto a column container
    let destinationStatus = null;
    if (['todo', 'in_progress', 'completed'].includes(over.id)) {
      destinationStatus = over.id;
    } else if (over.data.current?.type === 'Task') {
      // Dropped onto another task in a column
      destinationStatus = over.data.current.task.status;
    } else if (over.data.current?.columnId) {
      destinationStatus = over.data.current.columnId;
    }

    if (destinationStatus && destinationStatus !== currentTask.status) {
      onUpdateStatus(activeTaskId, destinationStatus);
    }
  };

  const columnConfig = [
    {
      id: 'todo',
      title: 'To Do',
      accentColor: 'bg-blue-500',
      badgeBg: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      accentColor: 'bg-amber-500',
      badgeBg: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'completed',
      title: 'Completed',
      accentColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-100 text-emerald-700',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((col) => (
          <div key={col} className="rounded-2xl bg-slate-100/70 p-4 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
        {columnConfig.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={columns[col.id] || []}
            accentColor={col.accentColor}
            badgeBg={col.badgeBg}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask}
          />
        ))}
      </div>

      {/* Drag Overlay for smooth preview during drag */}
      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            isOverlay={true}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
