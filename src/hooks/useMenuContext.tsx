import { MenuContext, type MenuContextType } from '@/contexts/MenuContext';
import { useContext } from 'react';

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within MenuProvider');
  }
  return context;
};
