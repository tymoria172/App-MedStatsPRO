import React from 'react';
import { AuthProvider } from './contexts/authContext';
import { Routes } from './routes';
import { ToastProvider } from './contexts/toastContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#e63946" />
      <ToastProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ToastProvider>
    </>

  );
}