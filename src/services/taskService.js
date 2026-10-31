import api from './api';

export const taskService = {
  // Fetch all tasks with optional search/filter
  getTasks: async (params = {}) => {
    return api.get('/tasks', { params });
  },

  // Fetch single task
  getTaskById: async (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Create new task
  createTask: async (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update existing task
  updateTask: async (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Update task status (on drag drop)
  updateTaskStatus: async (id, status) => {
    return api.patch(`/tasks/${id}/status`, { status });
  },

  // Delete task
  deleteTask: async (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

export default taskService;
