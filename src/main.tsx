//import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import App from './App';
import Router from './components/Routes';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
} else {
  console.error('Root element not found in the document.');
}
