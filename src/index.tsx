import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import AppWithToast from './components/AppWithToast';
import { errorReporter } from './utils/errorReporting';
import { performanceMonitor } from './utils/performance';

import './index.css';

// Initialize monitoring
errorReporter;
performanceMonitor;

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithToast />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
