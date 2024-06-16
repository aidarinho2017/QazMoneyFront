import axios from 'axios'
import {ACCESS_TOKEN} from "./constants.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (refreshToken) {
                try {
                    const response = await axios.post('/api/token/refresh/', {
                        refresh: refreshToken,
                    });
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;