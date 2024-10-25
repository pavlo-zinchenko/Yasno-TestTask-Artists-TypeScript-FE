import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { baseURL, TIMEOUT } from '@constants';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => Promise.reject(error)
);

export default axiosInstance;
