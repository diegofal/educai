import React from 'react';
import { Container, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Typography>Login form will go here</Typography>
    </Container>
  );
};

export default LoginPage;