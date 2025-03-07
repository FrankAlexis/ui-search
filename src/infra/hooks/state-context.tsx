import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import useGetCuisineFilter from './use-get-cuisine-filter';

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface StateContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  listOfCuisine: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  foodType: string;
  setFoodType: (value: string) => void;
  message?: Message;
  setMessage: (message?: Message) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const { listOfCuisine, foodType, setFoodType } = useGetCuisineFilter();
  const [inputValue, setInputValue] = useState('Pizza');
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
        foodType,
        setFoodType,
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
