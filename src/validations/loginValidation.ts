import * as Yup from 'yup';
import { Credentials } from '@interfaces';

const loginValidationSchema: Yup.Schema<Credentials> = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default loginValidationSchema;
