import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import taskService from '@/services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await taskService.getTasks();
      if (res.success && Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError(err.message || 'Failed to load tasks');
      toast.error('Could not connect to backend. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter tasks based on search and priority
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPriority =
        priorityFilter === 'all' ||
        task.priority?.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priorityFilter]);

  // Specified Feature: High Priority tasks must appear before Normal Priority tasks in each column
  const sortTasksByPriority = (taskList) => {
    const priorityWeights = { high: 3, medium: 2, low: 1 };
    return [...taskList].sort((a, b) => {
      const weightA = priorityWeights[a.priority?.toLowerCase()] || 2;
      const weightB = priorityWeights[b.priority?.toLowerCase()] || 2;
      if (weightB !== weightA) {
        return weightB - weightA; // High priority (3) appears before Medium/Normal (2) and Low (1)
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  };

  // Group filtered tasks by column status with High Priority strictly ordered first
  const columns = useMemo(() => {
    return {
      todo: sortTasksByPriority(filteredTasks.filter((t) => t.status === 'todo')),
      in_progress: sortTasksByPriority(filteredTasks.filter((t) => t.status === 'in_progress')),
      completed: sortTasksByPriority(filteredTasks.filter((t) => t.status === 'completed')),
    };
  }, [filteredTasks]);

  // Create Task
  const handleCreateTask = async (taskData) => {
    try {
      const res = await taskService.createTask(taskData);
      if (res.success && res.data) {
        setTasks((prev) => [res.data, ...prev]);
        toast.success('Task created successfully!');
        return res.data;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
      throw err;
    }
  };

  // Update Task Details
  const handleUpdateTask = async (id, updatedData) => {
    try {
      const res = await taskService.updateTask(id, updatedData);
      if (res.success && res.data) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data : t))
        );
        toast.success('Task updated successfully!');
        return res.data;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
      throw err;
    }
  };

  // Update Task Status (Optimistic update for drag-and-drop)
  const handleUpdateStatus = async (id, newStatus) => {
    const previousTasks = [...tasks];

    // Optimistically update local state immediately
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    try {
      const res = await taskService.updateTaskStatus(id, newStatus);
      if (!res.success) {
        // Rollback on failure
        setTasks(previousTasks);
        toast.error('Failed to sync status with server');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      // Rollback
      setTasks(previousTasks);
      toast.error('Network error: Could not persist task move');
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));

    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
    } catch (err) {
      setTasks(previousTasks);
      toast.error(err.message || 'Failed to delete task');
    }
  };

  return {
    tasks,
    filteredTasks,
    columns,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    priorityFilter,
    setPriorityFilter,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    updateTaskStatus: handleUpdateStatus,
    deleteTask: handleDeleteTask,
    refresh: fetchTasks,
  };
}

export default useTasks;
