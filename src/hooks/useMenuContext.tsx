import { useContext } from 'react';

import { MenuContext, type MenuContextType } from '@/contexts/MenuContext';

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within MenuProvider');
  }
  return context;
};
