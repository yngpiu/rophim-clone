import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/components/layouts';
import GenrePage from '@/pages/GenrePage';
import HomePage from '@/pages/HomePage';
import TopicPage from '@/pages/TopicPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/chu-de',
        element: <TopicPage />,
      },
      {
        path: '/the-loai/:slug',
        element: <GenrePage />,
      },
    ],
  },
]);

export default router;
