'use client';
import { useState, useEffect } from 'react';
import RestaurantHit from './restaurant-hit';
import { Restaurant } from '@/domain/restaurant';
import { FetchRestaurantsUseCase } from '@/use-cases/fetch-restaurants.use-case';
import Image from 'next/image';
import { useStateContext } from '@/infra/hooks/state-context';
import { DeleteRestaurantsUseCase } from '@/use-cases/delete-restaurant.use-case';
import ConfirmModal from './confirm-modal';

const SearchWrapper = () => {
  const [results, setResults] = useState<Restaurant[]>([]);
  const { inputValue, setLoading, setMessage } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<
    Restaurant | undefined
  >(undefined);

  useEffect(() => {
    FetchRestaurantsUseCase.execute('seafood')
      .then((restaurants) => {
        setResults(restaurants);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputValue) {
      setLoading(true);
      FetchRestaurantsUseCase.execute(inputValue)
        .then((restaurants) => {
          setResults(restaurants);
        })
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [inputValue, setLoading]);

  const deleteObject = (objectID?: string) => {
    setIsOpen(false);

    if (!objectID) return;

    DeleteRestaurantsUseCase.execute(objectID)
      .then((id) => {
        setResults(
          results.filter((restaurant) => restaurant.objectID !== objectID)
        );
        setMessage({
          type: 'success',
          text: `Restaurant deleted successfully with ID: ${id}`,
        });
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
        setMessage({ type: 'error', text: error.message });
      });
  };

  return (
    <section>
      {results.length > 0 ? (
        <ul className='grid-cols mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {results.map((restaurant) => (
            <li key={restaurant.objectID} className='max-w-xs'>
              <RestaurantHit
                hit={restaurant}
                deleteObject={() => {
                  setRestaurantToDelete(restaurant);
                  setIsOpen(true);
                }}
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
          <>
            Are you sure you want to delete the restaurant{' '}
            <strong>{restaurantToDelete?.name}</strong>?
          </>
        }
        onConfirm={() => deleteObject(restaurantToDelete?.objectID)}
      />
    </section>
  );
};

export default SearchWrapper;
