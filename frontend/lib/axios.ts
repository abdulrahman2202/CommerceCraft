import axios from 'axios';

/**
 * Configure production-ready base Axios instance
 * Handles generic settings, auth headers, and client request interceptors.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach authentication token if stored in local storage
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('commerce_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Capture generic errors (such as 401 Unauthorized actions)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401 && typeof window !== 'undefined') {
            // Clear local session storage and handle redirects, if necessary
            localStorage.removeItem('commerce_token');
        }

        return Promise.reject(error);
    }
);

export default api;
