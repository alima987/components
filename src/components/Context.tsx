import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Starship } from './SearchResults';

interface CustomStateContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Starship[];
  setSearchResults: React.Dispatch<React.SetStateAction<Starship[]>>;
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
  const [searchResults, setSearchResults] = useState<Starship[]>([]);

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
