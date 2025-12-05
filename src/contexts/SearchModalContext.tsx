import { type ReactNode, createContext, useState } from 'react';

// Định nghĩa interface cho context value
export type SearchModalContextType = {
  searchModalIsOpen: boolean;
  setSearchModalIsOpen: (isOpen: boolean) => void;
  toggleSearchModal: () => void;
};

interface SearchModalProviderProps {
  children: ReactNode;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined);

function SearchModalProvider({ children }: SearchModalProviderProps) {
  const [searchModalIsOpen, setSearchModalIsOpen] = useState<boolean>(false);

  const toggleSearchModal = () => {
    setSearchModalIsOpen(prev => !prev);
  };

  const value: SearchModalContextType = {
    searchModalIsOpen,
    setSearchModalIsOpen,
    toggleSearchModal,
  };

  return <SearchModalContext.Provider value={value}>{children}</SearchModalContext.Provider>;
}

export { SearchModalContext, SearchModalProvider };
