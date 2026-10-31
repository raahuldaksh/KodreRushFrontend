import axios from 'axios';

const PRIMARY_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const FALLBACK_URL = PRIMARY_URL.includes('localhost') 
  ? 'https://koderrushbackend.onrender.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: PRIMARY_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic failover if primary URL times out or is unreachable
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry && FALLBACK_URL) {
      originalRequest._retry = true;
      try {
        originalRequest.baseURL = FALLBACK_URL;
        const res = await axios(originalRequest);
        return res.data;
      } catch (fallbackError) {
        // Fallback also failed
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Network error. Please check server connectivity.';
    return Promise.reject(new Error(message));
  }
);

export default api;
