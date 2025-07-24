import React from 'react';
import App from './App';
import ToastContainer from './UI/ToastContainer';
import { useToast } from '../hooks/useToast';
import { AuthProvider } from '../contexts/AuthContext';

/**
 * Wrapper component that provides authentication and toast functionality
 */
const AppWithToast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <AuthProvider>
      <App />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </AuthProvider>
  );
};

export default AppWithToast;
