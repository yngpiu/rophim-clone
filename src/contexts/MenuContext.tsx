import { createContext, useState, type ReactNode } from 'react';

// Định nghĩa interface cho context value
export type MenuContextType = {
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
};

interface MenuProviderProps {
  children: ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

function MenuProvider({ children }: MenuProviderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuIsOpen(prev => !prev);
  };

  const value: MenuContextType = {
    menuIsOpen,
    setMenuIsOpen,
    toggleMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export { MenuContext, MenuProvider };
