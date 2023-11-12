import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Routes';
import { CustomStateProvider } from './components/Context';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <CustomStateProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CustomStateProvider>
  );
} else {
  console.error('Root element not found in the document.');
}
