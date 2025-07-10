import React from 'react';
import { Container, Typography } from '@mui/material';

const StudentPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil del Estudiante
      </Typography>
      <Typography>Student profile content will go here</Typography>
    </Container>
  );
};

export default StudentPage;