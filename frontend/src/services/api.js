import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to all requests
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const verifyToken = () => api.post('/auth/verify');
export const getCurrentUser = () => api.get('/auth/me');

// Board API
export const getBoards = () => api.get('/boards');
export const createBoard = (name) => api.post('/boards', { name });
export const updateBoard = (id, name) => api.put(`/boards/${id}`, { name });
export const deleteBoard = (id) => api.delete(`/boards/${id}`);

// Todo API
export const getTodos = (boardId) => api.get(`/boards/${boardId}/todos`);
export const createTodo = (boardId, data) => api.post(`/boards/${boardId}/todos`, data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export default api;
