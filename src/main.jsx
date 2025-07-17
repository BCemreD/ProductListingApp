import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind CSS 
import App from './App.jsx';
import { SpeedInsights } from "@vercel/speed-insights/react"


import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>,
);
