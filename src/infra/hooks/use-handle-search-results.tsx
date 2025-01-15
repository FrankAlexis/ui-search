'use client';
import { useState, useEffect, useCallback } from 'react';
import { Restaurant } from '@/domain/restaurant';
import { FetchRestaurantsUseCase } from '@/use-cases/fetch-restaurants.use-case';
import { useStateContext } from '@/infra/hooks/state-context';
import { DeleteRestaurantsUseCase } from '@/use-cases/delete-restaurant.use-case';

const useHandleSearchResults = () => {
  const [restaurantToDelete, setRestaurantToDelete] = useState<
    Restaurant | undefined
  >(undefined);
  const { inputValue, setLoading, setMessage, foodType } = useStateContext();
  const [results, setResults] = useState<Restaurant[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const executeSearch = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const restaurants = await FetchRestaurantsUseCase.execute(
          value,
          foodType
        );
        setResults(restaurants);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, foodType]
  );

  useEffect(() => {
    if (inputValue) {
      executeSearch(inputValue);
    }
  }, [executeSearch, inputValue]);

  const deleteObject = async (objectID?: string) => {
    setIsOpen(false);

    if (!objectID) return;

    try {
      const id = await DeleteRestaurantsUseCase.execute(objectID);
      setResults((prevResults) =>
        prevResults.filter((restaurant) => restaurant.objectID !== objectID)
      );
      setMessage({
        type: 'success',
        text: `Restaurant deleted successfully with ID: ${id}`,
      });
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setMessage({ type: 'error', text: (error as Error).message });
    }
  };

  const confirmDelete = (restaurant: Restaurant) => {
    setRestaurantToDelete(restaurant);
    setIsOpen(true);
  };

  return {
    results,
    deleteObject,
    restaurantToDelete,
    isOpen,
    confirmDelete,
    setIsOpen,
  };
};

export default useHandleSearchResults;
