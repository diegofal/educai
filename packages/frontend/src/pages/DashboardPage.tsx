import React from 'react';
import { Container, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Familiar
      </Typography>
      <Typography>Dashboard content will go here</Typography>
    </Container>
  );
};

export default DashboardPage;