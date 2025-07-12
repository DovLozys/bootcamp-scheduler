import React from 'react';
import App from './App';
import ToastContainer from './Toast/ToastContainer';
import { useToast } from '../hooks/useToast';

/**
 * Wrapper component that provides toast functionality to the entire app
 */
const AppWithToast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <App />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
};

export default AppWithToast;
