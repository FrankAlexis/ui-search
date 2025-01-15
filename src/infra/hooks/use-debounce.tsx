import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number, callback?: () => void): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback?.();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);

  return debouncedValue;
}

export default useDebounce;
