import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface StateContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  listOfCuisine: string[];
  setListOfCuisine: (listOfCuisine: string[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  message?: Message;
  setMessage: (message?: Message) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [listOfCuisine, setListOfCuisine] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('Italian');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        inputValue,
        setInputValue,
        message,
        setMessage,
        listOfCuisine,
        setListOfCuisine,
      }}
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
