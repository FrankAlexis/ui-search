'use client';
import RestaurantHit from './restaurant-hit';
import Image from 'next/image';
import ConfirmModal from './confirm-modal';
import useHandleSearchResults from '@/infra/hooks/use-handle-search-results';

const SearchWrapper = () => {
  const {
    results,
    deleteObject,
    restaurantToDelete,
    confirmDelete,
    isOpen,
    setIsOpen,
  } = useHandleSearchResults();

  return (
    <section>
      {results.length > 0 ? (
        <ul className='grid-cols mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {results.map((restaurant) => (
            <li key={restaurant.objectID} className='max-w-xs'>
              <RestaurantHit
                hit={restaurant}
                deleteObject={() => confirmDelete(restaurant)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className='mt-10 flex flex-col items-center justify-center text-center text-gray-500'>
          <Image
            src='/empty-search.svg'
            width={100}
            height={100}
            alt='No results found'
            priority={true}
            className='max-auto mb-5'
          />
          No results found. Try searching for something else!
        </div>
      )}
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={
          <div>
            Are you sure you want to delete the restaurant{' '}
            <strong>{restaurantToDelete?.name}</strong>?
          </div>
        }
        onConfirm={() => deleteObject(restaurantToDelete?.objectID)}
      />
    </section>
  );
};

export default SearchWrapper;
