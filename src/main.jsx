import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind CSS importu
import App from './App.jsx';

// React Router DOM'dan BrowserRouter'ı import ediyoruz
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Uygulamamızın tamamını BrowserRouter ile sarmalıyoruz */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
