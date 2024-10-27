import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { autoClose } from '@constants';

let primaryColor: string = '#1976d2';
let secondaryColor: string = 'black';
let contrastText: string = '#ffffff';

export const setToastTheme = (primary: string, secondary: string, contrast: string): void => {
    primaryColor = primary;
    secondaryColor = secondary;
    contrastText = contrast;
};

export const notifySuccess = (message: string): void => {
    const options: ToastOptions = {
        position: 'bottom-right',
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: primaryColor,
            color: contrastText,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
    };
    toast.success(message, options);
};

export const notifyError = (message: string): void => {
    const options: ToastOptions = {
        position: 'bottom-right',
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: secondaryColor,
            color: contrastText,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
    };
    toast.error(message, options);
};
