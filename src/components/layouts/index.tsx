import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { MenuProvider } from '@/contexts/MenuContext';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <MenuProvider>
        <Header />
      </MenuProvider>
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
