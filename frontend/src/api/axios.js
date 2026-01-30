import axios from 'axios';
import { auth } from '../config/firebase';

// Use VITE_API_URL environment variable, with a fallback
// Ensure we always target the /api route
const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;

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

export default api;
