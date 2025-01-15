'use client';
import { useState, useCallback } from 'react';
import { useStateContext } from '@/infra/hooks/state-context';
import { setQueryParam } from '@/infra/utils/set-query-param';
import useDebounce from '@/infra/hooks/use-debounce';

const useHandleSearchInput = () => {
  const { loading, setInputValue, inputValue } = useStateContext();
  const [error, setError] = useState('');
  const [query, setQuery] = useState(inputValue);

  useDebounce(query, 300, () => {
    if (query && validateInput(query)) {
      setInputValue(query.trim());
    }
  });

  const validateInput = useCallback((value: string) => {
    if (!value.trim()) {
      setError('Search query cannot be empty.');
      return false;
    }
    if (value.length < 3) {
      setError('Search query must be at least 3 characters long.');
      return false;
    }
    setError('');
    return true;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setQueryParam('query', e.target.value);
    },
    [setQuery]
  );

  return {
    handleChange,
    query,
    error,
    loading,
  };
};

export default useHandleSearchInput;
