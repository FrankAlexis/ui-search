'use client';
import Image from 'next/image';
import ErrorMessage from './form/error-message';
import useHandleSearchInput from '@/infra/hooks/use-handle-search-input';

const SearchInput = () => {
  const { query, error, loading, handleChange } = useHandleSearchInput();

  return (
    <div className='mx-auto w-[50rem] max-w-lg'>
      <form
        className='relative'
        onSubmit={(e) => {
          e.preventDefault();
          if (window.location.pathname !== '/') {
            window.location.href = `${window.location.origin}?query=${query}`;
          }
        }}
      >
        <input
          type='search'
          value={query}
          onChange={handleChange}
          placeholder='Search for restaurants...'
          className={`w-full rounded-lg border px-4 py-3 text-sm shadow focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <button
          className='absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
          type='submit'
        >
          {loading ? (
            <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-100' />
          ) : (
            <Image src='/search.svg' width={20} height={20} alt='search icon' />
          )}
        </button>
      </form>
      <ErrorMessage error={error} />
    </div>
  );
};

export default SearchInput;
