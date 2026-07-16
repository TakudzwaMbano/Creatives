import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initLenis } from './lib/lenis';
import { initMotionFallback } from './lib/motion-fallback';

// Initialize Lenis for smooth scrolling (respecting prefers-reduced-motion)
initLenis();
// Init a small fallback that forces visible state for elements that remain hidden on mobile
initMotionFallback();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
