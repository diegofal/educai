import React from 'react';
import { Container, Typography } from '@mui/material';

const ExercisePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Ejercicios de Matemática
      </Typography>
      <Typography>Exercise content will go here</Typography>
    </Container>
  );
};

export default ExercisePage;