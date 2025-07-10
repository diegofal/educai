import React from 'react';
import { Container, Typography } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Registrarse
      </Typography>
      <Typography>Registration form will go here</Typography>
    </Container>
  );
};

export default RegisterPage;