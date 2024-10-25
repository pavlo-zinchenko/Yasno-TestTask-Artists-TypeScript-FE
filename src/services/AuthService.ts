import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { AuthResponse, Credentials, NewUserInfo } from '@interfaces';

export const login = async (credentials: Credentials): Promise<AuthResponse> => {
    return await executeRequest(() => axiosInstance.post('/auth/login', credentials));
};

export const register = async (userData: NewUserInfo): Promise<AuthResponse> => {
    return await executeRequest(() => axiosInstance.post('/auth/register', userData));
};
