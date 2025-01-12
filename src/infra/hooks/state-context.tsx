import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StateContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <StateContext.Provider
      value={{ loading, setLoading, inputValue, setInputValue }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
