import React from 'react';
import { Container, Typography } from '@mui/material';

const ProgressPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Progreso del Estudiante
      </Typography>
      <Typography>Progress analytics will go here</Typography>
    </Container>
  );
};

export default ProgressPage;