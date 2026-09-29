import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App page={root.dataset.page} year={Number(root.dataset.year) || new Date().getFullYear()} />
  </StrictMode>
);
if (root.querySelector('main')) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
