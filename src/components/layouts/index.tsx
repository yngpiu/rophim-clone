import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
