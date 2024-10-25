import axios from 'axios';
import { baseURL, TIMEOUT } from '@constants/api.ts';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
