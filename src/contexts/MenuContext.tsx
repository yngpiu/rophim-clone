import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from 'react';

// Định nghĩa interface cho context value
export type MenuContextType = {
  menuIsOpen: boolean;
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  setMenuIsOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
};

interface MenuProviderProps {
  children: ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuIsOpen, setMenuIsOpenState] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState('');

  const setMenuIsOpen = (isOpen: boolean) => {
    setMenuIsOpenState(isOpen);
    if (!isOpen) {
      setActiveCategory('');
    }
  };

  const toggleMenu = () => {
    setMenuIsOpenState(prev => {
      const next = !prev;
      if (!next) {
        setActiveCategory('');
      }
      return next;
    });
  };

  const value: MenuContextType = {
    menuIsOpen,
    activeCategory,
    setActiveCategory,
    setMenuIsOpen,
    toggleMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

MenuProvider.displayName = 'MenuProvider';

export { MenuContext, MenuProvider };
