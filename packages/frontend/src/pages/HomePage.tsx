import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Chip
} from '@mui/material';
import { 
  Psychology, 
  TrendingUp, 
  EmojiEvents, 
  School,
  ArrowForward
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <Psychology color="primary" sx={{ fontSize: 40 }} />,
      title: 'IA Adaptativa',
      description: 'Algoritmo IRT que se adapta al nivel de cada niño en tiempo real'
    },
    {
      icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
      title: 'Progreso Medible',
      description: 'Tracking detallado del progreso con benchmarks internacionales'
    },
    {
      icon: <EmojiEvents color="primary" sx={{ fontSize: 40 }} />,
      title: 'Gamificación',
      description: 'Ejercicios divertidos que mantienen a los niños motivados'
    },
    {
      icon: <School color="primary" sx={{ fontSize: 40 }} />,
      title: 'Currículum Internacional',
      description: 'Basado en estándares TIMSS y PISA para competencia global'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        textAlign="center" 
        py={8}
      >
        <Chip 
          label="MVP - Fase 1" 
          color="primary" 
          variant="outlined" 
          sx={{ mb: 2 }}
        />
        
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}
        >
          Matemática Adaptativa con IA
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ maxWidth: 600, mb: 4 }}
        >
          Plataforma inteligente que personaliza el aprendizaje matemático para niños de 3-12 años, 
          utilizando benchmarks internacionales y algoritmos adaptativos.
        </Typography>
        
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          {isAuthenticated ? (
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              to="/dashboard"
              endIcon={<ArrowForward />}
            >
              Ir al Dashboard
            </Button>
          ) : (
            <>
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                to="/register"
                endIcon={<ArrowForward />}
              >
                Comenzar Gratis
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={Link}
                to="/login"
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Box py={6}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          ¿Por qué MathAdapt?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box mb={2}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box 
        textAlign="center" 
        py={8}
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
          borderRadius: 3,
          color: 'white',
          mb: 4
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          ¿Listo para revolucionar el aprendizaje?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Únete a las familias que ya están viendo resultados reales
        </Typography>
        {!isAuthenticated && (
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            component={Link}
            to="/register"
          >
            Comenzar Ahora - Es Gratis
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;