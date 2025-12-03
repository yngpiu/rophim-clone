import RootLayout from '@/components/layouts';
import HomePage from '@/pages/HomePage';
import TopicPage from '@/pages/TopicPage';
import { createBrowserRouter } from 'react-router-dom';

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
    ],
  },
]);

export default router;
