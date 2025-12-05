import { Outlet } from 'react-router-dom';

import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { MenuProvider } from '@/contexts/MenuContext';
import { SearchModalProvider } from '@/contexts/SearchModalContext';

const RootLayout = () => {
  return (
    <>
      <SearchModalProvider>
        <MenuProvider>
          <Header />
        </MenuProvider>
        <Outlet />
        <Footer />
      </SearchModalProvider>
    </>
  );
};
export default RootLayout;
