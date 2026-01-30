import api from '../api/axios';

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
