import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../contexts/authContext';

export function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      {authState.authenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}