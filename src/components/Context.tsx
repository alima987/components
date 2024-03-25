import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Characters } from './SearchResults/CardList';

interface CustomStateContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Characters[];
  setSearchResults: React.Dispatch<React.SetStateAction<Characters[]>>;
}

const CustomStateContext = createContext<CustomStateContextProps | undefined>(
  undefined
);

export const useCustomState = () => {
  const context = useContext(CustomStateContext);
  if (!context) {
    throw new Error('useCustomState must be used within a CustomStateProvider');
  }
  return context;
};

export const CustomStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Characters[]>([]);

  return (
    <CustomStateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </CustomStateContext.Provider>
  );
};
