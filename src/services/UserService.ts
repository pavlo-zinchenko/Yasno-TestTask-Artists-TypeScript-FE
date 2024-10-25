import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { User } from '@interfaces';

export const getUser = async (userId: number): Promise<User> => {
    return await executeRequest(() => axiosInstance.get<User>(`/users/${userId}`));
};

export const updateUser = async (userId: number, data: Partial<User>): Promise<User> => {
    return await executeRequest(() => axiosInstance.put<User>(`/users/${userId}`, data));
};
