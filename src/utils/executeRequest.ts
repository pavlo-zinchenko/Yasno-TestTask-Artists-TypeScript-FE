import { AxiosResponse } from 'axios';
import { notifyError } from '@utils/ToastNotifications';

export const executeRequest = async <T>(requestFunction: () => Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      notifyError(error.response.data.message as string);
    } else {
      notifyError('Something went wrong :(');
    }
    throw error;
  }
};
