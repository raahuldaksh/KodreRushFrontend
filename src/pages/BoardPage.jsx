import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import DashboardStats from '@/components/board/DashboardStats';
import KanbanBoard from '@/components/board/KanbanBoard';
import TaskDialog from '@/components/tasks/TaskDialog';
import DeleteTaskDialog from '@/components/tasks/DeleteTaskDialog';
import useTasks from '@/hooks/useTasks';

export function BoardPage() {
  const {
    tasks,
    columns,
    loading,
    searchTerm,
    setSearchTerm,
    priorityFilter,
    setPriorityFilter,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  // Theme State (Default: Dark OLED Black & White)
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  // Dialog States
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState('todo');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Handlers
  const handleOpenCreateDialog = (columnStatus = 'todo') => {
    setTaskToEdit(null);
    setDefaultStatus(columnStatus);
    setIsTaskDialogOpen(true);
  };

  const handleOpenEditDialog = (task) => {
    setTaskToEdit(task);
    setIsTaskDialogOpen(true);
  };

  const handleOpenDeleteDialog = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const handleTaskSubmit = async (taskData) => {
    if (taskToEdit) {
      await updateTask(taskToEdit._id, taskData);
    } else {
      await createTask(taskData);
    }
  };

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-[#fafafa] text-zinc-900' : 'bg-[#09090b] text-zinc-100'} pb-16 transition-colors duration-200`}>
      {/* Top Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onOpenCreateDialog={() => handleOpenCreateDialog('todo')}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Dashboard Metric Summary Cards */}
        <DashboardStats tasks={tasks} />

        {/* 3-Column Drag & Drop Board */}
        <KanbanBoard
          columns={columns}
          loading={loading}
          onEditTask={handleOpenEditDialog}
          onDeleteTask={handleOpenDeleteDialog}
          onAddTask={handleOpenCreateDialog}
          onUpdateStatus={updateTaskStatus}
        />
      </main>

      {/* Create / Edit Modal Dialog */}
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onSubmit={handleTaskSubmit}
        initialData={taskToEdit}
        defaultStatus={defaultStatus}
      />

      {/* Delete Confirmation Alert Dialog */}
      <DeleteTaskDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={deleteTask}
        task={taskToDelete}
      />
    </div>
  );
}

export default BoardPage;
