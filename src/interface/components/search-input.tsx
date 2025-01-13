'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useStateContext } from '@/infra/hooks/state-context';
import Link from 'next/link';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { loading, setInputValue } = useStateContext();

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchQuery = url.searchParams.get('query');
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const url = new URL(window.location.href);
    url.searchParams.set('query', e.target.value);
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && validateInput(debouncedQuery)) {
      setInputValue(debouncedQuery.trim());
    }
  }, [debouncedQuery, setInputValue, validateInput]);

  return (
    <div className='mx-auto w-[50rem] max-w-lg'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const url = new URL(window.location.origin);
          url.searchParams.set('query', query);
          window.location.href = url.toString();
        }}
        className='relative'
      >
        <input
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Search for restaurants...'
          className={`w-full rounded-lg border px-4 py-3 text-sm shadow focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <Link
          className='absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
          href={`/?query=${query}`}
        >
          {loading ? (
            <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-100' />
          ) : (
            <Image src='/search.svg' width={20} height={20} alt='search icon' />
          )}
        </Link>
      </form>
      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default SearchInput;
