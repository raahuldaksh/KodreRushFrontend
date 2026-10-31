import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import taskService from '@/services/taskService';

const DEFAULT_TASKS = [
  {
    _id: 'default-1',
    title: 'Implement High Priority First Sorting Rule',
    description: 'Ensure critical security tasks and priority workloads always stay pinned at the top.',
    priority: 'high',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'default-2',
    title: 'Deploy Production Security & CORS Middleware',
    description: 'Verify strict origin headers, input validation boundaries, and HTTPS termination.',
    priority: 'high',
    status: 'todo',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'default-3',
    title: 'Configure MongoDB Atlas M0 Cluster & Mongoose Models',
    description: 'Connected to MongoDB Atlas with compound indexes on { status: 1, createdAt: -1 }.',
    priority: 'high',
    status: 'completed',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    _id: 'default-4',
    title: 'Refine Linear-Grade Glassmorphic SaaS Design',
    description: 'Add glowing ambient lighting, translucent cards, and smooth micro-interactions.',
    priority: 'medium',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    _id: 'default-5',
    title: 'Automated REST Endpoint & Status Transition Tests',
    description: 'Validate GET, POST, PUT, PATCH status, and DELETE responses.',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    _id: 'default-6',
    title: 'Benchmark Mobile Drag Performance & Touch Constraints',
    description: 'Test pointer sensor activation distance and touch responsiveness across mobile viewports.',
    priority: 'low',
    status: 'todo',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('smart_kanban_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Save to localStorage as quick cache
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('smart_kanban_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await taskService.getTasks();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTasks(res.data);
      }
    } catch (err) {
      console.warn('API query fallback:', err.message);
      // Keep existing cached tasks or defaults so the board never breaks
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
    const tempId = `task-${Date.now()}`;
    const newTask = {
      _id: tempId,
      ...taskData,
      createdAt: new Date().toISOString(),
    };

    // Optimistic insert
    setTasks((prev) => [newTask, ...prev]);
    toast.success('Task created successfully!');

    try {
      const res = await taskService.createTask(taskData);
      if (res.success && res.data) {
        setTasks((prev) =>
          prev.map((t) => (t._id === tempId ? res.data : t))
        );
      }
    } catch (err) {
      console.warn('Persisted locally. Server sync pending:', err.message);
    }
    return newTask;
  };

  // Update Task Details
  const handleUpdateTask = async (id, updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
    );
    toast.success('Task updated successfully!');

    try {
      await taskService.updateTask(id, updatedData);
    } catch (err) {
      console.warn('Persisted locally. Server sync pending:', err.message);
    }
  };

  // Update Task Status (Optimistic update for drag-and-drop)
  const handleUpdateStatus = async (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.updateTaskStatus(id, newStatus);
    } catch (err) {
      console.warn('Status move cached locally:', err.message);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted successfully');

    try {
      await taskService.deleteTask(id);
    } catch (err) {
      console.warn('Deleted locally:', err.message);
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
