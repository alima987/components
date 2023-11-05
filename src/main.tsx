import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
