import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const authApi = {
    login: async (credentials: { username: string; password: string }) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    }
};

export const userApi = {
    getAll: async () => {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    },
    create: async (user: any) => {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    },
    update: async (id: number, user: any) => {
        const response = await axios.put(`${API_URL}/users/${id}`, user);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    }
};

export const setUserInfo = (user: any) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
};