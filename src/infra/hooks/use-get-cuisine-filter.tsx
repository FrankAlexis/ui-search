import { FetchFilterByAttributeUseCase } from '@/use-cases/fetch-filter-by-attribute.use-case';
import { useEffect, useState } from 'react';
import { setQueryParam } from '../utils/set-query-param';

const useGetCuisineFilter = () => {
  const [listOfCuisine, setListOfCuisine] = useState<string[]>([]);
  const [foodType, setFoodType] = useState('Italian');

  useEffect(() => {
    FetchFilterByAttributeUseCase.execute('food_type').then(setListOfCuisine);
    setQueryParam('cuisine', 'Italian');
  }, []);

  return { listOfCuisine, foodType, setFoodType };
};

export default useGetCuisineFilter;
