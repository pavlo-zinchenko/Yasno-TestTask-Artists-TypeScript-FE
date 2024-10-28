import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { login } from '@services/AuthService';
import CustomContainer from '@common/CustomContainer';
import loginValidationSchema from '@validations/loginValidation';
import { AuthResponse, Credentials } from '@interfaces';

export default function LoginPage() {
  const handleSubmit = async (values: Credentials, { setSubmitting }: FormikHelpers<Credentials>) => {
    try {
      const { user, token }: AuthResponse = await login(values);
      localStorage.removeItem('favouriteSongs');
      localStorage.setItem('user_id', user.id.toString());
      localStorage.setItem('token', token);
      window.location.href = '/';
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomContainer>
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </CustomContainer>
  );
}
