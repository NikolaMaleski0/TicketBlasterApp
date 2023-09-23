import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/my-app';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

const root = document.getElementById(('root'));
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode> 
);