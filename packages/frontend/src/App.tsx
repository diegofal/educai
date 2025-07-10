import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

// Import pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import StudentPage from '@/pages/StudentPage';
import ExercisePage from '@/pages/ExercisePage';
import ProgressPage from '@/pages/ProgressPage';

// Import components
import Navbar from '@/components/layout/Navbar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function App() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/student/:studentId" element={
            <ProtectedRoute>
              <StudentPage />
            </ProtectedRoute>
          } />
          
          <Route path="/student/:studentId/exercise" element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          } />
          
          <Route path="/student/:studentId/progress" element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;