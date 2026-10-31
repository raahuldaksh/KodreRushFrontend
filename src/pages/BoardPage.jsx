import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardNavbar from '@/components/layout/DashboardNavbar';
import DashboardStats from '@/components/board/DashboardStats';
import KanbanBoard from '@/components/board/KanbanBoard';
import AnalyticsView from '@/components/dashboard/AnalyticsView';
import TimelineView from '@/components/dashboard/TimelineView';
import TeamView from '@/components/dashboard/TeamView';
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

  // Active Dashboard View ('board' | 'analytics' | 'timeline' | 'team')
  const [activeView, setActiveView] = useState('board');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Theme State
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
    <div
      className={`min-h-screen flex ${
        isLightMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#080c14] text-slate-100'
      } transition-colors duration-200`}
    >
      {/* SaaS Dashboard Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        tasks={tasks}
      />

      {/* Main Dashboard Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Dashboard Navigation Bar */}
        <DashboardNavbar
          activeView={activeView}
          setActiveView={setActiveView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onOpenCreateDialog={() => handleOpenCreateDialog('todo')}
          isLightMode={isLightMode}
          onToggleTheme={() => setIsLightMode((prev) => !prev)}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Top Metric Cards */}
            <DashboardStats tasks={tasks} />

            {/* Active Module View */}
            {activeView === 'board' && (
              <KanbanBoard
                columns={columns}
                loading={loading}
                onEditTask={handleOpenEditDialog}
                onDeleteTask={handleOpenDeleteDialog}
                onAddTask={handleOpenCreateDialog}
                onUpdateStatus={updateTaskStatus}
              />
            )}

            {activeView === 'analytics' && <AnalyticsView tasks={tasks} />}

            {activeView === 'timeline' && (
              <TimelineView tasks={tasks} onEditTask={handleOpenEditDialog} />
            )}

            {activeView === 'team' && <TeamView tasks={tasks} />}

            {activeView === 'settings' && (
              <div className="p-8 rounded-2xl border border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md max-w-xl">
                <h3 className="text-base font-bold text-white mb-2">Workspace Settings</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Manage your CodeRush sprint configuration, team roles, and database connection.
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Database Connection</span>
                    <span className="text-emerald-400 font-bold">MongoDB Atlas Connected</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Sorting Logic</span>
                    <span className="text-amber-400 font-bold">High Priority First Enabled</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Hackathon Track</span>
                    <span className="text-indigo-400 font-bold">CodeRush 5.0 (R1-01)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

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
