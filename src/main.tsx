import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/main.scss';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/root';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
