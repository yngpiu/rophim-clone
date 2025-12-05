import { useContext } from 'react';

import { SearchModalContext, type SearchModalContextType } from '@/contexts/SearchModalContext';

export const useSearchModalContext = (): SearchModalContextType => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error('useSearchModalContext must be used within SearchModalContext');
  }
  return context;
};
