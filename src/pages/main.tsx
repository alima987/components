import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CustomStateProvider } from '../components/Context';
import Router from '../components/Routes';
import store from '../query/store';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <CustomStateProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CustomStateProvider>
    </Provider>
  );
} else {
  console.error('Root element not found in the document.');
}
